import { prisma } from "./db";
import { PaymentStatus, ItemType } from "@prisma/client";
import { paymentConfig } from "./config";

export interface PaymentData {
  userId: string;
  amount: number;
  itemType: ItemType;
  itemId: string;
  itemName: string;
}

export interface SSLCommerzResponse {
  status: string;
  sessionkey?: string;
  GatewayPageURL?: string;
  failedreason?: string;
}

export class PaymentService {
  private static get isLive(): boolean {
    return process.env.SSLCOMMERZ_IS_LIVE === "true";
  }

  private static get baseUrl(): string {
    return this.isLive
      ? paymentConfig.sslcommerz.urls.live
      : paymentConfig.sslcommerz.urls.sandbox;
  }

  static async initiatePayment(data: PaymentData) {
    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        userId: data.userId,
        amount: data.amount,
        currency: paymentConfig.defaults.currency,
        status: paymentConfig.defaults.paymentStatus.pending as PaymentStatus,
        gateway: "SSLCOMMERZ",
        itemType: data.itemType,
        itemId: data.itemId,
        itemName: data.itemName,
      },
    });

    // Prepare SSLCommerz payload
    const payload = {
      store_id: process.env.SSLCOMMERZ_STORE_ID!,
      store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD!,
      total_amount: data.amount.toString(),
      currency: paymentConfig.defaults.currency,
      tran_id: payment.id,
      success_url: paymentConfig.callbacks.success(
        process.env.NEXT_PUBLIC_APP_URL!
      ),
      fail_url: paymentConfig.callbacks.fail(process.env.NEXT_PUBLIC_APP_URL!),
      cancel_url: paymentConfig.callbacks.cancel(
        process.env.NEXT_PUBLIC_APP_URL!
      ),
      ipn_url: paymentConfig.callbacks.ipn(process.env.NEXT_PUBLIC_APP_URL!),
      cus_name: "Customer Name", // Will be updated with actual user data
      cus_email: "customer@example.com",
      cus_phone: "01700000000",
      product_name: data.itemName,
      product_category: data.itemType.toLowerCase(),
      product_profile: "general",
      shipping_method: "NO",
      num_of_item: "1",
    };

    try {
      const response = await fetch(
        paymentConfig.sslcommerz.urls.gateway(this.isLive),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(payload as Record<string, string>),
        }
      );

      const result: SSLCommerzResponse = await response.json();

      if (result.status === "SUCCESS" && result.GatewayPageURL) {
        return {
          success: true,
          paymentId: payment.id,
          gatewayUrl: result.GatewayPageURL,
        };
      } else {
        // Update payment status to failed
        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: paymentConfig.defaults.paymentStatus
              .failed as PaymentStatus,
          },
        });

        return {
          success: false,
          error: result.failedreason || "Payment initiation failed",
        };
      }
    } catch {
      // Update payment status to failed
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: paymentConfig.defaults.paymentStatus.failed as PaymentStatus,
        },
      });

      throw new Error("Payment service unavailable");
    }
  }

  static async verifyPayment(tranId: string, validationId: string) {
    try {
      const response = await fetch(
        paymentConfig.sslcommerz.urls.validation(this.isLive),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            val_id: validationId,
            store_id: process.env.SSLCOMMERZ_STORE_ID!,
            store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD!,
          }),
        }
      );

      const result = await response.json();

      if (result.status === "VALID" || result.status === "VALIDATED") {
        // Update payment status
        const payment = await prisma.payment.update({
          where: { id: tranId },
          data: {
            status: paymentConfig.defaults.paymentStatus
              .completed as PaymentStatus,
            transactionId: result.tran_id,
            completedAt: new Date(),
          },
        });

        // Process the purchase (enrollment or note purchase)
        await this.processPurchase(payment);

        return { success: true, payment };
      } else {
        await prisma.payment.update({
          where: { id: tranId },
          data: {
            status: paymentConfig.defaults.paymentStatus
              .failed as PaymentStatus,
          },
        });

        return { success: false, error: "Payment validation failed" };
      }
    } catch {
      throw new Error("Payment verification failed");
    }
  }

  private static async processPurchase(payment: {
    userId: string;
    itemType: ItemType;
    itemId: string;
  }) {
    if (payment.itemType === ItemType.COURSE) {
      // Create enrollment
      await prisma.enrollment.create({
        data: {
          userId: payment.userId,
          courseId: payment.itemId,
        },
      });
    } else if (payment.itemType === ItemType.NOTE) {
      // Create note purchase
      await prisma.notePurchase.create({
        data: {
          userId: payment.userId,
          noteId: payment.itemId,
        },
      });
    }
  }
}

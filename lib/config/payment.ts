export const paymentConfig = {
  sslcommerz: {
    urls: {
      sandbox: "https://sandbox.sslcommerz.com",
      live: "https://securepay.sslcommerz.com",
      gateway: (isLive: boolean) =>
        `${
          isLive
            ? "https://securepay.sslcommerz.com"
            : "https://sandbox.sslcommerz.com"
        }/gwprocess/v4/api.php`,
      validation: (isLive: boolean) =>
        `${
          isLive
            ? "https://securepay.sslcommerz.com"
            : "https://sandbox.sslcommerz.com"
        }/validator/api/validationserverAPI.php`,
    },
    endpoints: {
      initiate: "/gwprocess/v4/api.php",
      validate: "/validator/api/validationserverAPI.php",
    },
  },

  callbacks: {
    success: (baseUrl: string) => `${baseUrl}/api/payments/success`,
    fail: (baseUrl: string) => `${baseUrl}/api/payments/fail`,
    cancel: (baseUrl: string) => `${baseUrl}/api/payments/cancel`,
    ipn: (baseUrl: string) => `${baseUrl}/api/payments/ipn`,
  },

  defaults: {
    currency: "BDT",
    paymentStatus: {
      pending: "PENDING",
      completed: "COMPLETED",
      failed: "FAILED",
      refunded: "REFUNDED",
    },
    itemTypes: {
      course: "COURSE",
      note: "NOTE",
    },
  },

  validation: {
    minAmount: 1,
    maxAmount: 100000, // ৳100,000
    supportedCurrencies: ["BDT"],
  },

  timeouts: {
    requestTimeout: 30000, // 30 seconds
    validationTimeout: 60000, // 60 seconds
  },

  retry: {
    maxAttempts: 3,
    backoffMultiplier: 2,
    initialDelay: 1000, // 1 second
  },
} as const;

export type PaymentConfig = typeof paymentConfig;

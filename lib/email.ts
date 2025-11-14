import { Resend } from "resend";

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
};

export class EmailService {
  static async sendWelcomeEmail(email: string, name: string) {
    try {
      const resend = getResend();
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: "Welcome to With Shakil Sir! 🎓",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Welcome to With Shakil Sir!</h1>
            <p>Dear ${name},</p>
            <p>Thank you for joining our learning platform. We're excited to help you excel in your studies!</p>
            <p>You can now:</p>
            <ul>
              <li>Browse our courses</li>
              <li>Enroll in classes</li>
              <li>Access study materials</li>
              <li>Take quizzes</li>
            </ul>
            <p>Start your learning journey today!</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/courses" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Browse Courses</a>
            <p>Best regards,<br>With Shakil Sir Team</p>
          </div>
        `,
      });
    } catch (error) {
      console.error("Welcome email error:", error);
      // Don't throw error for email failures
    }
  }

  static async sendEnrollmentConfirmation(
    email: string,
    name: string,
    courseName: string
  ) {
    try {
      const resend = getResend();
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: `Enrollment Confirmed: ${courseName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #059669;">Enrollment Confirmed! 🎉</h1>
            <p>Dear ${name},</p>
            <p>Congratulations! You have successfully enrolled in <strong>${courseName}</strong>.</p>
            <p>You can now:</p>
            <ul>
              <li>Access all course materials</li>
              <li>Watch video lectures</li>
              <li>Take quizzes</li>
              <li>Download study notes</li>
            </ul>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background-color: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Start Learning</a>
            <p>Best regards,<br>With Shakil Sir Team</p>
          </div>
        `,
      });
    } catch (error) {
      console.error("Enrollment email error:", error);
    }
  }

  static async sendPaymentConfirmation(
    email: string,
    name: string,
    itemName: string,
    amount: number
  ) {
    try {
      const resend = getResend();
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: `Payment Successful: ${itemName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #059669;">Payment Successful! ✅</h1>
            <p>Dear ${name},</p>
            <p>Your payment of ৳${amount} for <strong>${itemName}</strong> has been processed successfully.</p>
            <p>You now have full access to your purchase.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background-color: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Access Now</a>
            <p>Best regards,<br>With Shakil Sir Team</p>
          </div>
        `,
      });
    } catch (error) {
      console.error("Payment email error:", error);
    }
  }

  static async sendCertificateEmail(
    email: string,
    name: string,
    courseName: string,
    certificateUrl: string
  ) {
    try {
      const resend = getResend();
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: `Congratulations! Certificate Earned: ${courseName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #dc2626;">Congratulations! 🎓</h1>
            <p>Dear ${name},</p>
            <p>You have successfully completed <strong>${courseName}</strong> and earned your certificate!</p>
            <p>Your hard work and dedication have paid off. Keep learning and achieving more!</p>
            <a href="${certificateUrl}" style="background-color: #dc2626; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Download Certificate</a>
            <p>Best regards,<br>With Shakil Sir Team</p>
          </div>
        `,
      });
    } catch (error) {
      console.error("Certificate email error:", error);
    }
  }

  static async sendPasswordReset(email: string, resetLink: string) {
    try {
      const resend = getResend();
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: "Reset Your Password",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">Reset Your Password</h1>
            <p>You requested a password reset for your With Shakil Sir account.</p>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <p>Best regards,<br>With Shakil Sir Team</p>
          </div>
        `,
      });
    } catch (error) {
      console.error("Password reset email error:", error);
    }
  }
}

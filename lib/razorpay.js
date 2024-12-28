// Razorpay configuration and utilities
import crypto from "crypto";

export function generateSignature(orderId, paymentId) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    throw new Error("Razorpay key secret is not defined");
  }
  return crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
}

export async function handlePayment({ orderId, amount, onSuccess, onError }) {
  if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
    onError("Payment configuration missing");
    return;
  }

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: parseFloat(amount) * 100,
    currency: "INR",
    name: "Course Payment",
    description: "Course Access",
    order_id: orderId,
    handler: async function (response) {
      try {
        const verificationData = {
          orderCreationId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(verificationData),
        });

        const verification = await result.json();

        if (verification.isOk) {
          onSuccess();
        } else {
          onError(verification.message);
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        onError("Payment verification failed");
      }
    },
    prefill: {
      name: "Customer Name",
      email: "customer@example.com",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.on("payment.failed", function (response) {
    onError(response.error.description);
  });
  paymentObject.open();
}

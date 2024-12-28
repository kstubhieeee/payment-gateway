import { NextResponse } from "next/server";
import { generateSignature } from "@/lib/razorpay";

export async function POST(request) {
  try {
    const { orderCreationId, razorpayPaymentId, razorpaySignature } =
      await request.json();

    const expectedSignature = generateSignature(
      orderCreationId,
      razorpayPaymentId
    );

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json(
        { message: "Payment verification failed", isOk: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Payment verified successfully", isOk: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { message: "Payment verification failed", isOk: false },
      { status: 500 }
    );
  }
}

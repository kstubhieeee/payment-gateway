"use client";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { handlePayment } from "@/lib/payment";

export default function Checkout() {
  const router = useRouter();
  const params = useSearchParams();
  const amount = params.get("amount");
  const [loading1, setLoading1] = useState(true);
  const [loading, setLoading] = useState(false);
  const idRef = useRef();

  useEffect(() => {
    if (!amount) {
      router.replace("/");
    }
    createOrderId();
  }, []);

  const createOrderId = async () => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount) * 100,
          currency: "INR",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const id = data.orderId;
      idRef.current = id;
      setLoading1(false);
    } catch (error) {
      toast.error("Failed to create order");
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  const processPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await handlePayment({
        orderId: idRef.current,
        amount,
        onSuccess: () => {
          toast.success("Payment successful!");
          router.push("/courses?new=true");
        },
        onError: (message) => {
          toast.error(message);
        }
      });
    } catch (error) {
      toast.error("Payment failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading1) {
    return (
      <div className="container h-screen flex justify-center items-center bg-background">
        <LoaderCircle className="animate-spin h-20 w-20 text-primary" />
      </div>
    );
  }

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <section className="container h-screen flex flex-col justify-center items-center gap-10 bg-background">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
          Checkout
        </h1>
        <Card className="w-full max-w-md space-y-8 border-muted/20">
          <CardHeader>
            <CardTitle className="my-4 text-2xl">Complete Your Purchase</CardTitle>
            <CardDescription className="text-base">
              You're about to subscribe to our premium plan for{" "}
              <span className="font-semibold text-primary">₹{amount}</span>/month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={processPayment}>
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                type="submit"
              >
                {loading ? (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {loading ? "Processing..." : "Complete Payment"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex">
            <p className="text-sm text-muted-foreground">
              By proceeding, you agree to our terms and conditions
            </p>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}
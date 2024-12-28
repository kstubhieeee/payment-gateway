"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function PaymentVerifyPage() {
  return (
    <section className="min-h-screen flex flex-col gap-8 items-center justify-center bg-background px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-full bg-green-500/20"
            initial={{ scale: 0 }}
            animate={{ scale: 1.5 }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
          <CheckCircle2
            size={100}
            className="text-green-500 relative z-10"
          />
        </div>
      </motion.div>
      
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
          Payment Successful!
        </h1>
        <p className="text-muted-foreground text-lg">
          Thank you for your purchase. Your payment has been processed successfully.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
        >
          <Link href="/">Return to Home</Link>
        </Button>
      </motion.div>
    </section>
  );
}
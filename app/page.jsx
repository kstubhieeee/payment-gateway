"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import WorldMap from "@/components/ui/world-map";
import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const PricingCard = ({ title, price, description, features, actionLabel, index }) => (
  <motion.div variants={item}>
    <Card className="w-full max-w-sm space-y-6 bg-card/50 backdrop-blur-sm border-muted/20 hover:border-primary/50 transition-colors duration-300">
      <CardHeader className="pb-8 pt-4 gap-8">
        <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
          {title}
        </CardTitle>
        <h3 className="text-4xl font-bold my-6">₹{price}</h3>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <CardDescription className="pt-1.5 h-12 text-base">
          {description}
        </CardDescription>
        {features.map((feature, index) => (
          <span
            key={index}
            className="flex items-center gap-3 text-sm text-muted-foreground"
          >
            <CheckCircle2 className="text-primary h-4 w-4 flex-shrink-0" />
            {feature}
          </span>
        ))}
      </CardContent>
      <CardFooter className="mt-2">
        <Button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          asChild
        >
          <Link href={`/checkout/?amount=${price}`}>{actionLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

export default function Page() {
  const plans = [
    {
      title: "Basic",
      price: 999,
      description: "Essential features you need to get started",
      features: [
        "24/7 Support Access",
        "Real-time Analytics",
        "Basic API Integration",
        "Monthly Reports",
      ],
      actionLabel: "Get Basic",
    },
    {
      title: "Pro",
      price: 5999,
      description: "Perfect for owners of small & medium businesses",
      features: [
        "Everything in Basic",
        "Advanced Analytics",
        "Custom Integrations",
        "Priority Support",
      ],
      actionLabel: "Get Pro",
    },
  ];

  return (
    <div>
      <div className=" py-40 dark:bg-black bg-white w-full">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
            Remote{" "}
            <span className="text-neutral-400">
              {"Connectivity".split("").map((word, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.04 }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </p>
          <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
            Break free from traditional boundaries. Work from anywhere, at the
            comfort of your own studio apartment. Perfect for Nomads and
            Travellers.
          </p>
        </div>
        <WorldMap
          dots={[
            {
              start: {
                lat: 64.2008,
                lng: -149.4937,
              }, // Alaska (Fairbanks)
              end: {
                lat: 34.0522,
                lng: -118.2437,
              }, // Los Angeles
            },
            {
              start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
              end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            },
            {
              start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
              end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
            },
            {
              start: { lat: 51.5074, lng: -0.1278 }, // London
              end: { lat: 28.6139, lng: 77.209 }, // New Delhi
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
            },
            {
              start: { lat: 28.6139, lng: 77.209 }, // New Delhi
              end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
            },
          ]}
        />
      </div>
      <div className="container min-h-screen py-20 flex flex-col items-center justify-center text-center bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the perfect plan that suits your needs
          </p>
        </motion.div>

        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
        >
          {plans.map((plan, index) => (
            <PricingCard key={plan.title} {...plan} index={index} />
          ))}
        </motion.section>
      </div>
    </div>
  );
}
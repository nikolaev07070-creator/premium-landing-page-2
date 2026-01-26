"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "$2,999",
    period: "per project",
    description: "Perfect for small businesses and startups",
    features: [
      "Custom website design",
      "Up to 5 pages",
      "Mobile responsive",
      "Basic SEO optimization",
      "1 month support",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$7,999",
    period: "per project",
    description: "Ideal for growing businesses",
    features: [
      "Everything in Starter",
      "Up to 15 pages",
      "Advanced animations",
      "CMS integration",
      "E-commerce ready",
      "3 months support",
      "Priority development",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored pricing",
    description: "For large-scale digital solutions",
    features: [
      "Everything in Professional",
      "Unlimited pages",
      "Custom integrations",
      "Dedicated team",
      "24/7 support",
      "SLA guarantee",
      "Ongoing maintenance",
    ],
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
            Pricing
          </p>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Investment Plans
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Transparent pricing for exceptional quality. Choose the plan that fits
            your project scope.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass relative rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] ${
                plan.highlighted
                  ? "border-primary/50 shadow-[0_0_40px_rgba(6,182,212,0.15)]"
                  : "hover:border-primary/30"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="ml-2 text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="mb-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.highlighted
                    ? "glow-button bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-border bg-transparent text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary"
                }`}
                variant={plan.highlighted ? "default" : "outline"}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

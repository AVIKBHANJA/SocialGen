import React from "react";
import Link from "next/link";

export const metadata = {
  title: "SocialGen - Pricing",
  description:
    "Choose the perfect plan for your social media content generation needs",
};

const PricingPage = () => {
  const CheckIcon = () => (
    <svg
      className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>
  );
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Try our basic features with limited generations.",
      features: [
        "5 AI post generations per month",
        "Save up to 3 custom prompts",
        "Basic social media platforms",
        "Community support",
      ],
      cta: "Get Started",
      popular: false,
      ctaType: "secondary",
      ctaLink: "/register",
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "Perfect for content creators and small businesses.",
      features: [
        "100 AI post generations per month",
        "Save unlimited custom prompts",
        "All social media platforms",
        "Advanced customization options",
        "Priority support",
        "Analytics dashboard",
      ],
      cta: "Start Free Trial",
      popular: true,
      ctaType: "primary",
      ctaLink: "/register?plan=pro",
    },
    {
      name: "Enterprise",
      price: "$49",
      period: "per month",
      description: "Ideal for agencies and larger teams.",
      features: [
        "Unlimited AI post generations",
        "Team collaboration features",
        "Custom API integration",
        "White-label options",
        "Dedicated account manager",
        "Analytics & performance reporting",
        "Priority support",
      ],
      cta: "Contact Sales",
      popular: false,
      ctaType: "secondary",
      ctaLink: "/contact?subject=enterprise",
    },
  ];
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your social media content generation
            needs. All plans include our core AI technology and regular updates.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border rounded-xl p-8 transition-all hover:shadow-lg relative
              ${plan.popular ? "border-primary shadow-md" : "border-border"}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">/{plan.period}</span>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.ctaLink}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors block text-center
                ${
                  plan.ctaType === "primary"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-blue-600 text-blue-600 hover:bg-blue-50"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>{" "}
        <div className="mt-16 text-center bg-muted p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Need a custom solution?
          </h2>
          <p className="text-muted-foreground mb-6">
            We offer custom enterprise solutions for large teams and agencies
            with specific requirements.
          </p>{" "}
          <Link
            href="/contact?subject=custom_pricing"
            className="bg-primary text-primary-foreground py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors inline-block"
          >
            Contact Our Sales Team
          </Link>
        </div>
        <div className="mt-16">
          {" "}
          <h2 className="text-2xl font-bold mb-6 text-center text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Can I switch between plans?
              </h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                to your billing will be prorated.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                What payment methods do you accept?
              </h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, PayPal, and for Enterprise
                customers, we also accept wire transfers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Do you offer refunds?
              </h3>{" "}
              <p className="text-muted-foreground">
                We offer a 14-day money-back guarantee for all new subscribers
                if you&apos;re not satisfied with our service.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                What happens if I exceed my generation limit?
              </h3>
              <p className="text-muted-foreground">
                {" "}
                You can purchase additional generations or upgrade to a higher
                plan that offers more capacity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;

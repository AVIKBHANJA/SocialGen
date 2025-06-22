import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Generate Engaging
                  <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    
                    Social Media Posts
                  </span>
                  with AI
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Create platform-specific content that resonates with your
                  audience using our advanced AI. Save time and boost your
                  social media presence.
                </p>
              </div>{" "}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/generator"
                  className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none text-lg px-8 py-3"
                >
                  Start Creating
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-lg border border-input bg-background text-foreground font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none text-lg px-8 py-3"
                >
                  View Plans
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <Card variant="elevated" className="max-w-md mx-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-sm text-muted-foreground font-mono">
                      SocialGen AI
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-muted p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground font-mono">
                        Generating LinkedIn post for tech audience about AI
                        innovation...
                      </p>
                    </div>
                    <div className="bg-primary/10 p-4 rounded-lg border-l-4 border-primary">
                      <p className="text-foreground text-sm">
                        🚀 <strong>Exciting News in AI Innovation!</strong>
                        <br />
                        <br />
                        Our team has just implemented a breakthrough algorithm
                        that reduces processing time by 75% while improving
                        accuracy by 30%. This means faster insights and more
                        reliable predictions for all our enterprise clients.
                        <br />
                        <br />
                        #AIInnovation #TechBreakthrough #DataScience
                        #EnterpriseAI
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>{" "}
      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground">
              Our AI-powered platform offers everything you need to create
              engaging content across all major social media platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:scale-105 transition-transform duration-200">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  AI-Powered Generation
                </h3>
                <p className="text-muted-foreground">
                  Leverage Google&apos;s Gemini 2.0 Flash API to create
                  engaging, platform-specific content optimized for your target
                  audience.
                </p>
              </div>
            </Card>

            <Card className="group hover:scale-105 transition-transform duration-200">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Custom Prompt Templates
                </h3>
                <p className="text-muted-foreground">
                  Save and reuse your favorite prompt templates to maintain
                  consistent messaging across your social media campaigns.
                </p>
              </div>
            </Card>

            <Card className="group hover:scale-105 transition-transform duration-200">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Secure & Private
                </h3>
                <p className="text-muted-foreground">
                  Your content and prompts are securely stored with
                  enterprise-grade encryption. You maintain full ownership of
                  your data.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>{" "}
      {/* How It Works */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Create engaging social media content in just three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl text-3xl text-primary-foreground flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-200">
                  1
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Select Your Platform
              </h3>
              <p className="text-muted-foreground">
                Choose from popular platforms like Instagram, Twitter, LinkedIn,
                Facebook, and more.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl text-3xl text-primary-foreground flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-200">
                  2
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-pulse delay-200"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Define Your Audience
              </h3>
              <p className="text-muted-foreground">
                Specify your target audience, tone, and content preferences to
                tailor your message.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl text-3xl text-primary-foreground flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-200">
                  3
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-pulse delay-500"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Generate & Refine
              </h3>
              <p className="text-muted-foreground">
                Our AI creates your post in seconds. Tweak, save, and export it
                for immediate use.
              </p>
            </div>
          </div>
        </div>
      </section>{" "}
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Ready to Transform Your Social Media Strategy?
            </h2>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Join thousands of content creators, marketers, and businesses who
              are saving time and improving engagement with SocialGen.
            </p>
            <div className="pt-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-xl bg-background text-foreground font-semibold transition-all duration-200 hover:bg-background/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-primary text-lg px-10 py-4 shadow-xl"
              >
                Get Started for Free
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

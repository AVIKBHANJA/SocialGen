import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-5xl font-bold mb-6 text-blue-900">
              Generate Engaging Social Media Posts with AI
            </h1>
            <p className="text-xl mb-8 text-gray-600">
              Create platform-specific content that resonates with your audience
              using our advanced AI. Save time and boost your social media
              presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/generator"
                className="bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
              >
                Start Creating
              </Link>
              <Link
                href="/pricing"
                className="border border-blue-600 text-blue-600 py-3 px-8 rounded-lg font-medium hover:bg-blue-50 transition-colors text-center"
              >
                View Plans
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-10">
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-gray-500">SocialGen AI</div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-800 font-mono">
                    Generating LinkedIn post for tech audience about AI
                    innovation...
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-700">
                    🚀 <strong>Exciting News in AI Innovation!</strong>
                    <br />
                    <br />
                    Our team has just implemented a breakthrough algorithm that
                    reduces processing time by 75% while improving accuracy by
                    30%. This means faster insights and more reliable
                    predictions for all our enterprise clients.
                    <br />
                    <br />
                    #AIInnovation #TechBreakthrough #DataScience #EnterpriseAI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">
            Powerful Features
          </h2>
          <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Our AI-powered platform offers everything you need to create
            engaging content across all major social media platforms.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
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
              <h3 className="text-xl font-semibold mb-3">
                AI-Powered Generation
              </h3>{" "}
              <p className="text-gray-600">
                Leverage Google&apos;s Gemini 2.0 Flash API to create engaging,
                platform-specific content optimized for your target audience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
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
              <h3 className="text-xl font-semibold mb-3">
                Custom Prompt Templates
              </h3>
              <p className="text-gray-600">
                Save and reuse your favorite prompt templates to maintain
                consistent messaging across your social media campaigns.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
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
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-gray-600">
                Your content and prompts are securely stored with
                enterprise-grade encryption. You maintain full ownership of your
                data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">How It Works</h2>
          <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Create engaging social media content in just three simple steps.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full text-2xl text-white flex items-center justify-center mx-auto mb-5">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Select Your Platform
              </h3>
              <p className="text-gray-600">
                Choose from popular platforms like Instagram, Twitter, LinkedIn,
                Facebook, and more.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full text-2xl text-white flex items-center justify-center mx-auto mb-5">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Define Your Audience
              </h3>
              <p className="text-gray-600">
                Specify your target audience, tone, and content preferences to
                tailor your message.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full text-2xl text-white flex items-center justify-center mx-auto mb-5">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Generate & Refine</h3>
              <p className="text-gray-600">
                Our AI creates your post in seconds. Tweak, save, and export it
                for immediate use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Social Media Strategy?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of content creators, marketers, and businesses who
            are saving time and improving engagement with SocialGen.
          </p>
          <Link
            href="/register"
            className="bg-white text-blue-900 py-3 px-8 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-block"
          >
            Get Started for Free
          </Link>
        </div>
      </section>
    </main>
  );
}

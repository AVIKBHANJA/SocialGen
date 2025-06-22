import React from "react";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "SocialGen - Privacy Policy",
  description: "SocialGen Privacy Policy - How we protect and manage your data",
};

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">Last updated: June 22, 2025</p>
          </div>

          <Card>
            <div className="prose max-w-none text-foreground">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  1. Introduction
                </h2>
                <p className="mb-4 text-muted-foreground">
                  Welcome to SocialGen (&quot;we,&quot; &quot;our,&quot; or
                  &quot;us&quot;). We are committed to protecting your privacy
                  and ensuring the security of your personal information. This
                  Privacy Policy explains how we collect, use, disclose, and
                  safeguard your information when you use our social media post
                  generation service.
                </p>
                <p className="text-muted-foreground">
                  By accessing or using SocialGen, you agree to the terms of
                  this Privacy Policy. If you do not agree with our policies and
                  practices, please do not use our service.
                </p>
              </section>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  2. Information We Collect
                </h2>

                <h3 className="text-xl font-medium mb-3">
                  2.1 Personal Information
                </h3>
                <p className="mb-4">
                  We may collect personal information that you voluntarily
                  provide to us when you:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Create an account (name, email address, password)</li>
                  <li>Update your profile information</li>
                  <li>Subscribe to our services</li>
                  <li>Contact our support team</li>
                  <li>Participate in surveys or promotions</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">2.2 Usage Data</h3>
                <p className="mb-4">
                  We automatically collect certain information when you visit,
                  use, or navigate our platform. This information may include:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>IP address</li>
                  <li>Device type and browser information</li>
                  <li>Operating system</li>
                  <li>Pages visited and features used</li>
                  <li>Time spent on pages</li>
                  <li>Referring website</li>
                  <li>Click patterns</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">2.3 User Content</h3>
                <p>
                  We collect and store the content you create using our
                  platform, including prompt templates, generated posts, and any
                  customizations you make to these posts.
                </p>
              </section>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="mb-4">
                  We use your information for various purposes, including to:
                </p>
                <ul className="list-disc pl-6">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and manage your account</li>
                  <li>
                    Respond to your inquiries and provide customer support
                  </li>
                  <li>
                    Send you technical notices, updates, and administrative
                    messages
                  </li>
                  <li>
                    Communicate with you about products, services, offers, and
                    events
                  </li>
                  <li>Monitor and analyze usage patterns and trends</li>
                  <li>
                    Detect, prevent, and address technical issues and fraudulent
                    activities
                  </li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  4. Data Retention
                </h2>
                <p>
                  We will retain your personal information only for as long as
                  necessary to fulfill the purposes outlined in this Privacy
                  Policy, unless a longer retention period is required or
                  permitted by law. We will also retain and use your information
                  as necessary to comply with our legal obligations, resolve
                  disputes, and enforce our agreements.
                </p>
              </section>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  5. Data Security
                </h2>
                <p>
                  We implement appropriate technical and organizational security
                  measures to protect your personal information from
                  unauthorized access, disclosure, alteration, or destruction.
                  However, no method of transmission over the Internet or
                  electronic storage is 100% secure, and we cannot guarantee
                  absolute security.
                </p>
              </section>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  6. Third-Party Services
                </h2>
                <p>
                  Our service may contain links to third-party websites or use
                  third-party services that have their own privacy policies. We
                  are not responsible for the privacy practices or content of
                  these third parties. We encourage you to review the privacy
                  policies of any third-party sites or services you visit.
                </p>
              </section>
              <section className="mb-8">
                {" "}
                <h2 className="text-2xl font-semibold mb-4">
                  7. Children&apos;s Privacy
                </h2>
                <p>
                  Our service is not intended for children under the age of 13,
                  and we do not knowingly collect personal information from
                  children under 13. If we learn that we have collected personal
                  information from a child under 13, we will promptly delete
                  that information.
                </p>
              </section>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  8. Your Data Protection Rights
                </h2>
                <p className="mb-4">
                  Depending on your location, you may have certain rights
                  regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6">
                  <li>Right to access your personal data</li>
                  <li>Right to rectify inaccurate personal data</li>
                  <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                </ul>
              </section>
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  9. Changes to This Privacy Policy
                </h2>
                <p>
                  {" "}
                  We may update our Privacy Policy from time to time. Any
                  changes will be posted on this page, and the &quot;Last
                  updated&quot; date at the top will be revised. We encourage
                  you to review our Privacy Policy periodically for any changes.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
                <p>
                  If you have any questions or concerns about our Privacy Policy
                  or data practices, please contact us at:
                </p>
                <p className="mt-4">
                  <strong>Email:</strong> privacy@socialgen.example.com
                  <br />
                  <strong>Address:</strong> SocialGen Headquarters, 123 AI
                  Avenue, Digital City, DC 12345
                </p>
              </section>{" "}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;

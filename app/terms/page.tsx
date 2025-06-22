import React from "react";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "SocialGen - Terms of Service",
  description:
    "SocialGen Terms of Service - Rules and guidelines for using our platform",
};

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">Last updated: June 22, 2025</p>
          </div>

          <Card>
            <div className="prose max-w-none text-foreground">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  1. Agreement to Terms
                </h2>
                <p className="mb-4 text-muted-foreground">
                  Welcome to SocialGen. These Terms of Service
                  (&quot;Terms&quot;) govern your access to and use of the
                  SocialGen website, apps, and services (collectively, the
                  &quot;Service&quot;).
                </p>
                <p className="text-muted-foreground">
                  By accessing or using the Service, you agree to be bound by
                  these Terms. If you do not agree to these Terms, please do not
                  use the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  2. Description of Service
                </h2>
                <p className="text-muted-foreground">
                  SocialGen is an AI-powered platform that generates social
                  media content for various platforms based on user inputs and
                  preferences. Our Service offers features including but not
                  limited to content generation, prompt template management, and
                  content library storage.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  3. Account Registration
                </h2>
                <p className="mb-4">
                  To access certain features of the Service, you must create an
                  account. When you register, you agree to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information as needed</li>
                  <li>Keep your password secure and confidential</li>
                  <li>
                    Be responsible for all activities that occur under your
                    account
                  </li>
                  <li>
                    Notify us immediately of any unauthorized use of your
                    account
                  </li>
                </ul>
                <p>
                  We reserve the right to disable any user account if we
                  determine that you have violated these Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  4. Subscription and Billing
                </h2>
                <p className="mb-4">
                  SocialGen offers various subscription plans with different
                  features and limitations. By subscribing to a paid plan:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    You agree to pay all fees associated with your selected plan
                  </li>
                  <li>
                    You authorize us to charge your payment method for such fees
                  </li>
                  <li>
                    Unless otherwise specified, subscriptions automatically
                    renew until cancelled
                  </li>
                  <li>
                    You can cancel your subscription at any time through your
                    account settings
                  </li>
                </ul>
                <p>
                  Price changes will be notified to you in advance. No refunds
                  will be issued for partial subscription periods unless
                  required by law.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. User Content</h2>{" "}
                <p className="mb-4">
                  &quot;User Content&quot; refers to any information, data, or
                  material that you submit to the Service, including prompts,
                  preferences, and any modifications to generated content.
                </p>
                <p className="mb-4">
                  You retain ownership of your User Content, but grant us a
                  worldwide, royalty-free license to use, reproduce, modify, and
                  display your User Content to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Provide and improve the Service</li>
                  <li>Develop and train our AI systems</li>
                  <li>Analyze usage patterns</li>
                  <li>Enforce these Terms</li>
                </ul>
                <p>
                  You are solely responsible for your User Content and the
                  consequences of sharing it.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  6. Generated Content
                </h2>{" "}
                <p className="mb-4">
                  &quot;Generated Content&quot; refers to the social media
                  posts, captions, and other content produced by our AI based on
                  your inputs.
                </p>
                <p className="mb-4">
                  While we provide you the right to use and modify Generated
                  Content, you acknowledge that:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    We cannot guarantee the uniqueness, accuracy, or
                    appropriateness of Generated Content
                  </li>
                  <li>
                    You are responsible for reviewing and editing Generated
                    Content before publishing
                  </li>
                  <li>
                    You are responsible for ensuring Generated Content complies
                    with the terms and policies of the platforms where you
                    publish it
                  </li>
                </ul>
                <p>
                  We reserve the right to improve our algorithms using
                  anonymized patterns from Generated Content.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  7. Prohibited Uses
                </h2>
                <p className="mb-4">You agree not to use the Service to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    Generate content that is illegal, defamatory, harmful,
                    abusive, threatening, or otherwise objectionable
                  </li>
                  <li>
                    Generate content that infringes on intellectual property
                    rights
                  </li>
                  <li>Create misleading or deceptive content</li>
                  <li>Attempt to bypass any usage limits or restrictions</li>
                  <li>
                    Reverse engineer, decompile, or attempt to extract the
                    source code of our Service
                  </li>
                  <li>
                    Use automated scripts to access or interact with the Service
                  </li>
                  <li>
                    Interfere with or disrupt the operation of the Service
                  </li>
                </ul>
                <p>
                  Violation of these prohibitions may result in immediate
                  termination of your account.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  8. Intellectual Property Rights
                </h2>
                <p className="mb-4">
                  All intellectual property rights in the Service, including but
                  not limited to software, algorithms, logos, and design, are
                  owned by SocialGen or its licensors.
                </p>
                <p>
                  Nothing in these Terms grants you any right to use our
                  intellectual property for any purpose other than accessing and
                  using the Service as permitted by these Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  9. Limitation of Liability
                </h2>
                <p className="mb-4">
                  To the maximum extent permitted by law, SocialGen shall not be
                  liable for any indirect, incidental, special, consequential,
                  or punitive damages, including but not limited to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Loss of profits, data, use, or goodwill</li>
                  <li>Business interruption</li>
                  <li>Personal or property damage</li>
                  <li>
                    Any other damages or losses arising out of your use of the
                    Service
                  </li>
                </ul>
                <p>
                  Our total liability for all claims related to the Service
                  shall not exceed the amount paid by you for the Service during
                  the 12 months preceding the event giving rise to the
                  liability.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
                <p className="mb-4">
                  We may terminate or suspend your access to the Service
                  immediately, without prior notice or liability, for any
                  reason, including if you breach these Terms.
                </p>
                <p>
                  Upon termination, your right to use the Service will
                  immediately cease. All provisions of these Terms that by their
                  nature should survive termination shall survive, including
                  ownership provisions, warranty disclaimers, and limitations of
                  liability.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  11. Changes to Terms
                </h2>
                <p>
                  We may update these Terms from time to time. If we make
                  material changes, we will notify you through the Service or by
                  email. Your continued use of the Service after such notice
                  constitutes your acceptance of the revised Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us
                  at:
                </p>
                <p className="mt-4">
                  <strong>Email:</strong> legal@socialgen.example.com
                  <br />
                  <strong>Address:</strong> SocialGen Headquarters, 123 AI
                  Avenue, Digital City, DC 12345
                </p>{" "}
              </section>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;

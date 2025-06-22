import React, { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "SocialGen - Contact Us",
  description: "Get in touch with the SocialGen team for support or inquiries",
};

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions or need assistance? We&apos;re here to help!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Email
              </h3>
              <p className="text-muted-foreground mb-3">
                For general inquiries and support
              </p>
              <a
                href="mailto:support@socialgen.example.com"
                className="text-primary font-medium hover:underline"
              >
                support@socialgen.example.com
              </a>
            </Card>{" "}
            <Card className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Live Chat
              </h3>
              <p className="text-muted-foreground mb-3">
                Available Monday to Friday 9AM - 5PM EST
              </p>
              <button className="text-primary font-medium hover:underline">
                Start Chat
              </button>
            </Card>
            <Card className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Knowledge Base
              </h3>
              <p className="text-muted-foreground mb-3">
                Browse our documentation and FAQ
              </p>
              <a href="#" className="text-primary font-medium hover:underline">
                Visit Knowledge Base
              </a>
            </Card>
          </div>

          <Card className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Send Us a Message
            </h2>
            <Suspense
              fallback={
                <div className="text-muted-foreground">
                  Loading contact form...
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </Card>

          <div>
            <h2 className="text-2xl font-bold mb-8 text-center text-foreground">
              Our Location
            </h2>
            <Card>
              <div className="aspect-w-16 aspect-h-9 w-full h-80 bg-muted rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <p className="font-medium">SocialGen Headquarters</p>
                    <p className="text-sm">
                      123 AI Avenue, Digital City, DC 12345
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

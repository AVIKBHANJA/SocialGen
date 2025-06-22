import React, { Suspense } from "react";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "SocialGen - Contact Us",
  description: "Get in touch with the SocialGen team for support or inquiries",
};

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>{" "}
        <p className="text-xl text-gray-600 mb-12 text-center">
          Have questions or need assistance? We&apos;re here to help!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600 mb-3">
              For general inquiries and support
            </p>
            <a
              href="mailto:support@socialgen.example.com"
              className="text-blue-600 font-medium hover:text-blue-700"
            >
              support@socialgen.example.com
            </a>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-3">
              Available Monday to Friday 9AM - 5PM EST
            </p>
            <button className="text-blue-600 font-medium hover:text-blue-700">
              Start Chat
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Knowledge Base</h3>
            <p className="text-gray-600 mb-3">
              Browse our documentation and FAQ
            </p>
            <a
              href="#"
              className="text-blue-600 font-medium hover:text-blue-700"
            >
              Visit Knowledge Base
            </a>
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md">
          {" "}
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>{" "}
          {/* We're importing the ContactForm client component */}
          <Suspense fallback={<div>Loading contact form...</div>}>
            <ContactForm />
          </Suspense>
        </div>
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Location</h2>
          <div className="aspect-w-16 aspect-h-9 w-full h-80 bg-gray-200 rounded-xl overflow-hidden">
            {/* Replace with an actual map or image */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <p>
                Map placeholder - SocialGen Headquarters
                <br />
                123 AI Avenue, Digital City, DC 12345
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

const ContactForm = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: searchParams.get("subject") || "",
    message: "",
    newsletter: false,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // In a real application, you would send this data to your API
      console.log("Form submitted:", formData);

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        newsletter: false,
      });

      // Show success message
      alert("Thank you for your message! We'll get back to you soon.");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error sending your message. Please try again.");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="How can we help you?"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          placeholder="Please describe your question or issue in detail..."
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="flex items-center">
        <input
          id="newsletter"
          name="newsletter"
          type="checkbox"
          checked={formData.newsletter}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
          htmlFor="newsletter"
          className="ml-2 block text-sm text-gray-700"
        >
          Subscribe to our newsletter for updates and tips
        </label>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;

"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";

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
            className="block text-sm font-medium text-foreground mb-1"
          >
            Your Name
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Email Address
          </label>
          <Input
            type="email"
            id="email"
            name="email"
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
          className="block text-sm font-medium text-foreground mb-1"
        >
          Subject
        </label>
        <Input
          type="text"
          id="subject"
          name="subject"
          placeholder="How can we help you?"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Message
        </label>{" "}
        <TextArea
          id="message"
          placeholder="Please describe your question or issue in detail..."
          value={formData.message}
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              message: e.target.value,
            }));
          }}
          required
          rows={6}
        />
      </div>

      <div className="flex items-center">
        <input
          id="newsletter"
          name="newsletter"
          type="checkbox"
          checked={formData.newsletter}
          onChange={handleChange}
          className="h-4 w-4 text-primary focus:ring-primary border-input rounded"
        />
        <label
          htmlFor="newsletter"
          className="ml-2 block text-sm text-foreground"
        >
          Subscribe to our newsletter for updates and tips
        </label>
      </div>

      <Button type="submit" className="w-full md:w-auto" size="lg">
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;

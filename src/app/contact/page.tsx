// src/app/contact/page.tsx
"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export const metadata = {
  title: "Contact | HJ Tools Hub",
  description: "Contact the HJ Tools Hub team for inquiries or support.",
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We’ll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
        Contact Us
      </h1>

      <p className="text-center mb-8 text-gray-600">
        Have a suggestion or issue? We’d love to hear from you!
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 border border-gray-200 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium mb-2">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Your Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg shadow hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
          <span>Send Message</span>
        </button>
      </form>

      <div className="text-center mt-10 text-gray-600">
        <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-500" />
        support@hjtools.com
      </div>
    </main>
  );
}

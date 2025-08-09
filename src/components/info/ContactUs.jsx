import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-white text-black min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="text-gray-700 leading-relaxed">
          For inquiries or support, email us at{" "}
          <a
            href="mailto:support@example.com"
            className="text-blue-500 underline"
          >
            support@example.com
          </a>{" "}
          or call us at +91 98765 43210.
        </p>
      </div>
    </div>
  );
};

export default ContactUs;

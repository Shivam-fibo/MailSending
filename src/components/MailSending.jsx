import React, { useState } from 'react';
import { toast } from 'react-toastify';

const MailForm = () => {
  const [fromEmail, setFromEmail] = useState('');
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user?.id) {
        toast.error("User not found, please login again.");
        return;
      }

      const recipientArray = recipients
        .split(/\s+/)
        .map(email => email.trim())
        .filter(email => email);

      if (recipientArray.length === 0) {
        toast.error("Please enter at least one recipient email.");
        return;
      }

      const response = await fetch('http://localhost:5000/api/mail/send', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromEmail, subject, recipients: recipientArray, message, userId: user.id
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFromEmail('');
        setRecipients('');
        setMessage('');
        setSubject('');
        toast.success("Mail sent successfully");
      } else {
        toast.error(result.error || "Failed to send mail");
      }

    } catch (error) {
      console.error("Error sending mail:", error);
      toast.error("Something went wrong while sending the mail");
    }
  };

  return (
    <form onSubmit={handleSend} className="bg-white p-6 rounded-xl shadow w-full max-w-sm flex flex-col ">
      <h2 className="text-2xl font-bold mb-4 text-center">Send Email</h2>

      <input
        type="email"
        placeholder="Your Email"
        value={fromEmail}
        onChange={(e) => setFromEmail(e.target.value)}
        className="w-full p-3 mb-4 border rounded-xl"
      />

      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-3 mb-4 border rounded-xl"
      />

      <textarea
        placeholder="Recipients (space/newline separated)"
        value={recipients}
        onChange={(e) => setRecipients(e.target.value)}
        className="w-full p-3 mb-4 border rounded-xl h-32"
      />

      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-3 mb-4 border rounded-xl h-32"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl"
      >
        Send
      </button>
    </form>
  );
};

export default MailForm;

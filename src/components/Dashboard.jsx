import React, { useState } from 'react';
import { toast } from 'react-toastify';
const Dashboard = () => {
  const [fromEmail, setFromEmail] = useState('');
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');


  const handleSend = async (e) => {
  e.preventDefault();

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("User not found, please login again.");
      return;
    }

    const recipientArray = recipients
      .split(/\s+/)
      .map(email => email.trim())
      .filter(email => email.length > 0);

    if (recipientArray.length === 0) {
      toast.error("Please enter at least one recipient email.");
      return;
    }

    const response = await fetch('http://localhost:5000/api/mail/send', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fromEmail,
        subject,
        recipients: recipientArray,
        message,
        userId: user.id
      }),
    });

    const result = await response.json();
    console.log('Response:', result);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Send Email</h2>

        <input
          type="email"
          placeholder="Your Email"
          value={fromEmail}
          onChange={(e) => setFromEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="Enter recipient emails separated by spaces or new lines"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSend}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

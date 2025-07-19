import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [fromEmail, setFromEmail] = useState('');
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);

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

      const response = await fetch('https://mail-sending-backend.vercel.app/api/mail/send', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromEmail,
          amount:subject,
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
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md relative">

        {/* Plan label & upgrade */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className="text-sm text-white bg-green-500 px-2 py-1 rounded-full">Free Plan</span>
          <button
            onClick={() => setShowUpgradePopup(true)}
            className="text-sm text-blue-600 underline"
          >
            Upgrade
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center mt-6">Send Notes</h2>

        <input
          type="email"
          placeholder="Your Email"
          value={fromEmail}
          onChange={(e) => setFromEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Enter Price"
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

      {showUpgradePopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm  z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
      <h3 className="text-lg font-semibold mb-4">Upgrade Plan</h3>
      <p className="mb-6">
        Contact admin via Telegram for approval:
        <br />
        <a
          href="https://t.me/unchased"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center mt-2 text-blue-600 hover:underline"
        >
          {/* Telegram Logo */}
<img src="/images/download.png" alt="Telegram" className="w-5 h-5 mr-1" />
          @unchased
        </a>
      </p>
      <button
        onClick={() => setShowUpgradePopup(false)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default Dashboard;

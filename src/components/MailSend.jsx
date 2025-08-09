import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const MailSend = () => {
  const [emaildata, setEmailData] = useState([]);

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem("user"));
    console.log("User ID:", id);

    const FetchUserEmail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/userEmail/${id}`);
        const body = await response.json();
        console.log("API Response:", body);

        if (Array.isArray(body)) {
          setEmailData(body);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    FetchUserEmail();
  }, []);
const handleMailSend = async(item) =>{
   console.log(item)
    const response = await fetch('http://localhost:5000/api/mail/send', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fromEmail:item.fromEmail,
        subject: item.subject,
        recipients: item.recipients,
        message: item.message,
        userId: item.userId
      }),
    });

    const result = await response.json();
    console.log('Response:', result);
}
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 ">Mail History</h2>

      {emaildata.length === 0 ? (
        <p>No mails found.</p>
      ) : (
        [...emaildata].reverse().map((item) => (
          <div key={item._id} className="border p-3 rounded mb-3 shadow">
            <p><strong>From:</strong> {item.fromEmail}</p>
            <p><strong>To:</strong> {item.recipients.join(', ')}</p>
            <p><strong>Subject:</strong> {item.subject}</p>
            <p><strong>Message:</strong> {item.message}</p>
            <p><strong>Sent at:</strong> {new Date(item.createdAt).toLocaleString()}</p>
            <button onClick={() => handleMailSend(item)}>Send Again</button>
          </div>
        ))
      )}
    </div>
  );
};

export default MailSend;

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const History = () => {
  const [emaildata, setEmailData] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem("user"));

    const FetchUserEmail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/user/userEmail/${id}`);
        const body = await response.json();

        if (Array.isArray(body)) {
          setEmailData(body);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    FetchUserEmail();
  }, []);

  const handleMailSend = async (item) => {
    const response = await fetch('http://localhost:5000/api/v1/mail/send', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fromEmail: item.fromEmail,
        subject: item.subject,
        recipients: item.recipients,
        message: item.message,
        userId: item.userId,
      }),
    });

    const result = await response.json();
    console.log('Response:', result);
  };

  const toggleShowMore = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id], // toggle only this id
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
            Mail History
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            View and manage your sent emails
          </p>
        </div>

        {emaildata.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No emails found
            </h3>
            <p className="text-gray-600">
              Your email history will appear here once you start sending emails.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {[...emaildata].reverse().map((item) => (
              <div
                key={item._id}
                className="group bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div>
                      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        From
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 font-medium">
                        {item.fromEmail}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        To
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {expanded[item._id] ? (
                          item.recipients.join(', ')
                        ) : (
                          <>
                            {item.recipients.slice(0, 2).join(', ')}
                            {item.recipients.length > 2 && '...'}
                          </>
                        )}
                        {item.recipients.length > 2 && (
                          <button
                            onClick={() => toggleShowMore(item._id)}
                            className="ml-2 text-blue-600 text-xs"
                          >
                            {expanded[item._id] ? 'Show less' : 'Show more'}
                          </button>
                        )}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Subject
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 font-medium">
                        {item.subject}
                      </dd>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Message
                      </dt>
                      <dd className="mt-1 text-sm text-gray-700 line-clamp-3">
                        {item.message}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Sent at
                      </dt>
                      <dd className="mt-1 text-sm text-gray-600">
                        {new Date(item.createdAt).toLocaleString()}
                      </dd>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleMailSend(item)}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                    >
                      Send Again
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;

import React, { useState } from "react";
import { Context } from "../../main";
import { useContext } from "react";
import { toast } from "react-toastify";
export default function UpgradeSection() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {user, setUser} = useContext(Context)
  console.log(user)

  const userEmail = user.email;
  console.log(userEmail)

  const refreshUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/me", {
        method: 'GET',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  const loadRazorpayScript = () => {

    if(!userEmail){
        toast.error("Please Login First");
        return;
    }
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    setMessage("");

    const res = await loadRazorpayScript();
    if (!res) {
      setMessage("Razorpay SDK failed to load. Check your internet connection.");
      setLoading(false);
      return;
    }

    try {
      // Call backend to create order
      const orderRes = await fetch("http://localhost:5000/api/v1/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 500, userEmail }),
      });

      const data = await orderRes.json();
      if (!data.success) throw new Error("Failed to create Razorpay order");
      console.log(data)
      const options = {
        key: "rzp_test_K1Ri57nxmLs6wf", 
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Mail Upgrade",
        description: "Upgrade to send unlimited mails",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            // Call backend to verify payment and update user status
            const verifyRes = await fetch("http://localhost:5000/api/v1/payment/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              }),
            });

            const verifyData = await verifyRes.json();
            
            if (verifyData.success) {
              setMessage(`Payment Successful! Your account has been upgraded. Payment ID: ${response.razorpay_payment_id}`);
              toast.success("Payment verified successfully! Your account has been upgraded.");
              
              await refreshUserData();
            } else {
              setMessage("Payment verification failed. Please contact support.");
              toast.error("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            setMessage("Payment verification failed. Please contact support.");
            toast.error("Payment verification failed. Please contact support.");
          }
          console.log("Payment success:", response);
        },
        theme: { color: "#6366f1" }, // Indigo theme
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setMessage("Payment failed to start.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Upgrade Your Plan 🚀
        </h2>
        <p className="text-gray-600 text-center mb-6">
          {user?.isUpgrade ? (
            <>
              🎉 <span className="font-semibold">Congratulations!</span> You have unlimited mail sending capability.
            </>
          ) : (
            <>
              You can send up to <span className="font-semibold">25 mails</span> for free.
              Upgrade to send unlimited mails for just{" "}
              <span className="text-indigo-600 font-bold">₹500</span>.
            </>
          )}
        </p>

        <div className={`rounded-xl p-4 text-center mb-6 ${user?.isUpgrade ? 'bg-green-50' : 'bg-indigo-50'}`}>
          {user?.isUpgrade ? (
            <>
              <p className="text-lg font-semibold text-green-700">Premium Access Active</p>
              <p className="text-sm text-gray-500">You have unlimited mail sending capability</p>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold text-indigo-700">Upgrade Now</p>
              <p className="text-sm text-gray-500">One-time payment, lifetime access</p>
            </>
          )}
        </div>

        {user?.isUpgrade ? (
          <div className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-center">
            ✅ Already Upgraded
          </div>
        ) : (
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay ₹500"}
          </button>
        )}

        {message && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

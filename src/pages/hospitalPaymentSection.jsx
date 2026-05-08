import React from "react";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

const HospitalPaymentSection = () => {

  // ✅ PAYMENT SUCCESS
  const handlePaymentSuccess = async (planName, days) => {

    try {

      alert("Payment Successful!");

      const user = auth.currentUser;

      if (!user) return;

      let expiry = "No Expiry";

      // ✅ expiry calculation
      if (days !== "lifetime") {

        const date = new Date();

        date.setDate(date.getDate() + days);

        expiry = date.toDateString();
      }

      // ✅ firestore update
      await setDoc(
        doc(db, "hospitalPlans", "currentPlan"),
        {
          plan: planName.toLowerCase(),
          expiry: expiry,
          updatedAt: new Date()
        }
      )

      alert(`${planName} Activated`);

    } catch (err) {

      alert(err.message);
    }
  };

  // ✅ OPEN RAZORPAY
  const openRazorpay = (amount, planName, days) => {

    const user = auth.currentUser;

    if (!user) {

      alert("Please Login Again");

      return;
    }

    const options = {

      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: amount * 100,

      currency: "INR",

      name: "Hospital Management",

      description: planName,

      handler: async function (response) {

        console.log(response);

        await handlePaymentSuccess(planName, days);
      },

      prefill: {

        email: user.email,
      },

      theme: {

        color: "#2563eb",
      },
    };

    const razor = new window.Razorpay(options);

    razor.open();
  };

  return (

    <div>

      <h1 className="text-3xl font-bold text-center mb-10">
        Select a Plan & Pay
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* BASIC */}
        <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col">

          <h2 className="text-4xl font-bold text-center mb-8">
            Basic Plan
          </h2>

          <ul className="space-y-5 text-lg">

            <li>✅ Patient Dashboard</li>

            <li>✅ Appointment Booking</li>

            <li>✅ 50 Patients Limit</li>

            <li>❌ Pharmacy Access</li>

            <li>❌ Advanced Reports</li>

          </ul>

          <h1 className="text-5xl font-bold text-blue-600 text-center mt-auto">
            FREE
          </h1>

          <p className="text-center text-gray-500 mt-5">
            One Time Account Creation
          </p>

          <button className="w-full bg-blue-600 text-white p-4 rounded-2xl mt-auto text-xl">
            Activated
          </button>

        </div>

        {/* PREMIUM */}
        <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col">

          <h2 className="text-4xl font-bold text-center mb-8">
            Premium Plan
          </h2>

          <ul className="space-y-5 text-lg">

            <li>✅ Unlimited Patients</li>

            <li>✅ Doctor Login</li>

            <li>✅ Reports</li>

            <li>✅ Staff Management</li>

            <li>✅ Priority Support</li>

          </ul>

          <h1 className="text-5xl font-bold text-blue-600 text-center mt-auto">
            ₹399
          </h1>

          <p className="text-center text-gray-500 mt-5">
            30 Days Access
          </p>

          <button

            onClick={() => openRazorpay(399, "Premium", 30)}

            className="w-full bg-blue-600 text-white p-4 rounded-2xl mt-auto text-xl"
          >
            Buy Premium
          </button>

        </div>

        {/* LIFETIME */}
        <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col">

          <h2 className="text-4xl font-bold text-center mb-8">
            Lifetime Access
          </h2>

          <ul className="space-y-5 text-lg">

            <li>✅ Lifetime Access</li>

            <li>✅ Unlimited Patients</li>

            <li>✅ Full Reports</li>

            <li>✅ Full Hospital Access</li>

            <li>✅ Priority Support</li>

          </ul>

          <h1 className="text-5xl font-bold text-blue-600 text-center mt-auto">
            ₹1999
          </h1>

          <p className="text-center text-gray-500 mt-5">
            One Time Payment
          </p>

          <button

            onClick={() => openRazorpay(1999, "Lifetime", "lifetime")}

            className="w-full bg-blue-600 text-white p-4 rounded-2xl mt-auto text-xl"
          >
            Buy Lifetime
          </button>

        </div>

        {/* PHARMACY */}
        <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col">

          <h2 className="text-4xl font-bold text-center mb-8">
            Pharmacy Plan
          </h2>

          <ul className="space-y-5 text-lg">

            <li>✅ Medicine Management</li>

            <li>✅ Invoice Reports</li>

            <li>✅ Billing System</li>

            <li>✅ Stock Management</li>

            <li>✅ Pharmacy Dashboard</li>

          </ul>

          <h1 className="text-5xl font-bold text-blue-600 text-center mt-auto">
            ₹4999
          </h1>

          <p className="text-center text-gray-500 mt-5">
            1 Year Access
          </p>

          <button

            onClick={() => openRazorpay(4999, "Pharmacy", 365)}

            className="w-full bg-blue-600 text-white p-4 rounded-2xl mt-auto text-xl"
          >
            Buy Pharmacy
          </button>

        </div>

      </div>

    </div>
  );
};

export default HospitalPaymentSection;
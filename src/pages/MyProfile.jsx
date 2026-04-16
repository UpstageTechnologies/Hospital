import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { collection, getDocs } from "firebase/firestore";

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const { state } = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        console.log("❌ No user");
        return;
      }

      console.log("✅ Logged user:", user.email);

      try {
        const snap = await getDocs(collection(db, "appointments"));

        let foundUser = null;

        snap.forEach((docItem) => {
          const data = docItem.data();

          console.log("DB EMAIL:", data.email);

          if (
            data.email &&
            data.email.toLowerCase().trim() ===
            user.email.toLowerCase().trim()
          ) {
            console.log("🎯 MATCH FOUND");
            foundUser = data;
          }
        });

        if (foundUser) {
          setUserData(foundUser);
        } else {
          console.log("❌ NO MATCH FOUND");
        }
      } catch (err) {
        console.log("🔥 ERROR:", err);
      }
    });

    return () => unsubscribe();
  }, []);

  // LOADING
  if (!userData) {
    return (
      <div className="p-10 text-xl font-semibold">
        Patient Profile...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-blue-600"></div>

      <div className="flex-1 p-10">
        <div className="max-w-4xl mx-auto">

          {/* PROFILE */}
          <div className="flex items-center gap-6 mb-10">
            <img
              src={assets.profile_pic}
              className="w-28 h-28 rounded-full"
              alt="profile"
            />
            <h1 className="text-3xl font-bold">
              {userData.patientName}
            </h1>
          </div>

          {/* DETAILS */}
          <div className="grid grid-cols-2 gap-6">
            <div className="border p-4 rounded">
              <p><b>Name:</b> {userData.patientName}</p>
              <p><b>Phone:</b> {userData.phone}</p>
              <p><b>Address:</b> {userData.address}</p>
            </div>

            <div className="border p-4 rounded">
              <p><b>Email:</b> {userData.email}</p>
              <p><b>Doctor:</b> {userData.doctorName}</p>
              <p><b>Date:</b> {userData.date}</p>
              <p><b>Time:</b> {userData.time}</p>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="mt-10 border rounded p-6">
            <h2 className="text-lg font-bold mb-4">Payment Details</h2>
            <p><b>Paid Amount:</b> ₹600</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyProfile
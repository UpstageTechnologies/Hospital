import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const StaffDashboard = () => {

  const navigate = useNavigate();

  const [staffData, setStaffData] = useState(null);

  useEffect(() => {

    const fetchStaff = async () => {

      const staffId =
      localStorage.getItem("staffId");

      if (!staffId) return;

      const ref =
      doc(db, "staffs", staffId);

      const snap =
      await getDoc(ref);

      if (snap.exists()) {

        setStaffData(snap.data());

      }

    };

    fetchStaff();

  }, []);

  return (
    <>

      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <div className="hidden md:block w-72 bg-blue-600 text-white pt-10 px-6">

          <div
            onClick={() => navigate("/staff-dashboard")}
            className="text-3xl mb-10 cursor-pointer"
          >
            Home
          </div>

          <div
            onClick={() => navigate("/staff-profile")}
            className="text-2xl mb-6 cursor-pointer"
          >
            Profile
          </div>

        </div>

        {/* MAIN */}
        <div className="flex-1 bg-gray-50 p-6 md:p-10 pb-24">

          <h1 className="text-5xl font-bold mb-10">
            Staff Dashboard
          </h1>

          {staffData && (

            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl">

              <h2 className="text-3xl font-bold mb-6">
                Welcome {staffData.staffBasicInfo?.name}
              </h2>

              <div className="space-y-4 text-lg">

                <p>
                  <b>Staff ID :</b>{" "}
                  {staffData.staffOfficial?.staffId}
                </p>

                <p>
                  <b>Email :</b>{" "}
                  {staffData.staffBasicInfo?.email}
                </p>

                <p>
                  <b>Contact :</b>{" "}
                  {staffData.staffBasicInfo?.contact}
                </p>

                <p>
                  <b>Address :</b>{" "}
                  {staffData.staffBasicInfo?.address}
                </p>

                <p>
                  <b>Qualification :</b>{" "}
                  {staffData.staffDesignation?.qualification}
                </p>

              </div>

            </div>

          )}

        </div>
      </div>

      {/* MOBILE MENU */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-3">

        <button
          onClick={() => navigate("/staff-dashboard")}
        >
          🏠
          <p>Home</p>
        </button>

        <button
          onClick={() => navigate("/staff-profile")}
        >
          👤
          <p>Profile</p>
        </button>

      </div>
    </>
  );
};

export default StaffDashboard;
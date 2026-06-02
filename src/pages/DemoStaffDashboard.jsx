import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const DemoStaffDashboard = () => {

  const navigate = useNavigate();
  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [menu, setMenu] = useState("home");

  useEffect(() => {
    const fetchStaffs = async () => {
      const querySnapshot = await getDocs(collection(db, "staffs"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStaffs(data);
    };

    fetchStaffs();
  }, []);

  return (
    <>
      <DashboardNavbar />

      <div className="flex min-h-screen">

        {/* Sidebar */}
        <div className="hidden md:block w-72 bg-blue-600 text-white pt-10 px-6">

<div
  onClick={()=>setMenu("home")}
  className="text-3xl mb-10 cursor-pointer"
>
  Home
</div>

<div
  onClick={()=>setMenu("profile")}
  className="text-3xl mb-10 cursor-pointer"
>
  Profile
</div>

</div>

        {/* Main */}
        <div className="flex-1 bg-gray-50 p-6 md:p-10 pb-24">

        {menu==="home" && (

<>
  <h1 className="text-5xl font-bold mb-10">
    Staff List
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

    {staffs.map((staff) => (
      <div
        key={staff.id}
        onClick={() => setSelectedStaff(staff)}
        className="bg-white p-6 rounded-xl shadow cursor-pointer hover:scale-105 transition"
      >
        <h2 className="text-xl font-bold">
          {staff.staffBasicInfo?.email || "No Name"}
        </h2>

        <p className="text-gray-500 mt-2">
          ID: {staff.staffAccount?.staffId}
        </p>
      </div>
    ))}

  </div>
</>

)}

{menu==="profile" && (

<div>

<h1 className="text-5xl font-bold mb-8">
  Staff Profile
</h1>

<div className="bg-white rounded-2xl shadow p-8 max-w-4xl">

  <div className="flex items-center gap-6 mb-8">

    <div className="
      w-24 h-24
      rounded-full
      bg-blue-600
      text-white
      flex
      items-center
      justify-center
      text-3xl
      font-bold
    ">
      👨‍⚕️
    </div>

    <div>
      <h2 className="text-3xl font-bold">
        Hospital Staff
      </h2>

      <p className="text-gray-500">
        Staff Management Department
      </p>
    </div>

  </div>

  <div className="grid md:grid-cols-2 gap-6">

    <div className="border rounded-xl p-5">
      <h3 className="font-bold text-xl mb-3">
        Staff Overview
      </h3>

      <p>Total Staff : {staffs.length}</p>
      <p>Department : Administration</p>
      <p>Status : Active</p>
    </div>

    <div className="border rounded-xl p-5">
      <h3 className="font-bold text-xl mb-3">
        Hospital Information
      </h3>

      <p>Hospital : Demo Hospital</p>
      <p>Location : Tamil Nadu</p>
      <p>Support : 24/7 Available</p>
    </div>

    <div className="border rounded-xl p-5">
      <h3 className="font-bold text-xl mb-3">
        Responsibilities
      </h3>

      <ul className="list-disc ml-5">
        <li>Patient Registration</li>
        <li>Appointment Support</li>
        <li>Medical Records</li>
        <li>Doctor Coordination</li>
      </ul>
    </div>

    <div className="border rounded-xl p-5">
      <h3 className="font-bold text-xl mb-3">
        Working Hours
      </h3>

      <p>Monday - Saturday</p>
      <p>09:00 AM - 06:00 PM</p>
    </div>

  </div>

</div>

</div>

)}
        </div>
      </div>

      {/* POPUP MODAL */}
      {selectedStaff && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-6 w-[350px] shadow-xl">

            <h2 className="text-xl font-bold mb-4">
              Staff Details
            </h2>

            <p><b>ID:</b> {selectedStaff.staffAccount?.staffId}</p>
            <p><b>Email:</b> {selectedStaff.staffBasicInfo?.email}</p>
            <p><b>Age:</b> {selectedStaff.staffBasicInfo?.age}</p>
            <p><b>Address:</b> {selectedStaff.staffBasicInfo?.address}</p>
            <p><b>Contact:</b> {selectedStaff.staffBasicInfo?.contact}</p>

            <button
              onClick={() => setSelectedStaff(null)}
              className="mt-5 w-full bg-blue-600 text-white py-2 rounded"
            >
              Close
            </button>

          </div>
        </div>
      )}
      {/* MOBILE + TAB BOTTOM MENU */}
<div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-3">

<button onClick={()=>setMenu("home")}>
  🏠
  <p>Home</p>
</button>

<button onClick={()=>setMenu("profile")}>
  👤
  <p>Profile</p>
</button>

</div>

    </>
  );
};

export default DemoStaffDashboard;
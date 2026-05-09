import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { assets } from "../assets/assets";

const DoctorTopbar = ({ doctorData }) => {

const navigate = useNavigate();

const [showProfileMenu,setShowProfileMenu] =
useState(false);

return (

<div className="flex justify-end items-center p-4 border-b bg-white">

<div className="flex items-center gap-3 relative">

<p className="font-semibold">
  {doctorData?.name}
</p>

<img
onClick={() => setShowProfileMenu(!showProfileMenu)}
src={doctorData?.image || assets.profile_pic}
className="w-10 h-10 rounded-full cursor-pointer object-cover border"
/>

{showProfileMenu && (

<div className="absolute right-0 top-14 bg-white shadow-lg rounded-xl p-4 w-52 z-50">

<p
onClick={() => navigate("/doctor-profile")}
className="cursor-pointer hover:text-blue-600 mb-3"
>
My Profile
</p>

<p
onClick={() => navigate("/doctor-appointments")}
className="cursor-pointer hover:text-blue-600 mb-3"
>
My Appointment
</p>

<p
onClick={() => navigate("/doctor-settings")}
className="cursor-pointer hover:text-blue-600 mb-3"
>
Settings
</p>

<p
onClick={() => {

auth.signOut();

navigate("/doctor-login");

}}
className="cursor-pointer text-red-500"
>
Logout
</p>

</div>

)}

</div>

</div>

);

};

export default DoctorTopbar;
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { assets } from "../assets/assets";



const DashboardNavbar = () => {

const navigate = useNavigate();
const location = useLocation();
const [openMenu, setOpenMenu] = useState(false);
const active = (path)=>
location.pathname===path ? "text-blue-600 font-bold" : "";
const [showProfileMenu, setShowProfileMenu] = useState(false);
const [showLogoutPopup, setShowLogoutPopup] = useState(false);


const isLogged = (role) => {
  return localStorage.getItem(role + "Login") === "true";
};

// demo user image (login black iconக்கு பதிலா profile pic)
const userImage = assets.profile_pic;

return(
<>
{/* DESKTOP VIEW - untouched */}
<div className="hidden md:block w-full bg-white border-b shadow-sm">

<div className="max-w-7xl mx-auto relative flex items-center justify-center h-20 px-8">

<div className="absolute left-0 flex items-center gap-4">

  <button
    onClick={() => navigate("/master-login",{state:{demo:true}})}
    className="!w-9 !h-9 rounded-full bg-blue-600 flex items-center justify-center shadow-md"
  >
    <span className="text-white text-lg relative -top-[2px]">
      ←
    </span>
  </button>

  <p
    onClick={() => navigate("/master-login",{state:{demo:true}})}
    className="text-xl font-semibold cursor-pointer"
  >
    Demo
  </p>

</div>

<div className="flex items-center justify-center gap-14 text-base font-medium mx-auto">

<button
className={active("/master-login")}
onClick={()=>{
  if(isLogged("master")){
    navigate("/demomasterdashboard")
  }else{
    navigate("/master-login",{state:{demo:true}})
  }
}}
>
MasterLogin
</button>

<button
className={active("/admin-login")}
onClick={()=>{
  if(isLogged("admin")){
    navigate("/demoadmindashboard")
  }else{
    navigate("/admin-login",{state:{demo:true}})
  }
}}
>
AdminLogin
</button>

<button
className={active("/doctor-login")}
onClick={()=>{
  if(isLogged("doctor")){
    navigate("/demodoctordashboard")
  }else{
    navigate("/doctor-login",{state:{demo:true}})
  }
}}
>
DoctorLogin
</button>

<button
className={active("/staff-login")}
onClick={()=>{
  if(isLogged("staff")){
    navigate("/demostaffdashboard")
  }else{
    navigate("/staff-login",{state:{demo:true}})
  }
}}
>
StaffLogin
</button>

<button
className={active("/patient-login")}
onClick={()=>{
  if(isLogged("patient")){
    navigate("/demopatientdashboard")
  }else{
    navigate("/patient-login",{state:{demo:true}})
  }
}}
>
PatientLogin
</button>

<button
className={active("/pharmasi-login")}
onClick={()=>{
  if(isLogged("pharmasi")){
    navigate("/demopharmasidashboard")
  }else{
    navigate("/pharmasi-login",{state:{demo:true}})
  }
}}
>
PharmasiLogin
</button>

<div onClick={() => setShowProfileMenu(!showProfileMenu)}
className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2 cursor-pointer"
>

<img src={userImage}alt="" className="w-10 h-10 rounded-full object-cover border"/>

{showProfileMenu && (
<div className="absolute right-0 top-14 bg-white shadow-xl rounded-xl p-4 z-50">

<div className="flex flex-col gap-4 min-w-[180px]">

<p onClick={()=>navigate("/demomyprofile")} className="cursor-pointer hover:text-blue-600">
My Profile
</p>

<p onClick={()=>navigate("/demomyappointment")}className="cursor-pointer hover:text-blue-600">
My Appointment
</p>

<p onClick={()=>setShowLogoutPopup(true)} className="cursor-pointer hover:text-red-600">
Logout
</p>

</div>

</div>
)}

</div>

</div>


</div>
</div>


{/* MOBILE + TAB ONLY */}
<div className="md:hidden w-full bg-white border-b shadow-sm relative">

<div className="flex items-center justify-between px-6 py-5">

<div className="flex items-center gap-4">


<button onClick={() => navigate("/master-login",{state:{demo:true}})}
className="!w-9 !h-9 sm:!w-10 sm:!h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-md ">
<span className="text-white text-lg sm:text-xl md:text-2xl relative -top-[2px]">
  ←
</span>
</button>
<p  onClick={() => navigate("/master-login",{state:{demo:true}})} className="text-xl font-semibold cursor-pointer" >
Demo
</p>


</div>

<div className="flex items-center gap-4">

{/* mobile profile image */}
<div
onClick={() => setShowProfileMenu(!showProfileMenu)}
className="relative cursor-pointer"
>
<img
src={userImage}
alt=""
className="w-10 h-10 rounded-full object-cover border"
/>

{showProfileMenu && (
<div className="absolute right-0 top-14 bg-white shadow-xl rounded-xl p-4 z-50">

<div className="flex flex-col gap-4 min-w-[170px]">

<p
onClick={()=>navigate("/demomyprofile")}
className="cursor-pointer hover:text-blue-600"
>
My Profile
</p>

<p
onClick={()=>navigate("/demomyappointment")}
className="cursor-pointer hover:text-blue-600"
>
My Appointment
</p>

<p
onClick={()=>setShowLogoutPopup(true)}
className="cursor-pointer hover:text-red-600"
>
Logout
</p>

</div>

</div>
)}

</div>

{/* existing hamburger */}
<button
onClick={()=>setOpenMenu(!openMenu)}
className="text-3xl font-semibold"
>
{openMenu ? "✕" : "☰"}
</button>

</div>

</div>


{openMenu && (
<div
className="
absolute
right-4
top-[90px]
w-[320px]
bg-white
rounded-[38px]
shadow-2xl
z-50
py-8
px-10
"
>

<div className="flex flex-col gap-8">

<div
onClick={()=>{
  if(isLogged("master")){
    navigate("/demomasterdashboard")
  }else{
    navigate("/master-login",{state:{demo:true}})
  }

  setOpenMenu(false);
}}
className="text-[32px] font-semibold leading-none cursor-pointer"
>
MasterLogin
</div>

<div
onClick={()=>{
  if(isLogged("admin")){
    navigate("/demoadmindashboard")
  }else{
    navigate("/admin-login",{state:{demo:true}})
  }

  setOpenMenu(false);
}}
className="text-[32px] font-semibold leading-none cursor-pointer"
>
AdminLogin
</div>

<div
onClick={()=>{
  if(isLogged("doctor")){
    navigate("/demodoctordashboard")
  }else{
    navigate("/doctor-login",{state:{demo:true}})
  }

  setOpenMenu(false);
}}
className="text-[32px] font-semibold leading-none cursor-pointer"
>
DoctorLogin
</div>

<div
onClick={()=>{
  if(isLogged("staff")){
    navigate("/demostaffdashboard")
  }else{
    navigate("/staff-login",{state:{demo:true}})
  }

  setOpenMenu(false);
}}
className="text-[32px] font-semibold leading-none cursor-pointer"
>
StaffLogin
</div>

<div
onClick={()=>{
  if(isLogged("patient")){
    navigate("/demopatientdashboard")
  }else{
    navigate("/patient-login",{state:{demo:true}})
  }

  setOpenMenu(false);
}}
className="text-[32px] font-semibold leading-none cursor-pointer"
>
PatientLogin
</div>

<div
onClick={()=>{
  if(isLogged("pharmasi")){
    navigate("/demopharmasidashboard")
  }else{
    navigate("/pharmasi-login",{state:{demo:true}})
  }

  setOpenMenu(false);
}}
className="text-[32px] font-semibold leading-none cursor-pointer"
>
PharmasiLogin
</div>

</div>
</div>
)}

</div>

{showLogoutPopup && (
<div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

<div className="bg-white rounded-xl p-6 shadow-xl w-80 text-center">

<h2 className="text-lg font-semibold mb-5">
Are you sure want to logout?
</h2>

<div className="flex justify-center gap-4">

<button
onClick={()=>setShowLogoutPopup(false)}
className="px-4 py-2 bg-gray-300 rounded"
>
Cancel
</button>

<button
onClick={()=>{
auth.signOut();
localStorage.clear();
navigate("/");
}}
className="px-4 py-2 bg-red-500 text-white rounded"
>
Logout
</button>

</div>

</div>

</div>
)}

</>

)

}

export default DashboardNavbar;
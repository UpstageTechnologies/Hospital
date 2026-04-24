import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DashboardNavbar = () => {

const navigate = useNavigate();
const location = useLocation();
const [openMenu, setOpenMenu] = useState(false);
const active = (path)=>
location.pathname===path ? "text-blue-600 font-bold" : "";

return(

    

<>
{/* DESKTOP VIEW - untouched */}
<div className="hidden md:block w-full bg-white border-b shadow-sm">

<div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-8">

<h1
onClick={()=>navigate("/master-login")}
className="text-2xl font-bold cursor-pointer"
>
Demo
</h1>

<div className="flex items-center gap-12 text-base font-medium">

<button
className={active("/master-login")}
onClick={()=>navigate("/master-login",{state:{demo:true}})}
>
MasterLogin
</button>

<button
className={active("/admin-login")}
onClick={()=>navigate("/admin-login",{state:{demo:true}})}
>
AdminLogin
</button>

<button
className={active("/doctor-login")}
onClick={()=>navigate("/doctor-login",{state:{demo:true}})}
>
DoctorLogin
</button>

<button
className={active("/staff-login")}
onClick={()=>navigate("/staff-login",{state:{demo:true}})}
>
StaffLogin
</button>

<button
className={active("/patient-login")}
onClick={()=>navigate("/patient-login",{state:{demo:true}})}
>
PatientLogin
</button>

</div>

<span
onClick={()=>navigate("/demohome")}
className="cursor-pointer text-base font-medium"
>
Home
</span>

</div>
</div>


{/* MOBILE + TAB ONLY */}
<div className="md:hidden w-full bg-white border-b shadow-sm relative">

<div className="flex items-center justify-between px-6 py-5">

<h2
onClick={()=>navigate("/master-login")}
className="text-2xl font-bold cursor-pointer"
>
Demo
</h2>

<button
onClick={()=>setOpenMenu(!openMenu)}
className="text-3xl font-semibold"
>
{openMenu ? "✕" : "☰"}
</button>

</div>


{openMenu && (
<div className="
absolute
right-4
top-[90px]
w-[320px]
bg-white
rounded-3xl
shadow-2xl
z-50
py-8
px-10
">

<div
onClick={()=>{
navigate("/demohome");
setOpenMenu(false);
}}
className="text-2xl font-medium mb-10 cursor-pointer"
>
Home
</div>

<div
onClick={()=>{
navigate("/master-login",{state:{demo:true}});
setOpenMenu(false);
}}
className="text-2xl font-medium mb-10 cursor-pointer"
>
MasterLogin
</div>

<div
onClick={()=>{
navigate("/admin-login",{state:{demo:true}});
setOpenMenu(false);
}}
className="text-2xl font-medium mb-10 cursor-pointer"
>
AdminLogin
</div>

<div
onClick={()=>{
navigate("/doctor-login",{state:{demo:true}});
setOpenMenu(false);
}}
className="text-2xl font-medium mb-10 cursor-pointer"
>
DoctorLogin
</div>

<div
onClick={()=>{
navigate("/staff-login",{state:{demo:true}});
setOpenMenu(false);
}}
className="text-2xl font-medium mb-10 cursor-pointer"
>
StaffLogin
</div>

<div
onClick={()=>{
navigate("/patient-login",{state:{demo:true}});
setOpenMenu(false);
}}
className="text-2xl font-medium cursor-pointer"
>
PatientLogin
</div>

</div>
)}

</div>

</>

)

}

export default DashboardNavbar;
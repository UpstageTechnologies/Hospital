import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PharmasiLogin = () => {

const [pharmasiId,setPharmasiId] = useState("");
const [password,setPassword] = useState("");
const [loading,setLoading] = useState(false);

const navigate = useNavigate();

const location = useLocation();
const isDemo = location.state?.demo === true;
const [openMenu,setOpenMenu] = useState(false);

useEffect(() => {

    if(isDemo){
    setPharmasiId("demopharmasi002");
    setPassword("demo002");
    }
    
    }, [isDemo]);

    const handleLogin = () => {

      if (
        pharmasiId === "demopharmasi002" &&
        password === "demo002"
      ) {
        localStorage.setItem("pharmasiLogin", "true");
        navigate("/demopharmasidashboard");
      } else {
        alert("Invalid Pharmasi ID or Password");
      }
    
    };


return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200">
    
    {isDemo && (
    <>
    <div className="hidden md:block w-full bg-white border-b shadow-sm">
    <div className="max-w-7xl mx-auto relative flex items-center h-20 px-8">
    
    <div className="flex items-center gap-4">
    <button
    onClick={()=>navigate("/demohome")}
    className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center"
    >
<span className="text-white text-lg sm:text-xl md:text-2xl relative -top-[2px]">
  ←
</span>
    </button>
    
    <p
    onClick={()=>navigate("/demohome")}
    className="text-xl font-semibold cursor-pointer"
    >
    Demo
    </p>
    </div>
    
    <ul className="absolute left-1/2 -translate-x-1/2 flex items-center gap-12 text-base font-medium">
    <li onClick={()=>navigate("/master-login",{state:{demo:true}})}>MasterLogin</li>
    <li onClick={()=>navigate("/admin-login",{state:{demo:true}})}>AdminLogin</li>
    <li onClick={()=>navigate("/doctor-login",{state:{demo:true}})}>DoctorLogin</li>
    <li onClick={()=>navigate("/staff-login",{state:{demo:true}})}>StaffLogin</li>
    <li onClick={()=>navigate("/patient-login",{state:{demo:true}})}>PatientLogin</li>
    <li onClick={()=>{
  if(localStorage.getItem("pharmasiLogin")==="true"){
    navigate("/demopharmasidashboard")
  }else{
    navigate("/pharmasi-login",{state:{demo:true}})
  }
}}>
PharmasiLogin
</li>
    </ul>
    
    </div>
    </div>

    <div className="md:hidden w-full bg-white border-b shadow-sm relative">

  {/* Top Bar */}
  <div className="flex items-center justify-between px-6 py-5">
  <div className="flex items-center gap-4">

  <button onClick={() => navigate("/demohome")}
className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
<span className="text-white text-lg sm:text-xl md:text-2xl relative -top-[2px]">
  ←
</span>
</button>
<p  onClick={() => navigate("/demohome")} className="text-xl font-semibold cursor-pointer" >
Demo
</p>


</div>

    <button
      onClick={() => setOpenMenu(!openMenu)}
      className="text-3xl font-semibold"
    >
      {openMenu ? "✕" : "☰"}
    </button>
  </div>


  {/* Dropdown Card Menu */}
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
navigate('/master-login',{state:{demo:true}});
setOpenMenu(false);
}}
className="text-[32px] font-semibold leading-none cursor-pointer"
>
MasterLogin
</div>

<div
onClick={()=>{
navigate("/admin-login",{state:{demo:true}});
setOpenMenu(false);
}}
className="text-[32px] font-semibold leading-none cursor-pointer"
>
AdminLogin
</div>

<div
onClick={()=>{
navigate("/doctor-login",{state:{demo:true}});
setOpenMenu(false);
}}
className="text-[32px] font-semibold leading-none cursor-pointer"
>
DoctorLogin
</div>

<div
onClick={()=>{
navigate("/staff-login",{state:{demo:true}});
setOpenMenu(false);
}}
className="text-[32px] font-semibold leading-none cursor-pointer"
>
StaffLogin
</div>

<div
onClick={()=>{
navigate("/patient-login",{state:{demo:true}});
setOpenMenu(false);
}}
className="text-[32px] font-semibold leading-none cursor-pointer"
>
PatientLogin
</div>

<div
onClick={()=>{
  if(localStorage.getItem("pharmasiLogin")==="true"){
    navigate("/demopharmasidashboard")
  }else{
    navigate("/pharmasi-login",{state:{demo:true}})
  }
}}
className="text-[32px] font-semibold leading-none cursor-pointer"
>
PharmasiLogin
</div>

</div>
</div>
)}

</div>
    </>
    )}
    
    {/* EXACT SAME CENTER ALIGNMENT LIKE PATIENT LOGIN */}
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4">
    
    <form
    onSubmit={(e)=>e.preventDefault()}
    className="
    backdrop-blur-lg
    bg-white/60
    shadow-2xl
    border border-white/30
    rounded-2xl
    p-5
    w-full
    max-w-[320px]
    md:max-w-[320px]
    "
    >
    
    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
    Pharmasi Login
    </h1>
    
    {/* Pharmasi ID */}
    <div className="mb-3">
    <input
    type="text"
    placeholder="Enter Pharmasi ID"
    value={pharmasiId}
    onChange={(e)=>setPharmasiId(e.target.value)}
    className="
    w-full
    p-3
    rounded-lg
    border
    focus:outline-none
    focus:ring-2
    focus:ring-blue-400
    "
    />
    </div>
    
    {/* Password */}
    <div className="mb-4">
    <input
    type="password"
    placeholder="Enter Password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    className="
    w-full
    p-3
    rounded-lg
    border
    focus:outline-none
    focus:ring-2
    focus:ring-blue-400
    "
    />
    </div>
    
    {/* SAME BUTTON AS PATIENT LOGIN */}
    <button
    type="button"
    onClick={handleLogin}
    disabled={loading}
    className="
    w-full
    py-3
    rounded-lg
    bg-gradient-to-r
    from-blue-500
    to-purple-500
    text-white
    font-semibold
    hover:scale-105
    transition
    "
    >
    {loading ? "Logging in..." : "Login"}
    </button>
    
    </form>
    
    </div>
    </div>
    );

}

export default PharmasiLogin;
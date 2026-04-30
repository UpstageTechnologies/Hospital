
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const MasterLogin = () => {


  const [name, setName] = useState("");
  const [hospital, setHospital] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const isDemo = location.state?.demo === true;
  const [openMenu,setOpenMenu] = useState(false);


  useEffect(() => {
    if (isDemo) {
      setEmail("demomaster@gmail.com");
      setPassword("demomaster123");
    }
   }, [isDemo]);

  const fromRole = location.state?.fromRole === true;
  const isRegister = location.state?.isRegister === true;

  const [state, setState] = useState(isRegister ? "Register" : "Login");

  const handleLogin = async () => {

  if (
    email === "demomaster@gmail.com" &&
    password === "demomaster123"
  ){
    localStorage.setItem("masterLogin", "true");
    navigate("/demomasterdashboard");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);

    localStorage.setItem("masterLogin","true");

    alert("Master Login Success");
    navigate("/demomasterdashboard");
  } catch (err) {
    alert(err.message);
  }
};

  const handleGoogleLogin = async () => {
  try {

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(doc(db, "master", user.uid), {
      name: user.displayName,
      email: user.email,
      role: "master",
      hospital: hospital || "Default"
    }, { merge: true });

    localStorage.setItem("masterLogin", "true");

    // ✅ FIX HERE
    if (isDemo) {
      navigate("/demomasterdashboard")
    } else {
      navigate("/master-dashboard")
    }
  } catch (error) {
    alert(error.message);
  }
};

  return (
<div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200">

{isDemo && (
<>
{/* Desktop Navbar */}
<div className="hidden md:block w-full bg-white border-b shadow-sm">
<div className="max-w-7xl mx-auto relative flex items-center h-20 px-8">

<div className="absolute left-2 flex items-center gap-4">


<button onClick={() => navigate("/demohome")}
className="left-0 !w-9 !h-9 sm:!w-10 sm:!h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-md ">
  <span className="text-white text-lg sm:text-xl md:text-2xl relative -top-[2px]">
  ←
</span>
</button>
<p  onClick={() => nav("/demohome")} className="text-xl font-semibold cursor-pointer" >
Demo
</p>


</div>

<ul className="absolute left-1/2 -translate-x-1/2 flex items-center gap-12 text-base font-medium ">

  <li onClick={()=>{
    if(localStorage.getItem("masterLogin")==="true"){
      navigate("/demomasterdashboard")
    }else{
      navigate("/master-login",{state:{demo:true}})
    }
  }}>
  MasterLogin
  </li>


  <li onClick={()=>{
  if(localStorage.getItem("adminLogin")==="true"){
    navigate("/demoadmindashboard")
  }else{
    navigate("/admin-login",{state:{demo:true}})
  }
}}>
AdminLogin
</li>
<li onClick={()=>{
  if(localStorage.getItem("doctorLogin")==="true"){
    navigate("/demodoctordashboard")
  }else{
    navigate("/doctor-login",{state:{demo:true}})
  }
}}>
DoctorLogin
</li>
<li onClick={()=>{
  if(localStorage.getItem("staffLogin")==="true"){
    navigate("/demostaffdashboard")
  }else{
    navigate("/staff-login",{state:{demo:true}})
  }
}}>
StaffLogin
</li>
<li onClick={()=>{
  if(localStorage.getItem("patientLogin")==="true"){
    navigate("/demopatientdashboard")
  }else{
    navigate("/patient-login",{state:{demo:true}})
  }
}}>
PatientLogin
</li>
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



{/* Mobile + Tablet Only */}
<div className="md:hidden w-full bg-white border-b shadow-sm relative">

  {/* Top Bar */}
  <div className="flex items-center justify-between px-6 py-5">
  <div className="flex items-center gap-4">

  <button onClick={() => navigate("/demohome")}
className="left-0 !w-9 !h-9 sm:!w-10 sm:!h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-md ">
<span className="text-white text-lg sm:text-xl md:text-2xl relative -top-[2px]">
  ←
</span>
</button>
<p  onClick={() => nav("/demohome")} className="text-xl font-semibold cursor-pointer" >
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
navigate('/admin-login',{state:{demo:true}});
setOpenMenu(false);
}}
className="text-[32px] font-semibold leading-none cursor-pointer"
>
AdminLogin
</div>

<div
onClick={()=>{
navigate('/doctor-login',{state:{demo:true}});
setOpenMenu(false);
}}
className="text-[32px] font-semibold leading-none cursor-pointer"
>
DoctorLogin
</div>

<div
onClick={()=>{
navigate('/staff-login',{state:{demo:true}});
setOpenMenu(false);
}}
className="text-[32px] font-semibold leading-none cursor-pointer"
>
StaffLogin
</div>

<div
onClick={()=>{
navigate('/patient-login',{state:{demo:true}});
setOpenMenu(false);
}}
className="text-[32px] font-semibold leading-none cursor-pointer"
>
PatientLogin
</div>

<div
onClick={()=>{
navigate('/pharmasi-login',{state:{demo:true}});
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
</>
)}

<div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4">

<form onSubmit={(e)=>{
  e.preventDefault();
  handleLogin();
}}
        className="backdrop-blur-lg bg-white/60 border border-white/30 
      shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-4">
          {state === "Login" ? "Master Login" : "Master Register"}
        </h1>

        {state === "Register" && (
          <>
            <input placeholder="Full Name" value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-style" />

            <input placeholder="Hospital Name" value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              className="input-style" />

            <input placeholder="Phone" value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-style" />
          </>
        )}

        <input placeholder="Email" value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          className="input-style" />

        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-style" />

        {state === "Register" && (
          <input type="password" placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-style" />
        )}

        <button className="btn-style">
          {state === "Login" ? "Login" : "Register"}
        </button>

        <button type="button" onClick={handleGoogleLogin}
          className="google-btn">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" />
          Sign in with Google
        </button>
      </form>
      </div>
    </div>
  )
};

export default MasterLogin;
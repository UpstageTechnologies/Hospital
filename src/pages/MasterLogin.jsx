
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

  const [showSetupPopup,setShowSetupPopup] = useState(false);
const [setupStep,setSetupStep] = useState(1);

const [ownerName,setOwnerName] = useState("");
const [hospitalAddress,setHospitalAddress] = useState("");
const [hospitalAge,setHospitalAge] = useState("");

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

  const handleRegister = async () => {

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
  
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      const user = userCredential.user;
  
      await updateProfile(user, {
        displayName: name,
      });
  
      await setDoc(doc(db, "master", user.uid), {
        name,
        hospital,
        phone,
        email,
        role: "master",
      
        ownerName,
        hospitalAddress,
        hospitalAge,
      
        profileCompleted:true
      });
  
      alert("Registration Success");
  
      localStorage.setItem("masterLogin", "true");
  
      navigate("/master-dashboard");
  
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };
  const handleLogin = async () => {

  if (
    email === "demomaster@gmail.com" &&
    password === "demomaster123"
  ){
    localStorage.setItem("masterLogin", "true");
    if (isDemo) {
      navigate("/demomasterdashboard")
    } else {
      navigate("/master-dashboard")
    }
    return;
  }

  try {
    const userCredential =
await signInWithEmailAndPassword(
auth,
email,
password
);

const user = userCredential.user;

localStorage.setItem(
"masterLogin",
"true"
);

const masterData = {
masterBasicInfo:{
name:
user.displayName ||
email.split("@")[0],
email:user.email
}
};

localStorage.setItem(
"masterData",
JSON.stringify(masterData)
);

    
    if (isDemo) {
      navigate("/demomasterdashboard")
    } else {
      navigate("/master-dashboard")
    }
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
PharmacyLogin
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
navigate("/master-login",{state:{demo:true}});
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
  setOpenMenu(false);
}}
className="text-[32px] font-semibold leading-none cursor-pointer"
>
PharmacyLogin
</div>

</div>
</div>
)}

</div>
</>
)}

<div className="flex justify-center items-center py-10 px-4 min-h-screen">

<form onSubmit={(e)=>{
  e.preventDefault();
  state === "Login"
  ? handleLogin()
  : handleRegister();
}}
        className="backdrop-blur-lg bg-white/60 border border-white/30 
      shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-[400px]">

<h1 className="text-5xl font-bold text-center mb-2">
  {state === "Login" ? "Login" : "Register"}
</h1>

<p className="text-center text-gray-500 mb-8 text-lg">
  {state === "Login"
    ? "Login to your master account"
    : "Create your master account"}
</p>

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

<button
type="button"
className="btn-style"
onClick={()=>{
  if(state==="Login"){
    handleLogin();
  }else{
    setShowSetupPopup(true);
  }
}}
>
{state === "Login" ? "Login" : "Register"}
</button>

        <div className="flex items-center gap-3 my-6">
  <div className="flex-1 h-[1px] bg-gray-300"></div>

  <p className="text-gray-400 text-sm">
    OR
  </p>

  <div className="flex-1 h-[1px] bg-gray-300"></div>
</div>

<button
  type="button"
  onClick={handleGoogleLogin}
  className="w-full border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-3 text-lg font-medium hover:bg-gray-50 transition"
>
  <img
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    className="w-6"
  />

  {state === "Login"
    ? "Sign in with Google"
    : "Sign up with Google"}
</button>

{!isDemo && (

<p className="text-center mt-6 text-gray-600">

  {state === "Login"
    ? "Don't have an account?"
    : "Already have an account?"}

  <span
    onClick={() =>
      setState(state === "Login" ? "Register" : "Login")
    }
    className="text-blue-600 ml-2 cursor-pointer font-semibold"
  >
    {state === "Login" ? "Register" : "Login"}
  </span>

</p>

)}

      </form>

      {showSetupPopup && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

    <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">

      {/* STEP 1 */}
      {setupStep === 1 && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Owner Name
          </h2>

          <input
            type="text"
            placeholder="Enter Owner Name"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="input-style"
          />

          <button
            className="btn-style mt-4"
            onClick={() => setSetupStep(2)}
          >
            Next
          </button>
        </>
      )}

      {/* STEP 2 */}
      {setupStep === 2 && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Hospital Name
          </h2>

          <input
            type="text"
            placeholder="Enter Hospital Name"
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
            className="input-style"
          />

          <div className="flex gap-2 mt-4">

            <button
              className="border rounded-xl px-4 py-3 flex-1"
              onClick={() => setSetupStep(1)}
            >
              Back
            </button>

            <button
              className="btn-style flex-1"
              onClick={() => setSetupStep(3)}
            >
              Next
            </button>

          </div>
        </>
      )}

      {/* STEP 3 */}
      {setupStep === 3 && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Hospital Address
          </h2>

          <textarea
            rows={4}
            placeholder="Enter Hospital Address"
            value={hospitalAddress}
            onChange={(e) => setHospitalAddress(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          <div className="flex gap-2 mt-4">

            <button
              className="border rounded-xl px-4 py-3 flex-1"
              onClick={() => setSetupStep(2)}
            >
              Back
            </button>

            <button
              className="btn-style flex-1"
              onClick={() => setSetupStep(4)}
            >
              Next
            </button>

          </div>
        </>
      )}

      {/* STEP 4 */}
      {setupStep === 4 && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Hospital Age
          </h2>

          <input
            type="text"
            placeholder="Enter Hospital Age"
            value={hospitalAge}
            onChange={(e) => setHospitalAge(e.target.value)}
            className="input-style"
          />

          <div className="flex gap-2 mt-4">

            <button
              className="border rounded-xl px-4 py-3 flex-1"
              onClick={() => setSetupStep(3)}
            >
              Back
            </button>

            <button
              className="btn-style flex-1"
              onClick={() => setSetupStep(5)}
            >
              Next
            </button>

          </div>
        </>
      )}

      {/* STEP 5 */}
      {setupStep === 5 && (
        <>
          <h2 className="text-2xl font-bold mb-2 text-center">
            Create Account?
          </h2>

          <p className="text-center text-gray-500 mb-6">
            Do you want to create account now?
          </p>

          <div className="flex flex-col gap-3">

            <button
              className="btn-style"
              onClick={() => {
                setName(ownerName);
                handleRegister();
              }}
            >
              Create Account
            </button>

            <button
              className="border border-gray-300 rounded-xl py-3"
              onClick={() => {
                navigate("/master-dashboard");
              }}
            >
              Save & Continue Later
            </button>

            <button
              className="text-red-500"
              onClick={() => {
                setShowSetupPopup(false);
                setSetupStep(1);
              }}
            >
              Cancel
            </button>

          </div>
        </>
      )}

    </div>

  </div>
)}

      </div>
    </div>
  )
};

export default MasterLogin;

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
      setEmail("sundar@gmail.com");
      setPassword("sundar11");
    }
  }, [isDemo]);

  const fromRole = location.state?.fromRole === true;
  const isRegister = location.state?.isRegister === true;

  const [state, setState] = useState(isRegister ? "Register" : "Login");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (state === "Register") {

        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(userCredential.user, {
          displayName: name
        });

        await setDoc(doc(db, "master", userCredential.user.uid), {
          name,
          email,
          hospital,
          role: "master"
        });

        alert("Registered Successfully");
        setState("Login");
      }

      else {

        await signInWithEmailAndPassword(auth, email, password);

        localStorage.setItem("masterLogin", "true");

        if (isDemo) {
          navigate("/demomasterdashboard")
        } else {
          navigate("/master-dashboard")
        }
      }

    } catch (error) {
      alert(error.message);
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
<div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-8">

<p onClick={() => navigate("/demohome")} className="text-2xl font-semibold">
Demo
</p>

<ul className="flex items-center gap-12 text-base font-medium">
<li onClick={()=>navigate("/master-login",{state:{demo:true}})}>MasterLogin</li>
<li onClick={()=>navigate("/admin-login",{state:{demo:true}})}>AdminLogin</li>
<li onClick={()=>navigate("/doctor-login",{state:{demo:true}})}>DoctorLogin</li>
<li onClick={()=>navigate("/staff-login",{state:{demo:true}})}>StaffLogin</li>
<li onClick={()=>navigate("/patient-login",{state:{demo:true}})}>PatientLogin</li>
</ul>

<span onClick={()=>navigate("/demohome")}>
Home
</span>

</div>
</div>


{/* Mobile + Tablet Navbar */}
{/* Mobile + Tablet Only */}
<div className="md:hidden w-full bg-white border-b shadow-sm relative">

  {/* Top Bar */}
  <div className="flex items-center justify-between px-6 py-5">
    <h2 className="text-2xl font-bold">
      Demo
    </h2>

    <button
      onClick={() => setOpenMenu(!openMenu)}
      className="text-3xl font-semibold"
    >
      {openMenu ? "✕" : "☰"}
    </button>
  </div>


  {/* Dropdown Card Menu */}
  {openMenu && (
    <div className="
      absolute
      right-4
      top-[100px]
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
          navigate('/demohome');
          setOpenMenu(false);
        }}
        className="text-2xl font-medium mb-10 cursor-pointer"
      >
        Home
      </div>

      <div
        onClick={()=>{
          navigate('/master-login',{state:{demo:true}});
          setOpenMenu(false);
        }}
        className="text-2xl font-medium mb-10 cursor-pointer"
      >
        MasterLogin
      </div>

      <div
        onClick={()=>{
          navigate('/admin-login',{state:{demo:true}});
          setOpenMenu(false);
        }}
        className="text-2xl font-medium mb-10 cursor-pointer"
      >
        AdminLogin
      </div>

      <div
        onClick={()=>{
          navigate('/doctor-login',{state:{demo:true}});
          setOpenMenu(false);
        }}
        className="text-2xl font-medium mb-10 cursor-pointer"
      >
        DoctorLogin
      </div>

      <div
        onClick={()=>{
          navigate('/staff-login',{state:{demo:true}});
          setOpenMenu(false);
        }}
        className="text-2xl font-medium mb-10 cursor-pointer"
      >
        StaffLogin
      </div>

      <div
        onClick={()=>{
          navigate('/patient-login',{state:{demo:true}});
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
)}

<div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4">

      <form onSubmit={handleSubmit}
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
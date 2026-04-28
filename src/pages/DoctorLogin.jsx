import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const DoctorLogin = () => {

  const [state, setState] = useState("Login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [name, setName] = useState('');

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const isDemo = location.state?.demo === true;

  useEffect(() => {
    if(isDemo){
    setEmail("demodoctor007");
    setPassword("demo007");
    }
    },[isDemo]);

      
  const fromRole = location.state?.fromRole === true;


  const handleGoogleSignup = async () => {

    try {

      const provider = new GoogleAuthProvider()

      const result = await signInWithPopup(auth, provider)

      const user = result.user

      await setDoc(doc(db, "doctors", user.uid), {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        role: "doctor"
      }, { merge: true })

      alert("Doctor Google Signup Success")
      console.log("Login success", email)
      if(isDemo){
        window.location.href="/#/demodoctordashboard"
        }else{
        navigate("/doctor-profile")
        }

    } catch (error) {
      alert(error.message)
    }

  }


  const handleSubmit = async (e) => {

    if (
      email === "demodoctor007" &&
      password === "demo007"
     ){
      
      window.location.href="/#/demodoctordashboard";
      return;
     }

    e.preventDefault()

    try {

      if (state === "Register") {


        await setDoc(doc(db, "doctors", email), {
          doctorBasicInfo: {
            name: name,
            email: email
          },
          doctorAccount: {
            password: password
          },
          isDisabled: false
        })

        alert("Doctor Registered Successfully")
        setState("Login")

      } else {

        const doctorRef = doc(db, "doctors", email)
        const doctorSnap = await getDoc(doctorRef)

        if (!doctorSnap.exists()) {
          alert("Doctor not found ")
          return
        }

        const data = doctorSnap.data()

        if (data.isDisabled) {
          alert("Your account is disabled ")
          return
        }

        if (data.doctorAccount?.password !== password) {
          alert("Wrong password ")
          return
        }


        alert("Doctor Login Success")

        localStorage.setItem("doctorEmail", email)

        if(isDemo){
          window.location.href="/#/demodoctordashboard"
          }else{
          navigate("/doctor-profile")
          }

      }

    } catch (error) {
      console.log(error)
      alert(error.message)
    }

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200">

{isDemo && (
<>
{/* Desktop Navbar */}
<div className="hidden md:block w-full bg-white border-b shadow-sm">
<div className="max-w-7xl mx-auto relative flex items-center h-20 px-8">

<div className="flex items-center gap-4">


<button onClick={() => navigate("/demohome")}
className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
  <span className="text-white text-3xl font-bold -mt-1">←</span>
</button>
<p  onClick={() => nav("/demohome")} className="text-xl font-semibold cursor-pointer" >
Demo
</p>


</div>

<ul className="absolute left-1/2 -translate-x-1/2 flex items-center gap-12 text-base font-medium ">
<li onClick={()=>navigate("/master-login",{state:{demo:true}})}>MasterLogin</li>
<li onClick={()=>navigate("/admin-login",{state:{demo:true}})}>AdminLogin</li>
<li onClick={()=>navigate("/doctor-login",{state:{demo:true}})}>DoctorLogin</li>
<li onClick={()=>navigate("/staff-login",{state:{demo:true}})}>StaffLogin</li>
<li onClick={()=>navigate("/patient-login",{state:{demo:true}})}>PatientLogin</li>
</ul>


</div>
</div>


{/* Mobile + Tablet Navbar */}
{/* Mobile + Tablet Only */}
<div className="md:hidden w-full bg-white border-b shadow-sm relative">

  {/* Top Bar */}
  <div className="flex items-center justify-between px-6 py-5">
  <div className="flex items-center gap-4">


  <button onClick={() => navigate("/demohome")}
className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
  <span className="text-white text-3xl font-bold -mt-1">←</span>
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
<form onSubmit={handleSubmit} className="w-full max-w-[320px] md:max-w-[320px]">
<div className="flex flex-col gap-5 p-6 sm:p-8 w-full backdrop-blur-lg bg-white/60 shadow-2xl
border border-white/30 rounded-2xl ">

          <p className='text-2xl sm:text-3xl font-semibold text-center'>
            {state === "Register" ? "Doctor Register" : "Doctor Login"}
          </p>

          {state === "Register" && (
            <div className="w-full">
              <p>Full Name</p>
              <input type="text" className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:outline-none"
                onChange={(e) => setName(e.target.value)} value={name} required />
            </div>
          )}

          <div className="w-full">
            {/* <p>Doctor ID</p> */}
            <input type="doctorid" className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)} value={email} required />
          </div>

          <div className="relative w-full">
            {/* <p>Password</p> */}
            <input autoComplete="new-password" className="border border-zinc-300 rounded w-full p-2 mt-1 pr-10"
              type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)}
              value={password} required />
            <span
              className="absolute right-3 top-[65%] -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {state === "Register" && (

            <div className="relative w-full">
              <p>Confirm Password</p>
              <input type={showConfirmPassword ? "text" : "password"}
                className="border border-zinc-300 rounded w-full p-2 mt-1 pr-10" value={showConfirmPassword}
                onChange={(e) => setShowConfirmPassword(e.target.value)} required
              />

              <span
                className="absolute right-3 top-[65%] -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

            </div>

          )}

          <button className='w-full py-3 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-500'>
            {state === "Register" ? "Register" : "Login"}
          </button>


          {/* <button type="button" onClick={handleGoogleSignup}
            className="w-full py-3 rounded-lg border border-gray-300 flex items-center justify-center gap-2" >

            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" />
            Sign in with Google
          </button> */}


          {/* {state === "Login" ? (

            <p>
              No doctor account?
              <span onClick={() => setState("Register")} className="text-blue-500 cursor-pointer ml-1" >
                Register here
              </span>
            </p>

          ) : (

            <p>
              Already registered?
              <span onClick={() => setState("Login")} className="text-blue-500 cursor-pointer ml-1" >
                Login here
              </span>
            </p>

          )} */}

        </div>
      </form>
      </div>
    </div>
  );
};

export default DoctorLogin;
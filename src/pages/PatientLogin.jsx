import React, { useState, useEffect } from "react";
import { auth, db } from '../firebase/'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation } from "react-router-dom";



const Login = () => {

  const handleGoogleSignup = async () => {

    try {

      const provider = new GoogleAuthProvider()

      const result = await signInWithPopup(auth, provider)

      const user = result.user

      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        address: "",
        phone: "",
        gender: "",
        role: "user"
      }, { merge: true })

      alert("Google Signup Success")

      navigate("/patient-dashboard")

    } catch (error) {

      alert(error.message)

    }

  }

  const [state, setState] = useState('Login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const isDemo = location.state?.demo === true;

  useEffect(()=>{
    if(isDemo){
    setEmail("demopatient@gmail.com");
    setPassword("demopatient11");
    }
    },[isDemo]);

      
  const fromRole = location.state?.fromRole === true;

  const onSubmitHandler = async (event) => {

    if (
      email === "demopatient@gmail.com" &&
      password === "demopatient11"
     ){
      alert("Demo Patient Login Success");
      window.location.href="/#/demopatientdashboard";
      return;
     }

    event.preventDefault()

    try {
      if (state === "Sign Up") {

        if (password !== confirmPassword) {
          alert("Password and Confirm Password not match")
          return
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(userCredential.user, {
          displayName: name
        });

        await setDoc(doc(db, "users", userCredential.user.uid), {
          name: name,
          email: email,
          address: address,
          phone: phone,
          gender: gender,
          role: "user"
        });

        alert("Account Created Successfully");
        setState("Login")

      }

      else {


        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        const uid = userCredential.user.uid

        const userRef = doc(db, "users", uid)
        const userSnap = await getDoc(userRef)

        if (!userSnap.exists()) {
          alert("No patient record found ")
          return
        }

        const userData = userSnap.data()

        if (userData.isDisabled) {
          alert("Your account is disabled")
          return
        }

        alert("Login Success")
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            email: email
          })
         );
        navigate('/demopatientdashboard')
      }

    } catch (error) {
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

<p  onClick={() => nav("/demohome")} className="text-xl font-semibold cursor-pointer" >
Demo
</p>
<button type="button" onClick={() => navigate("/demohome")} className=" w-12 h-12 rounded-full bg-blue-600 text-white text-4xl font-bold flex items-center justify-center
shadow-md hover:bg-blue-700 transition" >
←
</button>

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

  <p  onClick={() => nav("/demohome")} className="text-xl font-semibold cursor-pointer" >
Demo
</p>
<button type="button" onClick={() => navigate("/demohome")} className=" w-12 h-12 rounded-full bg-blue-600 text-white text-4xl font-bold flex items-center justify-center
shadow-md hover:bg-blue-700 transition" >
←
</button>

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

      {/* CARD */}
      <form
        autoComplete="off"
        onSubmit={onSubmitHandler}
        className="backdrop-blur-lg bg-white/60 shadow-2xl border border-white/30 
        rounded-2xl p-5 w-full max-w-[320px] md:max-w-[320px]"
      >

        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </h1>

        {/* <p className="text-center text-gray-500 mb-6">
          Please {state === 'Sign Up' ? "sign up" : "log in"} to continue
        </p> */}

        {/* NAME */}
        {state === "Sign Up" && (
          <div className="mb-3">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        )}

        {/* EMAIL */}
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-3 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* CONFIRM PASSWORD */}
        {state === "Sign Up" && (
          <div className="mb-3">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        )}

        {/* ADDRESS */}
        {state === "Sign Up" && (
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 mb-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        )}

        {/* PHONE */}
        {state === "Sign Up" && (
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 mb-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        )}

        {/* GENDER */}
        {state === "Sign Up" && (
          <div className="flex gap-4 mb-4 text-sm">
            <label><input type="radio" name="gender" value="Male" onChange={(e) => setGender(e.target.value)} /> Male</label>
            <label><input type="radio" name="gender" value="Female" onChange={(e) => setGender(e.target.value)} /> Female</label>
            <label><input type="radio" name="gender" value="Others" onChange={(e) => setGender(e.target.value)} /> Others</label>
          </div>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:scale-105 transition"
        >
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </button>

        {/* GOOGLE */}
        {/* <button
          type="button"
          onClick={handleGoogleSignup}
          className="mt-3 w-full py-2 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" />
          Sign in with Google
        </button> */}

        {/* SWITCH */}
        <p className="text-center text-sm mt-4">
          {state === "Sign Up" ? (
            <>
              Already have account?{" "}
              <span onClick={() => setState('Login')} className="text-blue-600 cursor-pointer">
                Login
              </span>
            </>
          ) : (
            <>
              {/* Create an account?{" "}
              <span onClick={() => setState('Sign Up')} className="text-blue-600 cursor-pointer">
                Register
              </span> */}
            </>
          )}
        </p>

      </form>
      </div>
    </div>
  )
}

export default Login
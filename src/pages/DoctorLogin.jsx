import React, { useState } from "react";
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
      navigate("/doctor-profile")

    } catch (error) {
      alert(error.message)
    }

  }


  const handleSubmit = async (e) => {

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

        navigate("/doctor-profile")

      }

    } catch (error) {
      console.log(error)
      alert(error.message)
    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex flex-col gap-5 p-6 sm:p-8 rounded-2xl bg-white shadow-xl max-w-md w-full">

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
            <p>Email</p>
            <input type="email" className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)} value={email} required />
          </div>

          <div className="relative w-full">
            <p>Password</p>
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


          <button type="button" onClick={handleGoogleSignup}
            className="w-full py-3 rounded-lg border border-gray-300 flex items-center justify-center gap-2" >

            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" />
            Sign in with Google
          </button>


          {state === "Login" ? (

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

          )}

        </div>
      </form>
    </div>
  );
};

export default DoctorLogin;
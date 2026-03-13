import React, { useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const DoctorLogin = () => {

  const [state, setState] = useState("Login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [name, setName] = useState('');

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)


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

      navigate("/Doctor")

    } catch (error) {
      alert(error.message)
    }

  }


  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      if (state === "Register") {

        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        await updateProfile(userCredential.user, {
          displayName: name
        })

        await setDoc(doc(db, "doctors", userCredential.user.uid), {
          name: name,
          email: email,
          role: "doctor"
        })

        alert("Doctor Registered Successfully")
        setState("Login")

      }

      else {

        await signInWithEmailAndPassword(auth, email, password)

        alert("Doctor Login Success")

        navigate("/Doctor")

      }

    }
    catch (error) {
      alert(error.message)
    }

  }

  return (

    <div className="min-h-[80vh] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex flex-col gap-4 border p-8 rounded-lg shadow-lg max-w-md w-full">

          <p className='text-2xl font-semibold text-center'>
            {state === "Register" ? "Doctor Register" : "Doctor Login"}
          </p>

          {state === "Register" && (
            <div className="w-full">
              <p>Full Name</p>
              <input type="text" className="border border-zinc-300 rounded w-full p-2 mt-1"
                onChange={(e) => setName(e.target.value)} value={name} required />
            </div>
          )}

          <div className="w-full">
            <p>Email</p>
            <input type="email" className="border border-zinc-300 rounded w-full p-2 mt-1"
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

            <div className="relative">

              <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password"
                className="border p-2 rounded w-full pr-10" value={showConfirmPassword}
                onChange={(e) => setShowConfirmPassword(e.target.value)} required
              />

              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

            </div>

          )}

          <button className='bg-blue-500 text-white w-full py-3 rounded'>
            {state === "Register" ? "Register" : "Login"}
          </button>


          <button type="button" onClick={handleGoogleSignup}
            className="border border-gray-300 w-full py-3 rounded flex items-center justify-center gap-2" >

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
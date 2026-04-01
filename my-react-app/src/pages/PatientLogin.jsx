import React, { useState } from 'react'
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
  const fromRole = location.state?.fromRole === true;

  const onSubmitHandler = async (event) => {
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
        localStorage.setItem("userEmail", email)
        navigate('/patient-dashboard')
      }

    } catch (error) {
      alert(error.message)
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center 
  bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200">

      {/* CARD */}
      <form
        autoComplete="off"
        onSubmit={onSubmitHandler}
        className="backdrop-blur-lg bg-white/60 shadow-2xl border border-white/30 
      rounded-2xl p-8 w-[350px] sm:w-[420px]"
      >

        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Please {state === 'Sign Up' ? "sign up" : "log in"} to continue
        </p>

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
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="mt-3 w-full py-2 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" />
          Sign in with Google
        </button>

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
              Create an account?{" "}
              <span onClick={() => setState('Sign Up')} className="text-blue-600 cursor-pointer">
                Register
              </span>
            </>
          )}
        </p>

      </form>
    </div>
  )
}

export default Login
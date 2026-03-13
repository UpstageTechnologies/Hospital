import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const MasterLogin = () => {

  const [state, setState] = useState("Login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)



  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      if (state === "Register") {

        if (password !== confirmPassword) {
          alert("Password and Confirm Password not match")
          return
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        await updateProfile(userCredential.user, {
          displayName: name
        })

        await setDoc(doc(db, "master", userCredential.user.uid), {
          name: name,
          email: email,
          role: "master"
        })

        alert("Master Registered Successfully")
        setState("Login")


      } else {

        await signInWithEmailAndPassword(auth, email, password)

        localStorage.setItem("masterLogin", "true")

        navigate("/account")

      }

    } catch (error) {

      alert(error.message)

    }

  }


  const handleGoogleLogin = async () => {

    try {

      const provider = new GoogleAuthProvider()

      const result = await signInWithPopup(auth, provider)

      const user = result.user

      await setDoc(doc(db, "master", user.uid), {
        name: user.displayName,
        email: user.email,
        role: "master"
      }, { merge: true })

      localStorage.setItem("masterLogin", "true")

      navigate("/account")

    } catch (error) {

      alert(error.message)

    }

  }

  return (

    <div className="min-h-[80vh] flex items-center justify-center">

      <form onSubmit={handleSubmit}
        className="flex flex-col gap-4 border p-8 rounded-lg shadow-lg w-[350px]">

        <h2 className="text-2xl font-semibold text-center">
          {state === "Login" ? "Master Login" : "Master Register"}
        </h2>

        {state === "Register" && (

          <input type="text" placeholder="Full Name" className="border p-2 rounded" value={name}
            onChange={(e) => setName(e.target.value)} required />
        )}

        <input type="email" placeholder="Email" className="border p-2 rounded" value={email}
          onChange={(e) => setEmail(e.target.value)} required />

        <div className="relative">

          <input type={showPassword ? "text" : "password"} placeholder="Password"
            className="border p-2 rounded w-full pr-10" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
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

        <button className="bg-blue-500 text-white py-2 rounded">
          {state === "Login" ? "Login" : "Register"}
        </button>

        <button type="button" onClick={handleGoogleLogin}
          className="border border-gray-300 py-2 rounded flex items-center justify-center gap-2">

          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" />

          Sign in with Google

        </button>

        {state === "Login" ? (

          <p className="text-sm">
            No admin account?
            <span className="text-blue-500 cursor-pointer ml-1" onClick={() => setState("Register")}>
              Register here
            </span>
          </p>

        ) : (

          <p className="text-sm">
            Already admin?
            <span className="text-blue-500 cursor-pointer ml-1" onClick={() => setState("Login")}>
              Login here
            </span>
          </p>

        )}

      </form>

    </div>

  )

}

export default MasterLogin
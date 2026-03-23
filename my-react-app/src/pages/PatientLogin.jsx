import React, { useState } from 'react'
import { auth, db } from '../firebase/'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";



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

      navigate("/login")

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




        const userRef = doc(db, "patients", email)
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

        if (userData.accountInfo.password !== password) {
          alert("Wrong password")
          return
        }

        alert("Login Success")
        localStorage.setItem("patientEmail", email)
        navigate('/my-profile')
      }

    } catch (error) {
      alert(error.message)
    }

  }

  return (
    <form autoComplete='off' onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center' >
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create account" : "Login"}</p>
        <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment</p>
        {
          state === "Sign Up" && <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
          </div>
        }

        <div className='w-full'>
          <p>Email</p>
          <input autoComplete='off' className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
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

        {state === "Sign Up" && (

          <div className="relative  w-full">
            <p>Confirm Password</p>

            <input type={showConfirmPassword ? "text" : "password"}
              className="border p-2 rounded w-full pr-10" value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} required
            />

            <span
              className="absolute right-3 top-[65%] -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

          </div>

        )}

        {
          state === "Sign Up" && <div className='w-full'>
            <p>Address</p>
            <input autoComplete='off' className='border border-zinc-400 rounded w-full p-2 mt-1' type="text" onChange={(e) => setAddress(e.target.value)} value={address} required />
          </div>
        }

        {
          state === "Sign Up" && <div className='w-full'>
            <p>Phone:</p>
            <input autoComplete='off' className='border border-zinc-400 rounded w-full p-2 mt-1' type="tel" onChange={(e) => setPhone(e.target.value)} value={phone} required />
          </div>
        }

        {
          state === "Sign Up" && <div className='w-full'>
            <p>Gender</p>

            <div className='flex gap-6 mt-2'>
              <label className='flex items-center gap-2'>
                <input type="radio" name="gender" value="Male" onChange={(e) => setGender(e.target.value)} />Male
              </label>

              <label className='flex items-center gap-2'>
                <input type="radio" name="gender" value="Female" onChange={(e) => setGender(e.target.value)} />Female
              </label>

              <label className='flex items-center gap-2'>
                <input type="radio" name="gender" value="Others" onChange={(e) => setGender(e.target.value)} />Others
              </label>
            </div>
          </div>
        }
        <button type="submit" className='bg-blue-500 text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? "Create account" : "Login"}</button>
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="border border-gray-300 w-full py-2 rounded-md flex items-center justify-center gap-3 mt-2"
        >

          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            className="w-5"
          />

          Sign up with Google

        </button>
        {
          state === "Sign Up" ? <p>Already an account? <span onClick={() => setState('Login')} className='text-blue-500 underline cursor-pointer'>Login here</span> </p>
            : <p>Create an new account? <span onClick={() => setState('Sign Up')} className='text-blue-500 underline cursor-pointer'>Register here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
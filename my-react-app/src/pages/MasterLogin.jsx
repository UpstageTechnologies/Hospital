import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

        navigate("/account");
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

      navigate("/home");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
  bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200">

      <form onSubmit={handleSubmit}
        className="backdrop-blur-lg bg-white/60 border border-white/30 
      shadow-2xl rounded-2xl p-8 w-[400px]">

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
  )
};

export default MasterLogin;
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

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow w-[350px] flex flex-col gap-4">

        <h2 className="text-2xl text-center font-semibold">
          {state === "Login" ? "Master Login" : "Master Register"}
        </h2>

        {state === "Register" && (
          <div>
            <input type="text" placeholder="Full Name" value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 rounded w-full mb-2" />

            <input type="text" placeholder="Hospital Name" value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              className="border p-3 rounded w-full mb-2" />

            <input type="tel" placeholder="Phone number" value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-3 rounded w-full" />
          </div>
        )}

        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded" />

        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded" />

        {state === "Register" && (
          <input type="password" placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-3 rounded" />
        )}

        <button className="bg-blue-500 text-white py-3 rounded">
          {state === "Login" ? "Login" : "Register"}
        </button>

        <button type="button" onClick={handleGoogleLogin}
          className="border py-3 rounded flex items-center justify-center gap-2">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" />
          Sign in with Google
        </button>

        {!fromRole && !isRegister && (
          <p className="text-center text-sm">
            No account?
            <span
              className="text-blue-500 ml-1 cursor-pointer"
              onClick={() => setState("Register")}
            >
              Register
            </span>
          </p>
        )}

      </form>

    </div>
  );
};

export default MasterLogin;
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
import { doc, setDoc, collection, getDocs } from "firebase/firestore";

const MasterLogin = () => {

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [hospital, setHospital] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

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
          name: name,
          email: email,
          hospital: hospital,
          role: "master"
        });

        alert("Registered Successfully");
        setState("Login");
      }

      else {

        await signInWithEmailAndPassword(auth, email, password);

        const snapshot = await getDocs(collection(db, "master"));
        const users = snapshot.docs.map(doc => doc.data());

        const match = users.find(u => u.email === email);

        if (match) {
          localStorage.setItem("hospitalName", match.hospital);
        }

        localStorage.setItem("masterLogin", "true");

        navigate("/home");
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
      localStorage.setItem("hospitalName", hospital);

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
          <>
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-3 rounded"/>

            <input type="text" placeholder="Hospital Name" value={hospital} onChange={(e) => setHospital(e.target.value)} className="border p-3 rounded"/>
          </>
        )}

        <input type="email"  placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-3 rounded"/>

        <input type="password"  placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-3 rounded"/>

        {state === "Register" && (
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-3 rounded"/>
        )}

        <button className="bg-blue-500 text-white py-3 rounded">
          {state === "Login" ? "Login" : "Register"}
        </button>

        <button type="button" onClick={handleGoogleLogin}
          className="border py-3 rounded flex items-center justify-center gap-2">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5"/>
          Sign in with Google
        </button>

        <p className="text-center text-sm">
          {state === "Login" ? "No account?" : "Already have account?"}
          <span
            className="text-blue-500 ml-1 cursor-pointer"
            onClick={() => setState(state === "Login" ? "Register" : "Login")}
          >
            {state === "Login" ? "Register" : "Login"}
          </span>
        </p>

      </form>

    </div>
  );
};

export default MasterLogin;
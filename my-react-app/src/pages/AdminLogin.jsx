import React, { useState } from "react";
import { auth, provider } from "../firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AdminLogin = () => {

    const navigate = useNavigate();

    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const location = useLocation();
    const fromRole = location.state?.fromRole === true;


    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Admin Login Success");
            navigate("/account");
        } catch (err) {
            alert(err.message);
        }
    };


    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Admin Registered Successfully");
            navigate("/account");
        } catch (err) {
            alert(err.message);
        }
    };


    const handleGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);

            console.log(result.user);

            alert("Google Login Success");


            navigate("/account");

        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-2xl shadow-xl w-[380px]">

                <h2 className="text-3xl font-bold mb-6 text-center">
                    {isRegister ? "Admin Register" : "Admin Login"}
                </h2>

                <input type="email" placeholder="Enter Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} className="w-full mb-4 px-4 py-3 border rounded-lg bg-gray-100"
                />

                <input type="password" placeholder="Enter Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} className="w-full mb-5 px-4 py-3 border rounded-lg bg-gray-100"
                />

                {!isRegister ? (
                    <button onClick={handleLogin} className="w-full bg-blue-500 text-white py-3 rounded-lg mb-4">
                        Login
                    </button>
                ) : (
                    <button onClick={handleRegister} className="w-full bg-blue-500 text-white py-3 rounded-lg mb-4">
                        Register
                    </button>
                )}


                <button
                    onClick={handleGoogle}
                    className="w-full border border-gray-300 py-3 rounded-lg mb-4 flex items-center justify-center gap-3 bg-white hover:shadow-md transition"
                >
                    <img src="https://developers.google.com/identity/images/g-logo.png" alt="google" className="w-5 h-5" />
                    <span>Sign in with Google</span>
                </button>

                {!fromRole && (
                    <p className="text-center text-sm">
                        No account?
                        <span className="text-blue-500 ml-1 cursor-pointer">
                            Register
                        </span>
                    </p>
                )}

            </div>
        </div>
    );
};

export default AdminLogin;
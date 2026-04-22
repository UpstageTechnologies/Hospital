import React, { useState, useEffect } from "react";
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
    const isDemo = location.state?.demo === true;

    useEffect(() => {
        if (isDemo) {
          setEmail("sundar@gmail.com");
          setPassword("sundar11");
        }
      }, [isDemo]);
    

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
        <div className="min-h-screen flex items-center justify-center px-4 
bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200">

            <div className="backdrop-blur-lg bg-white/60 shadow-2xl 
    rounded-2xl p-6 sm:p-8 w-full max-w-[380px]">

                <h2 className="text-3xl font-bold mb-6 text-center">
                    {isRegister ? "Admin Register" : "Admin Login"}
                </h2>

                {/* EMAIL */}
                <input
                    type="email"
                    placeholder="Enter Email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-style w-full"
                />

                {/* PASSWORD */}
                <input
                    type="password"
                    placeholder="Enter Password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-style w-full"
                />

                {/* BUTTON */}
                {!isRegister ? (
                    <button onClick={handleLogin} className="btn-style w-full">
                        Login
                    </button>
                ) : (
                    <button onClick={handleRegister} className="btn-style w-full">
                        Register
                    </button>
                )}

                {/* GOOGLE */}
                <button onClick={handleGoogle} className="google-btn w-full justify-center">
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        className="w-5"
                    />
                    Sign in with Google
                </button>

                {/* SWITCH LOGIN ↔ REGISTER */}
                {!fromRole && (
                    <p className="text-center text-sm mt-3">
                        {isRegister ? "Already have account?" : "No account?"}

                        <span
                            className="text-blue-600 ml-1 cursor-pointer"
                            onClick={() => setIsRegister(!isRegister)}
                        >
                            {isRegister ? "Login" : "Register"}
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default AdminLogin;
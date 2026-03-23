import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RoleWelcome = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const role = location.state?.role || "";

    const handleStart = () => {
        if (role === "master") navigate("/master-login");
        else if (role === "admin") navigate("/admin-login");
        else if (role === "doctor") navigate("/doctor-login");
        else if (role === "staff") navigate("/staff-login");
        else if (role === "patient") navigate("/patient-login");
    };

    const handleLogin = () => {
        if (role === "master") navigate("/master-login");
        else if (role === "admin") navigate("/admin-login");
        else if (role === "doctor") navigate("/doctor-login");
        else if (role === "staff") navigate("/staff-login");
        else if (role === "patient") navigate("/patient-login");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-600 to-blue-600 text-white">

           
            <div className="flex justify-between items-center px-10 py-4">
               {/* <img src="/logos/upstage.png" alt="logo" className="h-10" /> */}

                <div className="space-x-6">
                    {/* <button className="hover:underline">Features</button>
                    <button className="hover:underline">Apply Now</button>

                    <button onClick={handleLogin} className="bg-blue-400 text-white px-4 py-2 rounded-lg font-semibold" >
                        Login
                    </button> */}
                </div>
            </div>

            
            <div className="flex flex-col justify-center items-center flex-1">

                <h1 className="text-5xl font-bold mb-4 text-center">
                    Welcome to Hospital 
                    {/* <span className="text-yellow-300 capitalize">
                        {role || "User"}
                    </span> */}
                </h1>

                <p className="mb-8 text-lg">
                    Your smart hospital management assistant.
                </p>

                <button onClick={handleStart} className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:scale-105 transition">
                    Get Started
                </button>

                <p className="mt-10 text-sm opacity-80">
                    © 2026 Hospital System
                </p>
            </div>

        </div>
    );
};

export default RoleWelcome;
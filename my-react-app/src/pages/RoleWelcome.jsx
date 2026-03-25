import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RoleWelcome = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const role = location.state?.role || "";

    const handleStart = () => {
        if (role === "master") navigate("/master-login", { state: { fromRole: true } });
        else if (role === "admin") navigate("/admin-login", { state: { fromRole: true } });
        else if (role === "doctor") navigate("/doctor-login", { state: { fromRole: true } });
        else if (role === "staff") navigate("/staff-login", { state: { fromRole: true } });
        else if (role === "patient") navigate("/patient-login", { state: { fromRole: true } });
    };

    const handleLogin = () => {
        if (role === "master") navigate("/master-login", { state: { fromRole: true } });
        else if (role === "admin") navigate("/admin-login", { state: { fromRole: true } });
        else if (role === "doctor") navigate("/doctor-login", { state: { fromRole: true } });
        else if (role === "staff") navigate("/staff-login", { state: { fromRole: true } });
        else if (role === "patient") navigate("/patient-login", { state: { fromRole: true } });
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-400 to-blue-400 text-white">

            <div className="flex flex-col justify-center items-center flex-1">

                <h1 className="text-5xl font-bold mb-4 text-center">
                    Welcome to Hospital
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
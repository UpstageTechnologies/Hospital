import React from "react";
import { useNavigate } from "react-router-dom";
import {
    FaUserMd,
    FaChartLine,
    FaUsers,
    FaHospital
} from "react-icons/fa";

const HospitalIntro = () => {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 md:px-28 lg:px-40 py-10 gap-10 
bg-[radial-gradient(circle_at_10%_20%,rgba(224,231,255,0.8),transparent_40%),radial-gradient(circle_at_90%_80%,rgba(199,210,254,0.8),transparent_40%),linear-gradient(135deg,#eef2ff,#e0e7ff,#c7d2fe)]">

            <div className="max-w-xl text-center md:text-left">

                <h1 className="text-5xl md:text-6xl font-extrabold leading-snug mb-6">

                    <span className="block text-black">
                        Hospital Solutions
                    </span>

                    <span className="block">
                        <span className="text-black">by </span>
                        <span className="text-blue-600">Upstage Technology</span>
                    </span>

                </h1>

                <div className="flex justify-center my-6 md:hidden">
                    <div className="bg-gray-200 p-6 rounded-full">
                        <img src="/Doctors/doc1.png" alt="doctor" className="w-[200px] object-cover rounded-full" />
                    </div>
                </div>

                <p className="text-gray-600 text-lg mb-6">
                    Manage doctors, patients, staff — all in one smart platform.
                </p>

                <div className="space-y-3 text-gray-700 mb-6 text-sm">

                    <div className="flex items-center gap-3 text-blue-600">
                        <span>🏥</span>
                        <span>All-in-One Hospital Management System</span>
                    </div>

                    <div className="flex items-center gap-3 text-blue-600">
                        <span>📊</span>
                        <span>Real-Time Analytics & Smart Dashboard</span>
                    </div>

                    <div className="flex items-center gap-3 text-blue-600">
                        <span>👥</span>
                        <span>Doctor, Staff & Patient Coordination</span>
                    </div>

                    <div className="flex items-center gap-3 text-blue-600">
                        <span>🩺</span>
                        <span>Efficient Appointment & Medical Records Management</span>
                    </div>

                </div>

                <p className="text-gray-500 text-sm mb-8">
                    Built for modern hospitals — enhancing efficiency, accuracy, and patient experience.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

                    <button onClick={() => navigate("/upstage")} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-600 transition">
                        Get Started →
                    </button>

                    <button onClick={() => navigate("/demohome")} className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
                        Demo
                    </button>

                </div>

            </div>


            <div className="hidden md:flex justify-center items-center">
                <div className="bg-gray-200 p-6 rounded-full">
                    <img src="/Doctors/doc1.png" alt="doctor" className="w-[260px] md:w-[320px] object-cover rounded-full" />
                </div>
            </div>

        </div>
    );
};

export default HospitalIntro;
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
        <div className="min-h-screen flex items-center justify-between px-10 md:px-20 bg-gradient-to-br from-gray-100 to-gray-200">


            <div className="max-w-xl">

                <h1 className="text-5xl md:text-6xl font-extrabold leading-snug mb-6">
                    <span className="text-black whitespace-nowrap">
                        Hospital Solutions by
                    </span>
                    <br />
                    <span className="text-blue-600">
                        Upstage Technology
                    </span>
                </h1>

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


                <div className="flex gap-4">

                    <button onClick={() => navigate("/upstage")} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-600 transition">
                        Get Started →
                    </button>

                    <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
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
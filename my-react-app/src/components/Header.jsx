import React from 'react'
import { assets } from '../assets/assets'
import { Navigate } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-blue-500 rounded-lg px-6 md:px-10 lg:px-20'>

            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>

                <p className='text-3xl md:text-4xl lg:text-4xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>Book Appointment<br />With Trusted Doctors</p>

                <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>

                    <img className='w-14' src={assets.group_profiles} alt="" />
                    <p>Simply browse through our extensive list of trusted doctors and schedule your appointment hassle-free</p>
                </div>
                <button onClick={() => navigate("/doctor")} className="bg-white px-6 py-3 rounded-full text-gray-700 w-fit">
                    Book Appointment →
                </button>
            </div>

            <div className='md:w-1/2 relative'>
                <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
            </div>
        </div>
    )
}

export default Header
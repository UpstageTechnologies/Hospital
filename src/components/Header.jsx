import React from 'react'
import { assets } from '../assets/assets'
import { Navigate } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className='px-6 sm:px-10'>
       <div className='flex flex-col md:flex-row flex-wrap bg-blue-500 rounded-lg px-4 md:px-10 lg:px-20 py-6 md:py-0 gap-6 md:gap-0'>

           <div className='md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left justify-center gap-4 py-6 md:py-[10vw] m-auto md:mb-[-30px]'>

                <p className='text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-white font-semibold leading-tight'>Book Appointment<br />With Trusted Doctors</p>

               <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light text-center md:text-left'>

                    <img className='w-14' src={assets.group_profiles} alt="" />
                    <p>Simply browse through our extensive list of trusted doctors and schedule your appointment hassle-free</p>
                </div>
                <button onClick={() => navigate("/doctor")} className="bg-white px-6 py-3 rounded-full text-gray-700 w-fit mx-auto md:mx-0">
                    Book Appointment →
                </button>
            </div>

            <div className='md:w-1/2 relative'>
               <img className='w-full h-auto rounded-lg md:absolute md:bottom-0 mt-4 md:mt-0' src={assets.header_img} />
            </div>
        </div>
        </div>
    )
}

export default Header
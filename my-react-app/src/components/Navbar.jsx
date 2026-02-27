import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate= useNavigate()

    const [showMenu,setshowMenu]=useState(false)
    const  [token,setToken]=useState(true)

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to='/'>
                <li className='py-1'>Home</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/doctor'>
                <li className='py-1'>All Doctors</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='about'>
                <li className='py-1'>About</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='contact'>
                <li className='py-1'>Contact</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
        </ul>
        <div className='flex item-center gap-4'>

            {
                token ? <div onClick={() => setshowMenu(!showMenu)} 
                        className='flex items-center gap-2 cursor-pointer relative'
>
                    <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
                    <img className='w-2.5 ' src={assets.dropdown_icon} alt="" />
                    {showMenu && (
                    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20'>
                       

                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                            <p onClick={()=>navigate('my-profile')} className='hover:text-black cursor-pointer'>MyProfile</p>
                            <p onClick={()=>navigate('my-appointment')}className='hover:text-black cursor-pointer'>MyAppointment</p>
                            <p onClick={()=>setToken(false)}className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                     )}
                </div>
                :<button onClick={()=>navigate('/login')} className="bg-blue-500 text-white px-8 py-3 rounded-full">Create account</button>
            }
            
        </div>
    </div>
  )
}

export default Navbar
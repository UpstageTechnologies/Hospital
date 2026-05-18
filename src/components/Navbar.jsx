import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import ghLogo from '/logos/gh.png'
import apolloLogo from '/logos/appolo.png'
import rajeshLogo from '/logos/rajesh.png'
import arunhospitalLogo from '/logos/arunhospital.png'
import { auth, db } from '../firebase'
import {
    doc,
    getDoc,
    setDoc,
    collection,
    getDocs
    } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {

    const navigate = useNavigate()
    const location = useLocation();

    const [hospitalLogo, setHospitalLogo] = useState(assets.logo);

    const hospitalName =
localStorage.getItem("hospitalName");



const hospitalLogos = {
    gh: ghLogo,
    apollo: apolloLogo,
    arunhospital: arunhospitalLogo,
    "rajesh hospital": rajeshLogo
  };
  
  useEffect(() => {
  
    const savedHospital =
      localStorage.getItem("hospitalName");
  
    if (!savedHospital) {
      setHospitalLogo(ghLogo);
      return;
    }
  
    const logo =
      hospitalLogos[
        savedHospital.toLowerCase()
      ];
  
    setHospitalLogo(logo || ghLogo);
  
  }, [location.pathname]);


    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showMobileNav, setShowMobileNav] = useState(false)
    const [isMaster, setIsMaster] = useState(false)
    const [userImage, setUserImage] = useState(assets.profile_pic)
    const [user, setUser] = useState(false);
    const [userName,setUserName] = useState("");
    
const [userRole,setUserRole] = useState("");
    const [showLogoutPopup, setShowLogoutPopup] = useState(false)

    useEffect(() => {

        const checkMaster = () => {
            const master = localStorage.getItem("masterLogin")
            setIsMaster(master === "true")
        }

        checkMaster()

        window.addEventListener("storage", checkMaster)

        return () => window.removeEventListener("storage", checkMaster)

    }, [])
    useEffect(() => {

        const doctorEmail =
        localStorage.getItem("doctorEmail");
        
        const patientEmail =
        localStorage.getItem("patientEmail");
        
        const staffEmail =
        localStorage.getItem("staffEmail");
        
        const adminEmail =
        localStorage.getItem("adminEmail");
        
        const masterLogin =
        localStorage.getItem("masterLogin");
        
        if(
            doctorEmail ||
            patientEmail ||
            staffEmail ||
            adminEmail ||
            masterLogin === "true"
            ){
        
        setUser(true);
        
        }
        else{
        
        setUser(false);
        
        }
        
    }, []);
    useEffect(() => {

        const adminData =
        JSON.parse(
          localStorage.getItem("adminData")
        );
      
        const doctorData =
        JSON.parse(
          localStorage.getItem("doctorData")
        );

        const patientData =
JSON.parse(
localStorage.getItem("patientData")
);

const staffData =
JSON.parse(
localStorage.getItem("staffData")
);

const pharmasiData =
JSON.parse(
localStorage.getItem("pharmasiData")
);

const masterData =
JSON.parse(
localStorage.getItem("masterData")
);
      
        if(adminData){
      
          setUser(true);
      
          setUserName(
            adminData.adminBasicInfo?.name || "Admin"
          );
      
          setUserRole("admins");
      
        }
      
        else if(doctorData){
      
          setUser(true);
      
          setUserName(
            doctorData.doctorBasicInfo?.name || "Doctor"
          );
      
          setUserRole("doctors");
      
        }

        else if(patientData){

            setUser(true);
            
            setUserName(
            patientData.patientBasicInfo?.name || "Patient"
            );
            
            setUserRole("patients");
            
            }

            else if(staffData){

                setUser(true);
            
                setUserName(
                  staffData.staffBasicInfo?.name || "Staff"
                );
            
                setUserRole("staffs");
            
            }

            else if(pharmasiData){

                setUser(true);
                
                setUserName(
                pharmasiData.pharmasiBasicInfo?.name || "Pharmasi"
                );
                
                setUserRole("pharmasi");
                
                }

                else if(masterData){

                    setUser(true);
                    
                    setUserName(
                    masterData.masterBasicInfo?.name || "Master"
                    );
                    
                    setUserRole("master");
                    
                    }
      
      }, []);
    return (
<div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300 px-4 md:px-10 relative'>
<div className="flex items-center gap-4">



<img
onClick={() => navigate("/select-hospital")}
className="
w-[120px]
h-[60px]
object-contain
cursor-pointer
"
src={hospitalLogo}
alt="logo"
/>

</div>
{
!(
    location.pathname.includes("patient-dashboard") ||
    location.pathname.includes("staff-dashboard") ||
    location.pathname.includes("/account") ||
    location.pathname.includes("doctor-profile") ||
    location.pathname.includes("doctor-profile-page") ||
    location.pathname.includes("staff-profile") ||
    location.pathname.includes("pharmasi-profile") ||
    location.pathname.includes("master-profile") ||
    location.pathname.includes("admin-profile") ||
    location.pathname.includes("pharmasi-dashboard") ||
    location.pathname.includes("master-dashboard") ||
    location.pathname.includes("my-profile")
) && (
<ul className="hidden md:flex items-center gap-10 font-medium mx-auto">
                        {isMaster && location.pathname === "/account" ? (

                            <NavLink to="/account">

                            </NavLink>

                        ) : (

                            <>
                                <NavLink to="/home">
                                    <li className="py-1">Home</li>
                                </NavLink>

                                <NavLink to="/doctor">
                                    <li className="py-1">All Doctors</li>
                                </NavLink>

                                <NavLink to="/about">
                                    <li className="py-1">About</li>
                                </NavLink>

                                <NavLink to="/contact">
                                    <li className="py-1">Contact</li>
                                </NavLink>
                            </>

                        )}

                    </ul>
                )}



{showLogoutPopup && (

<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">

    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">

        <h2 className="text-lg font-semibold mb-4">
            Are you sure you want to logout?
        </h2>

        <div className="flex justify-center gap-4">

            <button onClick={() => setShowLogoutPopup(false)} className="px-4 py-2 bg-gray-300 rounded" >
                Cancel
            </button>

            <button
  onClick={() => {

    auth.signOut();

    // ✅ CLEAR ALL LOGIN DATA
    localStorage.removeItem("masterLogin");
    localStorage.removeItem("masterData");

    localStorage.removeItem("adminLogin");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminData");

    localStorage.removeItem("doctorLogin");
    localStorage.removeItem("doctorEmail");
    localStorage.removeItem("doctorName");
    localStorage.removeItem("doctorData");

    localStorage.removeItem("patientLogin");
    localStorage.removeItem("patientEmail");
    localStorage.removeItem("patientData");

    localStorage.removeItem("staffLogin");
    localStorage.removeItem("staffId");
    localStorage.removeItem("staffName");
    localStorage.removeItem("staffData");

    localStorage.removeItem("pharmasiLogin");
    localStorage.removeItem("pharmasiData");

    // ✅ RESET STATE
    setUser(false);
    setUserName("");
    setUserRole("");
    setShowProfileMenu(false);
    setShowLogoutPopup(false);

    
    setUserImage(assets.login1_icon);


window.history.pushState(null, "", "/");
navigate("/home#home", { replace: true });

  }}
  className="px-4 py-2 bg-red-500 text-white rounded"
>
  Logout
</button>
        </div>

    </div>

</div>

)}

<div className='flex items-center gap-4 relative'>

{
location.pathname === "/home" && (

<button
onClick={() => setShowMobileNav(!showMobileNav)}
className="md:hidden"
>

{
showMobileNav ? (
<X className="w-7 h-7" />
) : (
<Menu className="w-7 h-7" />
)
}

</button>

)
}

                {
                    user ? <div onClick={() => setShowProfileMenu(!showProfileMenu)} className='flex items-center gap-2 relative z-50'>

<p className="font-semibold">
  {userName || "Profile"}
</p>

                        <img className='w-8 h-8 rounded-full object-cover' src={userImage} alt="" />
                        <img className='w-2.5 ' src={assets.dropdown_icon} alt="" />
                        {showProfileMenu && (
                            <div className='absolute right-0 top-full mt-2 bg-white shadow-lg rounded-md p-4 text-base font-medium text-gray-600 z-50'>
                      <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>

                      <p
onClick={() => {

if(userRole === "master"){
navigate("/master-profile")
}

else if(userRole === "admins"){
navigate("/admin-profile")
}

else if(userRole === "doctors"){
navigate("/doctor-profile-page")
}

else if(userRole === "staffs"){
navigate("/staff-profile")
}

else if(userRole === "pharmasi"){
navigate("/pharmasi-profile")
}

else{
navigate("/my-profile")
}

}}
className="cursor-pointer hover:text-black"
>
My Profile
</p>

<p
  onClick={() => {

    if(userRole === "master"){
      navigate("/master-dashboard")
    }

    else if(userRole === "admins"){
      navigate("/admin-dashboard")
    }

    else if(userRole === "doctors"){
      navigate("/doctor-dashboard")
    }

    else if(userRole === "staffs"){
      navigate("/staff-dashboard")
    }

    else if(userRole === "pharmasi"){
      navigate("/pharmasi-dashboard")
    }

    else if(userRole === "patients"){
      navigate("/patient-dashboard")
    }

  }}
  className="cursor-pointer hover:text-black"
>
  Settings
</p>

<p
  onClick={() => setShowLogoutPopup(true)}
  className="cursor-pointer hover:text-black"
>
  Logout
</p>

</div>
                            </div>
                        )}
                    </div>
                        : <div className="relative">

                            <img onClick={() => setShowProfileMenu(!showProfileMenu)} className="w-8 cursor-pointer"
                                src={assets.login1_icon} alt=""
                            />

                            {showProfileMenu && (
                                <div className="absolute right-0 top-full mt-3 bg-white shadow-lg rounded-md p-4 text-gray-600 z-50">
                                    <div className="flex flex-col gap-4 min-w-[150px]">

                                        <p onClick={() => {
                                            navigate('/master-login')
                                            setShowProfileMenu(false)
                                        }}
                                            className="cursor-pointer hover:text-black whitespace-nowrap">
                                            Master Login
                                        </p>

                                        <p onClick={() => {
                                            navigate('/admin-login')
                                            setShowProfileMenu(false)
                                        }} className="cursor-pointer hover:text-black whitespace-nowrap">
                                            Admin Login
                                        </p>

                                        <p onClick={() => {
                                            navigate('/doctor-login')
                                            setShowProfileMenu(false)
                                        }} className="cursor-pointer hover:text-black whitespace-nowrap">
                                            Doctor Login
                                        </p>

                                        <p onClick={() => {
                                            navigate('/patient-login')
                                            setShowProfileMenu(false)
                                        }}
                                            className="cursor-pointer hover:text-black whitespace-nowrap">
                                            Patient Login
                                        </p>

                                        <p onClick={() => {
                                            navigate('/staff-login')
                                            setShowProfileMenu(false)
                                        }}
                                            className="cursor-pointer hover:text-black whitespace-nowrap">
                                            Staff Login
                                        </p>

                                        <p onClick={() =>{
                                            navigate('/pharmasi-login')
                                            setShowProfileMenu(false)
                                        }}
                                            className="cursor-pointer hover:text-black whitespace-nowrap">
                                            Pharmasi Login
                                        </p>
                                    </div>
                                </div>
                            )}


                        </div>
                }

{
showMobileNav && location.pathname === "/home" && (

<div className="absolute top-20 right-5 bg-white shadow-xl rounded-xl p-5 z-50 w-52 md:hidden">

<div className="flex flex-col gap-4 text-lg font-medium">

<p
onClick={()=>{
navigate("/home")
setShowMobileNav(false)
}}
className="cursor-pointer hover:text-blue-600"
>
Home
</p>

<p
onClick={()=>{
navigate("/doctor")
setShowMobileNav(false)
}}
className="cursor-pointer hover:text-blue-600"
>
All Doctors
</p>

<p
onClick={()=>{
navigate("/about")
setShowMobileNav(false)
}}
className="cursor-pointer hover:text-blue-600"
>
About
</p>

<p
onClick={()=>{
navigate("/contact")
setShowMobileNav(false)
}}
className="cursor-pointer hover:text-blue-600"
>
Contact
</p>

</div>

</div>

)
}

               


            </div>
        </div>

    )
}

export default Navbar
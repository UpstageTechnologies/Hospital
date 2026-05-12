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
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {

    const navigate = useNavigate()
    const location = useLocation();

    const [hospitalLogo, setHospitalLogo] = useState(assets.logo);

useEffect(() => {

    const hospitalName =
        localStorage.getItem("hospitalName");

    if (!hospitalName) return;

    if (hospitalName.toLowerCase() === "gh") {

        setHospitalLogo(ghLogo);

    }

    else if (
        hospitalName.toLowerCase() === "apollo"
    ) {

        setHospitalLogo(apolloLogo);

    }
    else if (
        hospitalName.toLowerCase() === "arunhospital"
    ) {
    
        setHospitalLogo(arunhospitalLogo);
    
    }

    else if (
        hospitalName.toLowerCase() ===
        "rajesh hospital"
    ) {

        setHospitalLogo(rajeshLogo);

    }

}, []);


    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [isMaster, setIsMaster] = useState(false)
    const [userImage, setUserImage] = useState(assets.profile_pic)
    const [user, setUser] = useState(false);
    useEffect(() => {

        const unsubscribe =
        onAuthStateChanged(auth, async (currentUser) => {
        
        if(currentUser){
        
        setUser(true);
        
        setUserName(
        currentUser.displayName || "Profile"
        );
        
        }
        else{
        
        setUser(false);
        setUserName("");
        
        }
        
        });
        
        return () => unsubscribe();
        
        }, []);


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

        const unsubscribe =
        onAuthStateChanged(auth, async (currentUser) => {
        
            if(currentUser){
                setUser(true);
                }
        
        if (!currentUser) return;
        
        try {
        
        const collections = [
        "doctors",
        "patients",
        "staff",
        "master",
        "admin"
        ];
        
        for (const col of collections) {
        
        const snap = await getDocs(collection(db,col));
        
        let foundUser = null;
        
        snap.forEach((docItem) => {
        
        const data = docItem.data();
        
        if (
        data.email &&
        data.email.toLowerCase().trim() ===
        currentUser.email.toLowerCase().trim()
        ) {
        
        foundUser = data;
        
        }
        
        });
        
        if (foundUser) {
        
        setUserName(
        foundUser.doctorName ||
        foundUser.patientName ||
        foundUser.name ||
        foundUser.fullName ||
        "User"
        );
        
        setUserRole(col);
        
        setUserImage(
        foundUser.image ||
        assets.profile_pic
        );
        
        break;
        
        }
        
        }
        
        }
        catch(err){
        console.log(err)
        }
        
        });
        
        return () => unsubscribe();
        
        }, []);
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
            masterLogin
            ){
            
            setUser(true);
            
            }
            else{
            
            setUser(false);
            
            }
            
            }, []);


    const handleImageChange = async (e) => {
        const file = e.target.files[0]

        if (file) {

            const reader = new FileReader()

            reader.onloadend = async () => {

                const imageUrl = reader.result

                setUserImage(imageUrl)

                const user = auth.currentUser

                if (user) {

                    await setDoc(doc(db, "users", user.uid), {
                        image: imageUrl
                    }, { merge: true })

                }

            }

            reader.readAsDataURL(file)

        }
    }




    return (
<div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300 px-4 md:px-10 relative'>
<div className="flex items-center gap-4">



<img
onClick={() => navigate("/home")}
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
location.pathname.includes("doctor-dashboard") ||
location.pathname.includes("staff-dashboard") ||
location.pathname.includes("admin-dashboard")
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

            <button onClick={() => {
auth.signOut()
localStorage.removeItem("masterLogin")
setShowLogoutPopup(false)

// 👇 இது தான் correct logic
const path = location.pathname

if (path.includes("account")) {
navigate("/account")
}
else if (path.includes("doctor")) {
navigate("/doctor-dashboard")
}
else if (path.includes("patient")) {
navigate("/patient-dashboard")
}
else if (path.includes("staff")) {
navigate("/staff-dashboard")
}
else {
navigate("/home")
}
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
                    user ? <div onClick={() => setShowProfileMenu(!showProfileMenu)} className='flex items-center gap-2 relative z-50'>

<p className="font-semibold">
  {userName || "Profile"}
</p>

                        <img className='w-8 h-8 rounded-full object-cover' src={userImage} alt="" />
                        <img className='w-2.5 ' src={assets.dropdown_icon} alt="" />
                        {showProfileMenu && (
                            <div className='absolute right-0 top-full mt-2 bg-white shadow-lg rounded-md p-4 text-base font-medium text-gray-600 z-50'>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>

                                    <p onClick={() => navigate('/my-profile')} className="cursor-pointer hover:text-black">
                                        My Profile
                                    </p>

                                    <p onClick={() => navigate('/my-appointment')} className="cursor-pointer hover:text-black">
                                        My Appointment
                                    </p>

                                    <p
onClick={() => {

if(userRole==="doctors"){
navigate("/doctor-dashboard")
}
else{
navigate("/settings")
}

}}
className="cursor-pointer hover:text-black"
>
Settings
</p>

                                    <p onClick={() => setShowLogoutPopup(true)} className="cursor-pointer hover:text-black">
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

               


            </div>
        </div>

    )
}

export default Navbar
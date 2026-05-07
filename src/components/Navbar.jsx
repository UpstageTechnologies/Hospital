import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {

    const navigate = useNavigate()
    const location = useLocation();

    const [hospitalLogo, setHospitalLogo] = useState(assets.logo);
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [isMaster, setIsMaster] = useState(false)
    const [userImage, setUserImage] = useState(assets.profile_pic)
    const [user, setUser] = useState(null);
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

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

            setUser(currentUser)

            if (currentUser) {

                const docRef = doc(db, "user", currentUser.uid);

                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {

                    setUserImage(docSnap.data().image || assets.profile_pic);

                }

            } else {

                setUserImage(assets.profile_pic)

            }

        });

        return () => unsubscribe();

    }, []);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

            let hospital = localStorage.getItem("selectedHospital");

            if (!hospital && currentUser) {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    hospital = docSnap.data().hospital;
                }
            }

            if (location.pathname.startsWith("/upstage")) {
                setHospitalLogo("/logos/upstage.png");
                return;
            }

           const name = (hospital || "").toLowerCase();

            if (name.includes("rajesh")) {
                setHospitalLogo("/logos/rajesh.png");
            }
            else if (name === "gh" || name.includes("government hospital")) {
                setHospitalLogo("/logos/gh.png");
            }
            else if (name.includes("apollo")) {
                setHospitalLogo("/logos/appolo.png");
            }
            else if (name.includes("vk")) {
                setHospitalLogo("/logos/vk.png");
            }
            else if (name.includes("upstage")) {
                setHospitalLogo("/logos/upstage.png");
            }
            else {
                setHospitalLogo("/logos/default.png");
            }

        });

        return () => unsubscribe();

   }, [location.pathname]);


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


  <button
    onClick={() => navigate("/select-hospital")}
    className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shadow-md hover:scale-105 transition"
  >
    <span className="text-white text-lg relative -top-[1px]">
      ←
    </span>
  </button>

  <img
    onClick={() => navigate("/home")}
    className="w-16 h-16 object-contain cursor-pointer"
    src={hospitalLogo}
    alt="logo"
  />

</div>
            {!(
                location.pathname.startsWith("/doctor-profile") ||
                location.pathname.startsWith("/patient-dashboard")
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

                {/* MOBILE MENU */}

<div className="flex items-center gap-4 md:hidden">

{
user ? (

<>

<img
  onClick={(e) => {
    e.stopPropagation()
    setShowProfileMenu(prev => !prev)
  }}
  className='w-10 h-10 rounded-full object-cover cursor-pointer'
  src={userImage}
  alt=""
/>

<button
  onClick={() => setShowMenu(!showMenu)}
  className="text-3xl"
>
  ☰
</button>

</>

) : (

<>

<img
  onClick={(e) => {
    e.stopPropagation()
    setShowProfileMenu(prev => !prev)
  }}
  className="w-10 h-10 cursor-pointer"
  src={assets.login1_icon}
  alt=""
/>

<button
  onClick={() => setShowMenu(!showMenu)}
  className="text-3xl"
>
  ☰
</button>

</>

)

}

</div>

{showProfileMenu && (

<div
className="absolute top-20 right-4 bg-white shadow-xl rounded-xl p-4 flex flex-col gap-4 z-[9999] md:hidden w-52"
onClick={(e) => e.stopPropagation()}
>

{
user ? (

<>

<button
type="button"
className="text-left cursor-pointer"
onClick={(e) => {
e.preventDefault()
e.stopPropagation()
setShowProfileMenu(false)
navigate('/my-profile')
}}
>
My Profile
</button>

<button
type="button"
className="text-left cursor-pointer"
onClick={(e) => {
e.preventDefault()
e.stopPropagation()
setShowProfileMenu(false)
navigate('/my-appointment')
}}
>
My Appointment
</button>

<button
type="button"
className="text-left cursor-pointer w-full"
onClick={(e) => {
e.preventDefault()
e.stopPropagation()
setShowProfileMenu(false)

setTimeout(() => {
setShowLogoutPopup(true)
}, 100)

}}
>
Logout
</button>

</>

) : (

<>

<p onClick={() => {
navigate('/master-login')
setShowProfileMenu(false)
}}>
Master Login
</p>

<p onClick={() => {
navigate('/admin-login')
setShowProfileMenu(false)
}}>
Admin Login
</p>

<p onClick={() => {
navigate('/doctor-login')
setShowProfileMenu(false)
}}>
Doctor Login
</p>

<p onClick={() => {
navigate('/patient-login')
setShowProfileMenu(false)
}}>
Patient Login
</p>

<p onClick={() => {
navigate('/staff-login')
setShowProfileMenu(false)
}}>
Staff Login
</p>

<p onClick={() => {
navigate('/pharmasi-login')
setShowProfileMenu(false)
}}>
Pharmasi Login
</p>

</>

)

}

</div>

)}

{showMenu && (

<div className="absolute top-20 right-4 bg-white shadow-xl rounded-xl p-4 flex flex-col gap-4 z-50 md:hidden w-44">

<p onClick={() => {
navigate("/home")
setShowMenu(false)
}}>
Home
</p>

<p onClick={() => {
navigate("/doctor")
setShowMenu(false)
}}>
All Doctors
</p>

<p onClick={() => {
navigate("/about")
setShowMenu(false)
}}>
About
</p>

<p onClick={() => {
navigate("/contact")
setShowMenu(false)
}}>
Contact
</p>

</div>

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

<div className='hidden md:flex items-center gap-4 relative'>

                {
                    user ? <div onClick={() => setShowProfileMenu(!showProfileMenu)} className='flex items-center gap-2 relative z-50'>

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
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

                const docRef = doc(db, "master", currentUser.uid);

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

            if (location.pathname.startsWith("/upstage-doctors")) {
                setHospitalLogo("/logos/upstage.png");
                return;
            }


            const name = hospital.toLowerCase();

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
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 relative z-50 w-full px-4'>
            <img className='w-16 h-16 object-contain cursor-pointer ml-2' src={hospitalLogo} alt="logo" />
            {!location.pathname.startsWith("/appointment") && (
                <ul className="hidden md:flex items-center gap-6 font-medium">

                    {isMaster && location.pathname === "/account" ? (

                        <NavLink to="/account">

                        </NavLink>

                    ) : (

                        <>
                            <NavLink to="/">
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

            <div className='flex items-center gap-4 relative'>

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
                                    </div>
                                </div>
                            )}


                        </div>
                }

                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
                <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-36' src={assets.logo} alt="" />
                        <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded  inline-block'>Home</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/doctor'><p className='px-4 py-2 rounded  inline-block'>All Doctors</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded  inline-block'>About</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded  inline-block'>Contact</p></NavLink>
                    </ul>
                </div>
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
                                    navigate("/")
                                }}
                                    className="px-4 py-2 bg-red-500 text-white rounded"
                                >
                                    Logout
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>
        </div>

    )
}

export default Navbar
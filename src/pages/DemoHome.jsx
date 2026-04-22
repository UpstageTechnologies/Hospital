import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"
import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"   // 👈 correct path check panniko

const DemoHome = () => {

    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const specialityData = [
        { name: "General physician", image: "/speciality/General_physician.svg" },
        { name: "Gynecologist", image: "/speciality/Gynecologist.svg" },
        { name: "Dermatologist", image: "/speciality/Dermatologist.svg" },
        { name: "Pediatricians", image: "/speciality/Pediatricians.svg" },
        { name: "Neurologist", image: "/speciality/Neurologist.svg" },
        { name: "Gastroenterologist", image: "/speciality/Gastroenterologist.svg" },
    ]
    const [doctors, setDoctors] = useState([])
    useEffect(() => {
        const fetchDoctors = async () => {
            const snapshot = await getDocs(collection(db, "doctors"))
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setDoctors(data)
        }

        fetchDoctors()
    }, [])


    return (


        <div className="w-full min-h-screen bg-white">


            <div className="flex items-center justify-between px-4 sm:px-8 py-4 shadow">
                <p>Demo</p>

                <ul className="hidden md:flex gap-8 font-medium">
                    <span onClick={() => navigate("/demohome")} className="cursor-pointer">Home</span>

                    <span onClick={() => navigate("/demodoctors")} className="cursor-pointer">
                        All Doctors
                    </span>

                    <span onClick={() => navigate("/demoabout")} className="cursor-pointer">About</span>

                    <span onClick={() => navigate("/democontact")} className="cursor-pointer">Contact</span>
                </ul>

                {open && (
                    <div className="fixed top-0 left-0 w-full h-screen bg-white z-50 flex flex-col">

                        {/* TOP BAR */}
                        <div className="flex justify-between items-center px-6 py-4 border-b">
                            <h1 className="text-xl font-semibold">Demo</h1>
                            <button onClick={() => setOpen(false)} className="text-2xl">✕</button>
                        </div>

                        {/* MENU ITEMS */}
                        <div className="flex flex-col items-center justify-center flex-1 gap-8 text-lg font-medium">
                            <p onClick={() => { navigate("/demohome"); setOpen(false) }}>Home</p>
                            <p onClick={() => { navigate("/demodoctors"); setOpen(false) }}>All Doctors</p>
                            <p onClick={() => { navigate("/demoabout"); setOpen(false) }}>About</p>
                            <p onClick={() => { navigate("/contact"); setOpen(false) }}>Contact</p>
                        </div>

                    </div>
                )}
                <div className="flex items-center gap-4">

                    <div className="md:hidden">
                        <button onClick={() => setOpen(!open)}>☰</button>
                    </div>

                    <button 
  onClick={() => navigate("/rolehome")}
  className="bg-blue-500 text-white px-5 py-2 rounded-full"
>
  Login
</button>

                </div>
            </div>


            <div className='flex flex-col md:flex-row bg-blue-500 rounded-lg px-6 md:px-10 lg:px-20 mt-5 mx-4 sm:mx-6'>

                <div className='md:w-1/2 flex flex-col justify-center gap-4 py-10'>

                    <p className='text-2xl sm:text-3xl md:text-4xl text-white font-semibold'>
                        Book Appointment <br /> With Trusted Doctors
                    </p>

                    <div className='flex items-center gap-3 text-white text-sm'>
                        <img className='w-14' src={assets.group_profiles} alt="" />
                        <p>
                            Simply browse through our extensive list of trusted doctors and schedule your appointment hassle-free
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            localStorage.removeItem("selectedHospital");
                            navigate("/demodoctors");
                        }}
                        className="bg-white px-6 py-3 rounded-full text-gray-700 w-fit"
                    >
                        Book Appointment →
                    </button>

                </div>

                <div className='md:w-1/2'>
                    <img className='w-full' src={assets.header_img} alt="" />
                </div>

            </div>


            <div className="flex flex-col items-center gap-4 py-16 text-gray-800">

                <h1 className="text-3xl font-semibold">
                    Find by speciality
                </h1>

                <p className="text-center text-sm">
                    Simply browse through our extensive list of trusted doctors
                </p>

                <div className="flex justify-center gap-6 sm:gap-10 pt-10 flex-wrap">

                    {specialityData.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">

                            <div className="bg-gray-200 rounded-full w-32 h-32 flex items-center justify-center">
                                <img src={item.image} className="w-16 h-16" />
                            </div>

                            <p className="mt-3 text-sm font-medium">
                                {item.name}
                            </p>

                        </div>
                    ))}

                </div>

            </div>


            <div className="px-4 sm:px-10 py-10">

                <h1 className="text-3xl font-semibold mb-8 text-center">
                    Top Doctors in Tamil Nadu
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {doctors.map((doc, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/demodoctordetails/${doc.id}`)}
                            className="bg-[#f0f4f8] border border-blue-200 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
                        >

                            <img src={doc.image} className="w-full h-60 object-contain bg-[#e6edf5] p-4" />

                            <div className="p-4">

                                <p className="text-green-600 text-sm">● Available</p>

                                <h2 className="font-semibold text-lg">
                                    {doc.name}
                                </h2>

                                <p className="text-gray-600 text-sm">
                                    {doc.speciality}
                                </p>

                                <a href={doc.map} target="_blank" rel="noreferrer" className="text-blue-500 text-xs underline">
                                    📍 {doc.hospital}
                                </a>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

            <div className='flex bg-blue-500 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-16 md:my-20 mx-4 md:mx-10'>
                <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
                    <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white'>
                        <p>Book Appointment</p>
                        <p className='mt-4'>With 100+ Trusted Doctors</p>
                    </div>
                    <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className='bg-white text-sm sm:text-base text-gray-600 px-4 sm:px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'>Create Account</button>
                </div>

                <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
                    <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
                </div>
            </div>

        </div>
    )
}

export default DemoHome
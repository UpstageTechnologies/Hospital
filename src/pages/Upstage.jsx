import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Upstage = () => {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const specialityData = [
        { name: "General physician", image: "/speciality/General_physician.svg" },
        { name: "Gynecologist", image: "/speciality/Gynecologist.svg" },
        { name: "Dermatologist", image: "/speciality/Dermatologist.svg" },
        { name: "Pediatricians", image: "/speciality/Pediatricians.svg" },
        { name: "Neurologist", image: "/speciality/Neurologist.svg" },
        { name: "Gastroenterologist", image: "/speciality/Gastroenterologist.svg" },
    ];

    const [doctors, setDoctors] = useState([]);

    const [doctorImages, setDoctorImages] = useState({});

    const handleImageUpload = (docId, event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result;

      // state update
      setDoctorImages(prev => ({
        ...prev,
        [docId]: imageData
      }));

      // save permanently in browser
      localStorage.setItem(`doctorImage_${docId}`, imageData);
    };

    reader.readAsDataURL(file);
  }
};

useEffect(() => {
  const savedImages = {};

  doctors.forEach((doc) => {
    const storedImage = localStorage.getItem(`doctorImage_${doc.id}`);

    if (storedImage) {
      savedImages[doc.id] = storedImage;
    }
  });

  setDoctorImages(savedImages);

}, [doctors]);

    useEffect(() => {
        const fetchDoctors = async () => {
            const querySnapshot = await getDocs(collection(db, "doctors"));

            const list = [];
            querySnapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            setDoctors(list);
        };

        fetchDoctors();
    }, []);

    return (
        <div className="w-full min-h-screen bg-white">


            <div className="flex justify-between items-center px-8 py-4 shadow">
            <img  src="/logos/upstage.png"  alt="logo"  className="w-28 cursor-pointer"
  onClick={() => navigate("/upstage")}
/>

              <ul className="hidden lg:flex gap-8 font-medium">
                    <span onClick={() => navigate("/upstage")} className="cursor-pointer">Home</span>

                    <span onClick={() => navigate("/upstage-doctors")} className="cursor-pointer">
                        All Doctors
                    </span>

                    <span onClick={() => navigate("/upstage-about")} className="cursor-pointer">About</span>

                    <span onClick={() => navigate("/upstage-contact")} className="cursor-pointer">Contact</span>
                </ul>

                <div className="lg:hidden ml-auto mr-4 cursor-pointer" onClick={() => setMenuOpen(true)}>
                    ☰
                </div>

                <button onClick={() => navigate("/select-hospital")} className="bg-blue-500 text-white px-5 py-2 rounded-full">
                    Login
                </button>
            </div>

            {menuOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col items-center pt-10">

                    <div className="w-full flex justify-between items-center px-6 mb-10">
                        <img src="/logos/upstage.png" className="w-28" />
                        <span className="text-2xl cursor-pointer" onClick={() => setMenuOpen(false)}>✕</span>
                    </div>

                    <div className="flex flex-col gap-8 text-xl font-medium text-center">

                        <span onClick={() => { navigate("/upstage"); setMenuOpen(false); }}>
                            Home
                        </span>

                        <span onClick={() => { navigate("/upstage-doctors"); setMenuOpen(false); }}>
                            All Doctors
                        </span>

                        <span onClick={() => { navigate("/upstage-about"); setMenuOpen(false); }}>
                            About
                        </span>

                        <span onClick={() => { navigate("/upstage-contact"); setMenuOpen(false); }}>
                            Contact
                        </span>

                    </div>

                </div>
            )}


            <div className='flex flex-col md:flex-col lg:flex-row bg-blue-500 rounded-lg px-6 md:px-10 lg:px-20 mt-5 mx-6'>

                <div className='md:w-1/2 flex flex-col justify-center gap-4 py-10 text-center lg:text-left items-center lg:items-start'>

                    <p className='text-3xl md:text-4xl text-white font-semibold'>
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
                            navigate("/upstage-doctors");
                        }}
                        className="bg-white px-6 py-3 rounded-full text-gray-700 w-fit mx-auto lg:mx-0"
                    >
                        Book Appointment →
                    </button>

                </div>

                <div className='md:w-1/2 flex justify-center'>
                    <img className='w-full max-w-[280px] md:max-w-[350px] lg:max-w-full' src={assets.header_img} alt="" />
                </div>

            </div>


            <div className="flex flex-col items-center gap-4 py-16 text-gray-800">

                <h1 className="text-3xl font-semibold">
                    Find by speciality
                </h1>

                <p className="text-center text-sm">
                    Simply browse through our extensive list of trusted doctors
                </p>

                <div className="flex justify-center gap-10 pt-10 flex-wrap">

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


            <div className="px-10 py-10">

                <h1 className="text-3xl font-semibold mb-8 text-center">
                    Top Doctors in Tamil Nadu
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {doctors.map((doc, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/appointment/${doc.id}`)}
                            className="bg-[#f0f4f8] border border-blue-200 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
                        >

<img
  src={
 doctorImages[doc.id] ||
 "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
}
  alt="profile"
  onClick={(e) => {
    e.stopPropagation();

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (event) => {
      handleImageUpload(doc.id, event);
    };

    input.click();
  }}
  className="w-full h-60 object-contain bg-blue-50 cursor-pointer"
/>

                            <div className="p-4">

                            <p className={`text-sm ${index < 4 ? "text-green-600" : "text-red-500"}`}>
  ● {index < 4 ? "Available" : "Not Available"}
</p>

                                <h2 className="font-semibold text-lg">
                                    {doc.name}
                                </h2>

                                <p className="text-gray-600 text-sm">
                                    {doc.speciality}
                                </p>



                            </div>

                        </div>
                    ))}

                </div>

            </div>

            <div className='flex bg-blue-500 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
                <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
                    <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white'>
                        <p>Book Appointment</p>
                        <p className='mt-4'>With 100+ Trusted Doctors</p>
                    </div>
                    <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'>Create Account</button>
                </div>

                <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
                    <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
                </div>
            </div>

        </div>
    );
};

export default Upstage;
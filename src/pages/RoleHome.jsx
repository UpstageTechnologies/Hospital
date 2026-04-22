import { useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"
import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

const RoleHome = () => {

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

     
<div className="w-full bg-white border-b">

<div className="relative flex items-center justify-between px-6 py-4">

  {/* LEFT - Demo */}
  <p className="text-lg font-semibold">Demo</p>
  <button
 onClick={() => setOpen(!open)}
 className="md:hidden ml-auto text-2xl"
>
☰
</button>

  {/* CENTER - Roles */}
  <ul className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center gap-10 text-sm font-medium text-gray-700">

    <li
      onClick={() => navigate("/master-login", { state: { demo: true } })}
      className="cursor-pointer hover:text-blue-500"
    >
      MasterLogin
    </li>

    <li
      onClick={() => navigate("/admin-login", { state: { demo: true } })}
      className="cursor-pointer hover:text-blue-500"
    >
      AdminLogin
    </li>

    <li
      onClick={() => navigate("/doctor-login", { state: { demo: true } })}
      className="cursor-pointer hover:text-blue-500"
    >
      DoctorLogin
    </li>

    <li
      onClick={() => navigate("/staff-login", { state: { demo: true } })}
      className="cursor-pointer hover:text-blue-500"
    >
      StaffLogin
    </li>

    <li
      onClick={() => navigate("/patient-login", { state: { demo: true } })}
      className="cursor-pointer hover:text-blue-500"
    >
      PatientLogin
    </li>

  </ul>

  {open && (
<div className="absolute right-4 top-14 bg-white shadow-lg rounded-lg p-5 w-44 z-50 flex flex-col gap-4 md:hidden">

<span onClick={() => navigate("/demohome")}>
Home
</span>

<span onClick={() => navigate("/master-login",{state:{demo:true}})}>
MasterLogin
</span>

<span onClick={() => navigate("/admin-login",{state:{demo:true}})}>
AdminLogin
</span>

<span onClick={() => navigate("/doctor-login",{state:{demo:true}})}>
DoctorLogin
</span>

<span onClick={() => navigate("/staff-login",{state:{demo:true}})}>
StaffLogin
</span>

<span onClick={() => navigate("/patient-login",{state:{demo:true}})}>
PatientLogin
</span>

</div>
)}

  <div className="ml-auto hidden md:block">
  <span
    onClick={() => navigate("/demohome")}
    className="cursor-pointer text-sm font-medium hover:text-blue-500"
  >
    Home
  </span>
</div>



</div>

</div>

      {/* 🔥 SAME HERO SECTION */}
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
            onClick={() => navigate("/demodoctors")}
            className="bg-white px-6 py-3 rounded-full text-gray-700 w-fit"
          >
            Book Appointment →
          </button>
        </div>

        <div className='md:w-1/2'>
          <img className='w-full' src={assets.header_img} alt="" />
        </div>
      </div>

      {/* 🔥 SPECIALITY */}
      <div className="flex flex-col items-center gap-4 py-16 text-gray-800">
        <h1 className="text-3xl font-semibold">Find by speciality</h1>
        <p className="text-center text-sm">
          Simply browse through our extensive list of trusted doctors
        </p>

        <div className="flex justify-center gap-6 sm:gap-10 pt-10 flex-wrap">
          {specialityData.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-gray-200 rounded-full w-32 h-32 flex items-center justify-center">
                <img src={item.image} className="w-16 h-16" />
              </div>
              <p className="mt-3 text-sm font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 DOCTORS */}
      <div className="px-4 sm:px-10 py-10">
        <h1 className="text-3xl font-semibold mb-8 text-center">
          Top Doctors
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {doctors.map((doc, index) => (
            <div
              key={index}
              onClick={() => navigate(`/demodoctordetails/${doc.id}`)}
              className="bg-[#f0f4f8] border rounded-xl overflow-hidden cursor-pointer"
            >
              <img src={doc.image} className="w-full h-60 object-contain" />
              <div className="p-4">
                <p className="text-green-600 text-sm">● Available</p>
                <h2 className="font-semibold text-lg">{doc.name}</h2>
                <p className="text-gray-600 text-sm">{doc.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default RoleHome
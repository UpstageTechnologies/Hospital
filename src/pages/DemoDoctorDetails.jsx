
import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import AppointmentPopup from "../components/AppointmentPopup"
import {
  collection,
  getDocs
} from "firebase/firestore"

import { db } from "../firebase"


const DemoDoctorDetails = () => {

  const { doctors } = useContext(AppContext)
  const { id } = useParams()
  const navigate = useNavigate()
  const [docInfo, setDocInfo] = useState(null)
  const [slotTime, setSlotTime] = useState("")
  const [slotIndex, setSlotIndex] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  const [slotBookings, setSlotBookings] = useState({
    "10:00am-11:00am": 0,
    "1:00pm-2:00pm": 0,
    "5:00pm-7:00pm": 0,
  })
  
  const slots = [
    "10:00am-11:00am",
    "1:00pm-2:00pm",
    "5:00pm-7:00pm",
  ]
  
  const allSlotsClosed =
  slots.every(
    slot => slotBookings[slot] >= 3
  )
  
  useEffect(() => {
  
    const loadSlotBookings = async () => {
  
      if (!docInfo) return
  
      const snapshot = await getDocs(
        collection(db, "appointments")
      )
  
      const counts = {
        "10:00am-11:00am": 0,
        "1:00pm-2:00pm": 0,
        "5:00pm-7:00pm": 0,
      }
  
      snapshot.forEach((d) => {
  
        const data = d.data()
  
        if (
          data.doctorEmail ===
          (docInfo.email ||
           docInfo.doctorBasicInfo?.email)
        ) {
  
          if (counts[data.time] !== undefined) {
            counts[data.time] += 1
          }
  
        }
  
      })
  
      setSlotBookings(counts)
  
    }
  
    loadSlotBookings()
  
  }, [docInfo])


  const [selectedDate, setSelectedDate] = useState(new Date())
  useEffect(() => {
    const doctor = doctors.find(
      doc =>
        doc.email === id ||
        doc.doctorBasicInfo?.email === id ||
        doc.id === id
    )
    if (doctor) setDocInfo(doctor)
  }, [doctors, id])

  const formatDate = (date) => {
    return date.toDateString()
  }

  if (!docInfo) return <h1>Loading...</h1>

  return (
    <div>
        <div className="flex items-center justify-between py-4 px-8 border-b border-gray-300 bg-white">

{/* LEFT SIDE */}
<div className="flex items-center gap-4">

  <button
    onClick={() => navigate(-1)}   // 🔥 BACK FIX
    className="!w-9 !h-9 rounded-full bg-blue-600 flex items-center justify-center shadow-md"
  >
    <span className="text-white text-lg relative -top-[2px]">
      ←
    </span>
  </button>

  <p
    onClick={() => navigate("/demodoctors")}
    className="text-xl font-semibold cursor-pointer"
  >
    Demo
  </p>

</div>

{/* CENTER MENU */}
<ul className="hidden md:flex flex-1 justify-center items-center gap-10 text-gray-700 font-medium">

  <li onClick={() => navigate("/demohome")} className="cursor-pointer">Home</li>

  <li onClick={() => navigate("/demodoctors")} className="cursor-pointer">All Doctors</li>

  <li onClick={() => navigate("/demoabout")} className="cursor-pointer">About</li>

  <li onClick={() => navigate("/democontact")} className="cursor-pointer">Contact</li>

</ul>

</div>



      <div className="p-6">

        {/* TOP UI (FIRST IMAGE STYLE 🔥) */}
       <div className='flex flex-col md:flex-row gap-6 items-center md:items-stretch w-full'>
       <img
 className='w-full max-w-[280px] md:w-72 h-[250px] md:h-[300px] object-cover rounded-xl bg-blue-50'
 src={
   docInfo.image ||
   docInfo.doctorDesignation?.doctorImage ||
   "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
 }
 alt="doctor"
/>

          <div className='w-full md:w-[500px] border rounded-xl p-6 shadow-sm flex flex-col justify-center text-center md:text-left'>
          <h1 className='text-3xl font-bold'>
  {docInfo.name || docInfo.doctorBasicInfo?.name}
</h1>

<p className='text-gray-600 mt-2'>
  {docInfo.speciality ||
   docInfo.doctorDesignation?.designation}
</p>
            <p className='text-gray-600 mt-2'>
              {docInfo.experience || "5 Years Experience"}
            </p>
            <p className='mt-3 font-medium'>Fee: ${docInfo.fees || 50}</p>
          </div>
        </div>

        {/* SLOTS */}
{/* SLOTS */}
<div className='mt-10 flex flex-col items-center px-2 sm:px-0'>
  <h2 className='text-xl text-blue-600'>Booking Slots</h2>

  {/* DATE BUTTONS */}
  <div className="flex gap-3 mt-4 flex-wrap justify-center">

    {[...Array(5)].map((_, index) => {

      const date = new Date()
      date.setDate(date.getDate() + index)

      return (
        <button
          key={index}
          onClick={() => setSelectedDate(date)}
          className={`px-4 py-2 rounded border transition-all
            ${
              selectedDate.toDateString() === date.toDateString()
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
        >
          {date.toDateString()}
        </button>
      )
    })}

  </div>

  {/* TIME SLOTS */}
  <div className="flex gap-2 sm:gap-3 flex-wrap justify-center mt-4">

{slots.map((t, i) => {

const today = new Date()

const isToday =
selectedDate.toDateString() ===
today.toDateString()

let slotStartHour = 0

if (t === "10:00am-11:00am")
slotStartHour = 10

if (t === "1:00pm-2:00pm")
slotStartHour = 13

if (t === "5:00pm-7:00pm")
slotStartHour = 17

const currentHour =
today.getHours()

const timeExpired =
isToday &&
currentHour >= slotStartHour

const isClosed =
slotBookings[t] >= 3 ||
timeExpired

return (

<div key={i} className="relative">

{isClosed && (

<div
className="
absolute
-top-2
left-1/2
-transform
-translate-x-1/2
bg-red-600
text-white
text-[10px]
px-2
py-1
rounded-full
z-10
"
>

{timeExpired
? "TIME OVER"
: "CLOSED"}

</div>

)}

<button
disabled={isClosed}
onClick={() => {
setSlotTime(t)
setSlotIndex(i)
}}
className={`
min-w-[150px]
px-4
py-3
border
rounded-lg
transition

${
isClosed
? "bg-gray-300 text-gray-500 cursor-not-allowed"
: slotIndex === i
? "bg-blue-600 text-white"
: "bg-white"
}
`}
>

<div>{t}</div>
<div className="text-xs mt-1">

{timeExpired
? "Time Over"
: `${3 - slotBookings[t]} Slots Left`
}

</div>

</button>

</div>

)

})}

</div>

  {/* BOOK BUTTON */}
  {allSlotsClosed ? (

<div
className="
mt-6
bg-red-600
text-white
px-8
py-3
rounded-lg
font-bold
"
>
Doctor Unavailable
</div>

) : (

<button
onClick={() => {

if (!slotTime) {
alert("Select time first")
return
}

setShowPopup(true)

}}
className="
mt-6
bg-blue-600
text-white
px-6
py-3
rounded
"
>
Book Appointment
</button>

)}

  {showPopup && (
  <AppointmentPopup
    close={() => setShowPopup(false)}
    doctor={docInfo}
    slotTime={slotTime}
    date={selectedDate}
    isDemo={true}
  />
)}


</div>

      </div>

    </div>
  )
}

export default DemoDoctorDetails
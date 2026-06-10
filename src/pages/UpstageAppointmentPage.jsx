import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import AppointmentPopup from "../components/AppointmentPopup"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"


const UpstageAppointmentPage = () => {

  const { doctors } = useContext(AppContext)
  const { docId } = useParams()

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
  
  const allSlotsClosed = slots.every(
    slot => slotBookings[slot] >= 2
  )

  // ✅ GET DOCTOR
  useEffect(() => {
    if (!doctors || doctors.length === 0) return

    const doctor = doctors.find(
      d => d.email === decodeURIComponent(docId)
    )

    if (doctor) setDocInfo(doctor)
  }, [doctors, docId])

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
  
      snapshot.forEach((doc) => {
  
        const data = doc.data()
  
        // Pavithra doctor bookings mattum count
        if (data.doctorEmail === docInfo.email) {
  
          if (counts[data.time] !== undefined) {
            counts[data.time] += 1
          }
  
        }
  
      })
  
      setSlotBookings(counts)
    }
  
    loadSlotBookings()
  
  }, [docInfo])

  // ⛔ SAFE CHECK
  if (!docInfo) {
    return <h1 className="text-center mt-20">Loading...</h1>
  }

  return (
    <div>
      {/* 🔥 NAVBAR */}
      

      <div className="p-6">

        {/* 🔥 DOCTOR CARD */}
        <div className="flex flex-col md:flex-row gap-6 items-center">

          <img
            className="w-full max-w-[280px] md:w-72 h-[250px] md:h-[300px] object-cover rounded-xl bg-blue-500"
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt=""
          />

          <div className="w-full md:w-[500px] border rounded-xl p-6 shadow-sm text-center md:text-left">
            <h1 className="text-3xl font-bold">{docInfo.name}</h1>
            <p className="text-gray-600 mt-2">{docInfo.speciality}</p>
            <p className="text-gray-600 mt-2">
              {docInfo.experience || "5 Years Experience"}
            </p>
            <p className="mt-3 font-medium">Fee: ${docInfo.fees || 50}</p>
          </div>
        </div>

        {/* 🔥 SLOTS */}
        <div className="mt-10 flex flex-col items-center">

          <h2 className="text-xl text-blue-600">Booking Slots</h2>

          {/* DATE */}
          <div className="mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              {new Date().toDateString()}
            </button>
          </div>

          {/* TIME SLOTS */}
          <div className="flex flex-wrap justify-center gap-3 mt-4 w-full">

{slots.map((t, i) => {

const isClosed = slotBookings[t] >= 2

  return (
    <div key={i} className="relative">

      {isClosed && (
        <div
          className="
          absolute
          -top-2
          left-1/2
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
          CLOSED
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
        {2 - slotBookings[t]} Slots Left
        </div>
      </button>

    </div>
  )
})}

</div>

          {/* BUTTON */}
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
      alert("Select time first ❌")
      return
    }

    setShowPopup(true)
  }}
  className="
    mt-6
    bg-blue-600
    text-white
    px-8
    py-3
    rounded-lg
    w-full
    max-w-[250px]
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
  />
)}

        </div>

      </div>
    </div>
  )
}

export default UpstageAppointmentPage
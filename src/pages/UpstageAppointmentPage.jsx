import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import AppointmentPopup from "../components/AppointmentPopup"


const UpstageAppointmentPage = () => {

  const { doctors } = useContext(AppContext)
  const { docId } = useParams()

  const [docInfo, setDocInfo] = useState(null)
  const [slotTime, setSlotTime] = useState("")
  const [slotIndex, setSlotIndex] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  // ✅ GET DOCTOR
  useEffect(() => {
    if (!doctors || doctors.length === 0) return

    const doctor = doctors.find(
      d => d.email === decodeURIComponent(docId)
    )

    if (doctor) setDocInfo(doctor)
  }, [doctors, docId])

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
            src={docInfo.image}
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
          <div className="flex gap-3 flex-wrap justify-center mt-4">

            {["10:00am-11:00am", "1:00pm-2:00pm", "5:00pm-7:00pm"].map((t, i) => (
              <button
                key={i}
                onClick={() => {
                  setSlotTime(t)
                  setSlotIndex(i)
                }}
                className={`px-4 py-2 border rounded ${
                  slotIndex === i ? "bg-blue-600 text-white" : ""
                }`}
              >
                {t}
              </button>
            ))}

          </div>

          {/* BUTTON */}
          <button
            onClick={() => {
                if (!slotTime) return alert("Select time first ❌")
                setShowPopup(true)
              }}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
          >
            Book Appointment
          </button>

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
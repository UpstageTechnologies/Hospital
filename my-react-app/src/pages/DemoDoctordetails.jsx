import Navbar from "../components/Navbar"
import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import AppointmentPopup from "../components/AppointmentPopup"

const DemoDoctorDetails = () => {

  const { doctors } = useContext(AppContext)
  const { id } = useParams()

  const [docInfo, setDocInfo] = useState(null)
  const [slotTime, setSlotTime] = useState("")
  const [slotIndex, setSlotIndex] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  // 🔥 find doctor using email (since you use email in navigate)
  useEffect(() => {
    const doctor = doctors.find(doc => doc.email === id)
    if (doctor) setDocInfo(doctor)
  }, [doctors, id])

  if (!docInfo) return <h1>Loading...</h1>

  return (
    <div>

      <Navbar />

      <div className="p-6">

        {/* TOP UI (FIRST IMAGE STYLE 🔥) */}
        <div className='flex gap-6 items-stretch w-full'>
          <img
            className='w-72 h-[300px] object-cover rounded-xl bg-blue-500'
            src={docInfo.image}
          />

          <div className='w-[500px] border rounded-xl p-6 shadow-sm flex flex-col justify-center'>
            <h1 className='text-3xl font-bold'>{docInfo.name}</h1>
            <p className='text-gray-600 mt-2'>{docInfo.speciality}</p>
            <p className='text-gray-600 mt-2'>
              {docInfo.experience || "5 Years Experience"}
            </p>
            <p className='mt-3 font-medium'>Fee: ${docInfo.fees || 50}</p>
          </div>
        </div>

        {/* SLOTS */}
        <div className='mt-10 flex flex-col items-center'>
          <h2 className='text-xl text-blue-600'>Booking Slots</h2>

          <div className="mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Thu Apr 09 2026
            </button>
          </div>

          <div className="flex gap-3 flex-wrap justify-center mt-4">
            {["10:00am-11:00am", "1:00pm-2:00pm", "5:00pm-7:00pm"].map((t, i) => (
              <button
                key={i}
                onClick={() => {
                  setSlotTime(t)
                  setSlotIndex(i)
                }}
                className={`px-4 py-2 border rounded ${slotIndex === i ? "bg-blue-600 text-white" : ""
                  }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (!slotTime) return alert("Select time first")
              setShowPopup(true)
            }}
            className='mt-6 bg-blue-600 text-white px-6 py-3 rounded'
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

export default DemoDoctorDetails
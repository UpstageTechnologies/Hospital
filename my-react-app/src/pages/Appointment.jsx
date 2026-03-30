import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { db } from '../firebase'
import { doc, getDoc } from "firebase/firestore"
import { useNavigate } from 'react-router-dom'

const Appointment = () => {

  const navigate = useNavigate()

  const { doctors, currencySymbol } = useContext(AppContext)
  const { docId } = useParams()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState("")

  const decodedId = docId ? decodeURIComponent(docId).trim() : ""

  // ✅ CONTEXT MATCH (YOUR FIX)
  useEffect(() => {

    if (!doctors || doctors.length === 0) return

    const doctor = doctors.find(doc => doc.email === decodedId)

    if (doctor) {
      setDocInfo(doctor)
    }

  }, [doctors, decodedId])

  // ✅ FIREBASE FALLBACK (KEEP SIMPLE)
  useEffect(() => {

    const fetchDoctor = async () => {

      if (!decodedId) return

      const snap = await getDoc(doc(db, "doctors", decodedId))

      if (snap.exists()) {
        const data = snap.data()

        setDocInfo({
          id: decodedId,
          ...data
        })

        const slots = data.slots?.map(s => ({
          date: new Date(s.date),
          times: s.times || []
        })) || []

        setDocSlots(slots)
      }
    }

    if (!docInfo) fetchDoctor()

  }, [decodedId, docInfo])

  // ✅ OLD LOADING
  if (!docInfo) return <h1>Loading...</h1>

  return (
    <div className='p-4'>

      {/* OLD UI EXACT */}
      <div className='flex gap-6 items-stretch w-full'>

        {/* IMAGE */}
        <img
          className='w-72 h-[300px] object-cover rounded-xl bg-blue-500'
          src={docInfo.image}
          alt=""
        />

        {/* ✅ FULL HEIGHT + FULL WIDTH BOX */}
        <div className='flex-1 border rounded-xl p-6 shadow-sm flex flex-col justify-center'>

          <h1 className='text-3xl font-bold'>
            {docInfo.name}
          </h1>

          <p className='text-gray-600 mt-2'>
            {docInfo.speciality}
          </p>

          <p className='text-gray-600 mt-2'>
            {docInfo.experience || "5 Years Experience"}
          </p>

          <p className='mt-3 font-medium'>
            Fee: {currencySymbol}{docInfo.fees || 50}
          </p>

        </div>

      </div>

      <div className='mt-10 flex flex-col items-center'>

        <h2 className='text-xl text-blue-600'>Booking Slots</h2>

        {/* DATE */}
        <div className='flex gap-3 mt-5'>
          {docSlots.map((d, i) => (
            <button
              key={i}
              onClick={() => setSlotIndex(i)}
              className={`border px-4 py-2 rounded ${slotIndex === i ? 'bg-blue-600 text-white' : ''
                }`}
            >
              {d.date.toDateString()}
            </button>
          ))}
        </div>

        {/* TIME */}
        <div className='flex gap-3 mt-5 flex-wrap justify-center'>
          {docSlots[slotIndex]?.times.map((t, i) => (
            <button
              key={i}
              onClick={() => setSlotTime(t)}
              className={`px-4 py-2 border rounded ${slotTime === t ? 'bg-blue-600 text-white' : ''
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* BUTTON */}
        <button onClick={() => navigate('/patient-login')} className='mt-6 bg-blue-600 text-white px-6 py-3 rounded' >
          Book Appointment
        </button>

      </div>
    </div>
  )
}

export default Appointment
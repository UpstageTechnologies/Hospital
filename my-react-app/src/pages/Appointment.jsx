import React, { useContext, useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'


const Appointment = () => {

  const { docId } = useParams()
  const selectedHospital = localStorage.getItem("selectedHospital")

  const { doctors, currencySymbol } = useContext(AppContext)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  // ✅ FINAL FIXED MATCH LOGIC
  useEffect(() => {

    if (!doctors || doctors.length === 0) return;

    let doctor;

    if (selectedHospital) {
      const filteredDoctors = doctors.filter(doc =>
        doc.hospital?.toLowerCase().includes(selectedHospital)
      );
      doctor = filteredDoctors[Number(docId)];
    } else {
      // ✅ UPSTAGE case
      doctor = doctors[Number(docId)];
    }

    if (!doctor) {
      console.log("❌ Doctor not found:", docId);
      return;
    }

    setDocInfo({
      ...doctor,
      degree: doctor.degree || "MBBS",
      experience: doctor.experience || "4 Years",
      about: doctor.about || "Experienced doctor with strong commitment to patient care.",
      fees: doctor.fees || 50
    });

  }, [docId, doctors, selectedHospital]);

  const getAvailableSlots = () => {
    setDocSlots([])

    let today = new Date()

    for (let i = 0; i < 7; i++) {

      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      // ✅ TODAY மட்டும் special logic
      if (i === 0) {

        // current hour + 1
        let hour = today.getHours() + 1

        // minimum 10 AM
        if (hour < 10) hour = 10

        currentDate.setHours(hour)
        currentDate.setMinutes(today.getMinutes() > 30 ? 30 : 0)

      } else {
        // ✅ other days full slots
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {

        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => [...prev, timeSlots])
    }
  }

  useEffect(() => {
    if (docInfo) getAvailableSlots()
  }, [docInfo])

  // ✅ LOADING FIX
  if (!docInfo) return <h1>Loading...</h1>

  return (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-blue-500 w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>

          <p className='text-sm mt-2 text-gray-600'>
            {docInfo.degree} - {docInfo.speciality}
          </p>

          <p className='text-gray-500 mt-3'>
            {docInfo.about}
          </p>

          <p className='mt-4 font-medium'>
            Fee: {currencySymbol}{docInfo.fees}
          </p>
        </div>
      </div>

      <div className='mt-10 flex flex-col items-center max-w-3xl mx-auto'>

        <p className='text-xl font-semibold text-blue-600 mb-4'>
          Booking Slots
        </p>

        {/* 📅 DAYS */}
        <div className='flex flex-wrap justify-center gap-3 pb-2'>
          {docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`min-w-[60px] text-center p-3 rounded-lg cursor-pointer border transition-all
        ${slotIndex === index
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                }`}
            >
              <p className='text-sm'>
                {item[0] && ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][item[0].datetime.getDay()]}
              </p>
              <p className='font-medium'>
                {item[0]?.datetime.getDate()}
              </p>
            </div>
          ))}
        </div>

        {/* ⏰ TIME */}
        <div className='flex flex-wrap justify-center gap-3 mt-5'>
          {docSlots[slotIndex]?.map((item, index) => (
            <button
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`px-4 py-2 rounded-full border text-sm transition-all
        ${slotTime === item.time
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                }`}
            >
              {item.time}
            </button>
          ))}
        </div>

        {/* 🔥 BUTTON */}
        <div className='flex justify-center'>
          <button className='mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md transition-all hover:scale-105'>
            Book Appointment
          </button>
        </div>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment
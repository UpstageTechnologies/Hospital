import React, { useContext, useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { auth, db } from '../firebase'
import { doc, getDoc, setDoc } from "firebase/firestore"
import { collection, getDocs } from "firebase/firestore"


const Appointment = () => {

  const { docId } = useParams()
  const selectedHospital = localStorage.getItem("selectedHospital")

  const { doctors, currencySymbol } = useContext(AppContext)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const [showPopup, setShowPopup] = useState(false)
  const [patientData, setPatientData] = useState(null)
  const [appointmentNo, setAppointmentNo] = useState("")
  const [address, setAddress] = useState("")
  const [reason, setReason] = useState("")
  const [mobile, setMobile] = useState("")
  const [bookedSlots, setBookedSlots] = useState([])



  useEffect(() => {
    const fetchPatient = async () => {
      const user = auth.currentUser
      if (!user) return

      const snap = await getDoc(doc(db, "users", user.uid))
      if (snap.exists()) {
        const data = snap.data()

        setPatientData(data)

        // 🔥 AUTO FILL
        setMobile(data.mobile || data.phone || "")
        setAddress(data.address || "")
      }
    }

    fetchPatient()
  }, [])

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
      email: doctor.email,
      degree: doctor.degree || "MBBS",
      experience: doctor.experience || "4 Years",
      about: doctor.about || "Experienced doctor with strong commitment to patient care.",
      fees: doctor.fees || 50
    });

  }, [docId, doctors, selectedHospital]);

  useEffect(() => {

    const fetchDoctorSlots = async () => {

      if (!docInfo) return

      // 🔥 doctor email use பண்ணுறோம்
      const snap = await getDoc(doc(db, "doctors", docInfo.email))

      if (snap.exists()) {
        const data = snap.data()

        const slotArray = (data.slots || []).map(time => ({
          time
        }))

        setDocSlots([{
          date: new Date(),
          slots: slotArray
        }])// single day slots
      }

    }

    fetchDoctorSlots()

  }, [docInfo])



  useEffect(() => {

    const fetchBookedSlots = async () => {

      const snap = await getDocs(collection(db, "appointments"))

      let booked = []

      snap.forEach(doc => {
        const data = doc.data()

        if (data.doctorEmail === docInfo?.email) {
          booked.push(data.time)
        }
      })

      setBookedSlots(booked)
    }

    if (docInfo) fetchBookedSlots()

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
        {/* 📅 DATE */}
        <div className='flex gap-3 pb-2'>
          {docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`text-center py-4 px-6 rounded-lg cursor-pointer
      ${slotIndex === index
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300"
                }`}
            >
              <p>{item.date.toDateString().slice(0, 3)}</p>
              <p className='font-semibold'>
                {item.date.getDate()}
              </p>
            </div>
          ))}
        </div>

        {/* ⏰ TIME */}
        <div className='flex flex-wrap justify-center gap-3 mt-5'>
          {docSlots[slotIndex]?.slots.map((item, index) => {

            const isBooked = bookedSlots.includes(item.time)

            return (
              <button
                key={index}
                disabled={isBooked}
                onClick={() => setSlotTime(item.time)}
                className={`px-4 py-2 rounded-full
        ${isBooked
                    ? "bg-gray-300 text-gray-500"
                    : "border"
                  }`}
              >
                {isBooked ? "Booked" : item.time}
              </button>
            )
          })}
        </div>

        {/* 🔥 BUTTON */}
        <div className='flex justify-center'>
          <button
            onClick={async () => {

              if (!slotTime) {
                alert("Select time")
                return
              }

              // 🔥 get all appointments count
              const snap = await getDocs(collection(db, "appointments"))

              const count = snap.size + 1

              // 🔥 format AP001
              const formatted = "AP" + String(count).padStart(3, "0")

              setAppointmentNo(formatted)
              setShowPopup(true)
            }}
            className='mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg'
          >
            Book Appointment
          </button>
        </div>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

          <div className="bg-white p-6 rounded-xl w-[350px] shadow-lg">

            <h2 className="text-xl font-bold text-blue-600 mb-4">
              Confirm Appointment
            </h2>

            {/* ✅ NAME + IMAGE */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={patientData?.image || assets.profile_pic}
                className="w-12 h-12 rounded-full"
              />
              <p className="font-semibold text-lg">
                {patientData?.name || "Patient"}
              </p>
            </div>

            {/* ✅ SMALL APPOINTMENT NO */}
            <p className="mb-2 text-sm">
              Appointment No: <b>{appointmentNo}</b>
            </p>

            {/* ❗ ADDRESS INPUT (FIXED) */}
            <input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border w-full p-2 mb-2 rounded"
            />

            {/* ✅ MOBILE */}
            <input
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="border w-full p-2 mb-2 rounded"
            />

            {/* ✅ REASON */}
            <input
              placeholder="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="border w-full p-2 mb-4 rounded"
            />

            <div className="flex justify-between">

              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={async () => {

                  const user = auth.currentUser

                  await setDoc(doc(db, "appointments", appointmentNo), {
                    appointmentNo,
                    patientName: patientData?.name,
                    patientImage: patientData?.image || "",
                    address,
                    mobile,
                    reason,
                    doctorEmail: docInfo.email,
                    doctorName: docInfo.name,
                    time: slotTime,
                    userId: user.uid,
                    createdAt: new Date()
                  })

                  alert("Appointment Booked ✅")
                  setShowPopup(false)

                }}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default Appointment
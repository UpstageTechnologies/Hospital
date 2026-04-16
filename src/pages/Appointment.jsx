import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { db } from '../firebase'
import { doc, getDoc } from "firebase/firestore"
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { setDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"


const Appointment = () => {

  const navigate = useNavigate()

  const { doctors, currencySymbol } = useContext(AppContext)
  const { docId } = useParams()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotTime, setSlotTime] = useState("")

  const [showPopup, setShowPopup] = useState(false)
  const [step, setStep] = useState(1)

  const [patientName, setPatientName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [reason, setReason] = useState("")
  const [isBooked, setIsBooked] = useState(false)
  const [slotIndex, setSlotIndex] = useState(null)
  const [showRegister, setShowRegister] = useState(false)
  const [isRegister, setIsRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)



  // 🔥 NEW STATES
  const [userData, setUserData] = useState(null)
  const [appointmentNo, setAppointmentNo] = useState("")
  const selectedDate = new Date().toDateString()

  const decodedId = docId ? decodeURIComponent(docId).trim() : ""

  useEffect(() => {
    if (!doctors || doctors.length === 0) return
    const doctor = doctors.find(doc => doc.email === decodedId)
    if (doctor) setDocInfo(doctor)
  }, [doctors, decodedId])

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


      }
    }

    if (!docInfo) fetchDoctor()
  }, [decodedId, docInfo])



  useEffect(() => {
    if (step === 3 && !appointmentNo) {
      const random = Math.floor(Math.random() * 1000)
      const formatted = String(random).padStart(3, '0')
      setAppointmentNo(`API${formatted}`)
    }
  }, [step])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snap = await getDoc(doc(db, "users", user.uid))

        if (snap.exists()) {
          const data = snap.data()

          setPatientName(data.name)
          setPhone(data.phone)
          setAddress(data.address)
          setUserData(data)

        } else {
          setShowRegister(false)
        }
      }
    })

    return () => unsub()
  }, [])


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {

        setIsLoggedIn(true) // ✅ ADD THIS

        const snap = await getDoc(doc(db, "users", user.uid))

        if (snap.exists()) {
          const data = snap.data()

          setPatientName(data.name)
          setPhone(data.phone)
          setAddress(data.address)
          setUserData(data)
        }
      }
    })

    return () => unsub()
  }, [])

  useEffect(() => {
    const fetchSlots = async () => {
      const today = new Date().toISOString().split("T")[0]

      const snap = await getDoc(doc(db, "appointments", today))

      if (snap.exists()) {
        const data = snap.data()

        const formatted = [
          {
            date: today,
            times: data.slots.map(s => {
              const format = (t) => {
                let [h, m] = t.split(":")
                h = parseInt(h)

                let ampm = h >= 12 ? "PM" : "AM"

                let display = h % 12
                if (display === 0) display = 12

                return `${display}:${m}${ampm.toLowerCase()}`
              }

              return `${format(s.start)}-${format(s.end)}`
            })
          }
        ]

        setDocSlots(formatted)
      }
    }

    fetchSlots()
  }, [])

  if (!docInfo) return <h1>Loading...</h1>

  return (
    <div className='p-4'>

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

         <div className="bg-white w-[95%] md:w-[800px] max-h-[90vh] overflow-y-auto rounded-xl flex flex-col md:flex-row">

            {/* LEFT MENU */}
            <div className="w-full md:w-1/3 bg-blue-600 flex md:flex-col flex-row justify-around">
              <button
                onClick={() => setStep(1)}
                className={`p-2 rounded ${step === 1 ? "bg-white text-blue-600" : ""}`}
              >
                Login
              </button>
              <button onClick={() => setStep(2)} className={`p-2 rounded ${step === 2 ? "bg-white text-blue-600" : ""}`}>Reason</button>
              <button onClick={() => setStep(3)} className={`p-2 rounded ${step === 3 ? "bg-white text-blue-600" : ""}`}>Details</button>
            </div>

            {/* RIGHT */}
           <div className="w-full md:w-2/3 p-4 md:p-6">



              {isBooked ? (
                <div className="text-center mt-10">
                  <h2 className="text-2xl font-bold text-green-600 mb-4">
                    Appointment Booked ✅
                  </h2>

                  <p className="mb-4">
                    <b>Appointment No:</b> {appointmentNo}
                  </p>

                  {/* OK BUTTON */}
                  <button
                    onClick={() => {
                      setShowPopup(false)
                      setIsBooked(false)
                      setStep(1)
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded"
                  >
                    OK
                  </button>

                  {/* 👇 GAP + LINK */}
                  <p
                    onClick={() => navigate("/patient-dashboard")}
                    className="mt-4 text-blue-600 cursor-pointer underline"
                  >
                    Go to Dashboard
                  </p>
                </div>
              ) : (
                <>

                  {step === 1 && (

                    showRegister ? (

                      <>
                        <h2 className="text-xl font-bold mb-4">Create Account</h2>

                        <input id="name" placeholder="Full Name" autoComplete='off' className="border p-2 w-full mb-3" />
                        <input id="email" placeholder="Email" autoComplete="new-password" className="border p-2 w-full mb-3" />
                        <input id="password" type="password" placeholder="Password" className="border p-2 w-full mb-3" />
                        <input id="address" placeholder="Address" className="border p-2 w-full mb-3" />
                        <input id="phone" placeholder="Phone" className="border p-2 w-full mb-3" />
                        <select id="gender" className="border p-2 w-full mb-3">
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>

                        <button
                          onClick={async () => {
                            try {
                              const email = document.getElementById("email").value
                              const password = document.getElementById("password").value

                              const userCred = await import("firebase/auth").then(m =>
                                m.createUserWithEmailAndPassword(auth, email, password)
                              )

                              const user = userCred.user

                              const data = {
                                name: document.getElementById("name").value,
                                phone: document.getElementById("phone").value,
                                address: document.getElementById("address").value,
                                email: email
                              }

                              await setDoc(doc(db, "users", user.uid), {
                                uid: user.uid,
                                ...data
                              })

                              setUserData(data)
                              setPatientName(data.name)
                              setPhone(data.phone)
                              setAddress(data.address)

                              alert("Account Created ✅")
                              setShowRegister(false)

                            } catch (err) {
                              alert(err.message)
                            }
                          }}
                          className="bg-blue-600 text-white px-6 py-2 rounded w-full mb-3"
                        >
                          Create Account
                        </button>

                        <p className="text-sm text-center">
                          Already have account?{" "}
                          <span onClick={() => setShowRegister(false)} className="text-blue-600 cursor-pointer">
                            Login
                          </span>
                        </p>
                      </>

                    ) : (

                      <>
                        <h2 className="text-xl font-bold mb-4">Login</h2>

                        <input id="loginEmail" type="email" autoComplete='off' placeholder="Email" className="border p-2 w-full mb-3" />
                        <input id="loginPassword" type="password" autoComplete="new-password" placeholder="Password" className="border p-2 w-full mb-3" />

                        <button
                          onClick={async () => {
                            const email = document.getElementById("loginEmail").value
                            const password = document.getElementById("loginPassword").value

                            if (!email || !password) return alert("Fill all fields ❌")

                            await import("firebase/auth").then(m =>
                              m.signInWithEmailAndPassword(auth, email, password)
                            )

                            setIsLoggedIn(true)

                          }}
                          className="bg-blue-600 text-white px-6 py-2 rounded w-full mb-3"
                        >
                          Login
                        </button>

                        <button
                          onClick={async () => {
                            const provider = new GoogleAuthProvider()
                            const result = await signInWithPopup(auth, provider)
                            const user = result.user

                            const userData = {
                              name: user.displayName,
                              email: user.email,
                              phone: "",
                              address: ""
                            }

                            await setDoc(doc(db, "users", user.uid), {
                              uid: user.uid,
                              ...userData
                            }, { merge: true })

                            setUserData(userData)
                            setPatientName(userData.name)
                            setStep(2)
                          }}
                          className="border w-full py-2 rounded mb-3"
                        >
                          Sign in with Google
                        </button>

                        <p className="text-sm text-center mb-4">
                          Create an account?{" "}
                          <span onClick={() => setShowRegister(true)} className="text-blue-600 cursor-pointer">
                            Register here
                          </span>
                        </p>

                        <div className="flex justify-end">
                          <button
                            onClick={() => setStep(2)}
                            className="bg-blue-600 text-white px-6 py-2 rounded"
                          >
                            Next
                          </button>
                        </div>
                      </>

                    )

                  )}

                  {/* STEP 2 */}
                  {step === 2 && (
                    <>
                      <h2 className="text-xl font-bold mb-3">Reason</h2>

                      <textarea
                        placeholder="Enter reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="border p-3 w-full h-32 mb-4"
                      />

                      {/* ✅ FIXED BUTTON POSITION */}
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setStep(1)}
                          className="px-6 py-2 border rounded"
                        >
                          Previous
                        </button>

                        <button
                          onClick={() => {
                            if (!reason) return alert("Enter reason ❌")
                            setStep(3)
                          }}
                          className="bg-blue-600 text-white px-6 py-2 rounded"
                        >
                          Next
                        </button>
                      </div>
                    </>
                  )}

                  {/* STEP 3 */}
                  {step === 3 && (
                    <>
                      <h2 className="text-xl font-bold mb-4">Details</h2>

                      <p><b>Doctor:</b> {docInfo.name}</p>
                      <p><b>Patient:</b> {patientName}</p>
                      <p><b>Phone:</b> {phone}</p>
                      <p><b>Address:</b> {address}</p>
                      <p><b>Time:</b> {slotTime}</p>
                      <p><b>Date:</b> {selectedDate}</p>
                      <p><b>Reason:</b> {reason}</p>
                      <p><b>Appointment No:</b> {appointmentNo}</p>

                      {/* ✅ FIXED BUTTON ALIGNMENT */}
                      <div className="flex justify-end gap-3 mt-4">

                        <button
                          onClick={() => setStep(2)}
                          className="px-6 py-2 border rounded"
                        >
                          Previous
                        </button>

                        <button
                          onClick={async () => {
                            if (!patientName || !phone || !address || !reason || !slotTime) {
                              return alert("Fill all details ❌")
                            }

                            const appointmentData = {
                              doctorId: decodedId,
                              doctorName: docInfo.name,
                              patientName,
                              phone,
                              address,
                              date: selectedDate,
                              time: slotTime,
                              reason,
                              appointmentNo,
                              email: userData?.email,
                              createdAt: serverTimestamp()
                            }

                            await addDoc(collection(db, "appointments"), appointmentData)

                            setIsBooked(true)
                          }}
                          className="bg-green-600 text-white px-6 py-2 rounded"
                        >
                          Book
                        </button>

                      </div>
                    </>
                  )}



                </>
              )}

            </div>
          </div>
        </div>
      )}

      {/* DOCTOR UI */}
     <div className='flex flex-col md:flex-row gap-6 items-center md:items-stretch w-full'>
       <img className='w-full md:w-72 h-[250px] md:h-[300px] object-cover rounded-xl bg-blue-500' src={docInfo.image} alt="" />

        <div className='w-full md:w-[500px] border rounded-xl p-4 md:p-6 shadow-sm flex flex-col justify-center'>
          <h1 className='text-3xl font-bold'>{docInfo.name}</h1>
          <p className='text-gray-600 mt-2'>{docInfo.speciality}</p>
          <p className='text-gray-600 mt-2'>{docInfo.experience || "5 Years Experience"}</p>
          <p className='mt-3 font-medium'>Fee: {currencySymbol}{docInfo.fees || 50}</p>
        </div>
      </div>

      {/* SLOTS */}
     <div className='mt-6 md:mt-10 flex flex-col items-center px-2'>
        <h2 className='text-xl text-blue-600'>Booking Slots</h2>

        <div className='flex flex-col gap-6 mt-5'>
          {docSlots.map((slot, i) => (
            <div key={i} className="flex flex-col items-center gap-3">

             <h3 className="px-6 py-2 rounded text-base bg-blue-600 text-white">
                {new Date(slot.date).toDateString()}
              </h3>

              <div className="flex gap-3 flex-wrap justify-center">
                {slot.times?.map((t, j) => (
                  <button
                    key={j}
                    onClick={() => {
                      setSlotTime(t)
                      setSlotIndex(i)
                    }}
                    className={`px-4 py-2 border rounded ${slotIndex === i && slotTime === t ? 'bg-blue-600 text-white' : ''}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

            </div>
          ))}
        </div>

        <button
          onClick={() => {
            if (!slotTime) return alert("Select time first")
            setShowPopup(true)
          }}
         className='mt-6 bg-blue-600 text-white px-5 md:px-6 py-2 md:py-3 rounded text-sm md:text-base'
        >
          Book Appointment
        </button>
      </div>

    </div>
  )
}

export default Appointment
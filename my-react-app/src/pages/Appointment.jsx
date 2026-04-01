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

        const formattedSlots = [
          {
            date: new Date().toISOString().split("T")[0],
            times: data.slots || []
          }
        ]
        setDocSlots(formattedSlots)
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
         

          // 🔥 ADD THIS FIX
          setShowRegister(false)
        }
      }
    })

    return () => unsub()
  }, [])

  if (!docInfo) return <h1>Loading...</h1>

  return (
    <div className='p-4'>

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white w-[800px] rounded-xl flex overflow-hidden">

            {/* LEFT MENU */}
            <div className="w-1/3 bg-blue-600 text-white p-6 flex flex-col gap-4">
              <button onClick={() => setStep(1)} className={`p-2 rounded ${step === 1 ? "bg-white text-blue-600" : ""}`}>Login</button>
              <button onClick={() => setStep(2)} className={`p-2 rounded ${step === 2 ? "bg-white text-blue-600" : ""}`}>Reason</button>
              <button onClick={() => setStep(3)} className={`p-2 rounded ${step === 3 ? "bg-white text-blue-600" : ""}`}>Details</button>
            </div>

            {/* RIGHT */}
            <div className="w-2/3 p-6">

              {isBooked ? (
                <div className="text-center mt-10">
                  <h2 className="text-2xl font-bold text-green-600 mb-4">
                    Appointment Booked ✅
                  </h2>
                  <p className="mb-4"><b>Appointment No:</b> {appointmentNo}</p>

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
                </div>
              ) : (
                <>
                  {/* STEP 1 */}
                  {step === 1 && (

                    showRegister ? (
                      <>
                        <h2 className="text-xl font-bold mb-4">Create Account</h2>

                        <input id="name" placeholder="Full Name" className="border p-2 w-full mb-3" />
                        <input id="email" autoComplete="off" placeholder="Email" className="border p-2 w-full mb-3" />
                        <input id="password" autoComplete="new-password" placeholder="Password" type="password" className="border p-2 w-full mb-3" />
                        <input id="address" placeholder="Address" className="border p-2 w-full mb-3" />
                        <input id="phone" placeholder="Phone" className="border p-2 w-full mb-3" />
                        <div className="mb-3">
                          <label className="block mb-1">Gender</label>
                          <div className="flex gap-4">
                            <label><input type="radio" name="gender" value="Male" /> Male</label>
                            <label><input type="radio" name="gender" value="Female" /> Female</label>
                            <label><input type="radio" name="gender" value="Others" /> Others</label>
                          </div>
                        </div>

                        <button
                          onClick={async () => {
                            try {
                              const email = document.getElementById("email").value
                              const password = document.getElementById("password").value

                              const gender = document.querySelector('input[name="gender"]:checked')?.value || ""

                              const userCred = await import("firebase/auth").then(m =>
                                m.createUserWithEmailAndPassword(auth, email, password)
                              )

                              const user = userCred.user

                              const data = {
                                name: document.getElementById("name").value,
                                phone: document.getElementById("phone").value,
                                address: document.getElementById("address").value,
                                email: email,
                                 gender: gender
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

                        <input id="loginEmail" type="email" autoComplete="off" placeholder="Email" className="border p-2 w-full mb-3" />
                        <input id="loginPassword" type="password" autoComplete="new-password" placeholder="Password" className="border p-2 w-full mb-3" />

                        <button
                          onClick={async () => {
                            try {
                              const email = document.getElementById("loginEmail").value
                              const password = document.getElementById("loginPassword").value

                              await import("firebase/auth").then(m =>
                                m.signInWithEmailAndPassword(auth, email, password)
                              )

                              alert("Login Success ✅")
                              setStep(2)

                            } catch (err) {
                              alert(err.message)
                            }
                          }}
                          className="bg-blue-600 text-white px-6 py-2 rounded w-full mb-3"
                        >
                          Login
                        </button>

                        <button className="border w-full py-2 rounded mb-3">
                          Sign in with Google
                        </button>

                        <p className="text-sm text-center">
                          Create an account?{" "}
                          <span onClick={() => setShowRegister(true)} className="text-blue-600 cursor-pointer">
                            Register here
                          </span>
                        </p>
                      </>
                    )
                  )}

                  {/* STEP 2 */}
                  {step === 2 && (
                    <>
                      <h2 className="text-xl font-bold mb-4">Reason</h2>

                      <textarea
                        placeholder="Enter reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="border p-3 w-full h-32 mb-3"
                      />

                      <div className="flex justify-between">
                        <button onClick={() => setStep(1)} className="px-4 py-2 border rounded">Back</button>
                        <button onClick={() => setStep(3)} className="bg-blue-600 text-white px-6 py-2 rounded">Next</button>
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

                      <div className="flex justify-between mt-4">
                        <button onClick={() => setStep(2)} className="px-4 py-2 border rounded">Back</button>

                        <button
                          onClick={async () => {
                            try {

                              const appointmentData = {
                              doctorId: decodedId || "",
                                doctorName: docInfo?.name || "",
                                doctorImage: docInfo?.image || "",
                               doctorEmail: decodedId,
                                patientName: patientName,
                                phone: phone,
                                address: address,
                                email: userData?.email || "",
                                date: selectedDate,
                                time: slotTime,
                                reason: reason,
                                appointmentNo: appointmentNo,
                                createdAt: serverTimestamp()
                              }

                              await addDoc(collection(db, "appointments"), appointmentData)

                              setIsBooked(true)

                            } catch (error) {
                              console.log(error)
                              alert("Error booking appointment")
                            }
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
      <div className='flex gap-6 items-stretch w-full'>
        <img className='w-72 h-[300px] object-cover rounded-xl bg-blue-500' src={docInfo.image} alt="" />

        <div className='flex-1 border rounded-xl p-6 shadow-sm flex flex-col justify-center'>
          <h1 className='text-3xl font-bold'>{docInfo.name}</h1>
          <p className='text-gray-600 mt-2'>{docInfo.speciality}</p>
          <p className='text-gray-600 mt-2'>{docInfo.experience || "5 Years Experience"}</p>
          <p className='mt-3 font-medium'>Fee: {currencySymbol}{docInfo.fees || 50}</p>
        </div>
      </div>

      {/* SLOTS */}
      <div className='mt-10 flex flex-col items-center'>
        <h2 className='text-xl text-blue-600'>Booking Slots</h2>

        <div className='flex flex-col gap-6 mt-5'>
          {docSlots.map((slot, i) => (
            <div key={i} className="flex flex-col items-center gap-3">

              <h3 className="px-6 py-2 bg-blue-600 text-white rounded">
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
          className='mt-6 bg-blue-600 text-white px-6 py-3 rounded'
        >
          Book Appointment
        </button>
      </div>

    </div>
  )
}

export default Appointment
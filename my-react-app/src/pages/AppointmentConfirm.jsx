import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db, auth } from '../firebase'

import {
    doc,
    getDoc,
    addDoc,
    collection,
    getDocs,
    query,
    orderBy,
    limit
} from "firebase/firestore"

const AppointmentConfirm = () => {

    const location = useLocation()

    // ✅ doctor from previous page
    const doctor = location.state?.doctor

    const uid = auth.currentUser?.uid

    const [user, setUser] = useState(null)
    const [reason, setReason] = useState("")
    const [appointmentNo, setAppointmentNo] = useState("")

    // 🔥 GET USER DATA
    useEffect(() => {

        const fetchUser = async () => {

            if (!uid) {
                console.log("UID missing ❌")
                return
            }

            const snap = await getDoc(doc(db, "users", uid))

            if (snap.exists()) {
                setUser(snap.data())
            } else {
                console.log("User not found ❌")
            }
        }

        fetchUser()

    }, [uid])

    // 🔥 GENERATE APPOINTMENT NUMBER (API001)
    useEffect(() => {

        const generateNumber = async () => {

            try {
                const q = query(
                    collection(db, "appointments"),
                    orderBy("createdAt", "desc"),
                    limit(1)
                )

                const snap = await getDocs(q)

                if (snap.empty) {
                    setAppointmentNo("API001")
                } else {
                    const last = snap.docs[0].data().appointmentNo || "API000"

                    const num = parseInt(last.replace("API", "")) || 0

                    const next = num + 1

                    setAppointmentNo(`API${String(next).padStart(3, "0")}`)
                }

            } catch (err) {
                console.log(err)
                setAppointmentNo("API001")
            }
        }

        generateNumber()

    }, [])

    // 🔥 SAVE APPOINTMENT
    const handleBook = async () => {

        try {

            await addDoc(collection(db, "appointments"), {

                userId: uid,

                // 👤 PATIENT
                patientName: user.name || "",
                patientImage: user.image || "",
                address: user.address || "",
                phone: user.phone || "",

                // 👨‍⚕️ DOCTOR
                doctorName: doctor?.name || "",
                doctorId: doctor?.id || "",

                // 📄 DETAILS
                reason: reason,
                appointmentNo: appointmentNo,
                createdAt: new Date()
            })

            alert("Appointment Booked ✅")

        } catch (err) {
            console.log(err)
            alert("Error booking appointment ❌")
        }
    }

    if (!user) return <h1 className='text-center mt-10'>Loading...</h1>

    return (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>

            <div className='bg-white p-6 rounded-xl w-[400px]'>

                {/* 👤 PATIENT */}
                <div className='flex items-center gap-3'>
                    <img
                        src={user.image && user.image !== ""
                            ? user.image
                            : "https://ui-avatars.com/api/?name=" + user.name}
                        className="w-12 h-12 rounded-full object-cover"
                        alt="patient"
                    />
                    <h2 className='font-bold text-lg'>
                        {user.name}
                    </h2>
                </div>

                {/* 📍 ADDRESS */}
                <p className='mt-3'>
                    Address: {user.address || "------"}
                </p>

                {/* 📞 PHONE */}
                <p>
                    Phone: {user.phone || "------"}
                </p>

                {/* 👨‍⚕️ DOCTOR NAME ONLY */}
                {doctor && (
                    <p className='mt-3 font-medium'>
                        Doctor: {doctor.name}
                    </p>
                )}

                {/* 🔢 APPOINTMENT NUMBER */}
                <p className='mt-3 font-medium'>
                    Appointment No: {appointmentNo}
                </p>

                {/* 📝 REASON */}
                <textarea
                    placeholder='Reason...'
                    className='w-full border p-2 mt-3 rounded'
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />

                {/* 🔘 BUTTONS */}
                <div className='flex justify-between mt-4'>

                    <button className='border px-4 py-2 rounded'>
                        Edit
                    </button>

                    <button
                        onClick={handleBook}
                        className='bg-blue-600 text-white px-4 py-2 rounded'
                    >
                        Booked
                    </button>

                </div>

            </div>

        </div>
    )
}

export default AppointmentConfirm
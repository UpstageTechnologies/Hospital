import React, { useEffect, useState } from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore"

const DoctorProfile = () => {

    const [doctorData, setDoctorData] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [slots, setSlots] = useState([])
    const [newSlot, setNewSlot] = useState("")
    const [doctorImage, setDoctorImage] = useState("")
    const [appointments, setAppointments] = useState([])
    const [page, setPage] = useState("home")
    const [selected, setSelected] = useState(null)

    useEffect(() => {

        const email = localStorage.getItem("doctorEmail")
        if (!email) return

        const fetchData = async () => {
            const ref = doc(db, "doctors", email)
            const snap = await getDoc(ref)

            if (snap.exists()) {
                const data = snap.data()
                setDoctorData(data)
                setDoctorImage(data.image)
                setSlots(data.slots || [])
            }
        }

        fetchData()

    }, [])

    useEffect(() => {
        const fetchAppointments = async () => {

            const email = localStorage.getItem("doctorEmail")
            const snap = await getDocs(collection(db, "appointments"))

            let list = []

            snap.forEach(doc => {
                const data = doc.data()

                if (
                    data.doctorEmail === email ||
                    data.doctorId === email
                ) {
                    list.push(data)
                }
            })

            setAppointments(list)
        }

        fetchAppointments()
    }, [])

    if (!doctorData) return <p className="p-10">Loading...</p>

    return (

        <div className="flex min-h-screen">

            {/* LEFT PANEL */}
            <div className="w-64 bg-blue-600 text-white p-6">
                <h2 className="text-xl font-bold mb-6">Doctor Panel</h2>
                <p className="mb-3">Appointment Time</p>

                <p onClick={() => setPage("appointments")} className="mb-3 cursor-pointer">
                    Appointments
                </p>

                <p className="mb-3">Patients</p>
                <p className="mb-3">Profile</p>
            </div>

            {/* ================= APPOINTMENTS PAGE ================= */}
            {page === "appointments" && (
                <div className="p-8 w-full">

                    <h1 className="text-2xl font-bold mb-6">
                        Appointments
                    </h1>

                    {(() => {

                        const now = new Date()

                        const current = []
                        const old = []

                        appointments.forEach(item => {
                            const dateTime = new Date(`${item.date} ${item.time.split("-")[0]}`)

                            if (dateTime >= now) {
                                current.push(item)
                            } else {
                                old.push(item)
                            }
                        })

                        return (
                            <>
                                {/* 🔥 CURRENT (OUTSIDE) */}
                                <h2 className="text-lg font-semibold mb-3">Current Appointments</h2>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    {current.map((item, i) => (
                                        <div
                                            key={i}
                                            className="bg-white shadow p-4 rounded border border-green-300"
                                        >
                                            <p className="font-semibold">{item.patientName}</p>
                                            <p className="text-sm text-gray-500">{item.time}</p>
                                            <p className="text-xs text-gray-400">{item.appointmentNo}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* 🔥 OLD (CLICK → POPUP SAME) */}
                                <h2 className="text-lg font-semibold mb-3">Old Appointments</h2>

                                <div className="grid grid-cols-2 gap-4">
                                    {old.map((item, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setSelected(item)}
                                            className="bg-white shadow p-4 rounded cursor-pointer hover:scale-105 transition"
                                        >
                                            <p className="font-semibold">{item.patientName}</p>
                                            <p className="text-sm text-gray-500">{item.time}</p>
                                            <p className="text-xs text-gray-400">{item.appointmentNo}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )
                    })()}

                </div>
            )}

            {/* ================= HOME PAGE ================= */}
            {page === "home" && (
                <div className="p-8 w-full flex flex-col items-center">

                    <h1 className="text-4xl font-bold text-center">
                        Doctor Dashboard
                    </h1>

                    <p className="mt-2 text-gray-600 text-lg mb-8 text-center">
                        Welcome Doctor 👨‍⚕️
                    </p>

                    <img src={doctorImage} className="w-20 h-20 rounded-full mt-4" />

                    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow text-center">

                        <h3 className="text-lg font-semibold mb-4">
                            Set Available Slots
                        </h3>

                        <input
                            value={newSlot}
                            onChange={(e) => setNewSlot(e.target.value)}
                            placeholder="ex: 10:00 am"
                            className="border px-3 py-2 rounded w-full mb-3"
                        />

                        <button
                            onClick={async () => {

                                if (!newSlot) return

                                const email = localStorage.getItem("doctorEmail")
                                const updatedSlots = [...slots, newSlot]

                                setSlots(updatedSlots)

                                await updateDoc(doc(db, "doctors", email), {
                                    slots: updatedSlots
                                })

                                setNewSlot("")
                            }}
                            className="bg-blue-600 text-white px-6 py-2 rounded"
                        >
                            Add Slot
                        </button>

                    </div>

                    <div className="mt-8 w-full max-w-md text-center">

                        <h4 className="font-semibold mb-3">Your Slots</h4>

                        <div className="flex flex-wrap justify-center gap-2">

                            {slots.map((slot, index) => (
                                <div key={index} className="bg-blue-100 px-3 py-1 rounded-full flex gap-2">

                                    <span>{slot}</span>

                                    <button
                                        onClick={() => {
                                            setNewSlot(slot)
                                            setSlots(slots.filter((_, i) => i !== index))
                                        }}
                                        className="text-blue-600 text-xs"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={async () => {

                                            const updated = slots.filter((_, i) => i !== index)
                                            setSlots(updated)

                                            const email = localStorage.getItem("doctorEmail")

                                            await updateDoc(doc(db, "doctors", email), {
                                                slots: updated
                                            })

                                        }}
                                        className="text-red-500 text-xs"
                                    >
                                        X
                                    </button>

                                </div>
                            ))}

                        </div>

                    </div>

                </div>
            )}

            {/* ================= POPUP ================= */}
            {selected && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

                    <div className="bg-white w-[500px] rounded p-6 relative">

                        <button
                            onClick={() => setSelected(null)}
                            className="absolute top-2 right-3 text-xl"
                        >
                            ✖
                        </button>

                        <h2 className="text-xl font-bold text-center mb-4">
                            Appointment Details
                        </h2>

                        <p><b>Patient:</b> {selected.patientName}</p>
                        <p><b>Phone:</b> {selected.phone}</p>
                        <p><b>Address:</b> {selected.address}</p>
                        <p><b>Date:</b> {selected.date}</p>
                        <p><b>Time:</b> {selected.time}</p>
                        <p><b>Reason:</b> {selected.reason}</p>
                        <p><b>Appointment No:</b> {selected.appointmentNo}</p>

                    </div>
                </div>
            )}

        </div>
    )
}

export default DoctorProfile
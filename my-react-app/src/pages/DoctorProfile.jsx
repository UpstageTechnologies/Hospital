import React, { useEffect, useState } from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { collection, query, where } from "firebase/firestore"

const DoctorProfile = () => {

    const [doctorData, setDoctorData] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [slots, setSlots] = useState([])
    const [newSlot, setNewSlot] = useState("")
    const [doctorImage, setDoctorImage] = useState("")
    const [appointments, setAppointments] = useState([])

    useEffect(() => {

        const email = localStorage.getItem("doctorEmail")

        if (!email) return

        const fetchData = async () => {
            const ref = doc(db, "doctors", email)
            const snap = await getDoc(ref)

            if (snap.exists()) {
                const data = snap.data()

                setDoctorData(data)
                setDoctorImage(data.image) // 🔥 IMPORTANT
            }
        }

        fetchData()

    }, [])

    useEffect(() => {

        const fetchAppointments = async () => {

            const email = localStorage.getItem("doctorEmail")

            if (!email) return

            const q = query(
                collection(db, "appointments"),
                where("doctorId", "==", email)
            )

            const snap = await getDocs(q)

            const data = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            setAppointments(data)
        }

        fetchAppointments()

    }, [])

    if (!doctorData) return <p className="p-10">Loading...</p>

    const handleChange = (section, field, value) => {
        setDoctorData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }))
    }

    const handleSave = async () => {

        const email = localStorage.getItem("doctorEmail")
        const ref = doc(db, "doctors", email)

        await updateDoc(ref, doctorData)

        alert("Saved Successfully ")
        setIsEdit(false)
    }

    return (

        <div className="flex min-h-screen">

            <div className="w-64 bg-blue-600 text-white p-6">
                <h2 className="text-xl font-bold mb-6">Doctor Panel</h2>
                <p className="mb-3">Appointment Time</p>
                <p className="mb-3">Appointments</p>
                <p className="mb-3">Patients</p>
                <p className="mb-3">Profile</p>
            </div>


            <div className="p-8 w-full flex flex-col items-center">


                <h1 className="text-4xl font-bold text-center">
                    Doctor Dashboard
                </h1>

                <p className="mt-2 text-gray-600 text-lg mb-8 text-center">
                    Welcome Doctor 👨‍⚕️
                </p>

                <img src={doctorImage} alt="doctor" className="w-20 h-20 rounded-full object-cover mt-4" />


                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow text-center">

                    <h3 className="text-lg font-semibold mb-4">
                        Set Available Slots
                    </h3>

                    <input value={newSlot} onChange={(e) => setNewSlot(e.target.value)} placeholder="ex: 10:00 am"
                        className="border px-3 py-2 rounded w-full mb-3" />

                    <button onClick={async () => {

                        if (!newSlot) return

                        const email = localStorage.getItem("doctorEmail")

                        const updatedSlots = [...slots, newSlot]

                        setSlots(updatedSlots)

                        await updateDoc(doc(db, "doctors", email), {
                            slots: updatedSlots
                        })

                        setNewSlot("")
                    }}
                        className="bg-blue-600 text-white px-6 py-2 rounded">
                        Add Slot
                    </button>

                </div>


                <div className="mt-8 w-full max-w-md text-center">

                    <h4 className="text-md font-semibold mb-3">
                        Your Slots
                    </h4>

                    {slots.length === 0 ? (
                        <p className="text-gray-500 text-sm">No slots added</p>
                    ) : (
                        <div className="flex flex-wrap justify-center gap-2">

                            {slots.map((slot, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full"
                                >

                                    <span className="text-sm">{slot}</span>

                                    <button
                                        onClick={() => {
                                            setNewSlot(slot)
                                            setSlots(slots.filter((_, i) => i !== index))
                                        }}
                                        className="text-xs text-blue-600"
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
                                        className="text-xs text-red-500"
                                    >
                                        X
                                    </button>

                                </div>
                            ))}

                        </div>
                    )}

                </div>

                <div className="mt-10 w-full max-w-xl">

                    <h2 className="text-xl font-bold mb-4">Appointments</h2>

                    {appointments.length === 0 ? (
                        <p>No appointments</p>
                    ) : (
                        appointments.map((item, i) => (

                            <div key={i} className="border p-4 rounded mb-3">

                                <p><b>Patient:</b> {item.patientName}</p>
                                <p><b>Phone:</b> {item.phone}</p>
                                <p><b>Address:</b> {item.address}</p>
                                <p><b>Date:</b> {item.date}</p>
                                <p><b>Time:</b> {item.time}</p>
                                <p><b>Reason:</b> {item.reason}</p>
                                <p><b>Appointment No:</b> {item.appointmentNo}</p>

                            </div>

                        ))
                    )}

                </div>

            </div>

        </div>
    )
}

export default DoctorProfile



const Input = ({ label, value, isEdit, onChange }) => {

    return (
        <div className="grid grid-cols-[150px_1fr] items-center">
            <span className="font-semibold">{label} :</span>

            {isEdit ? (
                <input
                    value={value || ""}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                />
            ) : (
                <p>{value || "-"}</p>
            )}

        </div>
    )
}
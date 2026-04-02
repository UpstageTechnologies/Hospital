import React, { useEffect, useState } from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore"

const DoctorProfile = () => {

    const [doctorData, setDoctorData] = useState(null)
    const [slots, setSlots] = useState([])
    const [newSlot, setNewSlot] = useState("")
    const [doctorImage, setDoctorImage] = useState("")
    const [appointments, setAppointments] = useState([])
    const [page, setPage] = useState("home")
    const [selected, setSelected] = useState(null)


    const updateStatus = (appointmentNo, newStatus) => {

        const updated = appointments.map(item => {

            if (item.appointmentNo === appointmentNo) {
                return {
                    ...item,
                    status: newStatus   // 🔥 force update
                }
            }

            return item
        })

        setAppointments(updated)
        setSelected(null)
    }

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
                <p onClick={() => setPage("home")} className="mb-3 cursor-pointer">Home</p>

                <p onClick={() => setPage("appointments")} className="mb-3 cursor-pointer">
                    Appointments
                </p>

                <p onClick={() => setPage("profile")} className="mb-3 cursor-pointer">
                    Profile
                </p>
            </div>

            {/* ================= APPOINTMENTS PAGE ================= */}
            {page === "appointments" && (
                <div className="p-8 w-full">

                    <h1 className="text-2xl font-bold mb-6">
                        Appointments
                    </h1>

                    <br />

                    <h2 className="text-lg font-semibold mb-3">
                        Set Slot Timing
                    </h2>

                    {/* 👇 DOCTOR IMAGE */}
                    <img src={doctorImage} className="w-16 h-16 rounded-full mb-4" />

                    {/* 👇 SLOT BUTTONS */}
                    <div className="flex gap-3 flex-wrap mb-6 justify-center">

                        {[
                            "10:00am - 11:00am",
                            "11:00am - 12:00pm",
                            "2:00pm - 3:00pm",
                            "4:00pm - 5:00pm"
                        ].map((time, i) => (

                            <button
                                key={i}
                                onClick={async () => {
                                    const email = localStorage.getItem("doctorEmail")

                                    const updatedSlots = [...slots, time]

                                    setSlots(updatedSlots)

                                    await updateDoc(doc(db, "doctors", email), {
                                        slots: updatedSlots
                                    })
                                }}
                                className="px-4 py-2 border rounded-full hover:bg-blue-600 hover:text-white transition"
                            >
                                {time}
                            </button>

                        ))}

                    </div>

                    <h2 className="text-lg font-semibold mb-3">
                        Old Appointments
                    </h2>

                    <div className="grid grid-cols-2 gap-4">

                        {appointments.filter(item => {
                            const today = new Date(item.date)
                            const now = new Date()
                            return today < new Date(now.setHours(0, 0, 0, 0))
                        }).map((item, i) => (

                            <div key={i}
                                onClick={() => setSelected(item)}
                                className="bg-white shadow p-4 rounded cursor-pointer hover:scale-105 transition flex gap-4 items-center"
                            >

                                <img src={doctorImage} className="w-12 h-12 rounded-full" />

                                <div>
                                    <p className="font-semibold">{item.patientName}</p>
                                    <p className="text-sm text-gray-500">{item.time}</p>
                                    <p className="text-xs text-gray-400">{item.appointmentNo}</p>

                                    {/* ✅ STATUS */}
                                    <p className={`text-xs mt-1 
                                        ${item.status === "completed" && "text-green-600"}
                                        ${item.status === "cancelled" && "text-red-500"}
                                        ${!item.status && "text-yellow-500"}
                                    `}>
                                        {item.status ? item.status : "pending"}
                                    </p>

                                    {/* ✅ CANCEL */}
                                    <button onClick={(e) => {
                                        e.stopPropagation()
                                        updateStatus(item.appointmentNo, "cancelled")
                                    }}
                                        className="mt-2 text-red-500 text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </div>

                        ))}

                    </div>

                </div>
            )}


            {/* ================= HOME PAGE ================= */}
            {page === "home" && (
                <div className="p-8 w-full flex flex-col items-center">

                    <img src={doctorImage} className="w-24 h-24 rounded-full mb-4" />

                    <h1 className="text-3xl font-bold">{doctorData.name}</h1>

                    <h2 className="text-xl font-semibold mt-10 mb-4">
                        Current Appointments
                    </h2>

                    <div className="grid grid-cols-2 gap-4">

                        {appointments.filter(item => {
                            const today = new Date(item.date)
                            const now = new Date()
                            return today >= new Date(now.setHours(0, 0, 0, 0))
                                && item.status !== "completed"
                                && item.status !== "cancelled"
                        }).map((item, i) => (

                            <div key={i} className="bg-white shadow p-4 rounded border flex gap-4 items-center">

                                <img src={doctorImage} className="w-12 h-12 rounded-full" />

                                <div>
                                    <p className="font-semibold">{item.patientName}</p>
                                    <p className="text-sm text-gray-500">{item.time}</p>

                                    <button
                                        onClick={() => updateStatus(item.appointmentNo, "completed")}
                                        className="text-green-600 text-sm mt-1"
                                    >
                                        Complete
                                    </button>

                                </div>
                            </div>

                        ))}

                    </div>

                </div>
            )}

            {page === "profile" && (
                <div className="p-8 w-full flex flex-col items-center">

                    <img src={doctorImage} className="w-24 h-24 rounded-full mb-4" />

                    <h2 className="text-2xl font-bold">{doctorData.name}</h2>

                    <p className="text-gray-600">{doctorData.email}</p>

                </div>
            )}

            {/* ================= POPUP ================= */}
            {selected && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

                    <div className="bg-white w-[500px] rounded p-6 relative">

                        <button onClick={() => setSelected(null)} className="absolute top-2 right-3 text-xl">
                            ✖
                        </button>

                        <div className="flex items-center gap-3 mb-4">

                            <img src={doctorImage} className="w-12 h-12 rounded-full" />

                            <div>
                                <p className="font-semibold text-lg">
                                    {doctorData?.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Doctor
                                </p>
                            </div>

                        </div>

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


                        <div className="flex gap-2 mt-4">
                            <button onClick={() => updateStatus(selected.appointmentNo, "completed")} className="bg-green-500 text-white px-4 py-2 rounded w-full">
                                Complete
                            </button>

                            <button onClick={() => updateStatus(selected.appointmentNo, "cancelled")} className="bg-red-500 text-white px-4 py-2 rounded w-full">
                                Cancel
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}

export default DoctorProfile
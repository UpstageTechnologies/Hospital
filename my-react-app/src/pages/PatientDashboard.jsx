import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const PatientDashboard = () => {

    const [appointments, setAppointments] = useState([])
   
    const [selected, setSelected] = useState(null)

    const userEmail = localStorage.getItem("userEmail") // login time save பண்ணணும்

    useEffect(() => {
        const fetchAppointments = async () => {
            const snap = await getDocs(collection(db, "appointments"))

            let list = []

            snap.forEach(doc => {
                const data = doc.data()

                // ✅ only this patient data
                if (data.email === userEmail) {
                    list.push(data)
                }
            })

            setAppointments(list)
        }

        fetchAppointments()
    }, [])

    return (
        <div className="flex h-screen">

            {/* LEFT MENU */}
            <div className="w-1/5 bg-blue-600 text-white p-6">
                <h2 className="text-xl font-bold mb-6">Patient Panel</h2>
                <p className="mb-4 cursor-pointer">Home</p>
                <p className="mb-4 cursor-pointer font-bold">Appointments</p>
            </div>

            {/* RIGHT CONTENT */}
            <div className="w-4/5 p-6">

                <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

                {/* LIST */}
                <div className="grid grid-cols-2 gap-4">
                    {appointments.map((item, i) => (
                        <div key={i}
                            onClick={() => setSelected(item)}
                            className="border p-4 rounded cursor-pointer hover:bg-gray-100"
                        >
                            <p><b>Doctor:</b> {item.doctorName}</p>
                            <p><b>Time:</b> {item.time}</p>
                            <p><b>Appointment No:</b> {item.appointmentNo}</p>
                        </div>
                    ))}
                </div>

            </div>

            {/* POPUP */}
            {selected && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

                    <div className="bg-white w-[500px] rounded p-6 relative">

                        {/* CLOSE */}
                        <button onClick={() => setSelected(null)} className="absolute top-2 right-3 text-xl">
                            ✖
                        </button>

                        {/* IMAGE */}
                        <img src={selected.doctorImage} alt="" className="w-24 h-24 rounded-full mx-auto mb-4"/>

                        <h2 className="text-xl font-bold text-center mb-4">
                            Appointment Details
                        </h2>

                        <p><b>Doctor:</b> {selected.doctorName}</p>
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

export default PatientDashboard
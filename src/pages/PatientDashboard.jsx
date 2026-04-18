import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {

    const [appointments, setAppointments] = useState([])
    const [selected, setSelected] = useState(null)

    const [step, setStep] = useState(1)
    const [checkInTime, setCheckInTime] = useState(null)
    const [duration, setDuration] = useState(0)
    const [checkedOut, setCheckedOut] = useState(false)
    const navigate = useNavigate();

    const userEmail = auth.currentUser?.email

    useEffect(() => {
        const fetchAppointments = async () => {
            const snap = await getDocs(collection(db, "appointments"))

            let list = []
            snap.forEach(doc => {
                const data = doc.data()
                if (data.email === userEmail) {
                    list.push(data)
                }
            })

            setAppointments(list)
        }

        fetchAppointments()
    }, [])

    useEffect(() => {
        let interval
        if (checkInTime && !checkedOut) {
            interval = setInterval(() => {
                setDuration(Math.floor((Date.now() - checkInTime) / 1000))
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [checkInTime, checkedOut])

    return (
<div className="flex flex-col md:flex-row min-h-screen">

            {/* LEFT MENU */}
            <div className="hidden md:block w-1/5 bg-blue-600 text-white p-6">
                <h2 className="text-xl font-bold mb-6">Patient Panel</h2>
                <p className="mb-4 cursor-pointer">Home</p>
                <p className="mb-4 cursor-pointer font-bold">Appointments</p>
            </div>

            {/* RIGHT CONTENT */}
            <div className="w-full md:w-4/5 p-4 md:p-6 pb-20">

                <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

                <div className="grid grid-cols-2 gap-3 md:gap-4 justify-items-center">
                    {appointments.map((item, i) => (
                        <div key={i}
                            onClick={() => {
                                setSelected(item)
                                setStep(1)
                                setCheckInTime(null)
                                setDuration(0)
                                setCheckedOut(false)
                            }}
                            className="border p-3 rounded-xl cursor-pointer hover:bg-gray-100 max-w-[260px] mx-auto"
                        >
                            <p><b>Doctor:</b> {item.doctorName}</p>
                            <p><b>Time:</b> {item.time}</p>
                            <p><b>Appointment No:</b> {item.appointmentNo}</p>
                        </div>
                    ))}
                </div>

            </div>

            {/* ================= POPUP ================= */}
            {selected && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">

<div className="bg-white w-[95%] md:w-[900px] rounded-lg flex flex-col md:flex-row overflow-hidden max-h-[90vh] overflow-y-auto md:overflow-hidden">

                        {/* LEFT SIDEBAR */}
                        <div className="w-full md:w-1/4 bg-gray-100 p-3 md:p-4 flex flex-col gap-2">
                            <h2 className="font-bold text-lg">Appointment Panel</h2>

                            <button
                                onClick={() => setStep(1)}
                                className={`w-full p-2 rounded text-white whitespace-nowrap ${step === 1 ? "bg-blue-500" : "bg-gray-400"}`}
                            >
                                Patient Details
                            </button>

                            <button
                                onClick={() => {
                                    setStep(2)
                                    if (!checkInTime) setCheckInTime(Date.now())
                                }}
                                className={`min-w-[120px] md:w-full px-4 py-2 rounded text-white whitespace-nowrap ${step === 2 ? "bg-blue-500" : "bg-gray-400"}`}
                            >
                                Check-In
                            </button>

                            <button
                                onClick={() => setStep(3)}
                                className={`min-w-[120px] md:w-full px-4 py-2 rounded text-white whitespace-nowrap ${step === 3 ? "bg-blue-500" : "bg-gray-400"}`}
                            >
                                Pay
                            </button>

                        </div>

                        {/* RIGHT CONTENT */}
                        <div className="w-full md:w-3/4 p-4 md:p-6 flex flex-col justify-between">

                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-2 right-3 text-xl"
                            >
                                ✖
                            </button>

                            {/* STEP 1 */}
                            {step === 1 && (
                                <div className="flex flex-col h-full">

                                    <div className="flex justify-center mb-4">
                                        <img
                                            src={selected?.doctorImage}
                                            alt="doctor"
                                            className="w-20 h-20 rounded-full object-cover border"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold mb-6">
                                            Patient & Appointment Info
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                                            <div className="space-y-4">
                                                <input value={selected.patientName} disabled className="w-full border p-3 rounded-xl" />
                                                <input value={selected.phone} disabled className="w-full border p-3 rounded-xl" />
                                                <input value={selected.address} disabled className="w-full border p-3 rounded-xl" />
                                                <input value={selected.doctorName} disabled className="w-full border p-3 rounded-xl" />
                                            </div>

                                            <div className="space-y-4">
                                                <input value={selected.appointmentNo} disabled className="w-full border p-3 rounded-xl" />
                                                <input value={selected.date} disabled className="w-full border p-3 rounded-xl" />
                                                <input value={selected.time} disabled className="w-full border p-3 rounded-xl" />
                                            </div>

                                        </div>
                                    </div>

                                    {/* FIXED BUTTON */}
                                    <div className="flex flex-col md:flex-row justify-end gap-3 mt-6">

                                        <button
                                            onClick={() => navigate("/my-profile", { state: selected })}
                                            className="bg-green-600 text-white px-6 py-2 rounded"
                                        >
                                            View Profile
                                        </button>

                                        <button
                                            onClick={() => setStep(step + 1)}
                                            className="bg-blue-600 text-white px-6 py-2 rounded"
                                        >
                                            Next
                                        </button>

                                    </div>

                                </div>
                            )}

                            {/* STEP 2 */}
                            {step === 2 && (
                                <div className="flex flex-col h-full text-center">

                                    <div>
                                        <h3 className="text-lg font-bold mb-6">Consultation</h3>

                                        {!checkedOut ? (
                                            <>
                                                <p className="text-xl mb-4">⏱ {duration}s</p>

                                                <button
                                                    onClick={() => setCheckedOut(true)}
                                                    className="bg-red-500 text-white px-6 py-2 rounded mb-4"
                                                >
                                                    Check-Out
                                                </button>
                                            </>
                                        ) : (
                                            <p className="text-green-600 font-bold mb-4">
                                                Completed ✅ <br />
                                                Time: {duration}s
                                            </p>
                                        )}
                                    </div>

                                    {/* FIXED BUTTON */}
                                    <div className="flex justify-end gap-4 mt-6">

                                        <button
                                            onClick={() => setStep(step - 1)}
                                            className="bg-gray-400 text-white px-6 py-2 rounded"
                                        >
                                            Previous
                                        </button>

                                        <button
                                            onClick={() => setStep(step + 1)}
                                            className="bg-blue-600 text-white px-6 py-2 rounded"
                                        >
                                            Next
                                        </button>

                                    </div>
                                </div>
                            )}

                            {/* STEP 3 */}
                            {step === 3 && (
                                <div className="flex flex-col h-full">

                                    <div>
                                        <h3 className="text-lg font-bold mb-6">Payment</h3>

                                        <div className="space-y-4 max-w-md">
                                            <input value="Consultation Fee - ₹500" disabled className="w-full border p-3 rounded-xl" />
                                            <input value="Service Charge - ₹100" disabled className="w-full border p-3 rounded-xl" />
                                            <input value="Total - ₹600" disabled className="w-full border p-3 rounded-xl font-bold" />

                                            <button className="bg-blue-600 text-white px-6 py-2 rounded w-full">
                                                Pay Now
                                            </button>
                                        </div>
                                    </div>

                                    {/* FIXED BUTTON */}
                                    <div className="mt-auto flex justify-start pt-6">
                                        <button
                                            onClick={() => setStep(2)}
                                            className="bg-gray-400 text-white px-6 py-2 rounded"
                                        >
                                            Previous
                                        </button>
                                    </div>

                                </div>
                            )}

                        </div>

                    </div>

                </div>
            )}

            {/* MOBILE BOTTOM NAV */}
<div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around items-center py-2 md:hidden z-50">

<button onClick={() => navigate("/home")} className="flex flex-col items-center text-sm">
    🏠
    <span>Home</span>
</button>

<button onClick={() => navigate("/appointments")} className="flex flex-col items-center text-sm font-bold">
    📅
    <span>Appointments</span>
</button>

<button onClick={() => navigate("/my-profile")} className="flex flex-col items-center text-sm">
    👤
    <span>Profile</span>
</button>

<button className="flex flex-col items-center text-sm">
    ⚙️
    <span>Settings</span>
</button>

</div>

        </div>
    )
}

export default PatientDashboard
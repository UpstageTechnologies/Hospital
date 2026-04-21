import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const MasterAppointmentsDashboard = () => {

    const [appointments, setAppointments] = useState([])
    const [selected, setSelected] = useState(null)
    const [activePage, setActivePage] = useState("appointments")

    const [step, setStep] = useState(1)
    const [checkInTime, setCheckInTime] = useState(null)
    const [duration, setDuration] = useState(0)
    const [checkedOut, setCheckedOut] = useState(false)

    const navigate = useNavigate();

    // ✅ ALL appointments (no filter)
    useEffect(() => {
        const fetchAppointments = async () => {
            const snap = await getDocs(collection(db, "appointments"))

            let list = []
            snap.forEach(doc => {
                list.push(doc.data())
            })

            setAppointments(list)
        }

        fetchAppointments()
    }, [])

    // ⏱ timer logic (same as patient)
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

            {/* ✅ SIDEBAR (ONLY 3 OPTIONS) */}
            <div className="hidden lg:block w-1/5 bg-blue-600 text-white p-6">
                <h2 className="text-xl font-bold mb-6">Master Panel</h2>
                <p 
  onClick={() => setActivePage("home")}
  className="mb-4 cursor-pointer"
>
  Home
</p>

<p 
  onClick={() => setActivePage("subscription")}
  className="mb-4 cursor-pointer"
>
  Subscription
</p>

<p 
  onClick={() => setActivePage("appointments")}
  className="mb-4 cursor-pointer font-bold"
>
  Appointments
</p>
            </div>

            {/* ✅ RIGHT CONTENT */}
            <div className="w-full md:w-4/5 p-4 md:p-6 pb-20">

            <h1 className="text-2xl font-bold mb-6">
  {activePage === "home" && "Home"}
  {activePage === "subscription" && "Subscription"}
  {activePage === "appointments" && "All Appointments"}
</h1>

{/* 🔥 STEP-5 — இதை இங்க add பண்ணு */}

{activePage === "home" && (
  <div className="text-xl font-semibold mb-4">
    Welcome Home
  </div>
)}

{activePage === "subscription" && (
  <div className="text-xl font-semibold mb-4">
    Subscription Page
  </div>
)}



{activePage === "appointments" && (
  <div className="grid grid-cols-2 gap-3 md:gap-4 justify-items-center">
    {appointments
      .filter(
        (item) =>
          item.patientName &&
          item.doctorName &&
          item.date &&
          item.time
      )
      .map((item, i) => (
        <div key={i}
          className="border p-3 rounded-xl max-w-[260px]"
        >
          <p><b>Patient:</b> {item.patientName}</p>
          <p><b>Doctor:</b> {item.doctorName}</p>
          <p><b>Date:</b> {item.date}</p>
          <p><b>Time:</b> {item.time}</p>
        </div>
      ))}
  </div>
)}

            </div>

            {/* ================= POPUP ================= */}
            {selected && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">

                    <div className="bg-white w-[95%] md:w-[900px] rounded-lg flex flex-col md:flex-row overflow-hidden max-h-[90vh]">

                        {/* LEFT PANEL */}
                        <div className="w-full md:w-1/4 bg-gray-100 p-4 flex flex-col gap-2">
                            <h2 className="font-bold text-lg">Appointment Panel</h2>

                            <button onClick={() => setStep(1)}
                                className={`p-2 rounded text-white ${step === 1 ? "bg-blue-500" : "bg-gray-400"}`}>
                                Details
                            </button>

                            <button onClick={() => {
                                setStep(2)
                                if (!checkInTime) setCheckInTime(Date.now())
                            }}
                                className={`p-2 rounded text-white ${step === 2 ? "bg-blue-500" : "bg-gray-400"}`}>
                                Check-In
                            </button>

                            <button onClick={() => setStep(3)}
                                className={`p-2 rounded text-white ${step === 3 ? "bg-blue-500" : "bg-gray-400"}`}>
                                Payment
                            </button>
                        </div>

                        {/* RIGHT CONTENT */}
                        <div className="w-full md:w-3/4 p-6 relative">

                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-2 right-3 text-xl"
                            >
                                ✖
                            </button>

                            {/* STEP 1 */}
                            {step === 1 && (
                                <>
                                    <div className="flex justify-center mb-4">
                                        <img
                                            src={selected?.doctorImage}
                                            alt="doctor"
                                            className="w-20 h-20 rounded-full border"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <input value={selected.patientName} disabled className="border p-2 rounded" />
                                        <input value={selected.doctorName} disabled className="border p-2 rounded" />
                                        <input value={selected.date} disabled className="border p-2 rounded" />
                                        <input value={selected.time} disabled className="border p-2 rounded" />
                                    </div>
                                </>
                            )}

                            {/* STEP 2 */}
                            {step === 2 && (
                                <div className="text-center">
                                    {!checkedOut ? (
                                        <>
                                            <p className="text-xl mb-4">⏱ {duration}s</p>
                                            <button
                                                onClick={() => setCheckedOut(true)}
                                                className="bg-red-500 text-white px-6 py-2 rounded"
                                            >
                                                Check-Out
                                            </button>
                                        </>
                                    ) : (
                                        <p className="text-green-600 font-bold">
                                            Completed ✅ ({duration}s)
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* STEP 3 */}
                            {step === 3 && (
                                <div>
                                    <p className="mb-2">Total: ₹600</p>
                                    <button className="bg-blue-600 text-white px-6 py-2 rounded">
                                        Pay
                                    </button>
                                </div>
                            )}

                        </div>

                    </div>

                </div>
            )}

            {/* ✅ MOBILE BOTTOM NAV */}
<div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 lg:hidden z-50">

<button 
    onClick={() => navigate("/master-dashboard")}
    className="flex flex-col items-center text-sm"
>
    🏠
    <span>Home</span>
</button>

<button 
    onClick={() => navigate("/master-dashboard")}
    className="flex flex-col items-center text-sm"
>
    💳
    <span>Subscription</span>
</button>

<button 
    onClick={() => navigate("/master-dashboard")}
    className="flex flex-col items-center text-sm"
>
    📅
    <span>Appointments</span>
</button>

</div>

        </div>
    )
}

export default MasterAppointmentsDashboard;
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {

    const [appointments, setAppointments] = useState([])
    const [selected, setSelected] = useState(null)
    const [currentAppointments, setCurrentAppointments] = useState([])
    const [historyAppointments, setHistoryAppointments] = useState([])
    const [step, setStep] = useState(1)
    const [checkInTime, setCheckInTime] = useState(null)
    const [duration, setDuration] = useState(0)
    const [checkedOut, setCheckedOut] = useState(false)
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("appointments")

    const savedUser = JSON.parse(
        localStorage.getItem("currentUser")
        );
        
        const userEmail = savedUser?.email;

        useEffect(() => {

            const fetchAppointments = async () => {
          
              const snap = await getDocs(collection(db, "appointments"))
          
              let list = []
          
              snap.forEach(doc => {
                const data = doc.data()
          
                console.log("DATA:", data)
                console.log("USER:", userEmail)
          
                if (
                  data?.patientEmail &&
                  userEmail &&
                  data.patientEmail.toLowerCase() === userEmail.toLowerCase()
                ) {
                  list.push(data)
                }
              })
          
              console.log("FINAL LIST:", list)
              setAppointments(list);
          
            }
          
            if (userEmail) {
              fetchAppointments()
            }
          
          }, [userEmail])

          useEffect(() => {

            const now = new Date()
          
            let current = []
            let history = []
          
            appointments.forEach(item => {
          
              if (!item.date || !item.time) return;
          
              const datePart = new Date(item.date)
          
              const endTime = item.time.split("-")[1]?.trim()
              if (!endTime) return;
          
              const [time, modifier] = endTime.match(/(\d+:\d+)(am|pm)/i).slice(1)
          
              let [hours, minutes] = time.split(":").map(Number)
          
              if (modifier.toLowerCase() === "pm" && hours !== 12) {
                hours += 12
              }
              if (modifier.toLowerCase() === "am" && hours === 12) {
                hours = 0
              }
          
              const fullDateTime = new Date(datePart)
              fullDateTime.setHours(hours, minutes, 0, 0)
          
              if (fullDateTime >= now) {
                current.push(item)
              } else {
                history.push(item)
              }
          
            })
          
            setCurrentAppointments(current)
            setHistoryAppointments(history)
          
          }, [appointments])
        
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
                <p 
  className="mb-4 cursor-pointer"
  onClick={() => setActiveTab("appointments")}
>
  Appointments
</p>

<p 
  className="mb-4 cursor-pointer"
  onClick={() => setActiveTab("history")}
>
  Appointment History
</p>
            </div>

            {/* RIGHT CONTENT */}
            <div className="w-full md:w-4/5 p-4 md:p-6 pb-20">

            {activeTab === "appointments" && (
  <>
    <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

    <div className="grid grid-cols-2 gap-2 md:gap-2 lg:gap-3">
      {currentAppointments
        .filter(item => item.doctorName && item.time)
        .map((item, i) => (
          <div
            key={i}
            onClick={() => setSelected(item)}
            className="bg-white shadow-md p-4 rounded-xl cursor-pointer hover:scale-105 transition w-full max-w-[250px]"
          >
            <p className="font-bold text-lg">{item.doctorName}</p>
            <p className="text-gray-600">{item.date}</p>
            <p className="text-gray-600">{item.time}</p>
          </div>
        ))}
    </div>
  </>
)}


{activeTab === "history" && (
  <>
    <h1 className="text-2xl font-bold mb-6">
      Appointment History
    </h1>

    <div className="grid grid-cols-2 gap-2 md:gap-3">
      {historyAppointments.map((item, i) => (
        <div
          key={i}
          className="border p-3 rounded-xl bg-gray-100 max-w-[220px]"
        >
          <p><b>Doctor:</b> {item.doctorName}</p>
          <p><b>Time:</b> {item.time}</p>
          <p><b>Appointment No:</b> {item.appointmentNo}</p>
        </div>
      ))}
    </div>
  </>
)}
            </div>

            {/* ================= POPUP ================= */}
            {selected && (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white w-[95%] md:w-[650px] rounded-2xl shadow-2xl p-8 relative">

{/* CLOSE */}
<button
onClick={()=>setSelected(null)}
className="absolute top-4 right-5 text-2xl font-bold"
>
✖
</button>

{/* Doctor Image */}
<div className="flex flex-col items-center mb-8">

<img
src={selected.doctorImage}
alt=""
className="w-28 h-28 rounded-full border object-cover"
/>

<h2 className="text-3xl font-bold mt-4">
Dr. {selected.doctorName}
</h2>

<p className="text-gray-500">
Consulting Doctor
</p>

</div>


<h3 className="text-2xl font-bold mb-6">
Patient Full Details
</h3>

<div className="grid md:grid-cols-2 gap-5">

<div className="border rounded-xl p-4">
<b>Patient Name:</b><br/>
{selected.patientName}
</div>

<div className="border rounded-xl p-4">
<b>Phone:</b><br/>
{selected.phone}
</div>

<div className="border rounded-xl p-4">
<b>Address:</b><br/>
{selected.address}
</div>

<div className="border rounded-xl p-4">
<b>Appointment No:</b><br/>
{selected.appointmentNo}
</div>

<div className="border rounded-xl p-4">
<b>Date:</b><br/>
{selected.date}
</div>

<div className="border rounded-xl p-4">
<b>Time:</b><br/>
{selected.time}
</div>

</div>


<div className="flex justify-end mt-8">

<div className="flex justify-end gap-4 mt-8">

<button
onClick={()=>{
localStorage.setItem(
"selectedPatient",
JSON.stringify(selected)
);
navigate("/my-profile");
}}
className="bg-green-600 text-white px-6 py-3 rounded-lg"
>
View Profile
</button>

<button
onClick={()=>setSelected(null)}
className="bg-blue-600 text-white px-8 py-3 rounded-lg"
>
Close
</button>

</div>

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
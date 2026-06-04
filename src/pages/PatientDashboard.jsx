import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";
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

    useEffect(() => {

      const handleBack = () => {
    
        const confirmLogout =
          window.confirm(
            "Are you sure you want to logout?"
          );
    
        if (confirmLogout) {
    
          localStorage.clear();
    
          navigate("/select-hospital", {
            replace: true
          });
    
        } else {
    
          window.history.pushState(
            null,
            "",
            window.location.href
          );
    
        }
    
      };
    
      window.history.pushState(
        null,
        "",
        window.location.href
      );
    
      window.addEventListener(
        "popstate",
        handleBack
      );
    
      return () => {
    
        window.removeEventListener(
          "popstate",
          handleBack
        );
    
      };
    
    }, []);



    const [activeTab, setActiveTab] = useState("home")

    const savedUser = JSON.parse(
        localStorage.getItem("currentUser")
        );
        console.log("CURRENT USER =", savedUser);
        console.log(savedUser)
        
        const userEmail = savedUser?.email;
        console.log("USER EMAIL =", userEmail);
        console.log("CURRENT USER =", savedUser);
console.log("USER EMAIL =", userEmail);

        useEffect(() => {

            const fetchAppointments = async () => {
          
              const snap = await getDocs(collection(db, "appointments"))
          
              let list = []
          
              snap.forEach(doc => {
                const data = doc.data()
          
                console.log("FIREBASE DATA =", data);
console.log("PATIENT EMAIL =", data.patientEmail);
console.log("LOGIN EMAIL =", userEmail);
          
const appointmentEmail =
data.patientEmail ||
data.email ||
data.patientMail;

if (
appointmentEmail &&
userEmail &&
appointmentEmail.trim().toLowerCase() ===
userEmail.trim().toLowerCase()
) {

list.push({
  id: doc.id,
  ...data
});

}
              })
          
              console.log("FINAL LIST:", list)
              console.log("USER EMAIL =", userEmail);
console.log("APPOINTMENTS =", list);
console.log("MATCHED APPOINTMENTS =", list);
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
          
              const datePart = new Date(
                item.date.replace(/-/g, "/")
              )
          
              const endTime = item.time.split("-")[1]?.trim()
              if (!endTime) return;
          
              const match =
endTime.match(/(\d+:\d+)(am|pm)/i);

if (!match) return;

const [, time, modifier] = match;
          
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
            console.log("CURRENT =", current);
console.log("HISTORY =", history);
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

    const handlePrint = (item) => {

      const printWindow = window.open("", "_blank")
    
      printWindow.document.write(`
        <html>
          <head>
            <title>Patient Report</title>
    
            <style>
            body{
              font-family: Arial;
              padding:20px;
            }

            
            
            @media(max-width:600px){
            
              body{
                padding:10px;
              }
            
              h1{
                font-size:22px;
              }
            
              p{
                font-size:14px;
              }
            
              .box{
                padding:10px;
              }
            
            }
    
              h1{
                text-align:center;
                color:#2563eb;
              }
    
              .box{
                border:1px solid #ccc;
                padding:15px;
                margin-bottom:15px;
                border-radius:10px;
              }
    
              p{
                font-size:18px;
                margin:8px 0;
              }
    
            </style>
    
          </head>
    
          <body>
    
            <h1>Patient Appointment Report</h1>
    
            <div class="box">
              <p><b>Patient Name:</b> ${item.patientName || "Sundar"}</p>
    
              <p><b>Age:</b> ${item.age || "25"}</p>
    
              <p><b>Address:</b> ${item.address || "Madurai"}</p>
    
              <p><b>City:</b> ${item.city || "Madurai"}</p>
    
              <p><b>Doctor Name:</b> ${item.doctorName}</p>
    
              <p><b>Date:</b> ${item.date}</p>
    
              <p><b>Time:</b> ${item.time}</p>
    
              <p><b>Reason:</b> ${item.reason || ""}</p>
    
              <p><b>Injection:</b> ${item.injection || ""}</p>
    
              <p><b>Tablet:</b> ${item.tablet || ""}</p>
    
              <p><b>Doctor Notes:</b> ${item.notes || ""}</p>
    
              <p><b>Appointment No:</b> ${item.appointmentNo}</p>
            </div>
    
          </body>
        </html>
      `)
    
      printWindow.document.close()
      printWindow.print()
    }

    const handleCancelAppointment = async (id) => {

      const confirmCancel = window.confirm(
        "Are you sure want to cancel appointment?"
      )
    
      if (!confirmCancel) return
    
      try {
    
        await deleteDoc(doc(db, "appointments", id))
    
        setCurrentAppointments((prev) =>
          prev.filter((item) => item.id !== id)
        )
    
        setSelected(null)
    
        alert("Appointment Cancelled ✅")
    
      } catch (err) {
    
        console.log(err)
    
        alert("Cancel Failed ❌")
      }
    }

    const getMedicalData = (reason) => {

      const text = (reason || "").toLowerCase()
    
      if (text.includes("fever")) {
        return {
          injection: "Paracetamol Injection",
          tablet: "Dolo 650",
          notes: "Take rest and drink more water"
        }
      }
    
      if (text.includes("head")) {
        return {
          injection: "Diclofenac Injection",
          tablet: "Saridon",
          notes: "Avoid stress and take proper sleep"
        }
      }
    
      if (text.includes("knee")) {
        return {
          injection: "Pain Relief Injection",
          tablet: "Aceclofenac",
          notes: "Avoid heavy walking"
        }
      }
    
      if (text.includes("hiv")) {
        return {
          injection: "ART Injection",
          tablet: "Antiviral Tablet",
          notes: "Regular monitoring required"
        }
      }
    
      return {
        injection: "General Injection",
        tablet: "Vitamin Tablet",
        notes: "Follow doctor advice"
      }
    }

    return (
<div className="flex flex-col md:flex-row min-h-screen">

            {/* LEFT MENU */}
            <div className="hidden md:block w-1/5 bg-blue-600 text-white p-6">
                <h2 className="text-xl font-bold mb-6">Patient Panel</h2>
                <p
  className="mb-4 cursor-pointer"
  onClick={() => setActiveTab("home")}
>
  Home
</p>
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


{activeTab === "home" && (

<>
{/* Health Overview */}

<div className="mt-10">

  <h2 className="text-2xl font-bold mb-5">
    Health Overview
  </h2>

  <div
    className="
    grid
    grid-cols-2
    lg:grid-cols-4
    gap-4
    "
  >

    <div className="bg-blue-600 text-white rounded-2xl p-5 shadow">
      <p className="text-sm">
        Upcoming Appointments
      </p>

      <p className="text-3xl font-bold mt-2">
        {currentAppointments.length}
      </p>
    </div>

    <div className="bg-green-600 text-white rounded-2xl p-5 shadow">
      <p className="text-sm">
        Appointment History
      </p>

      <p className="text-3xl font-bold mt-2">
        {historyAppointments.length}
      </p>
    </div>

    <div className="bg-purple-600 text-white rounded-2xl p-5 shadow">
      <p className="text-sm">
        Doctors Consulted
      </p>

      <p className="text-3xl font-bold mt-2">
        {
          new Set(
            appointments.map(
              item => item.doctorName
            )
          ).size
        }
      </p>
    </div>

    <div className="bg-orange-500 text-white rounded-2xl p-5 shadow">
      <p className="text-sm">
        Health Status
      </p>

      <p className="text-3xl font-bold mt-2">
        Active
      </p>
    </div>

  </div>

</div>

{/* Patient Summary */}

<div
  className="
  mt-8
  bg-white
  rounded-2xl
  shadow
  p-6
  "
>

  <h2
    className="
    text-2xl
    font-bold
    mb-6
    "
  >
    Patient Summary
  </h2>

  <div
    className="
    grid
    grid-cols-1
    md:grid-cols-2
    gap-6
    "
  >

    <div
      className="
      border
      rounded-xl
      p-5
      "
    >
      <h3 className="font-bold text-xl mb-4">
        🏥 Hospital Services
      </h3>

      <ul className="space-y-3 text-lg">
        <li>Doctor Consultation</li>
        <li>Lab Test Booking</li>
        <li>Emergency Care</li>
        <li>Pharmacy Support</li>
      </ul>
    </div>

    <div
      className="
      border
      rounded-xl
      p-5
      "
    >
      <h3 className="font-bold text-xl mb-4">
        📋 Health Tips
      </h3>

      <ul className="space-y-3 text-lg">
        <li>Drink 3L Water Daily</li>
        <li>Sleep 8 Hours</li>
        <li>Exercise 30 Minutes</li>
        <li>Regular Health Checkup</li>
      </ul>
    </div>

  </div>

</div>
</>

)}


{activeTab === "history" && (

<div>

<h1 className="text-3xl font-bold mb-6">
Appointment History
</h1>


<div className="hidden md:block bg-white rounded-2xl shadow overflow-x-auto">

<table className="w-full">

<thead className="bg-blue-600 text-white">

<tr>
<th className="p-4 text-left">Patient</th>
<th className="p-4 text-left">Doctor</th>
<th className="p-4 text-left">Address</th>
<th className="p-4 text-left">Date</th>
<th className="p-4 text-left">Time</th>
<th className="p-4 text-left">Reason</th>
<th className="p-4 text-left">Contact</th>
<th className="p-4 text-left">Action</th>
</tr>

</thead>

<tbody>

{historyAppointments.map((item,index)=>(

<tr
key={index}
className="border-b"
>

<td className="p-4">
{item.patientName}
</td>

<td className="p-4">
{item.doctorName}
</td>

<td className="p-4">
{item.address}
</td>

<td className="p-4">
{item.date}
</td>

<td className="p-4">
{item.time}
</td>

<td className="p-4">
{item.reason}
</td>

<td className="p-4">
{item.phone || item.patientPhone || "-"}
</td>



<td className="p-4">

<button
onClick={() => handlePrint(item)}
className="bg-purple-600 text-white px-4 py-2 rounded-xl"
>
Print
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

{/* MOBILE + TABLET */}

<div className="md:hidden space-y-4">

{historyAppointments.map((item,index)=>(

<div
key={index}
className="bg-white rounded-2xl shadow p-4"
>

<p>
<b>Patient :</b> {item.patientName}
</p>

<p>
<b>Doctor :</b> {item.doctorName}
</p>

<p>
<b>Appointment No :</b> {item.appointmentNo || "-"}
</p>

<p>
<b>Contact :</b> {item.phone || item.patientPhone || "-"}
</p>

<p>
<b>Address :</b> {item.address || "-"}
</p>

<p>
<b>Date :</b> {item.date}
</p>

<p>
<b>Time :</b> {item.time}
</p>

<p>
<b>Reason :</b> {item.reason}
</p>

<div className="mt-4">

<button
onClick={() => handlePrint(item)}
className="
w-full
bg-purple-600
text-white
py-3
rounded-xl
"
>
Print
</button>

</div>

</div>

))}

</div>

</div>

)}
            </div>

{/* ================= POPUP ================= */}
{selected && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 md:p-6">

    <div className="
      bg-white 
      w-full 
      max-w-3xl
      max-h-[92vh] 
      overflow-y-auto 
      rounded-3xl 
      shadow-2xl 
      relative
      animate-fadeIn
    ">

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setSelected(null)}
        className="
          absolute 
          top-4 right-4 
          bg-gray-100
          hover:bg-red-500
          hover:text-white
          w-10 h-10
          rounded-full
          text-lg
          font-bold
          transition
        "
      >
        ✕
      </button>

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-3xl px-6 py-8 text-white">

        <div className="flex flex-col items-center">

          <img
            src={
              selected.doctorImage ||
              "/Doctors/doc1.png"
            }
            alt=""
            className="
              w-24 h-24 
              md:w-28 md:h-28
              rounded-full 
              border-4 border-white
              object-cover
              shadow-lg
            "
          />

          <h2 className="text-2xl md:text-3xl font-bold mt-4 text-center">
            Dr. {selected.doctorName}
          </h2>

          <p className="text-blue-100 text-sm md:text-base mt-1">
            Consulting Doctor
          </p>

        </div>

      </div>

      {/* BODY */}
      <div className="p-5 md:p-8">

        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          Patient Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* CARD */}
          <div className="bg-gray-50 border rounded-2xl p-4">
            <p className="text-sm text-gray-500 mb-1">
              Patient Name
            </p>

            <h4 className="font-semibold text-lg">
              {selected.patientName}
            </h4>
          </div>

          <div className="bg-gray-50 border rounded-2xl p-4">
            <p className="text-sm text-gray-500 mb-1">
              Phone
            </p>

            <h4 className="font-semibold text-lg">
            {selected.phone || "-"}
            </h4>
          </div>

          <div className="bg-gray-50 border rounded-2xl p-4">
            <p className="text-sm text-gray-500 mb-1">
              Reason
            </p>

            <h4 className="font-semibold text-lg">
            {selected.reason || "-"}
            </h4>
          </div>

          <div className="bg-gray-50 border rounded-2xl p-4">
            <p className="text-sm text-gray-500 mb-1">
              Address
            </p>

            <h4 className="font-semibold text-lg">
            {selected.address}
            </h4>
          </div>

          <div className="bg-gray-50 border rounded-2xl p-4">
            <p className="text-sm text-gray-500 mb-1">
              Appointment No
            </p>

            <h4 className="font-semibold text-lg">
            {selected.appointmentNo || "-"}
            </h4>
          </div>

          <div className="bg-gray-50 border rounded-2xl p-4">
            <p className="text-sm text-gray-500 mb-1">
              Date
            </p>

            <h4 className="font-semibold text-lg">
              {selected.date}
            </h4>
          </div>

          <div className="bg-gray-50 border rounded-2xl p-4 md:col-span-2">
            <p className="text-sm text-gray-500 mb-1">
              Time
            </p>

            <h4 className="font-semibold text-lg">
              {selected.time}
            </h4>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="
          flex 
          flex-col 
          sm:flex-row 
          gap-4 
          justify-end 
          mt-8
          pb-4
        ">

          <button
            onClick={() =>
              handleCancelAppointment(selected.id)
            }
            className="
              bg-red-600 
              hover:bg-red-700
              text-white 
              px-6 py-3 
              rounded-xl 
              font-semibold
              transition
              w-full sm:w-auto
            "
          >
            Cancel Appointment
          </button>

          <button
            onClick={() => setSelected(null)}
            className="
              bg-blue-600 
              hover:bg-blue-700
              text-white 
              px-8 py-3 
              rounded-xl 
              font-semibold
              transition
              w-full sm:w-auto
            "
          >
            Close
          </button>

        </div>

      </div>

    </div>

  </div>
)}

            {/* MOBILE BOTTOM NAV */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg flex justify-around items-center py-3 md:hidden z-50">

{/* HOME */}
<button
  onClick={() => setActiveTab("home")}
  className="flex flex-col items-center text-xs"
>
  <span className="text-xl">🏠</span>
  <span>Home</span>
</button>

{/* APPOINTMENTS */}
<button
  onClick={() => setActiveTab("appointments")}
  className={`flex flex-col items-center text-xs ${
    activeTab === "appointments"
      ? "text-blue-600 font-bold"
      : "text-black"
  }`}
>
  <span className="text-xl">📅</span>
  <span>Appointments</span>
</button>

{/* HISTORY */}
<button
  onClick={() => setActiveTab("history")}
  className={`flex flex-col items-center text-xs ${
    activeTab === "history"
      ? "text-blue-600 font-bold"
      : "text-black"
  }`}
>
  <span className="text-xl">📜</span>
  <span>History</span>
</button>

</div>

        </div>
    )
}

export default PatientDashboard
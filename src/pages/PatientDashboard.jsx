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
                  list.push({
                    id: doc.id,
                    ...data
                  })
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
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">
        Appointment History
      </h1>

    </div>

    <div className="w-full overflow-x-scroll scrollbar-thin pb-24">

    <table className="min-w-[1400px] border border-gray-300 text-sm md:text-base bg-white">

        <thead className="bg-blue-600 text-white">

          <tr>

            <th className="border p-3">Date</th>

            <th className="border p-3">Doctor</th>

            <th className="border p-3">Time</th>

            <th className="border p-3">Reason</th>

            <th className="border p-3">Injection</th>

            <th className="border p-3">Tablet</th>

            <th className="border p-3">Doctor Notes</th>

            <th className="border p-3">Appointment No</th>

            <th className="border p-4 min-w-[180px]">Actions</th>

          </tr>

        </thead>

        <tbody>

        {historyAppointments.map((item, i) => {

const medical = getMedicalData(item.reason)

return (

            <tr key={i} className="text-center">

              {/* DATE */}
              <td className="border p-3">
                {item.date}
              </td>

              {/* DOCTOR */}
              <td className="border p-3">
                {item.doctorName}
              </td>

              {/* TIME */}
              <td className="border p-3">
                {item.time}
              </td>

              {/* REASON */}
              <td className="border p-3">
                <textarea
                  defaultValue={item.reason || ""}
                  className="border p-2 rounded w-full"
                />
              </td>

              {/* INJECTION */}
              <td className="border p-3">
                <input
                  type="text"
                  value={medical.injection}
readOnly
                  placeholder="Injection"
                  className="border p-2 rounded w-full"
                />
              </td>

              {/* TABLET */}
              <td className="border p-3">
                <input
                  type="text"
                  value={medical.tablet}
readOnly
                  placeholder="Tablet"
                  className="border p-2 rounded w-full"
                />
              </td>

              {/* NOTES */}
              <td className="border p-3">
                <textarea
                  value={medical.notes}
                  readOnly
                  placeholder="Doctor Notes"
                  className="border p-2 rounded w-full"
                />
              </td>

              {/* APPOINTMENT NO */}
              <td className="border p-3 font-bold">
                {item.appointmentNo}
              </td>

              {/* ACTIONS */}
              <td className="border p-3">

              <div className="flex flex-col gap-3 min-w-[120px]">

                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={() => alert("Updated Successfully ✅")}
                  >
                    Save
                  </button>

                  <button
                    onClick={() => handlePrint(item)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Print
                  </button>

                </div>

              </td>

            </tr>

)
})}

        </tbody>

      </table>

    </div>
  </>
)}
            </div>

            {/* ================= POPUP ================= */}
            {selected && (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white w-[95%] md:w-[650px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-4 md:p-8 relative">

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
className="w-24 h-24 md:w-28 md:h-28 rounded-full border object-cover"
/>

<h2 className="text-xl md:text-3xl font-bold mt-4 text-center">
Dr. {selected.doctorName}
</h2>

<p className="text-gray-500">
Consulting Doctor
</p>

</div>


<h3 className="text-2xl font-bold mb-6">
Patient Full Details
</h3>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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

<div className="flex flex-col md:flex-row justify-end gap-4 mt-8">

<button
  onClick={() =>
    handleCancelAppointment(selected.id)
  }
  className="bg-red-600 text-white px-6 py-3 rounded-lg"
>
  Cancel Appointment
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
            <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg flex justify-around items-center py-3 md:hidden z-50">

{/* HOME */}
<button
  onClick={() => navigate("")}
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
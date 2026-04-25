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

    const savedUser = JSON.parse(
        localStorage.getItem("currentUser")
        );
        
        const userEmail = savedUser?.email;

        useEffect(() => {

            const fetchAppointments = async () => {
            
            const snap = await getDocs(
            collection(db,"appointments")
            );
            
            let list=[];
            
            snap.forEach(doc=>{
            const data = doc.data();
            
            if(data.email === userEmail){
            list.push(data);
            }
            
            });
            
            setAppointments(list);
            
            };
            
            if(userEmail){
            fetchAppointments();
            }
            
            },[userEmail]);
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
                {appointments
.filter(item =>
  item.doctorName &&
  item.time &&
  item.appointmentNo
)
.map((item, i) => (
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
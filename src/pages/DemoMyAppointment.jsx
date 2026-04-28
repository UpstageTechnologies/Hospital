import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import DashboardNavbar from "../components/DashboardNavbar";

const DemoMyAppointment = () => {

const { appointments, user, doctors } = useContext(AppContext);

const [selected,setSelected] = useState(null);

if(!user){
return(
<>
<DashboardNavbar/>
<p className="mt-10 text-center">
Login pannunga
</p>
</>
)
}

const userAppointments = appointments;

return(
<>
<DashboardNavbar/>

<div className="p-6 min-h-screen">

<h1 className="text-3xl font-bold mb-8">
My Appointments
</h1>


{/* Appointment Boxes */}
<div className="grid md:grid-cols-2 gap-6">

{userAppointments.length===0 && (
<p>No Appointments Found</p>
)}

{userAppointments.map((item,index)=>{

const doctor=doctors.find(
d=>d.id===item.doctorId
);

return(

<div
key={index}
onClick={()=>setSelected({
...item,
doctor
})}
className="
border rounded-xl p-5
shadow-sm cursor-pointer
hover:shadow-lg hover:bg-gray-50
"
>

<div className="text-center py-6 font-semibold text-lg">
View Appointments
</div>

</div>

)

})}

</div>


{/* Popup */}
{selected && (

<div className="
fixed inset-0 bg-black/40
flex items-center justify-center
z-50
">

<div className="
bg-white
w-[85%] md:w-[420px]
max-h-[80vh] overflow-y-auto
rounded-2xl shadow-2xl
p-4 relative
">

<button
onClick={()=>setSelected(null)}
className="absolute top-4 right-5 text-2xl"
>
✖
</button>


<div className="text-center mb-4">

<img
src={selected.doctor?.image || '/user.png'}
className="
w-14 h-14 rounded-full
mx-auto border
"
/>

<h2 className="text-3xl font-bold mt-4">
Dr. {selected.doctor?.name}
</h2>

<p className="text-gray-500">
{selected.doctor?.speciality}
</p>

</div>


<h3 className="text-2xl font-bold mb-5">
Patient Full Details
</h3>


<div className="grid md:grid-cols-2 gap-3">

<div className="border p-3 rounded-xl">
<b>Patient Name:</b><br/>
{user.name}
</div>

<div className="border p-3 rounded-xl">
<b>Doctor Name:</b><br/>
{selected.doctor?.name}
</div>

<div className="border p-3 rounded-xl">
<b>Date:</b><br/>
{selected.date}
</div>

<div className="border p-3 rounded-xl">
<b>Time:</b><br/>
{selected.time}
</div>

<div className="border p-3 rounded-xl">
<b>Address:</b><br/>
{selected.doctor?.address?.line1}
<br/>
{selected.doctor?.address?.line2}
</div>

<div className="border p-3 rounded-xl">
<b>Status:</b><br/>
Confirmed
</div>

</div>


{/* Payment */}
<div className="mt-4 border rounded-xl p-4">

<h2 className="text-xl font-bold mb-4">
Payment Details
</h2>

<p className="mb-2">
Consultation Fee: ₹600
</p>

<p className="mb-4">
Status:
<span className={
selected.isPaid
? " text-green-600 font-bold"
: " text-red-500 font-bold"
}>
{selected.isPaid ? " Paid" : " Pending"}
</span>
</p>

{!selected.isPaid && (
<button
className="
bg-green-600 text-white
px-6 py-3 rounded-lg
"
onClick={()=>alert("Payment Gateway Integrate pannalam")}
>
Pay Now
</button>
)}

</div>


<div className="flex justify-end mt-6">

<button
onClick={()=>setSelected(null)}
className="
bg-blue-600 text-white
px-6 py-3 rounded-lg
"
>
Close
</button>

</div>

</div>

</div>

)}

</div>

</>
)

}

export default DemoMyAppointment;
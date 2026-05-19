import React, { useState } from "react";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import PatientProfileView from "./PatientProfileView";



const TodayVisitors = ({ appointments }) => {

const [startDate,setStartDate] =
useState("");

const [endDate,setEndDate] =
useState("");

const [filteredAppointments,
setFilteredAppointments] =
useState([]);

const [isFiltered,
setIsFiltered] =
useState(false);

const [selectedPatient,
    setSelectedPatient] =
    useState(null);

const today =
new Date().toISOString().split("T")[0];

const todayAppointments =
appointments.filter((item)=>{

try {

if(!item.date)
return false;

const bookingDate =
new Date(item.date)
.toISOString()
.split("T")[0];

return bookingDate === today;

} catch {

return false;

}

});

const filterAppointments = (
start,
end
) => {

const startObj =
new Date(start);

const endObj =
new Date(end);

const filtered =
appointments.filter((item)=>{

try {

if(!item.date)
return false;

const bookingDate =
new Date(item.date);

bookingDate.setHours(0,0,0,0);

return (
bookingDate >= startObj &&
bookingDate <= endObj
);

} catch {

return false;

}

});

setFilteredAppointments(filtered);

};

const handleGenerate = () => {

if(!startDate || !endDate){

alert(
"Select Start & End Date"
);

return;

}

filterAppointments(
startDate,
endDate
);

setIsFiltered(true);

};

const groupedAppointments = {};

(
isFiltered
? filteredAppointments
: todayAppointments
).forEach((item)=>{

const dateKey = item.date;

if(!groupedAppointments[dateKey]){

groupedAppointments[dateKey] = [];

}

groupedAppointments[dateKey].push(item);

});

return (

    <>

<div className="
w-full
p-2
sm:p-4
md:p-5
lg:p-6
">

{/* TOP FILTER */}
<div className="
bg-white
shadow-lg
rounded-3xl
p-4
sm:p-5
mb-8
border
">

<h1 className="
text-2xl
sm:text-3xl
font-bold
mb-5
">
Appointment
</h1>

<div className="
grid
grid-cols-1
md:grid-cols-3
gap-4
">

{/* START DATE */}
<div>

<label className="
font-semibold
block
mb-2
text-sm
">
Start Date
</label>

<input
type="date"
value={startDate}
onChange={(e)=>
setStartDate(e.target.value)
}
className="
w-full
border
rounded-2xl
p-3
outline-none
"
/>

</div>

{/* END DATE */}
<div>

<label className="
font-semibold
block
mb-2
text-sm
">
End Date
</label>

<input
type="date"
value={endDate}
onChange={(e)=>
setEndDate(e.target.value)
}
className="
w-full
border
rounded-2xl
p-3
outline-none
"
/>

</div>

{/* BUTTON */}
<div className="
flex
items-end
">

<button
onClick={handleGenerate}
className="
w-full
bg-blue-600
hover:bg-blue-700
text-white
font-semibold
rounded-2xl
p-3
transition
"
>
Generate
</button>

</div>

</div>

</div>

{/* APPOINTMENTS */}

{
Object.keys(groupedAppointments)
.length > 0 ? (

Object.entries(groupedAppointments)
.map(([date,patients])=>(

<div
key={date}
className="mb-10"
>

{/* DATE HEADING */}
<div className="
flex
items-center
gap-3
mb-5
">

<div className="
h-[2px]
bg-blue-500
flex-1
"></div>

<h2 className="
text-xl
sm:text-2xl
font-bold
text-blue-600
whitespace-nowrap
">
{date}
</h2>

<div className="
h-[2px]
bg-blue-500
flex-1
"></div>

</div>

{/* CARD GRID */}
<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
2xl:grid-cols-4
gap-4
">

{patients.map((item,index)=>(

<motion.div
layout
key={index}
transition={{
duration:0.5
}}
className={`
bg-white
rounded-2xl
shadow-lg
border
transition-all
duration-500
relative
overflow-hidden

${
selectedPatient?.appointmentNo === item.appointmentNo
? "p-6 col-span-1 sm:col-span-2 lg:col-span-3 2xl:col-span-4"
: "p-4"
}
`}
>

{/* TOP BAR */}
<div className="
absolute
top-0
left-0
w-full
h-1.5
bg-blue-600
"></div>

{/* PROFILE */}
<div className="
flex
items-center
gap-3
mb-4
mt-2
">

<img
src={
item.patientImage ||
assets.profile_pic
}
alt=""
className="
w-14
h-14
rounded-full
object-cover
border-2
border-blue-100
"
/>

<div className="flex-1">

<h2 className="
text-lg
font-bold
break-words
leading-tight
">
{item.patientName}
</h2>

<p className="
text-gray-500
text-sm
break-words
">
{item.reason ||
"General Checkup"}
</p>

</div>

</div>



{
selectedPatient?.appointmentNo !== item.appointmentNo && (

<>

{/* DETAILS */}
<div className="
space-y-2
text-[14px]
">

<div className="
flex
justify-between
border-b
pb-2
gap-2
">

<span className="font-semibold">
No
</span>

<span className="text-right">
{item.appointmentNo}
</span>

</div>

<div className="
flex
justify-between
border-b
pb-2
gap-2
">

<span className="font-semibold">
Time
</span>

<span className="text-right">
{item.time}
</span>

</div>

<div className="
flex
justify-between
border-b
pb-2
gap-2
">

<span className="font-semibold">
Phone
</span>

<span className="text-right">
{item.phone}
</span>

</div>

<div className="
flex
justify-between
gap-2
">

<span className="font-semibold">
Doctor
</span>

<span className="text-right">
{item.doctorName}
</span>

</div>

</div>

{/* BUTTON */}
<div className="mt-4">

<button
onClick={()=>
setSelectedPatient(item)
}
className="
w-full
bg-green-500
hover:bg-green-600
text-white
py-2.5
rounded-xl
font-semibold
transition
text-sm
"
>
View
</button>

</div>

</>

)
}

{
selectedPatient?.appointmentNo === item.appointmentNo && (

<div className="mt-6">

<PatientProfileView
patient={item}
onClose={()=>{
setSelectedPatient(null);
}}
onSave={()=>{
window.location.reload();
}}
/>

</div>

)
}


</motion.div>

))}

</div>

</div>

))

) : (

<div className="
text-center
text-gray-400
text-2xl
font-semibold
mt-20
">
{
isFiltered
? "No Appointments Found"
: "No Today Appointments"
}
</div>

)

}

</div>


</>

);

};

export default TodayVisitors;
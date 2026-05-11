import React, { useState } from "react";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";

const PatientProfileView = ({
    patient,
    onSave,
    onClose
    }) => {

const [solution,setSolution] =
useState("");

const [tablet,setTablet] =
useState("");

const handleSave = () => {

const updatedPatient = {

...patient,
reasonNotes: patient.reason,
solution,
tablet

};

console.log(
"UPDATED PATIENT : ",
updatedPatient
);



const oldPatients =
JSON.parse(
localStorage.getItem("patientsData")
) || [];

oldPatients.push(updatedPatient);

localStorage.setItem(
"patientsData",
JSON.stringify(oldPatients)
);

alert("Saved Successfully");
onSave && onSave();

};

return (

<AnimatePresence>

<motion.div

initial={{
opacity:0,
x:100
}}

animate={{
opacity:1,
x:0
}}

exit={{
opacity:0,
x:100
}}

transition={{
duration:0.4
}}

className="
w-full
animate-fadeIn
"

>

<div className="
w-full
">

<motion.div

initial={{
x:500
}}

animate={{
x:0
}}

exit={{
x:500
}}

transition={{
duration:0.4
}}

className="
bg-white
w-[90%]
mx-auto
shadow-xl
rounded-3xl
border
p-4
sm:p-5
overflow-hidden
"

>

<button
onClick={onClose}
className="
absolute
top-3
right-3
w-8
h-8
rounded-full
bg-red-500
text-white
font-bold
z-50
"
>
×
</button>

{/* HEADER */}
<div className="
flex
flex-col
lg:flex-row
gap-8
">

{/* LEFT SIDE */}
<div className="
w-full
lg:w-[30%]
">

<div className="
bg-[#0F4C5C]
rounded-3xl
overflow-hidden
shadow-xl
">

<div className="
p-6
flex
flex-col
items-center
text-white
">

<img
src={
patient.patientImage ||
assets.profile_pic
}
alt=""
className="
w-32
h-32
rounded-full
object-cover
border-4
border-white
shadow-lg
"
/>

<h1 className="
text-3xl
font-bold
mt-4
text-center
">
{patient.patientName}
</h1>

<p className="
text-lg
opacity-90
mt-1
">
Patient Profile
</p>

</div>

<div className="
bg-[#145E73]
p-5
text-white
space-y-4
">

<div className="
flex
justify-between
gap-4
">

<span className="font-semibold">
Appointment No
</span>

<span>
{patient.appointmentNo}
</span>

</div>

<div className="
flex
justify-between
gap-4
">

<span className="font-semibold">
Doctor
</span>

<span>
{patient.doctorName}
</span>

</div>

<div className="
flex
justify-between
gap-4
">

<span className="font-semibold">
Phone
</span>

<span>
{patient.phone}
</span>

</div>

<div className="
flex
justify-between
gap-4
">

<span className="font-semibold">
Time
</span>

<span>
{patient.time}
</span>

</div>

</div>

</div>

</div>

{/* RIGHT SIDE */}
<div className="
w-full
lg:w-[55%]
space-y-6
">


{/* PATIENT REASON */}
<div className="
bg-white
border
rounded-3xl
shadow-md
p-3
">

<h2 className="
text-xl
font-bold
mb-4
text-[#0F4C5C]
">
Patient Reason
</h2>

<textarea
value={patient.reason || ""}
readOnly
className="
w-full
border
rounded-2xl
p-4
outline-none
min-h-[90px]
resize-none
bg-gray-100
text-gray-700
cursor-not-allowed
"
/>

</div>

{/* SOLUTION */}
<div className="
bg-white
border
rounded-3xl
shadow-md
p-3
">

<h2 className="
text-xl
font-bold
mb-4
text-[#0F4C5C]
">
Solution
</h2>

<textarea
value={solution}
onChange={(e)=>
setSolution(e.target.value)
}
placeholder="
Enter solution...
"
className="
w-full
border
rounded-2xl
p-4
outline-none
min-h-[80px]
resize-none
"
/>

</div>

{/* TABLET */}
<div className="
bg-white
border
rounded-3xl
shadow-md
p-3
">

<h2 className="
text-xl
font-bold
mb-4
text-[#0F4C5C]
">
Tablet / Medicine
</h2>

<textarea
value={tablet}
onChange={(e)=>
setTablet(e.target.value)
}
placeholder="
Enter tablet details...
"
className="
w-full
border
rounded-2xl
p-4
outline-none
min-h-[130px]
resize-none
"
/>

</div>

{/* SAVE BUTTON */}
<button
onClick={handleSave}
className="
w-full
bg-green-500
hover:bg-green-600
text-white
font-bold
text-lg
py-4
rounded-2xl
transition
shadow-lg
"
>
Save
</button>

</div>

</div>

</motion.div>

</div>

</motion.div>

</AnimatePresence>

);

};

export default PatientProfileView;
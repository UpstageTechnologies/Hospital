import React, { useState, useEffect } from "react";

import PatientProfileView from "./PatientProfileView";

const PatientsTable = ({ patientsData }) => {

    const [selectedPatient,setSelectedPatient] =
useState(null);

const [patients,setPatients] =
useState([]);

useEffect(()=>{

const storedPatients =
JSON.parse(
localStorage.getItem("patientsData")
) || patientsData;

setPatients(storedPatients);

},[patientsData]);

return (

<div className="p-6 w-full">

<h1 className="text-2xl font-bold mb-6">
Patients
</h1>

<div className="overflow-x-auto bg-white rounded-2xl shadow">

<table className="w-full">

<thead className="bg-blue-600 text-white">

<tr>

<th className="p-4 text-left">Patient</th>

<th className="p-4 text-left">Doctor</th>

<th className="p-4 text-left">Reason</th>

<th className="p-4 text-left">Solution</th>

<th className="p-4 text-left">Tablet</th>

<th className="p-4 text-left">Action</th>

</tr>

</thead>

<tbody>

{patients.map((item,index)=>(

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
{item.reasonNotes}
</td>

<td className="p-4">
{item.solution || "Not Updated"}
</td>

<td className="p-4">
{item.tablet || "Not Updated"}
</td>

<td className="p-4">

<button
onClick={()=>
setSelectedPatient(item)
}
className="
bg-green-500
hover:bg-green-600
text-white
px-4
py-2
rounded-xl
"
>
Visit
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

{
selectedPatient && (

<div className="
fixed
inset-0
bg-black/40
z-50
overflow-y-auto
py-10
"
>

<PatientProfileView

patient={selectedPatient}

onSave={(updatedPatient)=>{

const updatedPatients =
patients.map((p)=>{

if(
p.appointmentNo ===
updatedPatient.appointmentNo
){

return updatedPatient;

}

return p;

});

setPatients(updatedPatients);

localStorage.setItem(
"patientsData",
JSON.stringify(updatedPatients)
);

setSelectedPatient(null);

}}

onClose={()=>{
setSelectedPatient(null);
}}

/>

</div>

)
}

</div>



);

};

export default PatientsTable;
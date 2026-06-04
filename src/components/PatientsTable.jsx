import React, { useState, useEffect } from "react";

import PatientProfileView from "./PatientProfileView";

const PatientsTable = ({ patientsData }) => {

    const printPatient = (item) => {

        const win = window.open("", "", "width=900,height=700");
        
        win.document.write(`
        <html>
        <head>
        <title>Patient Prescription</title>
        <style>
        body{
        font-family:Arial;
        padding:20px;
        }
        table{
        width:100%;
        border-collapse:collapse;
        }
        td,th{
        border:1px solid #000;
        padding:10px;
        }
        </style>
        </head>
        <body>
        
        <h2>Patient Visit Report</h2>
        
        <table>
        
        <tr>
        <th>Patient</th>
        <td>${item.patientName}</td>
        </tr>
        
        <tr>
        <th>Doctor</th>
        <td>${item.doctorName}</td>
        </tr>
        
        <tr>
        <th>Reason</th>
        <td>${item.reason}</td>
        </tr>
        
        <tr>
        <th>Solution</th>
        <td>${item.solution}</td>
        </tr>
        
        <tr>
        <th>Tablet</th>
        <td>${item.tablet}</td>
        </tr>
        
        </table>
        
        </body>
        </html>
        `);
        
        win.document.close();
        win.print();
        
        };

    const [selectedPatient,setSelectedPatient] =useState(null);
    const [patients,setPatients] =useState([]);
    const [search,setSearch] = useState("");

useEffect(()=>{

const storedPatients =
JSON.parse(
localStorage.getItem("patientsData")
) || patientsData;

setPatients(storedPatients);

},[patientsData]);

const filteredPatients = patients.filter((item) => {

    const searchText =
    search.toLowerCase();
    
    return (
    
    (item.patientName || "")
    .toLowerCase()
    .includes(searchText)
    
    ||
    
    (item.doctorName || "")
    .toLowerCase()
    .includes(searchText)
    
    );
    
    });

return (

<div className="p-6 w-full">

<h1 className="text-2xl font-bold mb-6">
Patients
</h1>

{/* Search */}

<div className="mb-5">

<input
type="text"
placeholder="Search Patient / Doctor Name..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="
w-full
border
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-blue-500
"
/>

</div>

{/* Desktop Table */}

<div className="hidden lg:block overflow-x-auto bg-white rounded-2xl shadow">

<table className="w-full">

<thead className="bg-blue-600 text-white">

<tr>

<th className="p-4 text-left">
Appointment No
</th>
<th className="p-4 text-left">Patient</th>
<th className="p-4 text-left">Doctor</th>
<th className="p-4 text-left">Reason</th>
<th className="p-4 text-left">Date</th>
<th className="p-4 text-left">Time</th>
<th className="p-4 text-left">Action</th>

</tr>

</thead>

<tbody>

{filteredPatients.map((item,index)=>(

<tr
key={index}
className="border-b"
>

<td className="p-4 font-bold text-blue-600">
{
item.appointmentNo ||
item.appointmentId ||
item.id ||
 "-"
}
</td>

<td className="p-4">
{item.patientName}
</td>

<td className="p-4">
{item.doctorName}
</td>

<td className="p-4">
{item.reasonNotes || item.reason || "-"}
</td>

<td className="p-4">
{item.date || "-"}
</td>

<td className="p-4">
{item.time || "-"}
</td>

<td className="p-4">

<div className="flex gap-2">

<button
onClick={() => setSelectedPatient(item)}
className="bg-green-500 text-white px-3 py-2 rounded-xl"
>
Details
</button>

<button
onClick={() => printPatient(item)}
className="bg-purple-600 text-white px-3 py-2 rounded-xl"
>
Print
</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>

{/* Mobile + Tablet Card View */}

<div className="block lg:hidden space-y-4">

{filteredPatients.map((item,index)=>(

<div
key={index}
className="
bg-white
rounded-2xl
shadow
border
p-4
"
>

<div className="space-y-3">

<div
className="
bg-blue-600
text-white
font-bold
text-center
py-3
rounded-xl
mb-3
"
>
Appointment No :
{
item.appointmentNo ||
item.appointmentId ||
item.id ||
 "-"
}
</div>

<div className="flex">
<span className="w-24 font-semibold text-gray-600">
Patient
</span>
<span className="font-bold">
: {item.patientName}
</span>
</div>

<div className="flex">
<span className="w-24 font-semibold text-gray-600">
Doctor
</span>
<span className="font-bold">
: {item.doctorName}
</span>
</div>

<div className="flex">
<span className="w-24 font-semibold text-gray-600">
Reason
</span>
<span className="font-bold break-words">
: {item.reasonNotes}
</span>
</div>

<div className="flex">
<span className="w-24 font-semibold text-gray-600">
Date
</span>
<span className="font-bold">
: {item.date || "-"}
</span>
</div>

<div className="flex">
<span className="w-24 font-semibold text-gray-600">
Time
</span>
<span className="font-bold">
: {item.time || "-"}
</span>
</div>

</div>

<div
className="
grid
grid-cols-2
gap-3
mt-4
"
>

<button
onClick={() => setSelectedPatient(item)}
className="
bg-green-500
text-white
py-2
rounded-xl
flex-1
"
>
Details
</button>

<button
onClick={() => printPatient(item)}
className="
bg-purple-600
text-white
py-2
rounded-xl
flex-1
"
>
Print
</button>

</div>

</div>

))}

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
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

<button
onClick={() => printPatient(item)}
className="bg-purple-500 text-white px-3 py-2 rounded ml-2"
>
Print
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
import React from "react";
import { assets } from "../assets/assets";

const DoctorProfilePage = () => {

const doctorData =
JSON.parse(localStorage.getItem("doctorData"));

return (

<div className="flex min-h-screen">

<div className="hidden md:block w-64 bg-blue-600 text-white p-6">

<h2 className="text-xl font-bold mb-6">
Doctor Profile
</h2>

</div>

<div className="flex-1 p-10">

<div className="max-w-4xl mx-auto">

<div className="flex items-center gap-6 mb-10">

<img
src={assets.profile_pic}
className="w-28 h-28 rounded-full"
alt=""
/>

<h1 className="text-3xl font-bold">
{doctorData?.doctorBasicInfo?.name}
</h1>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="border p-6 rounded-xl">

<p>
<b>Name:</b>
{doctorData?.doctorBasicInfo?.name}
</p>

<p>
<b>Email:</b>
{doctorData?.doctorBasicInfo?.email}
</p>

<p>
<b>Phone:</b>
{doctorData?.doctorBasicInfo?.contact}
</p>

<p>
<b>Address:</b>
{doctorData?.doctorBasicInfo?.address}
</p>

</div>

<div className="border p-6 rounded-xl">

<p>
<b>Designation:</b>
{doctorData?.doctorDesignation?.designation}
</p>

<p>
<b>Qualification:</b>
{doctorData?.doctorDesignation?.qualification}
</p>

<p>
<b>Doctor ID:</b>
{doctorData?.doctorOfficial?.doctorId}
</p>

</div>

</div>

</div>

</div>

</div>

);

};

export default DoctorProfilePage;
import React from "react";
import { assets } from "../assets/assets";

const PharmasiProfile = () => {

const pharmasiData =
JSON.parse(localStorage.getItem("pharmasiData"));

if(!pharmasiData){

    return (
    <div className="p-10 text-xl font-bold">
    Loading...
    </div>
    )
    
    }

return (

<div className="flex min-h-screen">

<div className="hidden md:block w-64 bg-blue-600 text-white p-6">

<h2 className="text-xl font-bold mb-6">
Pharmasi Profile
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
{pharmasiData?.pharmasiBasicInfo?.name}
</h1>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="border p-6 rounded-xl">

<p>
<b>Name:</b>
{pharmasiData?.pharmasiBasicInfo?.name}
</p>

<p>
<b>Email:</b>
{pharmasiData?.pharmasiBasicInfo?.email}
</p>

<p>
<b>Phone:</b>
{pharmasiData?.pharmasiBasicInfo?.contact}
</p>

<p>
<b>Address:</b>
{pharmasiData?.pharmasiBasicInfo?.address}
</p>

</div>

<div className="border p-6 rounded-xl">

<p>
<b>Designation:</b>
{pharmasiData?.pharmasiDesignation?.designation}
</p>

<p>
<b>Pharmasi ID:</b>
{pharmasiData?.pharmasiOfficial?.pharmasiId}
</p>

</div>

</div>

</div>

</div>

</div>

);

};

export default PharmasiProfile;
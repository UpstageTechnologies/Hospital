import React from "react";
import { assets } from "../assets/assets";

const AdminProfile = () => {

const adminData =
JSON.parse(localStorage.getItem("adminData"));

return (

<div className="flex min-h-screen">

<div className="hidden md:block w-64 bg-blue-600 text-white p-6">

<h2 className="text-xl font-bold mb-6">
Admin Profile
</h2>

</div>

<div className="flex-1 p-10">

<div className="max-w-4xl mx-auto">

<div className="flex items-center gap-6 mb-10">

<img
src={assets.profile_pic}
className="w-28 h-28 rounded-full"
/>

<h1 className="text-3xl font-bold">
{adminData?.adminBasicInfo?.name}
</h1>

</div>

<div className="border p-6 rounded-xl">

<p>
<b>Name:</b>
{adminData?.adminBasicInfo?.name}
</p>

<p>
<b>Email:</b>
{adminData?.adminBasicInfo?.email}
</p>

<p>
<b>Phone:</b>
{adminData?.adminBasicInfo?.contact}
</p>

<p>
<b>Address:</b>
{adminData?.adminBasicInfo?.address}
</p>

</div>

</div>

</div>

</div>

);

};

export default AdminProfile;
import React from "react";
import { assets } from "../assets/assets";

const MasterProfile = () => {

const masterData =
JSON.parse(localStorage.getItem("masterData"));

return (

<div className="flex min-h-screen">

<div className="hidden md:block w-64 bg-blue-600 text-white p-6">

<h2 className="text-xl font-bold mb-6">
Master Profile
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
{masterData?.masterBasicInfo?.name}
</h1>

</div>

<div className="border p-6 rounded-xl">

<p>
<b>Name:</b>
{masterData?.masterBasicInfo?.name}
</p>

<p>
<b>Email:</b>
{masterData?.masterBasicInfo?.email}
</p>

<p>
<b>Role:</b> Master
</p>

</div>

</div>

</div>

</div>

);

};

export default MasterProfile;
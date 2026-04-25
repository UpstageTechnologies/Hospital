import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar"; // path adjust if needed

const DemoStaffDashboard = () => {

const navigate = useNavigate();

localStorage.setItem("demoUser","true");

return (
<>
{/* Top Navbar */}
<DashboardNavbar />

<div className="flex min-h-screen">

{/* Sidebar */}
<div className="w-72 bg-blue-600 text-white pt-10 px-6">

<div
onClick={()=>navigate("/demostaffdashboard")}
className="text-3xl mb-10 cursor-pointer"
>
Home
</div>

</div>


{/* Main Content */}
<div className="flex-1 bg-gray-50 p-10">

<h1 className="text-5xl font-bold mb-10">
Current Appointments
</h1>

</div>

</div>
</>
);

};

export default DemoStaffDashboard;
import React from "react";

const DemoStaffDashboard = () => {

localStorage.setItem("demoUser","true");

return (
<div className="flex min-h-screen bg-gray-100">

<div className="flex-1 p-10">
<h1 className="text-5xl font-bold">
Demo Staff Dashboard
</h1>
</div>

</div>
);

};

export default DemoStaffDashboard;
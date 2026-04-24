import DoctorProfile from "./DoctorProfile";

const DemoDoctorDashboard = () => {

localStorage.setItem("demoUser","true");

return(
<div>

<div className="flex">
<div className="flex-1">
<DoctorProfile />
</div>

</div>

</div>
)
}

export default DemoDoctorDashboard;
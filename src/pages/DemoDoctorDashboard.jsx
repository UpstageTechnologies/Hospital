import DoctorProfile from "./DoctorProfile";

const DemoDoctorDashboard = () => {

localStorage.setItem("doctorEmail","demodoctor007");
localStorage.setItem("demoUser","true");

return(
<div>
<DoctorProfile/>
</div>
)

}

export default DemoDoctorDashboard;
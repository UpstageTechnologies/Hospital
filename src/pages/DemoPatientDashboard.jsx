import PatientDashboard from "./PatientDashboard";

const DemoPatientDashboard=()=>{

localStorage.setItem("demoUser","true");

return(
<div className="flex">

<div className="flex-1">
<PatientDashboard />
</div>

</div>
)
}

export default DemoPatientDashboard;
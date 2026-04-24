import Account from "./Account";

const DemoAdminDashboard = () => {
localStorage.setItem("demoUser","true");

return(
<div className="flex">



<div className="flex-1">
<Account />
</div>

</div>
)
}

export default DemoAdminDashboard;
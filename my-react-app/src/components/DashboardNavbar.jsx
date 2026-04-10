import { useNavigate, useLocation } from "react-router-dom";

const DashboardNavbar = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const active = (path) =>
        location.pathname === path ? "text-blue-600 font-bold" : "";

    return (
        <div className="w-full border-b p-4 flex justify-center gap-10 text-lg">

            <button className={active("/master-dashboard")} onClick={() => navigate("/master-dashboard")}>Master</button>

            <button className={active("/admin-login")} onClick={() => navigate("/admin-dashboard")}>Admin</button>

            <button className={active("/demo-patient-dashboard")} onClick={() => navigate("/demo-patient-dashboard")}>Patient</button>

            <button className={active("/demo-doctor-dashboard")} onClick={() => navigate("/demo-doctor-dashboard")}>Doctor</button>

            <button className={active("/staff-login")} onClick={() => navigate("/staff-login")}>Staff</button>

        </div>
    );
};

export default DashboardNavbar;
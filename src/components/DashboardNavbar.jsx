import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const DashboardNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const active = (path) =>
        location.pathname === path ? "text-blue-600 font-bold" : "";

    return (
        <>
            {/* ✅ Desktop View (NO CHANGE) */}
            <div className="hidden md:flex w-full border-b p-4 justify-center gap-10 text-lg">
                <button className={active("/master-dashboard")} onClick={() => navigate("/master-dashboard")}>Master</button>
                <button className={active("/admin-dashboard")} onClick={() => navigate("/admin-dashboard")}>Admin</button>
                <button className={active("/demo-patient-dashboard")} onClick={() => navigate("/demo-patient-dashboard")}>Patient</button>
                <button className={active("/demo-doctor-dashboard")} onClick={() => navigate("/demo-doctor-dashboard")}>Doctor</button>
                <button className={active("/staff-login")} onClick={() => navigate("/staff-login")}>Staff</button>
            </div>

            {/* ✅ Mobile & Tablet View */}
            <div className="md:hidden flex items-center justify-between p-4 border-b">
                
                {/* Left: Demo */}
                <h1 className="text-lg font-bold">Demo</h1>

                {/* Right: Menu Icon */}
                <button onClick={() => setOpen(!open)}>
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* ✅ Mobile Menu Dropdown */}
            {open && (
                <div className="md:hidden flex flex-col gap-4 p-4 border-b bg-white text-lg">
                    <button onClick={() => { navigate("/master-dashboard"); setOpen(false); }}>Master</button>
                    <button onClick={() => { navigate("/admin-dashboard"); setOpen(false); }}>Admin</button>
                    <button onClick={() => { navigate("/demo-patient-dashboard"); setOpen(false); }}>Patient</button>
                    <button onClick={() => { navigate("/demo-doctor-dashboard"); setOpen(false); }}>Doctor</button>
                    <button onClick={() => { navigate("/staff-login"); setOpen(false); }}>Staff</button>
                </div>
            )}
        </>
    );
};

export default DashboardNavbar;
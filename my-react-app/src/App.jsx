import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import HospitalIntro from "./pages/HospitalIntro";
import DemoHome from "./pages/DemoHome";
import DemoDoctors from "./pages/DemoDoctors";
import DemoDoctorDetails from "./pages/DemoDoctorDetails";
import Dashboard from "./pages/Dashboard"
import DashboardNavbar from "./components/DashboardNavbar";
import MasterDashboard from "./pages/MasterDashboard"
import AdminDashboard from "./pages/AdminDashboard";
import DemoPatientdashboard from "./pages/DemoPatientdashboard";
import DemoDoctordashboard from "./pages/DemoDoctordashboard";
import Upstage from "./pages/Upstage.jsx";
import UpstageDoctors from "./pages/UpstageDoctors";
import UpstageNavbar from "./components/UpstageNavbar";
import Loding from "./pages/Loding";
import Home from "./pages/Home";
import MasterLogin from "./pages/MasterLogin";
import Doctor from "./pages/Doctor";
import Login from "./pages/PatientLogin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointment from "./pages/MyAppointment";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DoctorLogin from "./pages/DoctorLogin";
import PatientLogin from "./pages/PatientLogin";
import PatientDashboard from "./pages/PatientDashboard";
import AdminLogin from "./pages/AdminLogin.jsx";
import Account from "./pages/Account.jsx";
import StaffLogin from "./pages/StaffLogin";
import DoctorProfile from "./pages/DoctorProfile";
import StaffProfile from "./pages/StaffProfile";


const App = () => {

  const location = useLocation();
  const hideLayout = [
    "/",
    "/upstage",
    "/select-hospital",
    "/master-login",
    "/admin-login",
    "/doctor-login",
    "/patient-login",
    "/staff-login",
    "/dashboard"
  ].includes(location.pathname);
  return (
    <div className="w-full">


      {!hideLayout && (
        location.pathname.startsWith("/upstage")
          ? <UpstageNavbar />
          : (
            location.pathname === "/master-dashboard" ||
            location.pathname === "/admin-dashboard" ||
            location.pathname === "/demo-patient-dashboard" ||
            location.pathname === "/demo-doctor-dashboard"
          )
            ? <DashboardNavbar />   // 🔥 FIRST PRIORITY
            : location.pathname.startsWith("/demo")
              ? null
              : <Navbar />
      )}

      <Routes>
        <Route path="/" element={<HospitalIntro />} />
        <Route path="/demohome" element={<DemoHome />} />
        <Route path="/demodoctors" element={<DemoDoctors />} />
        <Route path="/demodoctors/:city" element={<DemoDoctors />} />
        <Route path="/demodoctor/:id" element={<DemoDoctorDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/master-dashboard" element={<MasterDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/demo-patient-dashboard" element={<DemoPatientdashboard />} />
        <Route path="/demo-doctor-dashboard" element={<DemoDoctordashboard />} />
        <Route path="/upstage" element={<Upstage />} />
        <Route path="/upstage-doctors" element={<UpstageDoctors />} />
        <Route path="/upstage-doctors/:city" element={<UpstageDoctors />} />
        <Route path="/select-hospital" element={<Loding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/doctor/:speciality" element={<Doctor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointment" element={<MyAppointment />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/master-login" element={<MasterLogin />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/account" element={<Account />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />
        <Route path="/staff-profile" element={<StaffProfile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>


      {!hideLayout && location.pathname !== "/account" && <Footer />}

    </div>
  );
};

export default App;
import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import HospitalIntro from "./pages/HospitalIntro";
import Upstage from "./pages/Upstage.jsx";
import UpstageDoctors from "./pages/UpstageDoctors";
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
    "/staff-login"
  ].includes(location.pathname);
  return (
    <div className="w-full">


      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<HospitalIntro />} />
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
import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import HospitalIntro from "./pages/HospitalIntro";
import DemoHome from "./pages/DemoHome";
import RoleHome from "./pages/RoleHome";
import DemoDoctors from "./pages/DemoDoctors";
import DemoAbout from "./pages/DemoAbout";
import DemoContact from "./pages/DemoContact";
import DemoDoctorDetails from "./pages/DemoDoctorDetails";
import DemoMasterDashboard from "./pages/DemoMasterDashboard.jsx"
import DemoAdminDashboard from "./pages/DemoAdminDashboard.jsx";
import DemoDoctorDashboard from "./pages/DemoDoctorDashboard.jsx";
import DemoStaffDashboard from "./pages/DemoStaffDashboard.jsx";
import DemoPatientDashboard from "./pages/DemoPatientDashboard.jsx";
import DemoPharmasiDashboard from "./pages/DemoPharmasiDashboard";
import DemoMyProfile from "./pages/DemoMyProfile";
import DemoMyAppointment from "./pages/DemoMyAppointment";
import DashboardNavbar from "./components/DashboardNavbar";
import RealMasterDashboard from "./pages/RealMasterDashboard";
import Upstage from "./pages/Upstage.jsx";
import UpstageDoctors from "./pages/UpstageDoctors";
import UpstageAppointmentPage from "./pages/UpstageAppointmentPage"
import UpstageAbout from "./pages/UpstageAbout";
import UpstageContact from "./pages/UpstageContact";
import UpstageNavbar from "./components/UpstageNavbar";
import Loding from "./pages/Loding";
import Home from "./pages/Home";
import MasterLogin from "./pages/MasterLogin";
import PharmasiLogin from "./pages/PharmasiLogin";
import PharmasiDashboard from "./pages/PharmasiDashboard";
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
    "/pharmasi-login"
  ].includes(location.pathname);
  return (
    <div className="w-full">


      {!hideLayout && (
        location.pathname.startsWith("/upstage")
          ? <UpstageNavbar />
          : (
            location.pathname === "/master-appointments" ||
            location.pathname === "/demoadmindashboard" ||
            location.pathname === "/demopatientdashboard" ||
            location.pathname === "/demodoctordashboard" 
            
          )
            ? <DashboardNavbar />  
            : location.pathname.startsWith("/demo") || location.pathname === "/rolehome"
  ? null
  : <Navbar />
      )}

      <Routes>
        <Route path="/" element={<HospitalIntro />} />
        <Route path="/demohome" element={<DemoHome />} />
        <Route path="/rolehome" element={<RoleHome />} />
        <Route path="/demodoctors" element={<DemoDoctors />} />
        <Route path="/demodoctors/:city" element={<DemoDoctors />} />
        <Route path="/demoabout" element={<DemoAbout />} />
        <Route path="/democontact" element={<DemoContact />} />
        <Route path="/demodoctordetails/:id" element={<DemoDoctorDetails />} />
        <Route path="/demomasterdashboard" element={<DemoMasterDashboard />}/>
        <Route path="/demoadmindashboard" element={<DemoAdminDashboard />} />
        <Route path="/demodoctordashboard" element={<DemoDoctorDashboard />} />
        <Route path="/demostaffdashboard" element={<DemoStaffDashboard />} />
        <Route path="/demopatientdashboard" element={<DemoPatientDashboard />} />
        <Route path="/demopharmasidashboard" element={<DemoPharmasiDashboard />}/>
        <Route path="/demomyprofile" element={<DemoMyProfile />} />
        <Route path="/demomyappointment" element={<DemoMyAppointment />}/>
        <Route path="/master-dashboard" element={<RealMasterDashboard />} />
        <Route path="/upstage" element={<Upstage />} />
        <Route path="/upstage-doctors" element={<UpstageDoctors />} />
        <Route path="/upstage-appointment/:docId" element={<UpstageAppointmentPage />} />
        <Route path="/upstage-doctors/:city" element={<UpstageDoctors />} />
        <Route path="/upstage-about" element={<UpstageAbout />} />
        <Route path="/upstage-contact" element={<UpstageContact />} />
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
        <Route path="/pharmasi-login" element={<PharmasiLogin/>}/>
        <Route path="/pharmasi-dashboard" element={<PharmasiDashboard/>}/>
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
import React from "react";
import { Routes, Route,useLocation} from "react-router-dom";
import Home from "./pages/Home";
import Doctor from "./pages/Doctor";
import Login from "./pages/PatientLogin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointment from "./pages/MyAppointment";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MasterLogin from "./pages/MasterLogin";
import DoctorLogin from "./pages/DoctorLogin";
import PatientLogin from "./pages/PatientLogin";
import Account from "./pages/Account.jsx"
import StaffLogin from "./pages/StaffLogin";

const App = () => {

  const location = useLocation();
  return (

    
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctor' element={<Doctor />} />
        <Route path='/doctor/:speciality' element={<Doctor />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointment' element={<MyAppointment />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/master-login' element={<MasterLogin />} />
        <Route path='/doctor-login' element={<DoctorLogin />} />
        <Route path='/patient-login' element={<PatientLogin />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path='/account' element={<Account />} />
      </Routes>

     {location.pathname !== "/account" && <Footer />}
    </div>
  );
};

export default App;
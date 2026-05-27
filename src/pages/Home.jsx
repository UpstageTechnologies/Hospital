import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctor from "../components/TopDoctor";
import Banner from "../components/Banner";

const Home = () => {

  const [showExitPopup, setShowExitPopup] = useState(false);
  const navigate = useNavigate();

  const hospital =
    localStorage.getItem("selectedHospital") || "";

    useEffect(() => {

      const handleBackButton = () => {
    
        const logoutStatus =
          localStorage.getItem("logout");
    
        if (logoutStatus === "true") {
    
          setShowExitPopup(true);
    
          window.history.pushState(
            null,
            "",
            window.location.href
          );
    
        }
    
      };
    
      window.history.pushState(
        null,
        "",
        window.location.href
      );
    
      window.addEventListener(
        "popstate",
        handleBackButton
      );
    
      return () => {
    
        window.removeEventListener(
          "popstate",
          handleBackButton
        );
    
      };
    
    }, []);

  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctor hospital={hospital} />
      <Banner />

      {showExitPopup && (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

  <div className="bg-white p-6 rounded-xl shadow-xl w-[320px] text-center">

  <h2 className="text-xl font-semibold mb-3">
  Sign In Required
</h2>

<p className="text-gray-600 mb-5">
  Please sign in again to continue accessing the dashboard.
</p>

    <div className="flex justify-center gap-4">

      <button
        onClick={() => setShowExitPopup(false)}
        className="px-5 py-2 bg-gray-300 rounded-lg"
      >
        Cancel
      </button>

      <button
onClick={() => {

const role =
localStorage.getItem("loginRole");

localStorage.removeItem("logout");

if (role === "master") {
  navigate("/master-login");
}

else if (role === "admin") {
  navigate("/admin-login");
}

else if (role === "doctor") {
  navigate("/doctor-login");
}

else if (role === "patient") {
  navigate("/patient-login");
}

else if (role === "staff") {
  navigate("/staff-login");
}

else if (role === "pharmasi") {
  navigate("/pharmasi-login");
}

}}
className="px-5 py-2 bg-red-500 text-white rounded-lg"
>
Sign In
</button>

    </div>

  </div>

</div>
)}
    </div>

    
  );
};

export default Home;
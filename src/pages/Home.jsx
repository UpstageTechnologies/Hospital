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

  // ✅ BLOCK BACK BUTTON
  useEffect(() => {

    const handleBackButton = () => {
  
      setShowExitPopup(true);
  
      window.history.pushState(
        null,
        "",
        window.location.href
      );
  
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
      Exit HospitalInfo?
    </h2>

    <p className="text-gray-600 mb-5">
      Do you want to leave this page?
    </p>

    <div className="flex justify-center gap-4">

      <button
        onClick={() => setShowExitPopup(false)}
        className="px-5 py-2 bg-gray-300 rounded-lg"
      >
        Cancel
      </button>

      <button
        onClick={() => navigate("/select-hospital")}
        className="px-5 py-2 bg-red-500 text-white rounded-lg"
      >
        OK
      </button>

    </div>

  </div>

</div>
)}
    </div>

    
  );
};

export default Home;
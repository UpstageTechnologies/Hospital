import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctor from "../components/TopDoctor";
import Banner from "../components/Banner";

const Home = () => {

  const hospital = localStorage.getItem("selectedHospital") || "";

  return (
    <div>
        <Header />
        <SpecialityMenu />
        <TopDoctor hospital={hospital} />
        <Banner />
    </div>
  );
};

export default Home;
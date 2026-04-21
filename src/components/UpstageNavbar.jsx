
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";


const UpstageNavbar = () => {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
   

    return (
        <div className="flex items-center py-4 px-6 border-b border-gray-300 bg-white">

            {/* LOGO */}
            <img
                src="/logos/upstage.png"
                className="w-28 cursor-pointer"
                onClick={() => navigate("/upstage")}
            />

            {/* MOBILE MENU BUTTON */}
<div className="lg:hidden ml-auto">
  <button onClick={() => setMenuOpen(!menuOpen)}>
    ☰
  </button>
</div>

            {/* MENU CENTER */}
            <ul className="hidden lg:flex flex-1 justify-center items-center gap-10 text-gray-700 font-medium">

                <NavLink to="/upstage">
                    <li>Home</li>
                </NavLink>

                <NavLink to="/upstage-doctors">
                    <li>All Doctors</li>
                </NavLink>

                <NavLink to="/upstage-about">
                    <li>About</li>
                </NavLink>

                <NavLink to="/upstage-contact">
                    <li>Contact</li>
                </NavLink>

            </ul>

            {/* MOBILE MENU */}
{menuOpen && (
  <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 lg:hidden z-50">

    <NavLink to="/upstage" onClick={() => setMenuOpen(false)}>
      Home
    </NavLink>

    <NavLink to="/upstage-doctors" onClick={() => setMenuOpen(false)}>
      All Doctors
    </NavLink>

    <NavLink to="/upstage-about" onClick={() => setMenuOpen(false)}>
      About
    </NavLink>

    <NavLink to="/upstage-contact" onClick={() => setMenuOpen(false)}>
      Contact
    </NavLink>

  </div>
)}

           

        </div>
    );
};

export default UpstageNavbar;
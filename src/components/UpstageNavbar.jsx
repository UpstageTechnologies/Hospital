
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"


const UpstageNavbar = () => {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false)
const [user, setUser] = useState(null)
   

    return (
        <div className="flex items-center py-4 px-6 border-b border-gray-300 bg-white">


<div className="flex items-center gap-3">

  <button
    onClick={() => navigate("/upstage")}
    className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg border-2 border-white ml-2 hover:scale-110 transition"
  >
    <span className="text-white text-lg relative -top-[2px]">
      ←
    </span>
  </button>

  <img
    src="/logos/upstage.png"
    className="w-28 cursor-pointer"
    onClick={() => navigate("/upstage")}
  />

</div>  

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
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";


const UpstageNavbar = () => {

    const navigate = useNavigate();
   

    return (
        <div className="flex items-center py-4 px-6 border-b border-gray-300 bg-white">

            {/* LOGO */}
            <img
                src="/logos/upstage.png"
                className="w-28 cursor-pointer"
            />

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

           

        </div>
    );
};

export default UpstageNavbar;
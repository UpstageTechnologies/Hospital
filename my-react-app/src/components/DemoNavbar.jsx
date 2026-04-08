import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"

const DemoNavbar = () => {

  const nav = useNavigate()

  return (


    <div className="flex items-center py-4 px-6 border-b border-gray-300 bg-white">

      {/* LOGO */}
      <img
        src="/logos/upstage.png"
        className="w-28 cursor-pointer"
      />

      {/* MENU CENTER */}
      <ul className="flex-1 flex justify-center items-center gap-10 text-gray-700 font-medium">

        <NavLink to="/demohome">
          <li>Home</li>
        </NavLink>

        <NavLink to="/upstage-doctors">
          <li>All Doctors</li>
        </NavLink>

        <NavLink to="/about">
          <li>About</li>
        </NavLink>

        <NavLink to="/contact">
          <li>Contact</li>
        </NavLink>

      </ul>

    </div>




  )
}

export default DemoNavbar
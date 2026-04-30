import { useNavigate, NavLink } from "react-router-dom"
import { useState } from "react"

const DemoNavbar = () => {

  const nav = useNavigate()
  const [open, setOpen] = useState(false)

  return (


<div className="flex items-center justify-between py-4 px-8 border-b border-gray-300 bg-white">

     
<div className="flex items-center gap-4">

<button onClick={() => navigator("/")}className="!w-9 !h-9 sm:!w-10 sm:!h-10 rounded-full bg-blue-600 flex items-center justify-center
    shadow-md "
>
<span className="text-white text-lg sm:text-xl md:text-2xl relative -top-[2px]">
  ←
</span>
</button>
<p  onClick={() => navigator("/")} className="text-xl font-semibold cursor-pointer" >
Demo
</p>

</div>

      {/* MENU CENTER */}
      <ul className="hidden md:flex flex-1 justify-center items-center gap-10 md:gap-12 text-gray-700 font-medium">

        <NavLink to="/demohome">
          <li>Home</li>
        </NavLink>

        <NavLink to="/demodoctors">
          <li>All Doctors</li>
        </NavLink>

        <NavLink to="/demoabout">
          <li>About</li>
        </NavLink>

        <NavLink to="/democontact">
   <li>Contact</li>
</NavLink>

      </ul>

      <div className="md:hidden ml-auto">
  <button onClick={() => setOpen(!open)} className="text-2xl">
    ☰
  </button>
</div>

{open && (
<div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-5 z-50 flex flex-col gap-4 md:hidden">

<p onClick={() => {nav("/demohome"); setOpen(false)}}>Home</p>

<p onClick={() => {nav("/demodoctors"); setOpen(false)}}>All Doctors</p>

<p onClick={() => {nav("/demoabout"); setOpen(false)}}>About</p>

<p onClick={() => {nav("/democontact"); setOpen(false)}}>Contact</p>

</div>
)}

    </div>




  )
}

export default DemoNavbar
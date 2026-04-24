import React, { useState } from "react"
import { db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useLocation } from "react-router-dom";

const StaffLogin = () => {

    const [staffId, setStaffId] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const location = useLocation();
    const isDemo = location.state?.demo === true;
    const [openMenu, setOpenMenu] = useState(false);


    if(isDemo){
        navigate("/demomasterdashboard")
       }else{
        navigate("/demostaffdashboard")
       }
    const fromRole = location.state?.fromRole === true;

    const handleLogin = async () => {

        const docRef = doc(db, "staffs", staffId)
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
            alert("Invalid Staff ID")
            return
        }

        const data = docSnap.data()


        if (data.staffAccount?.password !== password) {
            alert("Wrong Password")
            return
        }

        localStorage.setItem("staffId", staffId)

        navigate("/demostaffdashboard")

    }

    return (
<div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200">
{isDemo && (
<>
{/* Desktop Navbar */}
<div className="hidden md:block w-full bg-white border-b shadow-sm">
<div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-8">

<p onClick={() => navigate("/demohome")} className="text-2xl font-semibold">
Demo
</p>

<ul className="flex items-center gap-12 text-base font-medium">
<li onClick={()=>navigate("/master-login",{state:{demo:true}})}>MasterLogin</li>
<li onClick={()=>navigate("/admin-login",{state:{demo:true}})}>AdminLogin</li>
<li onClick={()=>navigate("/doctor-login",{state:{demo:true}})}>DoctorLogin</li>
<li onClick={()=>navigate("/staff-login",{state:{demo:true}})}>StaffLogin</li>
<li onClick={()=>navigate("/patient-login",{state:{demo:true}})}>PatientLogin</li>
</ul>

<span onClick={()=>navigate("/demohome")}>
Home
</span>

</div>
</div>


{/* Mobile + Tablet Navbar */}
{/* Mobile + Tablet Only */}
<div className="md:hidden w-full bg-white border-b shadow-sm relative">

  {/* Top Bar */}
  <div className="flex items-center justify-between px-6 py-5">
    <h2 className="text-2xl font-bold">
      Demo
    </h2>

    <button
      onClick={() => setOpenMenu(!openMenu)}
      className="text-3xl font-semibold"
    >
      {openMenu ? "✕" : "☰"}
    </button>
  </div>


  {/* Dropdown Card Menu */}
  {openMenu && (
    <div className="
      absolute
      right-4
      top-[100px]
      w-[320px]
      bg-white
      rounded-3xl
      shadow-2xl
      z-50
      py-8
      px-10
    ">

      <div
        onClick={()=>{
          navigate('/demohome');
          setOpenMenu(false);
        }}
        className="text-2xl font-medium mb-10 cursor-pointer"
      >
        Home
      </div>

      <div
        onClick={()=>{
          navigate('/master-login',{state:{demo:true}});
          setOpenMenu(false);
        }}
        className="text-2xl font-medium mb-10 cursor-pointer"
      >
        MasterLogin
      </div>

      <div
        onClick={()=>{
          navigate('/admin-login',{state:{demo:true}});
          setOpenMenu(false);
        }}
        className="text-2xl font-medium mb-10 cursor-pointer"
      >
        AdminLogin
      </div>

      <div
        onClick={()=>{
          navigate('/doctor-login',{state:{demo:true}});
          setOpenMenu(false);
        }}
        className="text-2xl font-medium mb-10 cursor-pointer"
      >
        DoctorLogin
      </div>

      <div
        onClick={()=>{
          navigate('/staff-login',{state:{demo:true}});
          setOpenMenu(false);
        }}
        className="text-2xl font-medium mb-10 cursor-pointer"
      >
        StaffLogin
      </div>

      <div
        onClick={()=>{
          navigate('/patient-login',{state:{demo:true}});
          setOpenMenu(false);
        }}
        className="text-2xl font-medium cursor-pointer"
      >
        PatientLogin
      </div>

    </div>
  )}

</div>
</>
)}
<div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4">

            <div className="backdrop-blur-lg bg-white/60 shadow-2xl 
    rounded-2xl p-6 sm:p-8 w-full max-w-[350px]">

                <h2 className="text-2xl font-bold text-center mb-4">
                    Staff Login
                </h2>

                <input placeholder="Staff ID"
                    value={staffId}
                    autoComplete="off"
                    onChange={(e) => setStaffId(e.target.value)}
                   className="input-style w-full"/>

                <div className="relative">
                    <input type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-style w-full" />

                    <span className="eye-icon"
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <button onClick={handleLogin} className="btn-style mt-3 w-full">
                    Login
                </button>

            </div>
            </div>
        </div>
    )

}

export default StaffLogin
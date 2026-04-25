import React, { useState, useEffect } from "react";
import { auth, provider } from "../firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AdminLogin = () => {

    const navigate = useNavigate();

    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const location = useLocation();
    const isDemo = location.state?.demo === true;
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
      if(isDemo){
      setEmail("demoadminid001");
      setPassword("demo001");
      }
      },[isDemo]);

      
    

    const fromRole = location.state?.fromRole === true;


    const handleLogin = async () => {

      if (
        email === "demoadminid001" &&
        password === "demo001"
       ){
        alert("Demo Admin Login Success");
        window.location.href="/#/demoadmindashboard";
        return;
       }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Admin Login Success");
            navigate("/demoadmindashboard");
        } catch (err) {
            alert(err.message);
        }
    };


    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Admin Registered Successfully");
            navigate("/demoadmindashboard");
        } catch (err) {
            alert(err.message);
        }
    };


    const handleGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);

            console.log(result.user);

            alert("Google Login Success");


            navigate("/demoadmindashboard");

        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    };

    return (
<div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200">

{isDemo && (
<>
{/* Desktop Navbar */}
<div className="hidden md:block w-full bg-white border-b shadow-sm">
<div className="max-w-7xl mx-auto relative flex items-center h-20 px-8">

<div className="flex items-center gap-4">

<p  onClick={() => nav("/demohome")} className="text-xl font-semibold cursor-pointer" >
Demo
</p>
<button type="button" onClick={() => navigate("/demohome")} className=" w-12 h-12 rounded-full bg-blue-600 text-white text-4xl font-bold flex items-center justify-center
shadow-md hover:bg-blue-700 transition" >
←
</button>

</div>

<ul className="absolute left-1/2 -translate-x-1/2 flex items-center gap-12 text-base font-medium ">
<li onClick={()=>navigate("/master-login",{state:{demo:true}})}>MasterLogin</li>
<li onClick={()=>navigate("/admin-login",{state:{demo:true}})}>AdminLogin</li>
<li onClick={()=>navigate("/doctor-login",{state:{demo:true}})}>DoctorLogin</li>
<li onClick={()=>navigate("/staff-login",{state:{demo:true}})}>StaffLogin</li>
<li onClick={()=>navigate("/patient-login",{state:{demo:true}})}>PatientLogin</li>
</ul>


</div>
</div>


{/* Mobile + Tablet Navbar */}
{/* Mobile + Tablet Only */}
<div className="md:hidden w-full bg-white border-b shadow-sm relative">

  {/* Top Bar */}
  <div className="flex items-center justify-between px-6 py-5">
  <div className="flex items-center gap-4">

  <p  onClick={() => nav("/demohome")} className=" w-12 h-12 rounded-full bg-blue-600 text-white text-4xl font-bold flex items-center justify-center
shadow-md hover:bg-blue-700 transition" >
Demo
</p>
<button type="button" onClick={() => navigate("/demohome")} className="text-4xl font-bold cursor-pointer leading-none" >
←
</button>

</div>

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

                <h2 className="text-3xl font-bold mb-6 text-center">
                    {isRegister ? "Admin Register" : "Admin Login"}
                </h2>

                {/* EMAIL */}
                <input
                    type="email"
                    placeholder="Enter Email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-style w-full"
                />

                {/* PASSWORD */}
                <input
                    type="password"
                    placeholder="Enter Password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-style w-full"
                />

                {/* BUTTON */}
                {!isRegister ? (
                    <button onClick={handleLogin} className="btn-style w-full">
                        Login
                    </button>
                ) : (
                    <button onClick={handleRegister} className="btn-style w-full">
                        Register
                    </button>
                )}

                {/* GOOGLE */}
                {/* <button onClick={handleGoogle} className="google-btn w-full justify-center">
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        className="w-5"
                    />
                    Sign in with Google
                </button> */}

                {/* SWITCH LOGIN ↔ REGISTER */}
                {/* {!fromRole && (
                    <p className="text-center text-sm mt-3">
                        {isRegister ? "Already have account?" : "No account?"}

                        <span
                            className="text-blue-600 ml-1 cursor-pointer"
                            onClick={() => setIsRegister(!isRegister)}
                        >
                            {isRegister ? "Login" : "Register"}
                        </span>
                    </p>
                )} */}
            </div>
            </div>
        </div>
    );
};

export default AdminLogin;
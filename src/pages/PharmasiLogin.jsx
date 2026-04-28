import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";

const PharmasiLogin = () => {

const [pharmasiId,setPharmasiId] = useState("");
const [password,setPassword] = useState("");
const [loading,setLoading] = useState(false);

const navigate = useNavigate();

const location = useLocation();
const isDemo = location.state?.demo === true;
const [openMenu,setOpenMenu] = useState(false);

useEffect(() => {

    if(isDemo){
    setPharmasiId("demopharmasi002");
    setPassword("demo02");
    }
    
    }, [isDemo]);

const handlePharmasiLogin = async() => {

    if(
        isDemo &&
        pharmasiId==="demopharmasi002" &&
        password==="demo02"
        ){
        navigate("/demo-pharmasi-dashboard");
        return;
        }

if(!pharmasiId || !password){
alert("Enter Pharmasi ID and Password");
return;
}

try{

setLoading(true);

// formasi collection check
const ref = doc(db,"pharmasi",pharmasiId);

const snap = await getDoc(ref);

if(!snap.exists()){
alert("Pharmasi account not found");
setLoading(false);
return;
}

const data = snap.data();

// disabled check
if(data.isDisabled){
alert("Account Disabled");
setLoading(false);
return;
}

// password check
if(data.pharmasiAccount?.password !== password){
alert("Invalid Password");
setLoading(false);
return;
}

// session store
localStorage.setItem(
"pharmasiUser",
JSON.stringify(data)
);

alert("Login Success");

// dashboard page redirect
if(isDemo){
    navigate("/demo-pharmasi-dashboard");
    }else{
    navigate("/pharmasi-dashboard");
    }

}
catch(error){
console.log(error);
alert("Login Failed");
}
finally{
setLoading(false);
}

};


return(

    <div className="min-h-screen bg-gray-100">

{isDemo && (
<>
<div className="hidden md:block w-full bg-white border-b shadow-sm">
<div className="max-w-7xl mx-auto relative flex items-center h-20 px-8">

<div className="flex items-center gap-4">

<button
onClick={()=>navigate("/demohome")}
className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center"
>
<span className="text-white text-3xl">←</span>
</button>

<p
onClick={()=>navigate("/demohome")}
className="text-xl font-semibold cursor-pointer"
>
Demo
</p>

</div>

<ul className="absolute left-1/2 -translate-x-1/2 flex gap-12 font-medium">

<li onClick={()=>navigate("/master-login",{state:{demo:true}})}>MasterLogin</li>

<li onClick={()=>navigate("/admin-login",{state:{demo:true}})}>AdminLogin</li>

<li onClick={()=>navigate("/doctor-login",{state:{demo:true}})}>DoctorLogin</li>

<li onClick={()=>navigate("/staff-login",{state:{demo:true}})}>StaffLogin</li>

<li onClick={()=>navigate("/patient-login",{state:{demo:true}})}>PatientLogin</li>

<li onClick={()=>navigate("/pharmasi-login",{state:{demo:true}})}>PharmasiLogin</li>

</ul>

</div>
</div>
</>
)}

<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

<div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

<h2 className="text-3xl font-bold text-center mb-8">
Pharmasi Login
</h2>

<input
type="text"
placeholder="Enter Pharmasi ID"
value={pharmasiId}
onChange={(e)=>setPharmasiId(e.target.value)}
className="w-full border rounded-xl p-4 mb-5 outline-none"
/>


<input
type="password"
placeholder="Enter Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full border rounded-xl p-4 mb-6 outline-none"
/>

<button
onClick={handlePharmasiLogin}
disabled={loading}
className="w-full bg-blue-500 text-white py-4 rounded-xl"
>
{loading ? "Logging in..." : "Login"}
</button>

</div>

</div>

</div>

)

}

export default PharmasiLogin;
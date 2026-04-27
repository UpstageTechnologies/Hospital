import React, { useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const PharmasiLogin = () => {

const [pharmasiId,setPharmasiId] = useState("");
const [password,setPassword] = useState("");
const [loading,setLoading] = useState(false);

const navigate = useNavigate();

const handlePharmasiLogin = async() => {

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
navigate("/pharmasi-dashboard");

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

)

}

export default PharmasiLogin;
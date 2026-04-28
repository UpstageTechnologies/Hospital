import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { collection, getDocs } from "firebase/firestore";
import DashboardNavbar from "../components/DashboardNavbar";

const DemoMyProfile = () => {

const [userData,setUserData] = useState(null);

const { state } = useLocation();

const passedData =
state || JSON.parse(localStorage.getItem("selectedPatient"));

const [activeTab,setActiveTab] = useState("profile");


useEffect(()=>{

    if(passedData){
    setUserData(passedData);
    return;
    }
    
    const unsubscribe = auth.onAuthStateChanged(async(user)=>{
    
    if(!user){
    
    // DEMO fallback (login file touch panna vendam)
    setUserData({
    patientName:"Demo Patient",
    email:"demopatient@gmail.com",
    phone:"9876543210",
    address:"Chennai",
    doctorName:"Dr.Ravi",
    date:"20-03-2025",
    time:"10:30 AM"
    });
    
    return;
    }
    
    try{
    
    const snap = await getDocs(collection(db,"appointments"));
    
    let foundUser=null;
    
    snap.forEach((docItem)=>{
    const data=docItem.data();
    
    if(
    data.email &&
    data.email.toLowerCase().trim() ===
    user.email.toLowerCase().trim()
    ){
    foundUser=data;
    }
    });
    
    if(foundUser){
    setUserData(foundUser);
    }
    
    }catch(err){
    console.log(err);
    }
    
    });
    
    return ()=>unsubscribe();
    
    },[]);



if(!userData){
return(
<>
<DashboardNavbar/>
<div className="p-10 text-xl font-semibold">
Patient Profile...
</div>
</>
)
}


return(
<>
<DashboardNavbar/>

<div className="flex min-h-screen">

{/* same sidebar */}
<div className="hidden md:block w-64 bg-blue-600 text-white p-6">

<h2 className="text-xl font-bold mb-6">
Profile
</h2>

<button
onClick={()=>setActiveTab("profile")}
className={`w-full text-left p-3 rounded ${
activeTab==="profile"
? "bg-blue-500"
: "hover:bg-blue-500"
}`}
>
My Profile
</button>

</div>


<div className="flex-1 p-10 pb-20 md:pb-10">

<div className="max-w-4xl mx-auto">

{activeTab==="profile" && (
<>

<div className="flex items-center gap-6 mb-10">
<img
src={assets.profile_pic}
className="w-28 h-28 rounded-full"
alt=""
/>

<h1 className="text-3xl font-bold">
{userData.patientName}
</h1>

</div>


<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="border p-4 rounded break-words">
<p><b>Name:</b> {userData.patientName}</p>
<p><b>Phone:</b> {userData.phone}</p>
<p><b>Address:</b> {userData.address}</p>
</div>

<div className="border p-4 rounded break-words">
<p><b>Email:</b> {userData.email}</p>
<p><b>Doctor:</b> {userData.doctorName}</p>
<p><b>Date:</b> {userData.date}</p>
<p><b>Time:</b> {userData.time}</p>
</div>

</div>


<div className="mt-10 border rounded p-6">
<h2 className="text-lg font-bold mb-4">
Payment Details
</h2>

<p><b>Paid Amount:</b> ₹600</p>
</div>

</>
)}

</div>

</div>


{/* mobile bottom */}
<div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-center py-3 md:hidden z-50">

<button className="flex flex-col items-center text-blue-600 font-semibold">
👤
<span className="text-sm">
Profile
</span>

</button>

</div>

</div>

</>
)

}

export default DemoMyProfile
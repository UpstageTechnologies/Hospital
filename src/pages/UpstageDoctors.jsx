import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import UpstageNavbar from "../components/UpstageNavbar";
import {
    collection,
    getDocs
  } from "firebase/firestore";
  
  import { db } from "../firebase";

const UpstageDoctors = () => {

    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();
    const { city } = useParams();
    const [filterDoc, setFilterDoc] = useState([]);
    const [doctorStatus, setDoctorStatus] = useState({});
    const [showFilter, setShowFilter] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const applyFilter = () => {

        // ✅ ALWAYS show all doctors first
        if (!city) {
            setFilterDoc(doctors);
            return;
        }

        // ✅ Filter only when city selected
        const filtered = doctors.filter(doc =>
            doc.doctorBasicInfo?.address?.toLowerCase().includes(city.toLowerCase())
        );

        setFilterDoc(filtered);
    };

    useEffect(() => {
        applyFilter();
    }, [doctors, city]);

    const groupedDoctors = {};

    filterDoc.forEach(doc => {
        const address = doc.doctorBasicInfo?.address || "";
        const [cityName, hospital] = address.split(",");

        if (!groupedDoctors[hospital]) {
            groupedDoctors[hospital] = [];
        }

        groupedDoctors[hospital].push(doc);
    });

    useEffect(() => {

        const loadDoctorStatus = async () => {
        
         const appointmentSnap =
         await getDocs(
         collection(db,"appointments")
         )
        
         const counts = {}
        
         appointmentSnap.forEach((doc)=>{
        
           const data = doc.data()
        
           if(!counts[data.doctorEmail]){
             counts[data.doctorEmail] = {}
           }
        
           counts[data.doctorEmail][data.time] =
           (counts[data.doctorEmail][data.time] || 0) + 1
        
         })
        
         const result = {}
        
         doctors.forEach((doctor)=>{
        
            const doctorEmail =
            doctor.email ||
            doctor.doctorBasicInfo?.email
            
            const bookings =
            counts[doctorEmail] || {}
        
            const slots =
            doctor.slots?.length > 0
            ? doctor.slots
            : [
              "10:00am-11:00am",
              "1:00pm-2:00pm",
              "5:00pm-7:00pm"
            ]
        
           const allClosed =
           slots.length > 0 &&
           slots.every(
             slot =>
             (bookings[slot] || 0) >= 2
           )
        
           result[doctorEmail] =
allClosed
         })
        
         setDoctorStatus(result)
        
        }
        
        loadDoctorStatus()
        
        }, [doctors])

    return (
        <>
    
            <div className='px-6 sm:px-10'>



            <p className='text-gray-600'>Browse doctors available in your city.</p>

            <div className='flex flex-col lg:flex-row items-start gap-5 mt-5'>

                <button className={`py-1 px-3 border rounded text-sm sm:hidden ${showFilter ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => setShowFilter(prev => !prev)}>
                    Filters
                </button>

                <div className={`flex-col gap-4 text-sm text-gray-600 w-full lg:w-[200px] ${showFilter ? 'flex' : 'hidden lg:flex'}`}>

                    {["Theni", "Chennai", "Coimbatore", "Sattur", "Salem", "Sivakasi", "Virudhunagar", "Vellore"]
                        .map((item, i) => (

                            <p key={i}
                                onClick={() =>
                                    city === item
                                        ? navigate("/upstage-doctors")
                                        : navigate(`/upstage-doctors/${item}`)
                                }
                                className={`pl-3 py-1.5 pr-16 border rounded cursor-pointer 
                 ${city === item ? "bg-indigo-100 text-black" : ""}`} >
                                {item}
                            </p>

                        ))}

                </div>

                <div className='w-full'>

                    {/* ✅ city illa → normal doctors */}
                    {!city && (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>

                            {filterDoc.map((item, index) => (

                                <div key={index}
                                onClick={() => navigate(`/upstage-appointment/${encodeURIComponent(item.email || item.id)}`)}
                                    className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all'>

            <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                className="bg-blue-50 w-full h-60 object-contain"/>
                                    <div className='p-4'>
                                    <p
className={`text-sm ${
doctorStatus[
item.email ||
item.doctorBasicInfo?.email
]
? "text-red-500"
: "text-green-500"
}`}
>
● {
doctorStatus[
item.email ||
item.doctorBasicInfo?.email
]
? "Not Available"
: "Available"
}
</p>
                                        <p className='font-medium'>{item.name}</p>
                                        <p className='text-sm text-gray-600'>{item.speciality}</p>
                                    </div>

                                </div>

                            ))}

                        </div>
                    )}

                    {/* ✅ city irundha → hospital group */}
                    {city && (
                        Object.keys(groupedDoctors).map((hospital, i) => (

                            <div key={i} className="mb-8">

                                <h2 className="text-xl font-bold mb-4 text-blue-600">
                                    {hospital}
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                                    {groupedDoctors[hospital].map((item, index) => (

                                        <div key={index}
                                        onClick={() => navigate(`/upstage-appointment/${encodeURIComponent(item.email || item.id)}`)}
                                            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all'>

<img
  src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
  className="bg-blue-50 w-full h-60 object-contain"
/>

                                            <div className='p-4'>
                                            <p
className={`text-sm ${
doctorStatus[
item.email ||
item.doctorBasicInfo?.email
]
? "text-red-500"
: "text-green-500"
}`}
>
● {
doctorStatus[
item.email ||
item.doctorBasicInfo?.email
]
? "UnAvailable"
: "Available"
}
</p>
                                                <p className='font-medium'>{item.name}</p>
                                                <p className='text-sm text-gray-600'>{item.speciality}</p>
                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        ))
                    )}

                </div>

            </div>

        </div>
        </>
    );
};

export default UpstageDoctors;
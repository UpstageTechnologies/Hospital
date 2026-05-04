import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import UpstageNavbar from "../components/UpstageNavbar";
import { doc } from "firebase/firestore";

const UpstageDoctors = () => {

    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();
    const { city } = useParams();
    const [filterDoc, setFilterDoc] = useState([]);
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
                                    <p className={`text-sm ${index < 4 ? "text-green-500" : "text-red-500"}`}>
  ● {index < 4 ? "Available" : "Not Available"}
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
                                            <p className={`text-sm ${index < 4 ? "text-green-500" : "text-red-500"}`}>
  ● {index < 4 ? "Available" : "Not Available"}
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
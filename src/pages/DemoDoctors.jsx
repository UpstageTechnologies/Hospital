

import { useState, useEffect, useContext } from "react"
import { AppContext } from "../context/AppContext"
import { useNavigate, useParams } from "react-router-dom"


const DemoDoctors = () => {

    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();

    const { city } = useParams();

    const [filterDoc, setFilterDoc] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

    const applyFilter = () => {

        if (!city) {
            setFilterDoc(doctors);
            return;
        }

        const filtered = doctors.filter(doc => {
            const address = doc.doctorBasicInfo?.address || "";

            // split by comma
            const parts = address.split(",");

            // city usually first or last → check both
            return parts
                .map(p => p.trim().toLowerCase())
                .includes(city.toLowerCase())
        });

        setFilterDoc(filtered);
    };

    useEffect(() => {
        applyFilter();
    }, [doctors, city]);

    const groupedDoctors = {}

    filterDoc.forEach(doc => {

        const address = doc.doctorBasicInfo?.address || ""
        const parts = address.split(",")

        const cityName = parts[0]?.trim()
        const hospital = parts[1]?.trim() || "Unknown Hospital"

        if (!groupedDoctors[hospital]) {
            groupedDoctors[hospital] = []
        }

        groupedDoctors[hospital].push(doc)
    })

    return (
        <div className='px-6 sm:px-10'>

<div className="flex items-center justify-between py-4 px-8 border-b border-gray-300 bg-white">

{/* LEFT SIDE */}
<div className="flex items-center gap-4">

  <button
    onClick={() => navigate(-1)}   // 🔥 BACK FIX
    className="!w-9 !h-9 rounded-full bg-blue-600 flex items-center justify-center shadow-md"
  >
    <span className="text-white text-lg relative -top-[2px]">
      ←
    </span>
  </button>

  <p
    onClick={() => navigate("/demohome")}
    className="text-xl font-semibold cursor-pointer"
  >
    Demo
  </p>

</div>

{/* CENTER MENU */}
<ul className="hidden md:flex flex-1 justify-center items-center gap-10 text-gray-700 font-medium">

  <li onClick={() => navigate("/demohome")} className="cursor-pointer">Home</li>

  <li onClick={() => navigate("/demodoctors")} className="cursor-pointer">All Doctors</li>

  <li onClick={() => navigate("/demoabout")} className="cursor-pointer">About</li>

  <li onClick={() => navigate("/democontact")} className="cursor-pointer">Contact</li>

</ul>

</div>

            <p className='text-gray-600'>Browse doctors available in your city.</p>

            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>

                <button className={`py-1 px-3 border rounded text-sm sm:hidden ${showFilter ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => setShowFilter(prev => !prev)}>
                    Filters
                </button>

                <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>

                    {["Theni", "Chennai", "Coimbatore", "Sattur", "Salem", "Sivakasi", "Virudhunagar", "Vellore"]
                        .map((item, i) => (

                            <p key={i}
                                onClick={() =>
                                    city === item
                                        ? navigate("/demodoctors")
                                        : navigate(`/demodoctors/${item}`)
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
                                onClick={() => navigate(`/demodoctordetails/${item.email}`)}
                                    className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all'>

<img
  src={
    item.image ||
    item.doctorDesignation?.doctorImage ||
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  }
  alt=""
/>

                                    <div className='p-4'>
                                        <p className='text-green-500 text-sm'>● Available</p>
                                        <p className='font-medium'>{item.name}</p>
                                        <p className='text-sm text-gray-600'>{item.speciality}</p>
                                    </div>

                                </div>

                            ))}

                        </div>
                    )}


                    {city && (
                        Object.keys(groupedDoctors).map((hospital, i) => (

                            <div key={i} className="mb-8">

                                <h2 className="text-xl font-bold mb-4 text-blue-600">
                                    {hospital}
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                                    {groupedDoctors[hospital].map((item, index) => (

                                        <div key={index}
                                        onClick={() => navigate(`/demodoctordetails/${item.email}`)}
                                            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all'>

                                            <img src={item.image} className='bg-blue-50' />

                                            <div className='p-4'>
                                                <p className='text-green-500 text-sm'>● Available</p>
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
    );
}

export default DemoDoctors
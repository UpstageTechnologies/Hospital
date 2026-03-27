import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const UpstageDoctors = () => {

    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();

    const { speciality } = useParams();

    const [filterDoc, setFilterDoc] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

    const applyFilter = () => {

        let filtered = doctors;

        if (speciality) {
            filtered = filtered.filter(doc =>
                doc.speciality.toLowerCase() === decodeURIComponent(speciality).toLowerCase()
            );
        }

        setFilterDoc(filtered);
    };

    useEffect(() => {
        applyFilter();
    }, [doctors, speciality]);

    return (
        <div>

            <p className='text-gray-600'>Browse through the doctors specialist.</p>

            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>

                {/* FILTER BUTTON (mobile) */}
                <button
                    className={`py-1 px-3 border rounded text-sm sm:hidden ${showFilter ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => setShowFilter(prev => !prev)}
                >
                    Filters
                </button>

                {/* LEFT SIDE FILTER */}
                <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>

                    {["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"]
                        .map((item, i) => (

                            <p
                                key={i}
                                onClick={() =>
                                    speciality === item
                                        ? navigate("/upstage-doctors")
                                        : navigate(`/upstage-doctors/${item}`)
                                }
                                className={`pl-3 py-1.5 pr-16 border rounded cursor-pointer 
                  ${speciality === item ? "bg-indigo-100 text-black" : ""}`}
                            >
                                {item}
                            </p>

                        ))}

                </div>

                {/* DOCTORS GRID */}
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>

                    {filterDoc.map((item, index) => (

                        <div
                            key={index}
                            onClick={() => navigate(`/appointment/${index}`)}
                            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all'
                        >

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

        </div>
    );
};

export default UpstageDoctors;
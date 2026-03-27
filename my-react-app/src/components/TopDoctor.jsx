import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { doc } from 'firebase/firestore'

const TopDoctor = ({ hospital }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)



    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>

            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>
                Simply browse through our extensive list of trusted doctors.
            </p>

            <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-5 px-3 sm:px-0'>

                {doctors
                    ?.filter(doc =>
                        !hospital || doc.hospital?.toLowerCase().includes(hospital.toLowerCase())
                    )
                    .slice(0, 10)
                    .map((doc, index) => (

                        <div
                            key={index}
                            onClick={() => {
                                // 🔥 USE INDEX ONLY (NO ID PROBLEM)
                                navigate(`/appointment/${index}`);
                                window.scrollTo(0, 0);
                            }}
                            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>


                            <img className='w-full h-40 object-cover bg-blue-50' src={doc.image} alt="" />

                            <div className='p-4'>
                                <div className='flex items-center gap-2 text-sm text-green-500'>
                                    <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                                    <p>Available</p>
                                </div>


                                <p className='font-medium'>{doc.name}</p>
                                <p className='text-sm text-gray-600'>{doc.speciality}</p>

                                <a href={doc.map} target="_blank" rel="noreferrer" className="text-blue-500 text-xs underline">
                                    📍 {doc.hospital}
                                </a>

                            </div>

                        </div>
                    ))}

            </div>
        </div>
    )
}

export default TopDoctor
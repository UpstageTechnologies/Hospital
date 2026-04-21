import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointment = () => {

  const { appointments, user, doctors } = useContext(AppContext)

  // ✅ user check
  if (!user) {
    return <p className="mt-10 text-center">Login pannunga</p>
  }

  const userAppointments = appointments.filter(
    item => item.userId === user.id
  )

  return (
    <div>

      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>
        My Appointment
      </p>

      <div>

        {userAppointments.length === 0 && (
          <p className="mt-5 text-gray-500">No Appointments Found</p>
        )}

        {userAppointments.map((item, index) => {

          // ✅ find doctor details
          const doctor = doctors.find(d => d.id === item.doctorId)

          return (
            <div key={index}
              className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>

              {/* Image */}
              <div>
                <img
                  className='w-32 bg-indigo-50'
                  src={doctor?.image || "/user.png"}
                  alt=""
                />
              </div>

              {/* Details */}
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>
                  {doctor?.name}
                </p>

                <p>{doctor?.speciality}</p>

                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{doctor?.address?.line1}</p>
                <p className='text-xs'>{doctor?.address?.line2}</p>

                <p className='text-xs mt-1'>
                  <span className='text-sm font-medium'>Date & Time:</span>
                  {" "}
                  {item.date} | {item.time}
                </p>

                {/* Payment */}
                <p className={`mt-2 font-medium ${
                  item.isPaid ? "text-green-500" : "text-red-500"
                }`}>
                  {item.isPaid ? "Paid" : "Pending Payment"}
                </p>

              </div>

              {/* Buttons */}
              <div className='flex flex-col gap-2 justify-end'>

                {!item.isPaid && (
                  <button className='text-sm sm:min-w-48 py-2 border rounded hover:bg-blue-500 hover:text-white'>
                    Pay Online
                  </button>
                )}

                <button className='text-sm sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white'>
                  Cancel Appointment
                </button>

              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}

export default MyAppointment
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const DemoMasterDashboard = () => {

  const [tab, setTab] = useState("home")
  const [selected, setSelected] = useState(null)
  const nav = useNavigate()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const appointments = [
    {
      patient:"Uma",
      doctor:"Ashok",
      date:"Apr 01 2026",
      time:"8.00pm-9.00pm",
      patientImg:"https://randomuser.me/api/portraits/women/44.jpg",
      doctorImg:"https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      patient:"Sundar",
      doctor:"Samaya Pandi",
      date:"Apr 04 2026",
      time:"5.00pm-6.00pm",
      patientImg:"https://randomuser.me/api/portraits/men/46.jpg",
      doctorImg:"https://randomuser.me/api/portraits/women/50.jpg"
    },
    {
      patient:"Remo",
      doctor:"Naveen",
      date:"Apr 10 2026",
      time:"7.00am-8.00am",
      patientImg:"https://randomuser.me/api/portraits/men/55.jpg",
      doctorImg:"https://randomuser.me/api/portraits/men/70.jpg"
    },
    {
      patient:"Rajkumar",
      doctor:"Rishi",
      date:"Apr 08 2026",
      time:"5.19pm-5.20pm",
      patientImg:"https://randomuser.me/api/portraits/men/60.jpg",
      doctorImg:"https://randomuser.me/api/portraits/men/71.jpg"
    },
    {
      patient:"Vinith",
      doctor:"Ashok",
      date:"Apr 12 2026",
      time:"11.00am-12.00pm",
      patientImg:"https://randomuser.me/api/portraits/men/61.jpg",
      doctorImg:"https://randomuser.me/api/portraits/men/72.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* TOP NAVBAR */}
      <div className="flex justify-between items-center px-6 py-4 border-b bg-white">
        <p onClick={()=>nav("/master-login",{state:{demo:true}})} className="text-xl font-semibold">
          Demo
        </p>

        <ul className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-10 text-sm font-medium">

<li onClick={()=>nav("/master-login",{state:{demo:true}})}>
MasterLogin
</li>

<li onClick={()=>nav("/admin-login",{state:{demo:true}})}>
AdminLogin
</li>

<li onClick={()=>nav("/doctor-login",{state:{demo:true}})}>
DoctorLogin
</li>

<li onClick={()=>nav("/staff-login",{state:{demo:true}})}>
StaffLogin
</li>

<li onClick={()=>nav("/patient-login",{state:{demo:true}})}>
PatientLogin
</li>

</ul>

        <div className="relative">
  <img
    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    onClick={() => setShowProfileMenu(!showProfileMenu)}
    className="w-10 h-10 rounded-full cursor-pointer"
    alt=""
  />

  {showProfileMenu && (
    <div className="absolute right-0 top-14 bg-white shadow-lg rounded-lg w-48 border z-50">

      <p
        onClick={() => {
          setShowProfileMenu(false)
          nav("/my-profile")
        }}
        className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
      >
        My Profile
      </p>

      <p
        onClick={() => {
          setShowProfileMenu(false)
          nav("/my-appointments")
        }}
        className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
      >
        My Appointments
      </p>

      <p
        onClick={() => {
          localStorage.removeItem("masterLogin")
          nav("/demohome")
        }}
        className="px-4 py-3 text-red-500 hover:bg-gray-100 cursor-pointer"
      >
        Logout
      </p>

    </div>
  )}
</div>
      </div>

      <div className="flex">

        {/* DESKTOP SIDEBAR */}
        <div className="hidden md:block w-64 min-h-screen bg-blue-600 text-white p-6">
          <h2 className="text-2xl font-bold mb-10">
            Master Panel
          </h2>

          <div className="space-y-6 text-lg">
            <p
              onClick={()=>setTab("home")}
              className="cursor-pointer"
            >
              Home
            </p>

            <p
              onClick={()=>setTab("subscription")}
              className="cursor-pointer"
            >
              Subscription
            </p>

            <p
              onClick={()=>setTab("appointments")}
              className="cursor-pointer"
            >
              Appointments
            </p>
          </div>
        </div>


        {/* RIGHT CONTENT */}
        <div className="flex-1 p-6 md:p-10 pb-24">

          {/* HOME */}
          {tab==="home" && (
            <div>
              <h1 className="text-4xl font-bold">
                Welcome to DemoMaster Home
              </h1>

              <p className="mt-5 text-gray-600">
                Manage doctors, patients and appointments easily from master panel.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-10">

                <div className="border rounded-xl p-6 shadow">
                  <h2 className="text-xl font-bold">
                    Total Doctors
                  </h2>
                  <p className="text-3xl mt-4 text-blue-600">
                    32
                  </p>
                </div>

                <div className="border rounded-xl p-6 shadow">
                  <h2 className="text-xl font-bold">
                    Total Patients
                  </h2>
                  <p className="text-3xl mt-4 text-blue-600">
                    120
                  </p>
                </div>

                <div className="border rounded-xl p-6 shadow">
                  <h2 className="text-xl font-bold">
                    Appointments
                  </h2>
                  <p className="text-3xl mt-4 text-blue-600">
                    5
                  </p>
                </div>

              </div>
            </div>
          )}


          {/* SUBSCRIPTION */}
          {tab==="subscription" && (
            <div>
              <h1 className="text-4xl font-bold">
                Demo Subscription
              </h1>

              <div className="border rounded-xl p-8 mt-8 max-w-xl shadow">

                <p className="mb-4">
                  <b>Plan:</b> Premium Master
                </p>

                <p className="mb-4">
                  <b>Expiry:</b> Dec 2026
                </p>

                <p className="mb-4">
                  <b>Doctors Access:</b> Unlimited
                </p>

                <button className="bg-blue-600 text-white px-6 py-3 rounded mt-4">
                  Renew Plan
                </button>

              </div>
            </div>
          )}


          {/* APPOINTMENTS */}
          {tab==="appointments" && (
            <div>

              <h1 className="text-4xl font-bold mb-8">
                All Appointments
              </h1>

              <div className="grid md:grid-cols-2 gap-6">

                {appointments.map((item,i)=>(

                  <div
                    key={i}
                    onClick={()=>setSelected(item)}
                    className="border rounded-xl p-6 shadow cursor-pointer hover:scale-105 transition"
                  >

                    <p><b>Patient:</b> {item.patient}</p>
                    <p><b>Doctor:</b> {item.doctor}</p>
                    <p><b>Date:</b> {item.date}</p>
                    <p><b>Time:</b> {item.time}</p>

                  </div>

                ))}

              </div>

            </div>
          )}

        </div>

      </div>


      {/* POPUP */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-8 rounded-xl w-[95%] md:w-[420px]">

            <h2 className="text-2xl font-bold mb-6 text-center">
              Appointment Details
            </h2>

            <div className="flex justify-center gap-8 mb-6">

              <div className="text-center">
                <img
                  src={selected.patientImg}
                  className="w-20 h-20 rounded-full mx-auto"
                />
                <p>{selected.patient}</p>
              </div>

              <div className="text-center">
                <img
                  src={selected.doctorImg}
                  className="w-20 h-20 rounded-full mx-auto"
                />
                <p>{selected.doctor}</p>
              </div>

            </div>

            <p><b>Patient:</b> {selected.patient}</p>
            <p><b>Doctor:</b> {selected.doctor}</p>
            <p><b>Date:</b> {selected.date}</p>
            <p><b>Time:</b> {selected.time}</p>

            <button
              onClick={()=>setSelected(null)}
              className="bg-blue-600 text-white px-6 py-3 rounded mt-6 w-full"
            >
              Close
            </button>

          </div>

        </div>
      )}


      {/* MOBILE + TAB BOTTOM MENU */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-3">

        <button onClick={()=>setTab("home")}>
          🏠
          <p>Home</p>
        </button>

        <button onClick={()=>setTab("subscription")}>
          💳
          <p>Subscription</p>
        </button>

        <button onClick={()=>setTab("appointments")}>
          📅
          <p>Appointments</p>
        </button>

      </div>

    </div>
  )
}

export default DemoMasterDashboard
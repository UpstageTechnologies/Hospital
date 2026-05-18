import React, { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DashboardNavbar from "../components/DashboardNavbar";
import FloatingInput from "../components/FloatingInput"
import { db } from "../firebase"
import { 
  doc, 
  setDoc, 
  deleteDoc, 
  updateDoc, 
  getDocs, 
  collection 
} from "firebase/firestore"

const DemoMasterDashboard = () => {

  const [tab, setTab] = useState("home")
  const [selected, setSelected] = useState(null)
  const nav = useNavigate()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [accountMenu, setAccountMenu] = useState(false)
  const [subMenu, setSubMenu] = useState("")

  const [adminStep, setAdminStep] = useState(1)

const [adminBasicInfo, setAdminBasicInfo] = useState({
  name: "",
  age: "",
  gender: "",
  dob: "",
  address: "",
  contact: "",
  emrContact: "",
  email: "",
  occupation: ""
})

const [adminDesignation, setAdminDesignation] = useState({
  designation: "",
  qualification: ""
})

const [adminOfficial, setAdminOfficial] = useState({
  adminId: "",
  joiningDate: "",
  relievingDate: ""
})

const [adminAccount, setAdminAccount] = useState({
  adminId: "",
  password: "",
  confirmPassword: ""
})

const [isViewMode, setIsViewMode] = useState(false)
const [isEditMode, setIsEditMode] = useState(false)

const [doctorStep, setDoctorStep] = useState(1)

const [doctorBasicInfo, setDoctorBasicInfo] = useState({
  name: "",
  age: "",
  gender: "",
  dob: "",
  address: "",
  contact: "",
  emrContact: "",
  email: "",
  occupation: ""
})

const [doctorDesignation, setDoctorDesignation] = useState({
  designation: "",
  qualification: "",
  doctorImage: ""
})

const [doctorOfficial, setDoctorOfficial] = useState({
  doctorId: "",
  joiningDate: "",
  relievingDate: ""
})
const defaultDoctorAvatar =
  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

const [doctorAccount, setDoctorAccount] = useState({
  doctorId: "",
  password: "",
  confirmPassword: ""
})

const [staffStep, setStaffStep] = useState(1)

const [staffBasicInfo, setStaffBasicInfo] = useState({
  name: "",
  age: "",
  gender: "",
  dob: "",
  address: "",
  contact: "",
  email: ""
})

const [staffDesignation, setStaffDesignation] = useState({
  designation: "",
  qualification: ""
})

const [staffOfficial, setStaffOfficial] = useState({
  staffId: "",
  joiningDate: "",
  relievingDate: ""
})

const [staffAccount, setStaffAccount] = useState({
  staffId: "",
  password: "",
  confirmPassword: ""
})

const [pharmasiStep, setPharmasiStep] = useState(1)

const [pharmasiBasicInfo, setPharmasiBasicInfo] = useState({
  name: "",
  age: "",
  gender: "",
  dob: "",
  address: "",
  contact: "",
  emrContact: "",
  email: "",
  occupation: ""
})

const [pharmasiDesignation, setPharmasiDesignation] = useState({
  designation: ""
})

const [pharmasiOfficial, setPharmasiOfficial] = useState({
  pharmasiId: "",
  joiningDate: "",
  relievingDate: ""
})

const [pharmasiAccount, setPharmasiAccount] = useState({
  pharmasiId: "",
  password: "",
  confirmPassword: ""
})


const [step, setStep] = useState(1)

const [basicInfo, setBasicInfo] = useState({
  name: "",
  age: "",
  gender: "",
  dob: "",
  address: "",
  contact: "",
  emrContact: "",
  email: "",
  occupation: ""
})

const [insuranceInfo, setInsuranceInfo] = useState({
  provider: "",
  policy: "",
  agentName: "",
  agentNumber: ""
})

const [medicalHistory, setMedicalHistory] = useState({
  bloodGroup: "",
  treated: "",
  diabetes: false,
  hypertension: false,
  heart: false,
  stroke: false,
  other: false
})

const [reasonInfo, setReasonInfo] = useState({
  condition: "",
  visitReason: "",
  primaryReason: "",
  duration: "",
  treatedBefore: ""
})

const [accountInfo, setAccountInfo] = useState({
  username: "",
  password: "",
  confirmPassword: ""
})
const [editData, setEditData] = useState(null)
const [viewData, setViewData] = useState(null)
const [callData, setCallData] = useState(null)
const [editIndex, setEditIndex] = useState(null)

const [doctorAccounts, setDoctorAccounts] = useState([])
const [staffAccounts, setStaffAccounts] = useState([])
const [patientAccounts, setPatientAccounts] = useState([])
const [pharmasiAccounts, setPharmasiAccounts] = useState([])
const [appointments, setAppointments] = useState([])

const handleMenuChange = (mainTab, child = "") => {

  setTab(mainTab)

  setSubMenu(child)

  setSelected(null)

  setIsViewMode(false)

  setIsEditMode(false)

}

const handleCreateAdminFull = async () => {
  try {

    const id = adminOfficial.adminId

    await setDoc(doc(db, "admins", id), {
      adminBasicInfo,
      adminDesignation,
      adminOfficial,
      adminAccount,
      isDisabled: false
    })

    alert("Admin saved")

    // reset
    setAdminBasicInfo({
      name: "", age: "", gender: "", dob: "",
      address: "", contact: "", emrContact: "",
      email: "", occupation: ""
    })

    setAdminDesignation({
      designation: "",
      qualification: ""
    })

    setAdminOfficial({
      adminId: "",
      joiningDate: "",
      relievingDate: ""
    })

    setAdminAccount({
      adminId: "",
      password: "",
      confirmPassword: ""
    })

    setAdminStep(1)

  } catch (err) {
    console.log(err)
  }
}


const [adminAccounts, setAdminAccounts] = useState([])

const fetchAdmins = async () => {

  const snapshot = await getDocs(
    collection(db, "admins")
  )

  setAdminAccounts(
    snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  )
}

const handleCreateDoctorFull = async () => {
  const id = doctorOfficial.doctorId

  await setDoc(doc(db, "doctors", id), {
    doctorBasicInfo,
    doctorDesignation,
    doctorOfficial,
    doctorAccount,
    isDisabled: false
  })

  fetchDoctors()
  alert("Doctor created")
}

const handleUpdateDoctor = async () => {

  try {

    // document id from firestore
    const docId = editData?.id

    if (!docId) {
      alert("Document ID Missing")
      return
    }

    await updateDoc(
      doc(db, "doctors", docId),
      {
        doctorBasicInfo,
        doctorDesignation,
        doctorOfficial,
        doctorAccount
      }
    )

    alert("Doctor Updated Successfully")

    await fetchDoctors()

    setIsEditMode(false)
    setIsViewMode(false)

    setEditData(null)

    setDoctorStep(1)

  } catch (err) {

    console.log("UPDATE ERROR :", err)

    alert(err.message)
  }
}

const handleCreateStaffFull = async () => {
  const id = staffOfficial.staffId

  await setDoc(doc(db, "staffs", id), {
    staffBasicInfo,
    staffDesignation,
    staffOfficial,
    staffAccount,
    isDisabled: false
  })

  fetchStaffs()
  alert("Staff created")
}

const handleCreatePatient = async () => {
  const id = basicInfo.email

  await setDoc(doc(db, "patients", id), {
    basicInfo,
    insuranceInfo,
    medicalHistory,
    reasonInfo,
    accountInfo,
    isDisabled: false
  })

  fetchPatients()
  alert("Patient created")
}

const handleCreatePharmasiFull = async () => {
  const id = pharmasiOfficial.pharmasiId

  await setDoc(doc(db, "pharmasi", id), {
    pharmasiBasicInfo,
    pharmasiDesignation,
    pharmasiOfficial,
    pharmasiAccount,
    isDisabled: false
  })

  fetchPharmasi()
  alert("Pharmasi created")
}

const fetchDoctors = async () => {
  const snapshot = await getDocs(collection(db, "doctors"))
  setDoctorAccounts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
}

const fetchStaffs = async () => {
  const snapshot = await getDocs(collection(db, "staffs"))
  setStaffAccounts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
}

const fetchPatients = async () => {
  const snapshot = await getDocs(collection(db, "patients"))
  setPatientAccounts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
}

const fetchPharmasi = async () => {
  const snapshot = await getDocs(collection(db, "pharmasi"))
  setPharmasiAccounts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
}

useEffect(() => {

  fetchAdmins()

  fetchDoctors()

  fetchStaffs()

  fetchPatients()

  fetchPharmasi()

}, [])

const handleUpdateAdmin = async () => {

  try {

    const docId = editData?.id

    if (!docId) {
      alert("Document ID Missing")
      return
    }

    await updateDoc(
      doc(db, "admins", docId),
      {
        adminBasicInfo,
        adminDesignation,
        adminOfficial,
        adminAccount
      }
    )

    alert("Admin Updated Successfully")

    fetchAdmins()

    setIsEditMode(false)

    setIsViewMode(false)

    setEditData(null)

    setAdminStep(1)

  } catch (err) {

    console.log(err)

  }
}

useEffect(() => {

  const fetchAppointments = async () => {
  
  const snapshot =
  await getDocs(
  collection(db, "appointments")
  )
  
  const list =
  snapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
  }))
  
  setAppointments(list)
  
  }
  
  fetchAppointments()
  
  }, [])

  return (
    <div className="min-h-screen bg-white">

<DashboardNavbar />

      <div className="flex">

        {/* DESKTOP SIDEBAR */}
        <div className="hidden md:block w-64 min-h-screen bg-blue-600 text-white p-6">
          <h2 className="text-2xl font-bold mb-10">
            Master Panel
          </h2>

          <div className="space-y-6 text-lg">
            <p
              onClick={() => handleMenuChange("home")}
              className="cursor-pointer"
            >
              Home
            </p>

            <p
              onClick={() => handleMenuChange("subscription")}
              className="cursor-pointer"
            >
              Subscription
            </p>

            <p
              onClick={() => handleMenuChange("appointments")}
              className="cursor-pointer"
            >
              Appointments
            </p>

            <p onClick={() => handleMenuChange("history")}className="cursor-pointer">
              Appointment History
            </p>


            <p
  onClick={() => {

    setAccountMenu(!accountMenu)

    handleMenuChange("account")

  }}
  className="cursor-pointer"
>
  Account Creation
</p>

{accountMenu && (
  <div className="ml-4 mt-2 space-y-2 text-sm">

<p onClick={() => handleMenuChange("account", "admins")}>
  Admins
</p>
<p onClick={() => handleMenuChange("account", "doctors")}>
  Doctors
</p>
<p onClick={() => handleMenuChange("account", "staff")}>
  Other Staffs
</p>
<p onClick={() => handleMenuChange("account", "patients")}>
  Patients
</p>
<p onClick={() => handleMenuChange("account", "pharmasi")}>
  Pharmasi
</p>

  </div>
)}
          </div>
        </div>


        {/* RIGHT CONTENT */}

        {tab === "account" && subMenu === "" && (

<div className="w-full flex justify-center items-center py-10">

  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl">

    <div
      onClick={() => setSubMenu("admins")}
      className="bg-blue-500 text-white rounded-2xl p-6 text-center cursor-pointer shadow hover:scale-105 transition"
    >
      <p className="text-xl font-bold">Admins</p>
    </div>

    <div
      onClick={() => setSubMenu("doctors")}
      className="bg-green-500 text-white rounded-2xl p-6 text-center cursor-pointer shadow hover:scale-105 transition"
    >
      <p className="text-xl font-bold">Doctors</p>
    </div>

    <div
      onClick={() => setSubMenu("staff")}
      className="bg-purple-500 text-white rounded-2xl p-6 text-center cursor-pointer shadow hover:scale-105 transition"
    >
      <p className="text-xl font-bold">Staff</p>
    </div>

    <div
      onClick={() => setSubMenu("patients")}
      className="bg-orange-500 text-white rounded-2xl p-6 text-center cursor-pointer shadow hover:scale-105 transition"
    >
      <p className="text-xl font-bold">Patients</p>
    </div>

    <div
      onClick={() => setSubMenu("pharmasi")}
      className="bg-pink-500 text-white rounded-2xl p-6 text-center cursor-pointer shadow hover:scale-105 transition"
    >
      <p className="text-xl font-bold">Pharmasi</p>
    </div>

  </div>

</div>
)}

        <div className="flex-1 p-6 md:p-10 pb-24">

          {/* HOME */}
          {tab === "home" && subMenu === "" && (
            <div>
              <h1 className="text-4xl font-bold">
                Welcome to DemoMaster Home
              </h1>

              <p className="mt-5 text-gray-600">
                Manage doctors, patients and appointments easily from master panel.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-10">

              <div 
  onClick={() => setTab("doctorsList")}
  className="border rounded-xl p-6 shadow cursor-pointer hover:scale-105"
>
  <h2 className="text-xl font-bold">Total Doctors</h2>
  <p className="text-3xl mt-4 text-blue-600">
    {doctorAccounts.slice(0,10).length}
  </p>
</div>

<div 
  onClick={() => setTab("patientsList")}
  className="border rounded-xl p-6 shadow cursor-pointer hover:scale-105"
>
  <h2 className="text-xl font-bold">Total Patients</h2>
  <p className="text-3xl mt-4 text-blue-600">
    {patientAccounts.slice(0,20).length}
  </p>
</div>

<div 
  onClick={() => setTab("appointmentsList")}
  className="border rounded-xl p-6 shadow cursor-pointer hover:scale-105"
>
  <h2 className="text-xl font-bold">Appointments</h2>
  <p className="text-3xl mt-4 text-blue-600">
    {appointments.length}
  </p>
</div>

              </div>
            </div>
          )}

{tab === "doctorsList" && (
  <div>
    <h1 className="text-3xl font-bold mb-6">Doctors</h1>

    <div className="grid md:grid-cols-3 gap-4">
      {doctorAccounts.slice(0,10).map((doc, i) => (
        <div 
  key={i} 
  onClick={() => setSelected({
    ...doc,
    type: "doctor",
    
  })}
  className="border p-4 rounded-xl shadow cursor-pointer hover:scale-105"
>

          <p className="font-bold">{doc.doctorBasicInfo?.name}</p>
          <p>{doc.doctorDesignation?.designation}</p>
          <p className="text-gray-500">{doc.doctorBasicInfo?.email}</p>

        </div>
      ))}
    </div>
  </div>
)}

{tab === "patientsList" && (
  <div>
    <h1 className="text-3xl font-bold mb-6">Patients</h1>

    <div className="grid md:grid-cols-3 gap-4">
      {patientAccounts.slice(0,20).map((p, i) => (
        <div 
  key={i}
  onClick={() => setSelected({
    ...p,
    type: "patient",
    
  })}
  className="border p-4 rounded-xl shadow cursor-pointer hover:scale-105"
>

          <p className="font-bold">{p.basicInfo?.name}</p>
          <p>{p.basicInfo?.age} yrs</p>
          <p className="text-gray-500">{p.basicInfo?.contact}</p>

        </div>
      ))}
    </div>
  </div>
)}

{tab === "appointmentsList" && (
  <div>
    <h1 className="text-3xl font-bold mb-6">Appointments</h1>

    <div className="grid md:grid-cols-2 gap-4">
      {appointments.map((item, i) => (
        <div 
  key={i}
  onClick={() => setSelected({
    ...item,
    type: "appointment"
  })}
  className="border p-4 rounded-xl shadow cursor-pointer hover:scale-105"
>
<p><b>Patient:</b> {item.patientName}</p>
<p><b>Doctor:</b> {item.doctorName}</p>
          <p><b>Date:</b> {item.date}</p>
          <p><b>Time:</b> {item.time}</p>

        </div>
      ))}
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


{tab === "appointments" && subMenu === "" && (

<div>

<h1 className="text-4xl font-bold mb-8">
Current Appointments
</h1>

<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
">

{appointments

.filter((item) => {

if (!item.date || !item.time)
return false

const now = new Date()

const appointmentDate =
new Date(item.date + "T00:00:00")
return appointmentDate >=
new Date(
now.getFullYear(),
now.getMonth(),
now.getDate()
)

})

.map((item, i) => (

<div
key={i}
onClick={() =>
setSelected({
...item,
type:"appointment"
})
}
className="
border
rounded-2xl
p-5
shadow
cursor-pointer
hover:scale-[1.02]
transition
bg-white
"
>

<div className="flex items-center gap-4 mb-4">

<img
src={
item.patientImage ||
"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
}
className="
w-14
h-14
rounded-full
object-cover
border
"
/>

<div>

<p className="font-bold text-lg">
{item.patientName}
</p>

<p className="text-gray-500">
Patient
</p>

</div>

</div>

<div className="flex items-center gap-4 mb-4">

<img
src={
item.doctorImage ||
"https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
}
className="
w-14
h-14
rounded-full
object-cover
border
"
/>

<div>

<p className="font-bold text-lg">
{item.doctorName}
</p>

<p className="text-gray-500">
Doctor
</p>

</div>

</div>

<p>
<b>Date:</b> {item.date}
</p>

<p>
<b>Time:</b> {item.time}
</p>

<p>
<b>Reason:</b>
{" "}
{item.reason}
</p>

</div>

))}

</div>

</div>

)}

{tab === "history" && (

<div className="w-full overflow-hidden pb-28">

<h1 className="
text-2xl
md:text-4xl
font-bold
mb-6
">
Appointment History
</h1>

<div className="
w-full
max-w-full
overflow-x-scroll
touch-pan-x
rounded-2xl
shadow
bg-white
">

<table className="min-w-[950px]">

<thead className="bg-blue-600 text-white">

<tr>

<th className="p-4 text-left whitespace-nowrap">
Patient
</th>

<th className="p-4 text-left whitespace-nowrap">
Doctor
</th>

<th className="p-4 text-left whitespace-nowrap">
Date
</th>

<th className="p-4 text-left whitespace-nowrap">
Time
</th>

<th className="p-4 text-left whitespace-nowrap">
Reason
</th>

</tr>

</thead>

<tbody>

{appointments
.filter((item) => {

if (!item.date) return false

const now = new Date()

const appointmentDate =
new Date(item.date)

return appointmentDate <
new Date(
now.getFullYear(),
now.getMonth(),
now.getDate()
)

})

.map((item, i) => (

<tr
key={i}
className="border-b"
>

<td className="p-4 whitespace-nowrap">
{item.patientName}
</td>

<td className="p-4 whitespace-nowrap">
{item.doctorName}
</td>

<td className="p-4 whitespace-nowrap">
{item.date}
</td>

<td className="p-4 whitespace-nowrap">
{item.time}
</td>

<td className="p-4 whitespace-nowrap">
{item.reason}
</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)}

{tab === "account" && subMenu === "admins" && (

<div className="flex flex-col md:flex-row w-full max-w-7xl border rounded-lg overflow-hidden md:h-[450px] h-auto">

<div className="w-full md:w-1/4 p-3 flex md:flex-col gap-3 overflow-x-auto md:overflow-visible scrollbar-hide">
<h2 className="hidden md:block text-xl font-bold">Create Admin Account</h2>

              <button onClick={() => setAdminStep(1)}
                className={`min-w-[140px] md:w-full px-4 py-2 whitespace-nowrap rounded text-white ${adminStep === 1 ? "bg-blue-500" : "bg-gray-400"}`}>
                Basic Info
              </button>

              <button onClick={() => setAdminStep(2)}
                className={`min-w-[140px] md:w-full px-4 py-2 whitespace-nowrap rounded text-white ${adminStep === 2 ? "bg-blue-500" : "bg-gray-400"}`}>
                Designation
              </button>

              <button onClick={() => setAdminStep(3)}
                className={`min-w-[140px] md:w-full px-4 py-2 whitespace-nowrap rounded text-white ${adminStep === 3 ? "bg-blue-500" : "bg-gray-400"}`}>
                Official Info
              </button>

              <button onClick={() => setAdminStep(4)}
                className={`min-w-[140px] md:w-full px-4 py-2 whitespace-nowrap rounded text-white ${adminStep === 4 ? "bg-blue-500" : "bg-gray-400"}`}>
                Account
              </button>

            </div>



            <div className="w-full md:w-3/4 p-4 md:p-6 relative min-h-[650px]">



              {adminStep === 1 && (
                <div>

                  <h3 className="text-lg font-bold mb-6">
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">


                    <FloatingInput label="Name" required value={adminBasicInfo.name} disabled={isViewMode}
                      onChange={(e) =>
                        setAdminBasicInfo({ ...adminBasicInfo, name: e.target.value })
                      }
                    />


                    <FloatingInput label="Age" required type="number" value={adminBasicInfo.age} disabled={isViewMode}
                      onChange={(e) =>
                        setAdminBasicInfo({ ...adminBasicInfo, age: e.target.value })
                      }
                    />


                    <div className="relative">
                      <select value={adminBasicInfo.gender} disabled={isViewMode}
                        onChange={(e) =>
                          setAdminBasicInfo({ ...adminBasicInfo, gender: e.target.value })
                        }
                        className="w-full border rounded-xl px-4 py-3 outline-none bg-white"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>

                      <label className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-500">
                        Gender <span className="text-red-500">*</span>
                      </label>
                    </div>


                    <FloatingInput label="DOB" type="date" value={adminBasicInfo.dob} disabled={isViewMode}
                      onChange={(e) =>
                        setAdminBasicInfo({ ...adminBasicInfo, dob: e.target.value })
                      }
                    />


                    <FloatingInput label="Address" className="col-span-1 md:col-span-2" inputClassName="h-[120px] pt-6" value={adminBasicInfo.address || ""} disabled={isViewMode}
                      onChange={(e) =>
                        setAdminBasicInfo({ ...adminBasicInfo, address: e.target.value })
                      }
                    />


<div className="col-span-1 md:col-span-2 flex flex-col gap-4">

                      <FloatingInput label="Contact Number" required value={adminBasicInfo.contact} disabled={isViewMode}
                        onChange={(e) =>
                          setAdminBasicInfo({ ...adminBasicInfo, contact: e.target.value })
                        }
                      />

                      <FloatingInput label="EMR Contact" value={adminBasicInfo.emrContact || ""} disabled={isViewMode}
                        onChange={(e) =>
                          setAdminBasicInfo({ ...adminBasicInfo, emrContact: e.target.value })
                        }
                      />

                    </div>


                    <FloatingInput label="Email" className="col-span-1 md:col-span-2" value={adminBasicInfo.email} disabled={isViewMode}
                      onChange={(e) =>
                        setAdminBasicInfo({ ...adminBasicInfo, email: e.target.value })
                      }
                    />


                    <FloatingInput label="Occupation" className="col-span-1 md:col-span-2" value={adminBasicInfo.occupation || ""} disabled={isViewMode}
                      onChange={(e) =>
                        setAdminBasicInfo({ ...adminBasicInfo, occupation: e.target.value })
                      }
                    />

                  </div>

                  <div className="mt-auto pt-10 flex justify-end gap-4">
                    <button onClick={() => setAdminStep(2)} className="bg-blue-500 text-white px-10 py-2 rounded">
                      Next
                    </button>
                  </div>

                </div>
              )}


              {adminStep === 2 && (
                <div>

                  <h3 className="text-lg font-bold mb-6">Designation</h3>

                  <div className="grid grid-cols-2 gap-6 max-w-4xl">
                    <FloatingInput label="Designation" value={adminDesignation.designation} disabled={isViewMode}
                      onChange={(e) =>
                        setAdminDesignation({
                          ...adminDesignation,
                          designation: e.target.value
                        })
                      }
                    />

                    <FloatingInput label="Qualification" value={adminDesignation.qualification} disabled={isViewMode}
                      onChange={(e) =>
                        setAdminDesignation({
                          ...adminDesignation,
                          qualification: e.target.value
                        })
                      }
                    />
                  </div>

                  <div className="mt-auto pt-10 flex justify-end gap-4">
                    <button onClick={() => setAdminStep(1)} className="bg-gray-500 text-white px-6 py-2 rounded">Previous</button>
                    <button onClick={() => setAdminStep(3)} className="bg-blue-500 text-white px-6 py-2 rounded">Next</button>
                  </div>

                </div>
              )}


              {adminStep === 3 && (
                <div>

                  <h3 className="text-lg font-bold mb-6">Official Info</h3>

                  <div className="flex flex-col gap-6 max-w-md">

                    <FloatingInput label="Admin ID" value={adminOfficial.adminId} disabled={isViewMode}
                      onChange={(e) =>
                        setAdminOfficial({
                          ...adminOfficial,
                          adminId: e.target.value
                        })
                      }
                    />

                    <FloatingInput label="Joining Date" type="date" value={adminOfficial.joiningDate} disabled={isViewMode}
                      onChange={(e) =>
                        setAdminOfficial({
                          ...adminOfficial,
                          joiningDate: e.target.value
                        })
                      }
                    />

                    <FloatingInput label="Relieving Date" type="date" value={adminOfficial.relievingDate} disabled={isViewMode}
                      onChange={(e) =>
                        setAdminOfficial({
                          ...adminOfficial,
                          relievingDate: e.target.value
                        })
                      }
                    />

                  </div>

                  <div className="mt-auto pt-10 flex justify-end gap-4">
                    <button onClick={() => setAdminStep(2)} className="bg-gray-500 text-white px-6 py-2 rounded">Previous</button>
                    <button onClick={() => setAdminStep(4)} className="bg-blue-500 text-white px-6 py-2 rounded">Next</button>
                  </div>

                </div>
              )}


              {adminStep === 4 && (
                <div>

                  <h3 className="text-lg font-bold mb-6">Create Account</h3>

                  <div className="flex flex-col gap-6 max-w-md">

                    <FloatingInput label="Admin ID" value={adminAccount.adminId} disabled={isViewMode}
                      onChange={(e) =>
                        setAdminAccount({
                          ...adminAccount,
                          adminId: e.target.value
                        })
                      }
                    />

                    <FloatingInput label="Password" type="password" value={adminAccount.password} disabled={isViewMode}
                      onChange={(e) =>
                        setAdminAccount({
                          ...adminAccount,
                          password: e.target.value
                        })
                      }
                    />

                    <FloatingInput label="Confirm Password" type="password" value={adminAccount.confirmPassword} disabled={isViewMode}
                      onChange={(e) =>
                        setAdminAccount({
                          ...adminAccount,
                          confirmPassword: e.target.value
                        })
                      }
                    />

                  </div>

                  <div className="mt-auto pt-10 flex justify-end gap-4">

                    <button
                      onClick={() => setAdminStep(3)}
                      className="bg-gray-500 text-white px-6 py-2 rounded">
                      Previous
                    </button>

                    <button
  onClick={
    isEditMode
      ? handleUpdateAdmin
      : handleCreateAdminFull
  }
  className="bg-green-500 text-white px-6 py-2 rounded"
>
  {isEditMode ? "Update Admin" : "Create Admin"}
</button>

                  </div>

                </div>
              )}

            </div>
          </div>


        )}

{subMenu === "admins" && (

<div className="mt-10">

  <h2 className="text-xl font-bold mb-4">
    Created Admin Accounts
  </h2>

  <table className="w-full border border-gray-300">

    <thead className="bg-gray-200">

      <tr>
        <th className="border p-2">Name</th>
        <th className="border p-2">Designation</th>
        <th className="border p-2">Address</th>
        <th className="border p-2">Action</th>
      </tr>

    </thead>

    <tbody>

      {adminAccounts.map((admin, index) => (

        <tr key={index}>

          <td className="border p-2">
            {admin.adminBasicInfo?.name}
          </td>

          <td className="border p-2">
            {admin.adminDesignation?.designation}
          </td>

          <td className="border p-2">
            {admin.adminBasicInfo?.address}
          </td>

          <td className="border p-2 flex gap-2">

            {/* VIEW */}

            <button
              onClick={() => {

                setAdminBasicInfo(admin.adminBasicInfo || {})
                setAdminDesignation(admin.adminDesignation || {})
                setAdminOfficial(admin.adminOfficial || {})
                setAdminAccount(admin.adminAccount || {})

                setIsViewMode(true)
                setIsEditMode(false)

                setAdminStep(1)
              }}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              View
            </button>

            {/* EDIT */}

            <button
              onClick={() => {

                setAdminBasicInfo(admin.adminBasicInfo || {})
                setAdminDesignation(admin.adminDesignation || {})
                setAdminOfficial(admin.adminOfficial || {})
                setAdminAccount(admin.adminAccount || {})

                setEditData(admin)

                setIsViewMode(false)
                setIsEditMode(true)

                setAdminStep(1)
              }}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>

            {/* DELETE */}

            <button
              onClick={async () => {

                await deleteDoc(
                  doc(db, "admins", admin.id)
                )

                fetchAdmins()
              }}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>

            {/* DISABLE */}

            <button
              onClick={async () => {

                await updateDoc(
                  doc(db, "admins", admin.id),
                  {
                    isDisabled: !admin.isDisabled
                  }
                )

                fetchAdmins()
              }}
              className={`px-2 py-1 rounded text-white ${
                admin.isDisabled
                  ? "bg-green-500"
                  : "bg-gray-500"
              }`}
            >
              {admin.isDisabled ? "Enable" : "Disable"}
            </button>

          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

)}



{tab === "account" && subMenu === "doctors" && (

<div className="flex flex-col md:flex-row w-full max-w-7xl border rounded-lg overflow-hidden mx-auto
                  min-h-[auto] md:h-[450px]">


<div className=" w-full md:w-1/4  p-4 flex md:block gap-2 overflow-x-auto md:space-y-3">

          <h2 className="text-xl font-bold mb-4">Create Doctor Account</h2>

          <button onClick={() => setDoctorStep(1)}
            className={`min-w-[140px] md:w-full p-3 rounded-xl text-white text-sm md:text-base ${doctorStep === 1 ? "bg-blue-500" : "bg-gray-400"}`}>
            Basic Info
          </button>

          <button onClick={() => setDoctorStep(2)}
            className={`min-w-[140px] md:w-full p-3 rounded-xl text-white text-sm md:text-base ${doctorStep === 2 ? "bg-blue-500" : "bg-gray-400"}`}>
            Designation
          </button>

          <button onClick={() => setDoctorStep(3)}
            className={`min-w-[140px] md:w-full p-3 rounded-xl text-white text-sm md:text-base ${doctorStep === 3 ? "bg-blue-500" : "bg-gray-400"}`}>
            Official Info
          </button>

          <button onClick={() => setDoctorStep(4)}
            className={`min-w-[140px] md:w-full p-3 rounded-xl text-white text-sm md:text-base ${doctorStep === 4 ? "bg-blue-500" : "bg-gray-400"}`}>
            Account
          </button>

        </div>


        <div className="
w-full md:w-3/4
p-3 md:p-6
relative
overflow-y-auto
min-h-[600px]
bg-white
">


          {doctorStep === 1 && (

            <div>

              <h3 className="text-lg font-bold mb-6">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">


                <FloatingInput label="Name" required value={doctorBasicInfo.name} disabled={isViewMode}
                  onChange={(e) =>
                    setDoctorBasicInfo({ ...doctorBasicInfo, name: e.target.value })
                  }
                />


                <FloatingInput label="Age" required type="number" value={doctorBasicInfo.age} disabled={isViewMode}
                  onChange={(e) =>
                    setDoctorBasicInfo({ ...doctorBasicInfo, age: e.target.value })
                  }
                />


                <div className="relative">
                  <select value={doctorBasicInfo.gender} disabled={isViewMode}
                    onChange={(e) =>
                      setDoctorBasicInfo({ ...doctorBasicInfo, gender: e.target.value })
                    }
                    className="w-full border rounded-xl px-4 py-3 outline-none bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>

                  <label className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-500">
                    Gender <span className="text-red-500">*</span>
                  </label>
                </div>


                <FloatingInput label="DOB" type="date" value={doctorBasicInfo.dob} disabled={isViewMode}
                  onChange={(e) =>
                    setDoctorBasicInfo({ ...doctorBasicInfo, dob: e.target.value })
                  }
                />


                <FloatingInput label="Address" className="col-span-2" inputClassName="h-[120px] pt-6"
                  value={doctorBasicInfo.address || ""} disabled={isViewMode}
                  onChange={(e) =>
                    setDoctorBasicInfo({ ...doctorBasicInfo, address: e.target.value })
                  }
                />


                <div className="col-span-2 flex flex-col gap-4">

                  <FloatingInput label="Contact Number" required value={doctorBasicInfo.contact} disabled={isViewMode}
                    onChange={(e) =>
                      setDoctorBasicInfo({ ...doctorBasicInfo, contact: e.target.value })
                    }
                  />

                  <FloatingInput label="EMR Contact" value={doctorBasicInfo.emrContact || ""} disabled={isViewMode}
                    onChange={(e) =>
                      setDoctorBasicInfo({ ...doctorBasicInfo, emrContact: e.target.value })
                    }
                  />

                </div>


                <FloatingInput label="Email" className="col-span-2" value={doctorBasicInfo.email} disabled={isViewMode}
                  onChange={(e) =>
                    setDoctorBasicInfo({ ...doctorBasicInfo, email: e.target.value })
                  }
                />


                <FloatingInput label="Occupation" className="col-span-2" value={doctorBasicInfo.occupation || ""} disabled={isViewMode}
                  onChange={(e) =>
                    setDoctorBasicInfo({ ...doctorBasicInfo, occupation: e.target.value })
                  }
                />

              </div>

              <div className="
mt-6
flex
justify-center md:justify-end
gap-4
flex-wrap
">
                <button onClick={() => setDoctorStep(2)} className="bg-blue-500 text-white px-10 py-2 rounded">
                  Next
                </button>
              </div>

            </div>
          )}


          {doctorStep === 2 && (
            <div>

              <h3 className="text-lg font-bold mb-6">
                Designation
              </h3>

              <div className="flex flex-col items-center mb-6">

<img
src={
  doctorDesignation.doctorImage || defaultDoctorAvatar
}
alt="doctor"
className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
/>

<input
type="file"
accept="image/*"
className="mt-4"
onChange={(e) => {
  const file = e.target.files[0]

  if (file) {
    const imageUrl = URL.createObjectURL(file)

    setDoctorDesignation({
      ...doctorDesignation,
      doctorImage: imageUrl
    })
  }
}}
/>

</div>

              <div className="grid grid-cols-2 gap-6 max-w-4xl">

                <FloatingInput label="Designation" value={doctorDesignation.designation} disabled={isViewMode}
                  onChange={(e) =>
                    setDoctorDesignation({
                      ...doctorDesignation,
                      designation: e.target.value
                    })
                  }
                />

                <FloatingInput label="Qualification" value={doctorDesignation.qualification} disabled={isViewMode}
                  onChange={(e) =>
                    setDoctorDesignation({
                      ...doctorDesignation,
                      qualification: e.target.value
                    })
                  }
                />

              </div>

              <div className="
mt-6
flex
justify-center md:justify-end
gap-4
flex-wrap
">

                <button onClick={() => setDoctorStep(1)} className="bg-gray-500 text-white px-8 py-2 rounded">
                  Previous
                </button>

                <button onClick={() => setDoctorStep(3)} className="bg-blue-500 text-white px-8 py-2 rounded">
                  Next
                </button>

              </div>

            </div>
          )}


          {doctorStep === 3 && (
            <div>

              <h3 className="text-lg font-bold mb-6">
                Official Info
              </h3>

              <div className="flex flex-col gap-6 max-w-md">

                <FloatingInput label="Doctor ID" value={doctorOfficial.doctorId} disabled={isViewMode}
                  onChange={(e) =>
                    setDoctorOfficial({
                      ...doctorOfficial,
                      doctorId: e.target.value
                    })
                  }
                />

                <FloatingInput label="Joining Date" type="date" value={doctorOfficial.joiningDate} disabled={isViewMode}
                  onChange={(e) =>
                    setDoctorOfficial({
                      ...doctorOfficial,
                      joiningDate: e.target.value
                    })
                  }
                />

                <FloatingInput label="Relieving Date" type="date" value={doctorOfficial.relievingDate} disabled={isViewMode}
                  onChange={(e) =>
                    setDoctorOfficial({
                      ...doctorOfficial,
                      relievingDate: e.target.value
                    })
                  }
                />

              </div>

              <div className="
mt-6
flex
justify-center md:justify-end
gap-4
flex-wrap
">
                <button onClick={() => setDoctorStep(2)} className="bg-gray-500 text-white px-8 py-2 rounded">
                  Previous
                </button>

                <button onClick={() => setDoctorStep(4)} className="bg-blue-500 text-white px-8 py-2 rounded">
                  Next
                </button>
              </div>

            </div>
          )}


          {doctorStep === 4 && (
            <div>

              <h3 className="text-lg font-bold mb-6">
                Create Account
              </h3>

              <div className="flex flex-col gap-6 max-w-md">

                <FloatingInput label="Doctor ID" value={doctorAccount.doctorId} disabled={isViewMode}
                  onChange={(e) =>
                    setDoctorAccount({
                      ...doctorAccount,
                      doctorId: e.target.value
                    })
                  }
                />

                <FloatingInput label="Password" type="password" value={doctorAccount.password} disabled={isViewMode}
                  onChange={(e) =>
                    setDoctorAccount({
                      ...doctorAccount,
                      password: e.target.value
                    })
                  }
                />

                <FloatingInput label="Confirm Password" type="password" value={doctorAccount.confirmPassword} disabled={isViewMode}
                  onChange={(e) =>
                    setDoctorAccount({
                      ...doctorAccount,
                      confirmPassword: e.target.value
                    })
                  }
                />

              </div>

              <div className="
mt-6
flex
justify-center md:justify-end
gap-4
flex-wrap
">

                <button onClick={() => setDoctorStep(3)} className="bg-gray-500 text-white px-8 py-2 rounded">
                  Previous
                </button>

                <button
                  onClick={isEditMode ? handleUpdateDoctor : handleCreateDoctorFull}
                  className="bg-green-500 text-white px-8 py-2 rounded"
                >
                  {isEditMode ? "Update Doctor" : "Create Doctor"}
                </button>

              </div>

            </div>
          )}
        </div>

      </div>

    )}

    {subMenu === "doctors" && (

      <div className="mt-10">

        <h2 className="text-xl font-bold mb-4">Created Doctor Accounts</h2>

        <table className="w-full border border-gray-300">

          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Speciality</th>
              <th className="border p-2">address</th>

              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>

            {doctorAccounts.map((docData, index) => (

                <tr key={index}>

                  <td className="border p-2">
                  {docData.doctorBasicInfo?.name}
                  </td>

                  <td className="border p-2">
                  {docData.doctorDesignation?.designation}
                  </td>

                  <td className="border p-2">
                  {docData.doctorBasicInfo?.address}
                  </td>

                  {/* <td className="border p-2">
                  {docData.contact}
                </td> */}

                  <td className="border p-2 flex gap-2">


                    <button
                      onClick={() => {

                        setDoctorBasicInfo(docData.doctorBasicInfo || {})
                        setDoctorDesignation(docData.doctorDesignation || {})
                        setDoctorOfficial(docData.doctorOfficial || {})
                        setDoctorAccount(docData.doctorAccount || {})

                        setIsViewMode(true)
                        setIsEditMode(false)
                        setDoctorStep(1)
                      }}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      View
                    </button>


                    <button
                      onClick={() => {

                        setEditData(null)
                        setViewData(null)

                        // 🔥 full data load
                        setDoctorBasicInfo(docData.doctorBasicInfo || {})
                        setDoctorDesignation(docData.doctorDesignation || {})
                        setDoctorOfficial(docData.doctorOfficial || {})
                        setDoctorAccount(docData.doctorAccount || {})

                        setEditData(docData)

                        // 🔥 modes
                        setIsViewMode(false)
                        setIsEditMode(true)

                        // 🔥 open form
                        setDoctorStep(1)
                      }}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>


                    <button
                      onClick={async () => {
                        await deleteDoc(doc(db, "doctors", docData.id))
                        fetchDoctors()
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>


                    <button
                      onClick={async () => {
                        await updateDoc(doc(db, "doctors", docData.id), {
                          isDisabled: !docData.isDisabled
                        })
                        fetchDoctors()
                      }}
                      className={`px-2 py-1 rounded text-white ${docData.isDisabled ? "bg-green-500" : "bg-gray-500"
                        }`}
                    >
                      {docData.isDisabled ? "Enable" : "Disable"}
                    </button>

                  </td>

                </tr>

              ))}

          </tbody>

        </table>

      </div>

    )}


{tab === "account" && subMenu === "staff" && (

<div className="flex w-full max-w-7xl border rounded-lg overflow-hidden h-[450px]">

  <div className="w-1/4 p-4 space-y-3">

    <h2 className="text-xl font-bold mb-4">Create Staff Account</h2>

    <button onClick={() => setStaffStep(1)} className={`min-w-[140px] md:w-full p-3 rounded-xl text-white text-sm md:text-base ${staffStep === 1 ? "bg-blue-500" : "bg-gray-400"}`}>
      Basic Info
    </button>

    <button onClick={() => setStaffStep(2)} className={`min-w-[140px] md:w-full p-3 rounded-xl text-white text-sm md:text-base ${staffStep === 2 ? "bg-blue-500" : "bg-gray-400"}`}>
      Designation
    </button>

    <button onClick={() => setStaffStep(3)} className={`min-w-[140px] md:w-full p-3 rounded-xl text-white text-sm md:text-base ${staffStep === 3 ? "bg-blue-500" : "bg-gray-400"}`}>
      Official Info
    </button>

    <button onClick={() => setStaffStep(4)} className={`min-w-[140px] md:w-full p-3 rounded-xl text-white text-sm md:text-base ${staffStep === 4 ? "bg-blue-500" : "bg-gray-400"}`}>
      create Account
    </button>

  </div>


  <div className="w-3/4 p-6 relative overflow-hidden h-[450px]">


    {staffStep === 1 && (

      <div>

        <h3 className="text-lg font-bold mb-6">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">


          <FloatingInput label="Name" required value={staffBasicInfo.name} disabled={isViewMode}
            onChange={(e) =>
              setStaffBasicInfo({ ...staffBasicInfo, name: e.target.value })
            }
          />


          <FloatingInput label="Age" required type="number" value={staffBasicInfo.age} disabled={isViewMode}
            onChange={(e) =>
              setStaffBasicInfo({ ...staffBasicInfo, age: e.target.value })
            }
          />


          <div className="relative">
            <select value={staffBasicInfo.gender} disabled={isViewMode}
              onChange={(e) =>
                setStaffBasicInfo({ ...staffBasicInfo, gender: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none bg-white"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>

            <label className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-500">
              Gender <span className="text-red-500">*</span>
            </label>
          </div>


          <FloatingInput label="DOB" type="date" value={staffBasicInfo.dob} disabled={isViewMode}
            onChange={(e) =>
              setStaffBasicInfo({ ...staffBasicInfo, dob: e.target.value })
            }
          />


          <FloatingInput label="Address" required className="col-span-2" inputClassName="h-[120px] pt-6"
            value={staffBasicInfo.address || ""} disabled={isViewMode}
            onChange={(e) =>
              setStaffBasicInfo({ ...staffBasicInfo, address: e.target.value })
            }
          />


          <div className="col-span-2 flex flex-col gap-4">

            <FloatingInput label="Contact Number" required value={staffBasicInfo.contact} disabled={isViewMode}
              onChange={(e) =>
                setStaffBasicInfo({ ...staffBasicInfo, contact: e.target.value })
              }
            />

            <FloatingInput label="EMR Contact" value={staffBasicInfo.emrContact || ""} disabled={isViewMode}
              onChange={(e) =>
                setStaffBasicInfo({ ...staffBasicInfo, emrContact: e.target.value })
              }
            />

          </div>


          <FloatingInput label="Email" className="col-span-2" value={staffBasicInfo.email} disabled={isViewMode}
            onChange={(e) =>
              setStaffBasicInfo({ ...staffBasicInfo, email: e.target.value })
            }
          />


          <FloatingInput label="Occupation" className="col-span-2" value={staffBasicInfo.occupation || ""} disabled={isViewMode}
            onChange={(e) =>
              setStaffBasicInfo({ ...staffBasicInfo, occupation: e.target.value })
            }
          />

        </div>

        <div className="
mt-6
flex
justify-center md:justify-end
gap-4
flex-wrap
">
          <button onClick={() => setStaffStep(2)} className="bg-blue-500 text-white px-10 py-2 rounded">
            Next
          </button>
        </div>

      </div>
    )}


    {staffStep === 2 && (
      <div>

        <h3 className="text-lg font-bold mb-6">
          Designation
        </h3>

        <div className="grid grid-cols-2 gap-6 max-w-4xl">

          <FloatingInput label="Designation" value={staffDesignation.designation} disabled={isViewMode}
            onChange={(e) =>
              setStaffDesignation({
                ...staffDesignation,
                designation: e.target.value
              })
            }
          />

          <FloatingInput label="Qualification" value={staffDesignation.qualification} disabled={isViewMode}
            onChange={(e) =>
              setStaffDesignation({
                ...staffDesignation,
                qualification: e.target.value
              })
            }
          />

        </div>

        <div className="
mt-6
flex
justify-center md:justify-end
gap-4
flex-wrap
">

          <button onClick={() => setStaffStep(1)} className="bg-gray-500 text-white px-8 py-2 rounded">
            Previous
          </button>

          <button onClick={() => setStaffStep(3)} className="bg-blue-500 text-white px-8 py-2 rounded">
            Next
          </button>

        </div>

      </div>
    )}


    {staffStep === 3 && (
      <div>

        <h3 className="text-lg font-bold mb-6">
          Official Info
        </h3>

        <div className="flex flex-col gap-6 max-w-md">

          <FloatingInput label="Staff ID" value={staffOfficial.staffId} disabled={isViewMode}
            onChange={(e) =>
              setStaffOfficial({
                ...staffOfficial,
                staffId: e.target.value
              })
            }
          />

          <FloatingInput label="Joining Date" type="date" value={staffOfficial.joiningDate} disabled={isViewMode}
            onChange={(e) =>
              setStaffOfficial({
                ...staffOfficial,
                joiningDate: e.target.value
              })
            }
          />

          <FloatingInput label="Relieving Date" type="date" value={staffOfficial.relievingDate} disabled={isViewMode}
            onChange={(e) =>
              setStaffOfficial({
                ...staffOfficial,
                relievingDate: e.target.value
              })
            }
          />

        </div>

        <div className="
mt-6
flex
justify-center md:justify-end
gap-4
flex-wrap
">
          <button onClick={() => setStaffStep(2)} className="bg-gray-500 text-white px-8 py-2 rounded">
            Previous
          </button>

          <button onClick={() => setStaffStep(4)} className="bg-blue-500 text-white px-8 py-2 rounded">
            Next
          </button>
        </div>

      </div>
    )}


    {staffStep === 4 && (
      <div>

        <h3 className="text-lg font-bold mb-6">
          Create Account
        </h3>

        <div className="flex flex-col gap-6 max-w-md">

          <FloatingInput label="Staff ID" value={staffAccount.staffId} disabled={isViewMode}
            onChange={(e) =>
              setStaffAccount({
                ...staffAccount,
                staffId: e.target.value
              })
            }
          />

          <FloatingInput label="Password" type="password" value={staffAccount.password} disabled={isViewMode}
            onChange={(e) =>
              setStaffAccount({
                ...staffAccount,
                password: e.target.value
              })
            }
          />

          <FloatingInput label="Confirm Password" type="password" value={staffAccount.confirmPassword} disabled={isViewMode}
            onChange={(e) =>
              setStaffAccount({
                ...staffAccount,
                confirmPassword: e.target.value
              })
            }
          />

        </div>

        <div className="
mt-6
flex
justify-center md:justify-end
gap-4
flex-wrap
">

          <button onClick={() => setStaffStep(3)} className="bg-gray-500 text-white px-8 py-2 rounded">
            Previous
          </button>

          <button onClick={handleCreateStaffFull} className="bg-green-500 text-white px-8 py-2 rounded">
            Create Staff
          </button>

        </div>

      </div>
    )}
  </div>

</div>
)}

{subMenu === "staff" && (

<div className="mt-10">

  <h2 className="text-xl font-bold mb-4">Created Staff Accounts</h2>

  <table className="w-full border border-gray-300">

    <thead className="bg-gray-200">
      <tr>
        <th className="border p-2">Name</th>
        <th className="border p-2">age</th>
        <th className="border p-2">address</th>
        <th className="border p-2">contact</th>
        <th className="border p-2">Action</th>
      </tr>
    </thead>

    <tbody>

      {staffAccounts.map((staff, index) => (

        <tr key={index}>

          <td className="border p-2">
            {staff.staffBasicInfo?.name}
          </td>

          <td className="border p-2">
            {staff.staffBasicInfo?.age}
          </td>

          <td className="border p-2">
            {staff.staffBasicInfo?.address}
          </td>

          <td className="border p-2">
            {staff.staffBasicInfo?.contact}
          </td>




          <td className="border p-2 flex gap-2">

            <button
              onClick={() => {
                setStaffBasicInfo(staff.staffBasicInfo)
                setStaffOfficial(staff.staffOfficial)
                setStaffAccount(staff.staffAccount)
                setIsViewMode(true)
                setStaffStep(1)
              }}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              View
            </button>

            <button
              onClick={() => {
                setStaffBasicInfo(staff.staffBasicInfo)
                setStaffOfficial(staff.staffOfficial)
                setStaffAccount(staff.staffAccount)
                setIsViewMode(false)
                setStaffStep(1)
              }}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={async () => {
                await deleteDoc(doc(db, "staffs", staff.id))
                fetchStaffs()
              }}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>

            <button
              onClick={async () => {
                await updateDoc(doc(db, "staffs", staff.id), {
                  isDisabled: !staff.isDisabled
                })
                fetchStaffs()
              }}
              className={`px-2 py-1 rounded text-white ${staff.isDisabled ? "bg-green-500" : "bg-gray-500"
                }`}
            >
              {staff.isDisabled ? "Enable" : "Disable"}
            </button>

          </td>



        </tr>

      ))}

    </tbody>

  </table>

</div>

)}

{tab === "account" && subMenu === "patients" && (

<div className="flex w-full max-w-7xl border rounded-lg overflow-hidden h-[500px]">

  <div className="w-1/4 p-4 space-y-3">

    <h2 className="text-xl font-bold mb-3">
      Create Patient Account
    </h2>

    <button onClick={() => setStep(1)} className={`min-w-[140px] md:w-full p-3 rounded-xl text-white text-sm md:text-base ${step === 1 ? "bg-blue-500" : "bg-gray-400"}`}>
      Basic Info
    </button>

    <button onClick={() => setStep(2)} className={`min-w-[140px] md:w-full p-3 rounded-xl text-white text-sm md:text-base ${step === 2 ? "bg-blue-500" : "bg-gray-400"}`}>
      Insurance
    </button>

    <button onClick={() => setStep(3)} className={`min-w-[140px] md:w-full p-3 rounded-xl text-white text-sm md:text-base ${step === 3 ? "bg-blue-500" : "bg-gray-400"}`}>
      Medical History
    </button>

    <button onClick={() => setStep(4)} className={`min-w-[140px] md:w-full p-3 rounded-xl text-white text-sm md:text-base ${step === 4 ? "bg-blue-500" : "bg-gray-400"}`}>
      Reason
    </button>

    <button onClick={() => setStep(5)} className={`min-w-[140px] md:w-full p-3 rounded-xl text-white text-sm md:text-base ${step === 5 ? "bg-blue-500" : "bg-gray-400"}`}>
      Create Account
    </button>

  </div>




  <div className="w-3/4 p-6 relative overflow-hidden">

    {step === 1 && (

      <div>

        <h3 className="text-lg font-bold mb-6">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">


          <FloatingInput label="Name" required value={basicInfo.name} disabled={isViewMode}
            onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
          />

          <FloatingInput label="Age" required type="number" value={basicInfo.age} disabled={isViewMode}
            onChange={(e) => setBasicInfo({ ...basicInfo, age: e.target.value })}
          />


          <div className="relative">
            <select value={basicInfo.gender} disabled={isViewMode}
              onChange={(e) => setBasicInfo({ ...basicInfo, gender: e.target.value })}
              className="w-full border rounded-xl px-4 py-3 outline-none bg-white"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>

            <label className="absolute left-3 -top-2 bg-white px-1 text-sm text-gray-500">
              Gender <span className="text-red-500">*</span>
            </label>
          </div>


          <FloatingInput label="DOB" type="date" className="w-full" inputClassName="h-[52px]" value={basicInfo.dob}
            disabled={isViewMode} onChange={(e) => setBasicInfo({ ...basicInfo, dob: e.target.value })}
          />


          <FloatingInput label="Address" required className="col-span-2" inputClassName="h-[120px] pt-6" value={basicInfo.address}
            disabled={isViewMode} onChange={(e) => setBasicInfo({ ...basicInfo, address: e.target.value })}
          />

          <div className="col-span-2 flex flex-col gap-4">

            <FloatingInput label="Contact Number" required value={basicInfo.contact}
              disabled={isViewMode} onChange={(e) => setBasicInfo({ ...basicInfo, contact: e.target.value })}
            />

            <FloatingInput label="EMR Contact" value={basicInfo.emrContact} disabled={isViewMode}
              onChange={(e) => setBasicInfo({ ...basicInfo, emrContact: e.target.value })}
            />

          </div>


          <FloatingInput label="Email" className="col-span-2" value={basicInfo.email} disabled={isViewMode}
            onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
          />

          <FloatingInput label="Occupation" className="col-span-2" value={basicInfo.occupation}
            disabled={isViewMode} onChange={(e) => setBasicInfo({ ...basicInfo, occupation: e.target.value })}
          />

        </div>

        <div className="
mt-6
flex
justify-center md:justify-end
gap-4
flex-wrap
">
          <button onClick={() => setStep(2)} className="bg-blue-500 text-white px-10 py-2 rounded">
            Next
          </button>
        </div>

      </div>

    )}




    {step === 2 && (

      <div>

        <h3 className="text-lg font-bold mb-6">
          Insurance
        </h3>

        <div className="grid grid-cols-2 gap-6 max-w-4xl">

          <FloatingInput label="Insurance Provider" value={insuranceInfo.provider} disabled={isViewMode}
            onChange={(e) => setInsuranceInfo({ ...insuranceInfo, provider: e.target.value })}
          />

          <FloatingInput label="Policy Number" value={insuranceInfo.policy} disabled={isViewMode}
            onChange={(e) => setInsuranceInfo({ ...insuranceInfo, policy: e.target.value })}
          />

          <FloatingInput label="Agent Name" value={insuranceInfo.agentName} disabled={isViewMode}
            onChange={(e) => setInsuranceInfo({ ...insuranceInfo, agentName: e.target.value })}
          />

          <FloatingInput label="Agent Number" value={insuranceInfo.agentNumber} disabled={isViewMode}
            onChange={(e) => setInsuranceInfo({ ...insuranceInfo, agentNumber: e.target.value })}
          />

        </div>

        <div className="
mt-6
flex
justify-center md:justify-end
gap-4
flex-wrap
">

          <button onClick={() => setStep(1)} className="bg-gray-500 text-white px-6 py-2 rounded">
            Previous
          </button>

          <button onClick={() => setStep(3)} className="bg-blue-500 text-white px-6 py-2 rounded">
            Next
          </button>

        </div>

      </div>

    )}



    {step === 3 && (

      <div>

        <h3 className="text-lg font-bold mb-6 ">
          Medical History
        </h3>



        <div className="grid grid-cols-3 gap-6 max-w-4xl">

          <FloatingInput label="Blood Group" value={medicalHistory.bloodGroup} disabled={isViewMode}
            onChange={(e) => setMedicalHistory({ ...medicalHistory, bloodGroup: e.target.value })}
          />

        </div>

        <p className="mt-6 mb-2 font-medium">
          Do you have any of the following condition?
        </p>

        <div className="flex flex-wrap gap-6">

          <label><input type="checkbox" /> Diabetes</label>
          <label><input type="checkbox" /> Hypertension</label>
          <label><input type="checkbox" /> Heart Disease</label>
          <label><input type="checkbox" /> Stroke</label>
          <label><input type="checkbox" /> Other</label>

        </div>

        <div className="
mt-6
flex
justify-center md:justify-end
gap-4
flex-wrap
">

          <button onClick={() => setStep(2)} className="bg-gray-500 text-white px-6 py-2 rounded">
            Previous
          </button>

          <button onClick={() => setStep(4)} className="bg-blue-500 text-white px-6 py-2 rounded">
            Next
          </button>

        </div>

      </div>

    )}

    {step === 4 && (

      <div>

        <h3 className="text-lg font-bold mb-6">
          Reason
        </h3>

        <div className="grid grid-cols-2 gap-6 max-w-4xl">

          <FloatingInput label="Current Condition" value={reasonInfo.condition} disabled={isViewMode}
            onChange={(e) => setReasonInfo({ ...reasonInfo, condition: e.target.value })}
          />

          <FloatingInput label="Reason For Visit" value={reasonInfo.visitReason} disabled={isViewMode}
            onChange={(e) => setReasonInfo({ ...reasonInfo, visitReason: e.target.value })}
          />

          <FloatingInput label="Primary Reason" value={reasonInfo.primaryReason} disabled={isViewMode}
            onChange={(e) => setReasonInfo({ ...reasonInfo, primaryReason: e.target.value })}
          />

          <FloatingInput label="Duration" value={reasonInfo.duration} disabled={isViewMode}
            onChange={(e) => setReasonInfo({ ...reasonInfo, duration: e.target.value })}
          />

          <div className="flex items-center gap-4 col-span-2">

            <p>Have you been treated for this before?</p>

            <label className="flex items-center gap-1">
              <input type="radio" name="treatedBefore"
                checked={reasonInfo.treatedBefore === "Yes"}
                onChange={() => setReasonInfo({ ...reasonInfo, treatedBefore: "Yes" })}
              />
              Yes
            </label>

            <label className="flex items-center gap-1">
              <input type="radio" name="treatedBefore"
                checked={reasonInfo.treatedBefore === "No"}
                onChange={() => setReasonInfo({ ...reasonInfo, treatedBefore: "No" })}
              />
              No
            </label>

          </div>

        </div>

        <div className="
mt-6
flex
justify-center md:justify-end
gap-4
flex-wrap
">

          <button onClick={() => setStep(3)} className="bg-gray-500 text-white px-6 py-2 rounded">
            Previous
          </button>

          <button onClick={() => setStep(5)} className="bg-blue-500 text-white px-6 py-2 rounded">
            Next
          </button>


        </div>

      </div>

    )}

    {step === 5 && (

      <div>

        <h3 className="text-lg font-bold mb-6">
          Create Account
        </h3>

        <div className="flex flex-col gap-6 max-w-md">

          <FloatingInput label="Username" value={accountInfo.username}
            disabled={isViewMode} onChange={(e) => setAccountInfo({ ...accountInfo, username: e.target.value })}
          />

          <FloatingInput label="Password" type="password" value={accountInfo.password}
            disabled={isViewMode} onChange={(e) => setAccountInfo({ ...accountInfo, password: e.target.value })}
          />

          <FloatingInput label="Confirm Password" type="password" value={accountInfo.confirmPassword}
            disabled={isViewMode} onChange={(e) => setAccountInfo({ ...accountInfo, confirmPassword: e.target.value })}
          />
        </div>

        <div className="
mt-6
flex
justify-center md:justify-end
gap-4
flex-wrap
">

          <button onClick={() => setStep(4)} className="bg-gray-500 text-white px-8 py-2 rounded">
            Previous
          </button>

          <button onClick={handleCreatePatient} className="bg-green-500 text-white px-8 py-2 rounded">
            Create Patient
          </button>

        </div>

      </div>

    )}

  </div>

</div>

)}

{subMenu === "patients" && (

<div className="mt-10 max-h-[300px] overflow-y-auto">

  <h2 className="text-xl font-bold mb-4">Created Patient Accounts</h2>

  <table className="w-full border border-gray-300">

    <thead className="bg-gray-200">
      <tr>
        <th className="border p-2">Name</th>
        <th className="border p-2">Age</th>
        <th className="border p-2">Address</th>
        <th className="border p-2">Contact</th>
        <th className="border p-2">Action</th>
      </tr>
    </thead>

    <tbody>

      {patientAccounts.map((p, index) => (
        <tr key={index}>

          <td className={`border p-2 ${p.isDisabled ? "text-gray-400 line-through" : ""}`}>
            {p.basicInfo?.name || p.name}
          </td>
          <td className="border p-2">{p.basicInfo?.age || p.age}</td>
          <td className="border p-2">{p.basicInfo?.address || p.address}</td>
          <td className="border p-2">{p.basicInfo?.contact || p.contact}</td>

          <td className="border p-2 flex gap-2">

          <button
onClick={() => setCallData(p)}
className="bg-purple-500 text-white px-2 py-1 rounded"
>
Print
</button>

            <button
              onClick={() => {

                setBasicInfo(p.basicInfo)
                setInsuranceInfo(p.insuranceInfo)
                setMedicalHistory(p.medicalHistory)
                setReasonInfo(p.reasonInfo)

                setAccountInfo(p.accountInfo || {
                  username: "",
                  password: "",
                  confirmPassword: ""
                })
                setIsViewMode(true)
                setStep(1)

              }}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              View
            </button>
            <button
              onClick={() => {

                setBasicInfo(p.basicInfo)
                setInsuranceInfo(p.insuranceInfo)
                setMedicalHistory(p.medicalHistory)
                setReasonInfo(p.reasonInfo)

                setAccountInfo(p.accountInfo || {
                  username: "",
                  password: "",
                  confirmPassword: ""
                })
                setIsViewMode(false)
                setEditIndex(index)
                setStep(1)

              }}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={async () => {
                await deleteDoc(doc(db, "patients", p.basicInfo.email))
                fetchPatients()
              }}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>

            <button
              onClick={async () => {
                await updateDoc(doc(db, "patients", p.basicInfo.email), {
                  isDisabled: !p.isDisabled
                })
                fetchPatients()
              }}
              className={`px-2 py-1 rounded text-white ${p.isDisabled ? "bg-green-500" : "bg-gray-500"
                }`}
            >
              {p.isDisabled ? "Enable" : "Disable"}
            </button>

          </td>

        </tr>
      ))}

    </tbody>

  </table>

</div>

)}


{tab === "account" && subMenu === "pharmasi" && (

<div className="w-full max-w-7xl border rounded-xl overflow-hidden
flex flex-col md:flex-row
min-h-[760px] md:min-h-[620px]">

<div className="w-full md:w-1/4 p-4 flex md:block gap-2 md:space-y-4">

<h2 className="hidden md:block text-2xl font-bold">
Create Pharmasi Account
</h2>

<button onClick={()=>{setIsViewMode(false);
  setPharmasiStep(1);
  }}
className={`w-full p-3 rounded text-white ${
pharmasiStep===1?"bg-blue-500":"bg-gray-400"
}`}>
Basic Info
</button>

<button onClick={()=>{ setIsViewMode(false);
  setPharmasiStep(2);
  }}
className={`w-full p-3 rounded text-white ${
pharmasiStep===2?"bg-blue-500":"bg-gray-400"
}`}>
Designation
</button>

<button onClick={()=>{ setIsViewMode(false);
  setPharmasiStep(3);
  }}
className={`w-full p-3 rounded text-white ${
pharmasiStep===3?"bg-blue-500":"bg-gray-400"
}`}>
Official Info
</button>

<button onClick={()=>{ setIsViewMode(false);
  setPharmasiStep(4);
  }}
className={`w-full p-3 rounded text-white ${
pharmasiStep===4?"bg-blue-500":"bg-gray-400"
}`}>
Account
</button>

</div>


<div className="w-full md:w-3/4 relative p-6 pb-28 min-h-[600px]">

{pharmasiStep===1 && (
<>
<h3 className="font-bold text-xl mb-6">
Basic Information
</h3>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

<FloatingInput label="Name" type="name" value={pharmasiBasicInfo.name}
onChange={(e)=> 
setPharmasiBasicInfo({
  ...pharmasiBasicInfo,
  name:e.target.value
})}/>


<FloatingInput label="Age" type="number" value={pharmasiBasicInfo.age}
onChange={(e)=>
setPharmasiBasicInfo({
  ...pharmasiBasicInfo,
  age:e.target.value
})}/>

<select value={pharmasiBasicInfo.gender}
onChange={(e)=>
setPharmasiBasicInfo({
...pharmasiBasicInfo,
gender:e.target.value
})
}
>
<option value="">Select Gender</option>
<option value="Male">Male</option>
<option value="Female">Female</option>
</select>

<FloatingInput label="DOB" type="date" value={pharmasiBasicInfo.dob}
onChange={(e)=>
setPharmasiBasicInfo({
...pharmasiBasicInfo,
dob:e.target.value
})
}
/>

<FloatingInput label="Address" className="col-span-2" inputClassName="h-[120px] pt-6" value={pharmasiBasicInfo.address}
onChange={(e)=>
setPharmasiBasicInfo({
...pharmasiBasicInfo,
address:e.target.value
})
}
/>

<div className="md:col-span-2 flex flex-col gap-4">
<FloatingInput label="Contact Number" value={pharmasiBasicInfo.contact}
onChange={(e)=>
setPharmasiBasicInfo({
...pharmasiBasicInfo,
contact:e.target.value
})
}
/>

<FloatingInput label="EMR Contact" value={pharmasiBasicInfo.emrContact}
onChange={(e)=>
setPharmasiBasicInfo({
...pharmasiBasicInfo,
emrContact:e.target.value
})
}
/>
</div>

<FloatingInput label="Email" type="email" value={pharmasiBasicInfo.email}
onChange={(e)=>
setPharmasiBasicInfo({
  ...pharmasiBasicInfo,
  email:e.target.value
})}
className="md:col-span-2"
/>

<FloatingInput label="Occupation" type="number" value={pharmasiBasicInfo.occupation}
onChange={(e)=>
setPharmasiBasicInfo({
  ...pharmasiBasicInfo,
  occupation:e.target.value
})}
className="md:col-span-2"
/>

</div>
</>
)}


{pharmasiStep===2 && (
<>
<h3 className="font-bold text-xl mb-6">
Designation
</h3>

<div className="max-w-xl">
<FloatingInput label="Designation" value={pharmasiDesignation.designation}
onChange={(e)=>
setPharmasiDesignation({
...pharmasiDesignation,
designation:e.target.value
})
}
/>
</div>

</>
)}


{pharmasiStep===3 && (
<>
<h3 className="font-bold text-xl mb-6">
Official Info
</h3>

<div className="flex flex-col gap-6 max-w-md">
<FloatingInput label="Pharmasi ID"/>


<FloatingInput label="Joining Date" type="date" value={pharmasiOfficial.joiningDate}
onChange={(e)=>
setPharmasiOfficial({
...pharmasiOfficial,
joiningDate:e.target.value
})
}
/>

<FloatingInput label="Relieving Date" type="date" value={pharmasiOfficial.relievingDate}
onChange={(e)=>
setPharmasiOfficial({
...pharmasiOfficial,
relievingDate:e.target.value
})
}
/>
</div>

</>
)}


{pharmasiStep===4 && (
<>
<h3 className="font-bold text-xl mb-6">
Create Account
</h3>

<div className="flex flex-col gap-6 max-w-md">

<FloatingInput label="Pharmasi ID" value={pharmasiOfficial.pharmasiId}
onChange={(e)=>{
setPharmasiOfficial({
...pharmasiOfficial,
pharmasiId:e.target.value
});

setPharmasiAccount({
...pharmasiAccount,
pharmasiId:e.target.value
});

}}
/>

<FloatingInput label="Password" type="password" value={pharmasiAccount.password}
onChange={(e)=>
setPharmasiAccount({
...pharmasiAccount,
password:e.target.value
})
}/>

<FloatingInput label="Confirm Password" type="password" value={pharmasiAccount.confirmPassword}
onChange={(e)=>
setPharmasiAccount({
...pharmasiAccount,
confirmPassword:e.target.value
})
}/>

</div>

</>
)}


{/* FIXED BUTTONS */}
<div className="absolute bottom-6 right-6 flex gap-4">

{pharmasiStep>1 && (
<button onClick={()=>setPharmasiStep(pharmasiStep-1)} className="bg-gray-500 text-white px-8 py-3 rounded">
Previous
</button>
)}

{pharmasiStep<4 ? (

<button onClick={()=>setPharmasiStep(pharmasiStep+1)} className="bg-blue-500 text-white px-8 py-3 rounded">
Next
</button>

):(

<button
type="button"
onClick={(e) => {

e.preventDefault();
e.stopPropagation();

handleCreatePharmasiFull();

}}
className="bg-green-500 text-white px-8 py-3 rounded"
>
Create Pharmasi
</button>
)}

</div>

</div>

</div>

)}

{subMenu==="pharmasi" && (

<div className="mt-10">

<h2 className="text-xl font-bold mb-4">
Created Pharmasi Accounts
</h2>

<table className="w-full border border-gray-300">

<thead className="bg-gray-200">
<tr>
<th className="border p-2">Name</th>
<th className="border p-2">Age</th>
<th className="border p-2">Address</th>
<th className="border p-2">Contact</th>
<th className="border p-2">Designation</th>
<th className="border p-2">Action</th>
</tr>
</thead>

<tbody>

{pharmasiAccounts.map((item,index)=>(

<tr key={index}>

<td className="border p-2">
{item.pharmasiBasicInfo?.name}
</td>

<td className="border p-2">
{item.pharmasiBasicInfo?.age}
</td>

<td className="border p-2">
{item.pharmasiBasicInfo?.address}
</td>

<td className="border p-2">
{item.pharmasiBasicInfo?.contact}
</td>

<td className="border p-2">
{item.pharmasiDesignation?.designation}
</td>

<td className="border p-2 flex gap-2">

<button
onClick={()=>{
setPharmasiBasicInfo(item.pharmasiBasicInfo)
setPharmasiDesignation(item.pharmasiDesignation)
setPharmasiOfficial(item.pharmasiOfficial)
setPharmasiAccount(item.pharmasiAccount)

setIsViewMode(true)
setPharmasiStep(1)

}}className="bg-green-500 text-white px-2 py-1 rounded">
View
</button>

<button onClick={()=>{
setEditData(item);

setPharmasiBasicInfo(item.pharmasiBasicInfo || {})
setPharmasiDesignation(item.pharmasiDesignation || {})
setPharmasiOfficial(item.pharmasiOfficial || {})
setPharmasiAccount(item.pharmasiAccount || {})

setIsViewMode(false);
setIsEditMode(true);
setDoctorStep(1);
}}
className="bg-blue-500 text-white px-3 py-1 rounded">
Edit
</button>


<button onClick={async()=>{
await deleteDoc(
doc(db,"pharmasi",item.id)
)

fetchPharmasi()

}}className="bg-red-500 text-white px-2 py-1 rounded">
Delete
</button>


<button onClick={async()=>{
await updateDoc(
doc(db,"pharmasi",item.id),
{
isDisabled:!item.isDisabled
}
)

fetchPharmasi()

}}className="bg-gray-500 text-white px-2 py-1 rounded">
{item.isDisabled ? "Enable":"Disable"}
</button>

</td>

</tr>

))}

</tbody>
</table>

</div>

)}

        </div>

      </div>


      {/* POPUP */}
      {selected?.type === "appointment" && (

<div className="
fixed inset-0 z-50
bg-black/40
flex justify-center items-center
p-4
">

<div className="
bg-white
w-full
max-w-5xl
rounded-[40px]
p-6 md:p-10
relative
max-h-[95vh]
overflow-y-auto
">

<button
onClick={() => setSelected(null)}
className="
absolute top-5 right-5
text-4xl font-bold
"
>
×
</button>

<h1 className="
text-4xl md:text-6xl
font-black
text-center
mb-10
">
Appointment Details
</h1>

<div className="
flex flex-col md:flex-row
justify-center items-center
gap-10
mb-10
">

{/* PATIENT */}

<div className="flex flex-col items-center min-w-[65px] text-[11px]">

<img
src={
selected.patientImage ||
"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
}
alt="patient"
className="
w-36 h-36
rounded-full
object-cover
border-[6px]
border-gray-300
shadow-xl
"
/>

<h2 className="
mt-4
text-2xl
font-bold
">
{selected.patientName || "No Patient"}
</h2>

<p className="text-gray-500">
Patient
</p>

</div>

{/* DOCTOR */}

<div className="flex flex-col items-center">

<img
src={
selected.doctorImage ||
"https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
}
alt="doctor"
className="
w-36 h-36
rounded-full
object-cover
border-[6px]
border-blue-500
shadow-xl
"
/>

<h2 className="
mt-4
text-2xl
font-bold
text-blue-600
">
Dr. {selected.doctorName || "No Doctor"}
</h2>

<p className="text-gray-500">
Doctor
</p>

</div>

</div>

<div className="
space-y-5
text-xl
md:text-2xl
font-semibold
">

<p>
<b>Patient:</b>
{" "}
{selected.patientName}
</p>

<p>
<b>Doctor:</b>
{" "}
Dr. {selected.doctorName}
</p>

<p>
<b>Date:</b>
{" "}
{selected.date}
</p>

<p>
<b>Time:</b>
{" "}
{selected.time}
</p>

<p>
<b>Reason:</b>
{" "}
{selected.reason || "No Reason"}
</p>

</div>

<button
onClick={() => setSelected(null)}
className="
w-full
mt-10
bg-blue-600
text-white
py-4
rounded-2xl
text-2xl
font-bold
"
>
Close
</button>

</div>

</div>

)}



      {/* MOBILE + TAB BOTTOM MENU */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow md:hidden flex justify-around items-center py-3 px-2 gap-2 z-50">

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

        <button onClick={()=>setTab("history")}>
        📜
        <p>History</p>
        </button>
 

        <button onClick={() => {
  setTab("account")
  setSubMenu("")
}}className="flex flex-col items-center text-black">
       <span className="text-2xl">👨‍⚕️</span>
       <p className="text-sm">Accounts</p>
        </button>

      </div>

    </div>
  )
}

export default DemoMasterDashboard
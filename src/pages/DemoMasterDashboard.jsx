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
const [showViewPopup, setShowViewPopup] = useState(false)
const [viewData, setViewData] = useState(null)
const [callData, setCallData] = useState(null)
const [editIndex, setEditIndex] = useState(null)

const [doctorAccounts, setDoctorAccounts] = useState([])
const [staffAccounts, setStaffAccounts] = useState([])
const [patientAccounts, setPatientAccounts] = useState([])
const [pharmasiAccounts, setPharmasiAccounts] = useState([])
const [appointments, setAppointments] = useState([])

const [journalEntries, setJournalEntries] = useState([])
const [selectedJournal, setSelectedJournal] = useState(null)

const doctorWisePatients = {};

appointments.forEach((appt) => {

  if (!appt.doctorName) return;

  if (!doctorWisePatients[appt.doctorName]) {
    doctorWisePatients[appt.doctorName] = [];
  }

  console.log(
    "Appointment Patient :",
    appt.patientName
  );
  
  console.log(
    "All Patients :",
    patientAccounts
  );
  
  const fullPatient = patientAccounts.find((p) => {

    const dbEmail =
      (p?.basicInfo?.email || "")
        .trim()
        .toLowerCase();
  
    const appointmentEmail =
      (appt?.patientEmail || "")
        .trim()
        .toLowerCase();
  
    return dbEmail === appointmentEmail;
  
  }) || null;
    
  
  
  console.log(
    "Matched Patient :",
    fullPatient
  );

  doctorWisePatients[appt.doctorName].push({
    ...appt,
    patientData: fullPatient
  });

});

const [historySearch, setHistorySearch] = useState("")

const [showFollowupPopup, setShowFollowupPopup] = useState(false)
const [showTreatedPopup, setShowTreatedPopup] = useState(false)
const [selectedAppointment, setSelectedAppointment] = useState(null)

const [adminSearch, setAdminSearch] = useState("")
const [doctorSearch, setDoctorSearch] = useState("")
const [staffSearch, setStaffSearch] = useState("")
const [patientSearch, setPatientSearch] = useState("")
const [pharmasiSearch, setPharmasiSearch] = useState("")

const [showAdminPopup, setShowAdminPopup] = useState(false);
const [showDoctorPopup, setShowDoctorPopup] = useState(false);
const [showStaffPopup, setShowStaffPopup] = useState(false);
const [showPatientPopup, setShowPatientPopup] = useState(false);
const [showPharmasiPopup, setShowPharmasiPopup] = useState(false);

const handleMenuChange = (mainTab, child = "") => {

  setTab(mainTab)
  setSubMenu(child)

  setSelected(null)

  setIsViewMode(false)
  setIsEditMode(false)

  setAdminStep(1)
  setDoctorStep(1)
  setStaffStep(1)
  setPharmasiStep(1)
  setStep(1)

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

  console.log(
    snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  )

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

  useEffect(() => {

    const fetchJournalEntries = async () => {
  
      const snapshot = await getDocs(
        collection(db, "appointmentHistory")
      )
  
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
  
      setJournalEntries(data)
    }
  
    fetchJournalEntries()
  
  }, [])

  const printAppointment = (item) => {

    const win = window.open("", "", "width=900,height=700");
  
    win.document.write(`
    <html>
    <head>
      <title>Appointment Report</title>
      <style>
        body{
          font-family: Arial;
          padding:20px;
        }
  
        table{
          width:100%;
          border-collapse:collapse;
        }
  
        td,th{
          border:1px solid #000;
          padding:10px;
        }
  
        h2{
          text-align:center;
        }
      </style>
    </head>
  
    <body>
  
      <h2>Appointment Report</h2>
  
      <table>
  
        <tr>
          <th>Appointment No</th>
          <td>${item.appointmentNo || "-"}</td>
        </tr>
  
        <tr>
          <th>Patient Name</th>
          <td>${item.patientName || "-"}</td>
        </tr>
  
        <tr>
          <th>Doctor Name</th>
          <td>${item.doctorName || "-"}</td>
        </tr>
  
        <tr>
          <th>Contact</th>
          <td>${item.phone || "-"}</td>
        </tr>
  
        <tr>
          <th>Address</th>
          <td>${item.address || "-"}</td>
        </tr>
  
        <tr>
          <th>Date</th>
          <td>${item.date || "-"}</td>
        </tr>
  
        <tr>
          <th>Time</th>
          <td>${item.time || "-"}</td>
        </tr>
  
        <tr>
          <th>Reason</th>
          <td>${item.reason || "-"}</td>
        </tr>
  
        <tr>
          <th>Solution</th>
          <td>${item.solution || "-"}</td>
        </tr>
  
      </table>
  
    </body>
    </html>
    `);
  
    win.document.close();
  
    setTimeout(() => {
      win.print();
    }, 500);
  
  };

  const printJournal = (item) => {

    const win = window.open("", "_blank");
    
    win.document.write(`
    <html>
    <head>
    <title>Hospital Journal Entry</title>
    
    <style>
    
    body{
    font-family:Arial;
    padding:30px;
    }
    
    h1{
    text-align:center;
    margin-bottom:25px;
    }
    
    p{
    margin:8px 0;
    font-size:16px;
    }
    
    </style>
    
    </head>
    
    <body>
    
    <h1>Hospital Journal Entry</h1>
    
    <p><b>Appointment No :</b> ${item.appointmentNo || "-"}</p>
    
    <p><b>Patient :</b> ${item.patientName || "-"}</p>
    
    <p><b>Doctor :</b> ${item.doctorName || "-"}</p>
    
    <p><b>Date :</b> ${item.date || "-"}</p>
    
    <p><b>Age :</b> ${item.age || "-"}</p>
    
    <p><b>Phone :</b> ${item.patientPhone || item.phone || "-"}</p>
    
    <p><b>Address :</b> ${item.address || "-"}</p>
    
    <p><b>Emergency Contact :</b>
    ${item.emergencyContact || "-"}
    </p>
    
    <p><b>Reason :</b> ${item.reason || "-"}</p>
    
    <p><b>Doctor Notes :</b> ${item.solution || "-"}</p>
    
    <p><b>Payment Status :</b>
    ${item.paymentStatus || "Pending"}
    </p>
    
    <p><b>Status :</b>
    ${item.status || "Completed"}
    </p>
    
    <p><b>Consultancy Fee :</b>
    ₹${item.consultancyFee || 0}
    </p>
    
    <p><b>Medicine Fee :</b>
    ₹${item.medicineFee || 0}
    </p>
    
    <p><b>Total :</b>
    ₹${item.totalAmount || 0}
    </p>
    
    </body>
    </html>
    `);
    
    win.document.close();
    
    setTimeout(() => {
    win.focus();
    win.print();
    }, 500);
    
    };

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
  onClick={() => handleMenuChange("journal")}
  className="cursor-pointer"
>
  Journal Entry
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
<p
  onClick={() => {

    setIsViewMode(false)
    setIsEditMode(false)

    setPharmasiStep(1)

    handleMenuChange("account", "pharmasi")

  }}
>
  Pharmasi
</p>

  </div>
)}
          </div>
        </div>


        {/* RIGHT CONTENT */}

        {tab === "account" && subMenu === "" && (

<div className="w-full px-3 md:px-8 py-6">

<div
className="
grid
grid-cols-2
md:grid-cols-2
xl:grid-cols-3
gap-4
"
>

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

        <div className="flex-1 p-3 md:p-10 pb-24 overflow-hidden">

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
    {doctorAccounts
.filter(doc =>
doc?.doctorBasicInfo?.name?.trim()
)
.slice(0,10)
.map((doc, i) => (
        <div 
  key={i} 
  onClick={() => {
    setViewData(doc)
    setShowDoctorPopup(true)
  }}
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

<h1 className="text-3xl font-bold mb-6">
Doctor Wise Patients
</h1>

<div className="space-y-6">

{Object.entries(doctorWisePatients).map(
([doctorName, patients], index) => (

<div
key={index}
className="
bg-white
border
rounded-2xl
shadow
p-5
"
>

<div className="mb-4">

<h2 className="text-xl font-bold text-blue-600">
Dr. {doctorName}
</h2>

<p className="text-gray-500">
Total Patients : {patients.length}
</p>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

{patients.map((patient, i) => (

<div
key={i}
onClick={() => {}}
className="
border
rounded-xl
p-4
cursor-pointer
hover:bg-gray-50
hover:shadow
transition
"
>

<p className="font-bold">
{patient.patientName}
</p>

<p className="text-sm text-gray-500">
{patient.date}
</p>

<p className="text-sm text-gray-500">
{patient.time}
</p>

</div>

))}

</div>

</div>

)

)}

</div>

</div>

)}

{tab === "appointmentsList" && (
  <div>
    <h1 className="text-3xl font-bold mb-6">
      Doctor Wise Appointments
    </h1>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

      {Object.entries(doctorWisePatients).map(
        ([doctorName, patients], i) => (

          <div
            key={i}
            className="
            border
            rounded-2xl
            p-5
            shadow
            bg-white
            "
          >

            <h2 className="text-xl font-bold text-blue-600">
              Dr. {doctorName}
            </h2>

            <p className="mt-3 text-lg">
              Total Appointments :
              <span className="font-bold ml-2">
                {patients.length}
              </span>
            </p>

          </div>

        )
      )}

    </div>
  </div>
)}

{tab === "journal" && (

<div>

<h1 className="text-4xl font-bold mb-8">
Journal Entry
</h1>

<div className="mb-6">

<input
type="text"
placeholder="Search Doctor Name..."
value={doctorSearch}
onChange={(e) => setDoctorSearch(e.target.value)}
className="
w-full
md:w-[400px]
border
rounded-xl
px-4
py-3
outline-none
focus:border-blue-600
"
/>

</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

<div
className="
bg-white
rounded-3xl
shadow-lg
p-6
border-l-[8px]
border-blue-500
"
>

<h3 className="text-gray-500 text-xl font-semibold">
Today Income
</h3>

<p className="text-4xl font-bold text-blue-500 mt-3">
₹{
journalEntries.reduce(
(sum,item)=>
sum +
Number(item.totalAmount || 0),
0
)
}
</p>

</div>

<div
className="
bg-white
rounded-3xl
shadow-lg
p-6
border-l-[8px]
border-yellow-500
"
>

<h3 className="text-gray-500 text-xl font-semibold">
Today Expense
</h3>

<p className="text-4xl font-bold text-yellow-500 mt-3">
₹0
</p>

</div>

<div
className="
bg-white
rounded-3xl
shadow-lg
p-6
border-l-[8px]
border-green-500
"
>

<h3 className="text-gray-500 text-xl font-semibold">
Today Profit
</h3>

<p className="text-4xl font-bold text-green-500 mt-3">
₹{
journalEntries.reduce(
(sum,item)=>
sum +
Number(item.totalAmount || 0),
0
)
}
</p>

</div>

</div>

{/* MOBILE + TABLET */}

<div className="block lg:hidden space-y-4">

{journalEntries

.filter((item) => {

if (doctorSearch.trim() === "")
return true

return (
(item.doctorName || "")
.trim()
.toLowerCase() ===
doctorSearch.trim().toLowerCase()
)

})

.map((item,index)=>(

<div
key={index}
onClick={() => setSelectedJournal(item)}
className="
bg-white
border
rounded-2xl
p-4
shadow
cursor-pointer
"
>

<p>
<b>Appointment No :</b>
{item.appointmentNo || "-"}
</p>

<p>
<b>Patient :</b>
{item.patientName || "-"}
</p>

<p>
<b>Doctor :</b>
{item.doctorName || "-"}
</p>

<p>
<b>Date :</b>
{item.date || "-"}
</p>

<p>
<b>Contact :</b>
{item.patientPhone || item.phone || "-"}
</p>

<p>
<b>Reason :</b>
{item.reason || "-"}
</p>

</div>

))}

</div>

{/* Desktop */}

<div className="hidden lg:block overflow-x-auto bg-white rounded-2xl shadow border">

<table className="w-full">

<thead className="bg-blue-600 text-white">

<tr>
<th className="p-4 text-left">Appointment No</th>
<th className="p-4 text-left">Patient Name</th>
<th className="p-4 text-left">Doctor Name</th>
<th className="p-4 text-left">Date</th>
<th className="p-4 text-left">Contact Number</th>
<th className="p-4 text-left">Reason</th>
<th className="p-4 text-center">Action</th>
</tr>

</thead>

<tbody>

{journalEntries

.filter((item) => {

if (doctorSearch.trim() === "")
return true

return (
(item.doctorName || "")
.trim()
.toLowerCase() ===
doctorSearch.trim().toLowerCase()
)

})

.map((item,index)=>(

<tr key={index} className="border-b">

<td className="p-4">
{item.appointmentNo || "-"}
</td>

<td className="p-4">
{item.patientName}
</td>

<td className="p-4">
{item.doctorName}
</td>

<td className="p-4">
{item.date}
</td>

<td className="p-4">
{item.patientPhone || item.phone || "-"}
</td>

<td className="p-4">
{item.reason || "-"}
</td>

<td className="p-4 text-center">

<button
onClick={() => setSelectedJournal(item)}
className="
bg-blue-600
text-white
px-4
py-2
rounded-lg
"
>
Details
</button>

</td>

</tr>

))}

</tbody>

</table>

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

<div className="w-full pb-28">

  <h1 className="text-2xl md:text-4xl font-bold mb-6">
    Appointment History
  </h1>

  <div className="mb-6">
  <input
    type="text"
    placeholder="Search Patient Name..."
    value={historySearch}
    onChange={(e) => setHistorySearch(e.target.value)}
    className="
      w-full
      md:w-[400px]
      border
      rounded-xl
      px-4
      py-3
      outline-none
      focus:border-blue-500
    "
  />
</div>

  {/* MOBILE + TABLET */}

  <div className="block lg:hidden space-y-4">

  {appointments
  .filter((item) => {

    const patientName =
      (item.patientName || "")
        .toLowerCase()

        const matchesSearch =
        historySearch === ""
          ? true
          : patientName.trim() ===
            historySearch.toLowerCase().trim()
      

    if (!item.date) return false

    const now = new Date()

    const appointmentDate =
      new Date(item.date)

    const isHistory =
      appointmentDate <
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      )

    return isHistory && matchesSearch

  })
      .map((item, i) => (

        <div
          key={i}
          className="
          bg-white
          border
          rounded-2xl
          p-4
          shadow
          "
        >

          <div className="space-y-3">

            <div className="flex justify-between">
              <span className="font-semibold text-gray-500">
                Patient
              </span>

              <span className="font-bold text-right">
                {item.patientName}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-500">
                Doctor
              </span>

              <span className="font-bold text-right">
                {item.doctorName}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-500">
                Date
              </span>

              <span className="text-right">
                {item.date}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-500">
                Time
              </span>

              <span className="text-right">
                {item.time}
              </span>
            </div>

            <div className="flex justify-between mb-4">
  <span className="font-semibold text-gray-500">
    Reason
  </span>

  <span className="text-right break-words max-w-[60%]">
    {item.reason}
  </span>
</div>

<div className="flex justify-between">
  <span className="font-semibold text-gray-500">
    Contact
  </span>

  <span className="text-right">
    {item.phone || item.contact || "-"}
  </span>
</div>

<div className="flex justify-between">
  <span className="font-semibold text-gray-500">
    Address
  </span>

  <span className="text-right break-words max-w-[60%]">
    {item.address || "-"}
  </span>
</div>

<div className="flex justify-between">
  <span className="font-semibold text-gray-500">
    Solution
  </span>

  <span className="text-right break-words max-w-[60%]">
    {item.solution || item.prescription || "-"}
  </span>
</div>

<div className="flex flex-wrap justify-center gap-4 mt-6">
<button
  onClick={() => {
    setSelectedAppointment(item)
    setShowFollowupPopup(true)
  }}
  className="bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm"
>
  Followup
</button>

<button
  onClick={() => {
    setSelectedAppointment(item)
    setShowTreatedPopup(true)
  }}
  className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm"
>
  Treated
</button>

<button
  onClick={() => printAppointment(item)}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg whitespace-nowrap"
>
  Print
</button>
</div>

          </div>

        </div>

      ))}

  </div>

  {/* Income Expense Profit Cards */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

<div className="
  bg-white
  rounded-3xl
  shadow-lg
  p-6
  border-l-[8px]
  border-blue-500
">
  <h3 className="text-gray-500 text-xl font-semibold">
    Today Income
  </h3>

  <p className="text-4xl font-bold text-blue-500 mt-3">
    ₹{
      journalEntries.reduce(
        (sum,item)=>
          sum +
          Number(item.totalAmount || 0),
        0
      )
    }
  </p>
</div>

<div className="
  bg-white
  rounded-3xl
  shadow-lg
  p-6
  border-l-[8px]
  border-yellow-500
">
  <h3 className="text-gray-500 text-xl font-semibold">
    Today Expense
  </h3>

  <p className="text-4xl font-bold text-yellow-500 mt-3">
    ₹0
  </p>
</div>

<div className="
  bg-white
  rounded-3xl
  shadow-lg
  p-6
  border-l-[8px]
  border-green-500
">
  <h3 className="text-gray-500 text-xl font-semibold">
    Today Profit
  </h3>

  <p className="text-4xl font-bold text-green-500 mt-3">
    ₹{
      journalEntries.reduce(
        (sum,item)=>
          sum +
          Number(item.totalAmount || 0),
        0
      )
    }
  </p>
</div>

</div>

  {/* DESKTOP */}

  <div className="hidden lg:block overflow-x-auto rounded-2xl shadow border bg-white">

    <table className="w-full">

      <thead className="bg-blue-600 text-white">

        <tr>

        <th className="p-4 text-left">Patient</th>
        <th className="p-4 text-left">Contact</th>
        <th className="p-4 text-left">Address</th>
        <th className="p-4 text-left">Doctor</th>
        <th className="p-4 text-left">Date</th>
        <th className="p-4 text-left">Time</th>
        <th className="p-4 text-left">Reason</th>
        <th className="p-4 text-left">Solution</th>
        <th className="p-4 text-center">Action</th>

        </tr>

      </thead>

      <tbody>

      {appointments
  .filter((item) => {

    const patientName =
      (item.patientName || "")
        .toLowerCase()

        const matchesSearch =
        historySearch === ""
          ? true
          : patientName.trim() ===
            historySearch.toLowerCase().trim()

    if (!item.date) return false

    const now = new Date()

    const appointmentDate =
      new Date(item.date)

    const isHistory =
      appointmentDate <
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      )

    return isHistory && matchesSearch

  })
          .map((item, i) => (

            <tr
              key={i}
              className="border-b"
            >

<td className="p-4">
  {item.patientName}
</td>

<td className="p-4">
{item.phone || "-"}
</td>

<td className="p-4 max-w-[200px] break-words">
{item.address ||
 item.patientData?.basicInfo?.address ||
 "-"}
</td>

<td className="p-4">
  {item.doctorName}
</td>

<td className="p-4">
  {item.date}
</td>

<td className="p-4">
  {item.time}
</td>

<td className="p-4">
  {item.reason}
</td>

<td className="p-4">
{item.solution ||
 item.doctorSolution ||
 "-"}
</td>

<td className="p-4">
<td>
  <div className="flex items-center justify-center gap-2">
  <button
  onClick={() => {
    setSelectedAppointment(item)
    setShowFollowupPopup(true)
  }}
  className="bg-yellow-500 text-white px-4 py-2 rounded-lg whitespace-nowrap"
>
  Followup
</button>

<button
  onClick={() => {
    setSelectedAppointment(item)
    setShowTreatedPopup(true)
  }}
  className="bg-green-600 text-white px-4 py-2 rounded-lg whitespace-nowrap"
>
  Treated
</button>

<button
  onClick={() => printAppointment(item)}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg whitespace-nowrap"
>
  Print
</button>
  </div>
</td>
</td>

            </tr>

          ))}

      </tbody>

    </table>

  </div>

</div>

)}

{showFollowupPopup && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999] p-3">

<div
className="
bg-white
rounded-3xl
w-full
max-w-[900px]
max-h-[90vh]
overflow-y-auto
p-5 md:p-8
relative
"
>

<button
onClick={() => setShowFollowupPopup(false)}
className="absolute top-4 right-5 text-4xl font-bold"
>
×
</button>

<div className="text-center">

<img
src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
className="w-24 h-24 md:w-32 md:h-32 mx-auto object-contain"
/>

<h2 className="text-2xl md:text-5xl font-bold mt-3">
Follow Up Patient
</h2>

<div
className="
bg-blue-600
text-white
font-bold
text-lg md:text-3xl
rounded-2xl
py-4
px-5
mt-6
inline-block
"
>
Appointment No :
{selectedAppointment?.appointmentNo || "API929"}
</div>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

<input
readOnly
value={selectedAppointment?.patientName || ""}
className="border rounded-xl p-4"
/>

<input
readOnly
value={selectedAppointment?.phone || ""}
className="border rounded-xl p-4"
/>

<input
readOnly
value={selectedAppointment?.reason || ""}
className="border rounded-xl p-4"
/>

<input
readOnly
value={selectedAppointment?.doctorName || ""}
className="border rounded-xl p-4"
/>

<input
readOnly
value={selectedAppointment?.date || ""}
className="border rounded-xl p-4"
/>

<input
readOnly
value={selectedAppointment?.time || ""}
className="border rounded-xl p-4"
/>

</div>

<div className="text-center mt-8">

<div className="text-green-600 text-2xl md:text-4xl font-bold">
📱 {selectedAppointment?.phone}
</div>

<button
className="
mt-5
bg-green-600
text-white
px-10
py-4
rounded-xl
font-bold
text-lg
"
>
📞 Contact Number
</button>

</div>

</div>

</div>

)}

{showTreatedPopup && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999] p-3">

<div
className="
bg-white
rounded-3xl
w-full
max-w-[900px]
max-h-[90vh]
overflow-y-auto
p-5 md:p-8
relative
"
>

<button
onClick={() => setShowTreatedPopup(false)}
className="absolute top-4 right-5 text-4xl font-bold"
>
×
</button>

<div className="text-center">

<img
src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
className="w-24 h-24 md:w-32 md:h-32 mx-auto object-contain"
/>

<h2 className="text-2xl md:text-5xl font-bold mt-3">
Patient Confirmation Panel
</h2>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

<input readOnly value={selectedAppointment?.patientName || ""} className="border rounded-xl p-4"/>
<input readOnly value={selectedAppointment?.phone || ""} className="border rounded-xl p-4"/>
<input readOnly value={selectedAppointment?.reason || ""} className="border rounded-xl p-4"/>
<input readOnly value={selectedAppointment?.doctorName || ""} className="border rounded-xl p-4"/>
<input readOnly value={selectedAppointment?.date || ""} className="border rounded-xl p-4"/>
<input readOnly value={selectedAppointment?.time || ""} className="border rounded-xl p-4"/>

</div>

<div className="text-center mt-8">

<p className="text-orange-500 font-bold text-2xl">
Status : Pending
</p>

<div className="mt-6 flex flex-col gap-4">

<button
className="
bg-orange-500
text-white
py-4
rounded-xl
font-bold
text-lg
"
>
🔄 Follow Up Required
</button>

<button
className="
bg-green-600
text-white
py-4
rounded-xl
font-bold
text-lg
"
>
✅ Completed
</button>

</div>

</div>

</div>

</div>

)}

{selectedJournal && (

<div className="fixed inset-0 bg-black/50 z-[999999] overflow-y-auto pb-24">

<div className="p-6 md:p-10">

<div className="
bg-white
rounded-3xl
shadow-xl
p-4 md:p-8
w-full
max-w-7xl
mx-auto
mb-20
">

<div className="
flex
flex-col
md:flex-row
justify-between
md:items-center
gap-4
mb-8
">

<h1 className="
text-2xl
md:text-5xl
font-bold
">
Journal Entry
</h1>

</div>

<div className="
border
rounded-3xl
p-8
">

<div className="
flex
flex-col
md:flex-row
justify-between
md:items-center
gap-4
mb-8
">

<h2 className="
text-xl
md:text-4xl
font-bold
break-words
">
Appointment :
{selectedJournal.appointmentNo}
</h2>

<button
onClick={() => printJournal(selectedJournal)}
className="
bg-blue-600
text-white
w-full
md:w-auto
px-6
py-3
rounded-xl
"
>
Print
</button>

</div>

<div className="
grid
grid-cols-1
lg:grid-cols-2
gap-6
md:gap-10
">

<div>

<p><b>Patient :</b> {selectedJournal.patientName}</p>

<p><b>Doctor :</b> {selectedJournal.doctorName}</p>

<p><b>Date :</b> {selectedJournal.date}</p>

<p><b>Requirement :</b> {selectedJournal.reason}</p>

<p><b>Doctor Notes :</b> {selectedJournal.solution}</p>

<p><b>Lab Tests :</b>
{
selectedJournal.labTests?.length
? selectedJournal.labTests.join(", ")
: "No Lab Test"
}
</p>

</div>

<div>

<p><b>Age :</b> {selectedJournal.age || "-"}</p>

<p><b>Phone :</b>
{selectedJournal.patientPhone ||
 selectedJournal.phone ||
 "-"}
</p>

<p><b>Address :</b>
{selectedJournal.address || "-"}
</p>

<p><b>Time :</b>
{selectedJournal.time || "-"}
</p>

<p><b>Emergency Contact :</b>
{selectedJournal.emergencyContact ||
 selectedJournal.emrContact ||
 "-"}
</p>

<p><b>Payment Status :</b>
{selectedJournal.paymentStatus || "Pending"}
</p>
<p className="mt-2">
  <b>Appointment Status :</b>

  <span className="
    ml-2
    px-3
    py-1
    rounded-full
    bg-green-100
    text-green-700
    text-sm
  ">
    {selectedJournal.status || "Completed"}
  </span>
</p>



</div>

</div>

<div className="grid lg:grid-cols-3 gap-6 mt-8">

  {/* Fee Details */}

  <div className="
  bg-white
  border
  rounded-3xl
  p-6
  shadow-sm
  ">

    <h3 className="text-3xl font-bold mb-6">
      Fee Details
    </h3>

    <div className="mb-6">

      <h4 className="
      text-green-600
      text-2xl
      font-bold
      mb-3
      ">
        Consultancy Fee
      </h4>

      <div className="flex justify-between">
        <span>Doctor Consultation</span>
        <b>₹{selectedJournal.consultancyFee || 0}</b>
      </div>

    </div>

    <div className="bg-yellow-50 rounded-2xl p-5">

      <div className="flex justify-between mb-3">
        <span className="font-bold">
          Consultancy Fee
        </span>

        <b>
          ₹{selectedJournal.consultancyFee || 0}
        </b>
      </div>

      <div className="flex justify-between mb-3">
        <span className="font-bold">
          Medicine Fee
        </span>

        <b>
          ₹{selectedJournal.medicineFee || 0}
        </b>
      </div>

      <hr className="my-4"/>

      <div className="flex justify-between text-2xl font-bold">
        <span>Total Amount</span>

        <span>
          ₹{selectedJournal.totalAmount || 0}
        </span>
      </div>

    </div>

  </div>


  {/* Patient Summary */}

  <div className="
  bg-blue-50
  border
  rounded-3xl
  p-6
  shadow-sm
  ">

    <h3 className="text-3xl font-bold mb-6">
      Patient Summary
    </h3>

    <div className="space-y-4">

      <div className="flex justify-between">
        <span>👤 Patient</span>
        <b>{selectedJournal.patientName}</b>
      </div>

      <div className="flex justify-between">
        <span>👨‍⚕️ Doctor</span>
        <b>{selectedJournal.doctorName}</b>
      </div>

      <div className="flex justify-between">
        <span>📅 Visit Date</span>
        <b>{selectedJournal.date}</b>
      </div>

      <div className="flex justify-between">
        <span>📞 Contact</span>
        <b>
          {selectedJournal.patientPhone ||
          selectedJournal.phone ||
          "-"}
        </b>
      </div>

      <div className="flex justify-between">
        <span>📍 Address</span>
        <b>{selectedJournal.address || "-"}</b>
      </div>

      <div className="flex justify-between">
        <span>💊 Prescriptions</span>
        <b>
          {selectedJournal.prescriptions?.length || 0}
        </b>
      </div>

      <div className="flex justify-between">
        <span>🩸 Blood Group</span>
        <b>
          {selectedJournal.bloodGroup || "-"}
        </b>
      </div>

    </div>

  </div>


  {/* Appointment Info */}

  <div className="
  bg-green-50
  border
  rounded-3xl
  p-6
  shadow-sm
  ">

    <h3 className="text-3xl font-bold mb-6">
      Appointment Info
    </h3>

    <div className="space-y-4">

      <div>
        📋 Appointment No :
        <b>
          {selectedJournal.appointmentNo}
        </b>
      </div>

      <div>
        💳 Payment :
        <b>
          {selectedJournal.paymentStatus || "Paid"}
        </b>
      </div>

      <div>
        📊 Status :
        <b>
          {selectedJournal.status || "Treated"}
        </b>
      </div>

      <div>
        💊 Medicines :
        <b>
          {selectedJournal.medicines?.length || 0}
        </b>
      </div>

      <div>
        🧪 Lab Tests :
        <b>
          {selectedJournal.labTests?.length || 0}
        </b>
      </div>

      <div>
        ⏰ Time :
        <b>
          {selectedJournal.time || "-"}
        </b>
      </div>

    </div>

  </div>

</div>

<div className="
bg-red-50
rounded-2xl
p-5
mt-8
mb-6
">

<h3 className="font-bold text-lg mb-3">
Audit Information
</h3>

<p>
<b>Created By :</b>
{selectedJournal.createdBy || "Doctor"}
</p>

<p>
<b>Last Updated :</b>
{
selectedJournal.updatedAt
? selectedJournal.updatedAt
: "-"
}
</p>

<p>
<b>Record Status :</b>
{selectedJournal.status || "Completed"}
</p>

</div>

<div className="mt-8 pt-6 border-t flex justify-center">

<button
onClick={() => setSelectedJournal(null)}
className="
bg-red-500
hover:bg-red-600
text-white
font-semibold
w-full
md:w-56
h-12
rounded-xl
transition-all
"
>
Close
</button>

</div>

</div>

</div>

</div>

</div>

)}

{showAdminPopup && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">

      <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">

        <h2 className="text-2xl font-bold mb-4">
          Admin Details
        </h2>

        <p><b>Name :</b> {viewData?.adminBasicInfo?.name}</p>
        <p><b>Age :</b> {viewData?.adminBasicInfo?.age}</p>
        <p><b>Gender :</b> {viewData?.adminBasicInfo?.gender}</p>
        <p><b>Date Of Birth :</b> {viewData?.adminBasicInfo?.dob}</p>
        <p><b>Contact :</b> {viewData?.adminBasicInfo?.contact}</p>
        <p><b>Email :</b> {viewData?.adminBasicInfo?.email}</p>
        <p><b>Address :</b> {viewData?.adminBasicInfo?.address}</p>

        <p><b>Designation :</b> {viewData?.adminDesignation?.designation}</p>
        <p><b>Qualification :</b> {viewData?.adminDesignation?.qualification}</p>

        <p><b>Employee ID :</b> {viewData?.adminOfficial?.employeeId}</p>
        <p><b>Joining Date :</b> {viewData?.adminOfficial?.joiningDate}</p>

        <p><b>Username :</b> {viewData?.adminAccount?.username}</p>

        <button
          onClick={() => setShowAdminPopup(false)}
          className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>

      </div>

    </div>
  )}

{showDoctorPopup && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">

  <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">

    <h2 className="text-2xl font-bold mb-4">
      Doctor Details
    </h2>

    <div className="flex flex-col items-center mb-5">

<img
src={
viewData?.doctorDesignation?.doctorImage ||
defaultDoctorAvatar
}
alt="doctor"
className="
w-28
h-28
rounded-full
object-cover
border-4
border-blue-500
"
/>

<h3 className="mt-3 text-xl font-bold">
{viewData?.doctorBasicInfo?.name}
</h3>

<p className="text-gray-500">
{viewData?.doctorDesignation?.designation}
</p>

</div>

    <p><b>Name :</b> {viewData?.doctorBasicInfo?.name}</p>

    <p><b>Age :</b> {viewData?.doctorBasicInfo?.age}</p>

    <p><b>Gender :</b> {viewData?.doctorBasicInfo?.gender}</p>

    <p><b>Date Of Birth :</b> {viewData?.doctorBasicInfo?.dob}</p>

    <p><b>Contact :</b> {viewData?.doctorBasicInfo?.contact}</p>

    <p><b>Emergency Contact :</b> {viewData?.doctorBasicInfo?.emrContact}</p>

    <p><b>Email :</b> {viewData?.doctorBasicInfo?.email}</p>

    <p><b>Address :</b> {viewData?.doctorBasicInfo?.address}</p>

    <p><b>Qualification :</b> {viewData?.doctorDesignation?.qualification}</p>

    <p><b>Department :</b> {viewData?.doctorDesignation?.department}</p>

    <p><b>Speciality :</b> {viewData?.speciality}</p>

    <p><b>Available Slots :</b></p>

    <ul className="list-disc ml-6">
      {viewData?.slots?.map((slot, i) => (
        <li key={i}>{slot}</li>
      ))}
    </ul>

    <button
      onClick={() => setShowDoctorPopup(false)}
      className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
    >
      Close
    </button>

  </div>

</div>

)}

{showStaffPopup && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">

  <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">

    <h2 className="text-2xl font-bold mb-4">
      Staff Details
    </h2>

    <p><b>Name :</b> {viewData?.staffBasicInfo?.name}</p>

    <p><b>Age :</b> {viewData?.staffBasicInfo?.age}</p>

    <p><b>Gender :</b> {viewData?.staffBasicInfo?.gender}</p>

    <p><b>Date Of Birth :</b> {viewData?.staffBasicInfo?.dob}</p>

    <p><b>Contact :</b> {viewData?.staffBasicInfo?.contact}</p>

    <p><b>Email :</b> {viewData?.staffBasicInfo?.email}</p>

    <p><b>Address :</b> {viewData?.staffBasicInfo?.address}</p>

    <p><b>Designation :</b> {viewData?.staffDesignation?.designation}</p>

    <p><b>Qualification :</b> {viewData?.staffDesignation?.qualification}</p>

    <p><b>Staff ID :</b> {viewData?.staffOfficial?.staffId}</p>

    <p><b>Joining Date :</b> {viewData?.staffOfficial?.joiningDate}</p>

    <button
      onClick={() => setShowStaffPopup(false)}
      className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
    >
      Close
    </button>

  </div>

</div>

)}

{showPatientPopup && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">

  <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">

    <h2 className="text-2xl font-bold mb-4">
      Patient Details
    </h2>

    <p><b>Name :</b> {viewData?.basicInfo?.name}</p>

    <p><b>Age :</b> {viewData?.basicInfo?.age}</p>

    <p><b>Gender :</b> {viewData?.basicInfo?.gender}</p>

    <p><b>Date Of Birth :</b> {viewData?.basicInfo?.dob}</p>

    <p><b>Contact :</b> {viewData?.basicInfo?.contact}</p>

    <p><b>Emergency Contact :</b> {viewData?.basicInfo?.emrContact}</p>

    <p><b>Email :</b> {viewData?.basicInfo?.email}</p>

    <p><b>Address :</b> {viewData?.basicInfo?.address}</p>

    <hr className="my-3"/>

    <p><b>Insurance Provider :</b> {viewData?.insuranceInfo?.provider}</p>

    <p><b>Policy Number :</b> {viewData?.insuranceInfo?.policy}</p>

    <p><b>Agent Name :</b> {viewData?.insuranceInfo?.agentName}</p>

    <p><b>Agent Number :</b> {viewData?.insuranceInfo?.agentNumber}</p>

    <hr className="my-3"/>

    <p><b>Blood Group :</b> {viewData?.medicalHistory?.bloodGroup}</p>

    <p><b>Condition :</b> {viewData?.reasonInfo?.condition}</p>

    <p><b>Visit Reason :</b> {viewData?.reasonInfo?.visitReason}</p>

    <p><b>Primary Reason :</b> {viewData?.reasonInfo?.primaryReason}</p>

    <p><b>Duration :</b> {viewData?.reasonInfo?.duration}</p>

    <p><b>Treated Before :</b> {viewData?.reasonInfo?.treatedBefore}</p>

    <hr className="my-3"/>

    <p><b>Username :</b> {viewData?.accountInfo?.username}</p>

    <button
      onClick={() => setShowPatientPopup(false)}
      className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
    >
      Close
    </button>

  </div>

</div>

)}

{showPharmasiPopup && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">

  <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">

    <h2 className="text-2xl font-bold mb-4">
      Pharmasi Details
    </h2>

    <p><b>Name :</b> {viewData?.pharmasiBasicInfo?.name}</p>

    <p><b>Age :</b> {viewData?.pharmasiBasicInfo?.age}</p>

    <p><b>Gender :</b> {viewData?.pharmasiBasicInfo?.gender}</p>

    <p><b>Date Of Birth :</b> {viewData?.pharmasiBasicInfo?.dob}</p>

    <p><b>Contact :</b> {viewData?.pharmasiBasicInfo?.contact}</p>

    <p><b>Email :</b> {viewData?.pharmasiBasicInfo?.email}</p>

    <p><b>Address :</b> {viewData?.pharmasiBasicInfo?.address}</p>

    <p><b>Designation :</b> {viewData?.pharmasiDesignation?.designation}</p>

    <p><b>Pharmasi ID :</b> {viewData?.pharmasiOfficial?.pharmasiId}</p>

    <p><b>Joining Date :</b> {viewData?.pharmasiOfficial?.joiningDate}</p>

    <button
      onClick={() => setShowPharmasiPopup(false)}
      className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
    >
      Close
    </button>

  </div>

</div>

)}

{tab === "account" && subMenu === "admins" && (

<div className="flex flex-col md:flex-row w-full max-w-7xl border rounded-lg overflow-hidden md:h-[450px] h-auto">

<div className="
w-full
md:w-1/4
p-3
grid
grid-cols-2
sm:grid-cols-2
gap-2
md:flex
md:flex-col
">
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

{tab === "account" && subMenu === "admins" && (

<div className="mt-10 w-full overflow-hidden">

<h2 className="text-xl font-bold mb-4">
  Created Admin Accounts
</h2>

<div className="mb-8 mt-8">
  <input
    type="text"
    placeholder="Search Admin Name..."
    value={adminSearch}
    onChange={(e) =>
      setAdminSearch(e.target.value)
    }
    className="
      w-full
      md:w-[400px]
      border
      rounded-xl
      px-4
      py-3
      outline-none
      focus:border-blue-500
    "
  />
</div>

<div className="block lg:hidden space-y-4">

{adminAccounts
.filter((admin)=>
adminSearch === ""
? true
: (admin.adminBasicInfo?.name || "")
.toLowerCase()
.trim() ===
adminSearch.toLowerCase().trim()
)
.map((admin,index)=>(

    <div
      key={index}
      className="bg-white border rounded-2xl p-4 shadow"
    >

      <div className="flex justify-between mb-3">
        <span className="font-semibold text-gray-500">
          Name
        </span>

        <span className="font-bold">
          {admin.adminBasicInfo?.name}
        </span>
      </div>

      <div className="flex justify-between mb-3">
        <span className="font-semibold text-gray-500">
          Designation
        </span>

        <span>
          {admin.adminDesignation?.designation}
        </span>
      </div>

      <div className="flex justify-between mb-4">
  <span className="font-semibold text-gray-500">
    Address
  </span>

  <span className="text-right break-words max-w-[60%]">
    {admin.adminBasicInfo?.address}
  </span>
</div>

      <div className="flex flex-wrap gap-2">

      <button
  className="bg-green-500 text-white px-3 py-2 rounded"
  onClick={() => {
    setViewData(admin);
    setShowAdminPopup(true);
  }}
>
  View
</button>

        <button
          className="bg-blue-500 text-white px-3 py-2 rounded"
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
        >
          Edit
        </button>

        <button
          className="bg-red-500 text-white px-3 py-2 rounded"
          onClick={async () => {

            await deleteDoc(
              doc(db,"admins",admin.id)
            )

            fetchAdmins()

          }}
        >
          Delete
        </button>

        <button
          className={`px-3 py-2 rounded text-white ${
            admin.isDisabled
              ? "bg-green-500"
              : "bg-gray-500"
          }`}
          onClick={async () => {

            await updateDoc(
              doc(db,"admins",admin.id),
              {
                isDisabled: !admin.isDisabled
              }
            )

            fetchAdmins()

          }}
        >
          {admin.isDisabled ? "Enable" : "Disable"}
        </button>

      </div>

    </div>

  ))}

</div>

<div className="hidden lg:block w-full overflow-x-auto rounded-lg border">

  <table className="w-full md:min-w-[900px] min-w-[600px] text-xs md:text-sm">

    <thead className="bg-gray-200">
      <tr>
        <th className="border p-2 whitespace-nowrap">Name</th>
        <th className="border p-2 whitespace-nowrap">Designation</th>
        <th className="border p-2 whitespace-nowrap">Address</th>
        <th className="border p-2 whitespace-nowrap">Action</th>
      </tr>
    </thead>

    <tbody>

    {adminAccounts
.filter((admin) =>
  adminSearch === ""
    ? true
    : (admin.adminBasicInfo?.name || "")
        .toLowerCase()
        .includes(adminSearch.toLowerCase())
)
.map((admin, index) => (

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

          <td className="border p-2">
  <div className="flex flex-wrap gap-2">

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


              </div>
          </td>

        </tr>

      ))}

    </tbody>

  </table>
  </div>

</div>

)}



{tab === "account" && subMenu === "doctors" && (

<div className="flex flex-col md:flex-row w-full max-w-7xl border rounded-lg overflow-hidden mx-auto
                  min-h-[auto] md:h-[450px]">


<div
className="
w-full
md:w-1/4
p-3
grid
grid-cols-2
sm:grid-cols-2
gap-2
md:flex
md:flex-col
"
>

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


     <div
className="
w-full
md:w-3/4
p-4 md:p-6
relative
min-h-[650px]
"
>


          {doctorStep === 1 && (

            <div>

              <h3 className="text-lg font-bold mb-6">
                Basic Information
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">


              <div className="col-span-1 md:col-span-1 lg:col-span-1 min-w-0">
  <FloatingInput
    label="Name"
    required
    value={doctorBasicInfo.name}
    disabled={isViewMode}
    onChange={(e) =>
      setDoctorBasicInfo({
        ...doctorBasicInfo,
        name: e.target.value
      })
    }
  />
</div>


                <FloatingInput label="Age" required type="number" value={doctorBasicInfo.age} disabled={isViewMode}
                  onChange={(e) =>
                    setDoctorBasicInfo({ ...doctorBasicInfo, age: e.target.value })
                  }
                />


<div className="relative col-span-1 md:col-span-1 lg:col-span-1 min-w-0">
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

{tab === "account" && subMenu === "doctors" && (

      <div className="mt-10">

        <h2 className="text-xl font-bold mb-4">Created Doctor Accounts</h2>

        <div className="mb-6 mt-4">
  <input
    type="text"
    placeholder="Search Doctor Name..."
    value={doctorSearch}
    onChange={(e) => setDoctorSearch(e.target.value)}
    className="
      w-full
      md:w-[400px]
      border
      rounded-xl
      px-4
      py-3
      outline-none
      focus:border-blue-500
    "
  />
</div>

        <div className="block lg:hidden space-y-4">

        {doctorAccounts
.filter((docData)=>
  doctorSearch === ""
    ? true
    : (docData.doctorBasicInfo?.name || "")
        .toLowerCase()
        .includes(doctorSearch.toLowerCase())
)
.map((docData,index)=>(

<div
key={index}
className="bg-white border rounded-2xl p-4 shadow"
>

<div className="flex justify-between mb-3">
<span className="font-semibold text-gray-500">
Name
</span>

<span className="font-bold">
{docData.doctorBasicInfo?.name}
</span>
</div>

<div className="flex justify-between mb-3">
<span className="font-semibold text-gray-500">
Speciality
</span>

<span>
{docData.doctorDesignation?.designation}
</span>
</div>

<div className="flex justify-between mb-4">
  <span className="font-semibold text-gray-500">
    Address
  </span>

  <span className="text-right break-words max-w-[60%]">
    {docData.doctorBasicInfo?.address}
  </span>
</div>

<div className="flex flex-wrap gap-2">

<button
onClick={() => {
  setViewData(docData);
  setShowDoctorPopup(true);
}}
className="bg-green-500 text-white px-3 py-2 rounded"
>
View
</button>

<button
onClick={()=>{
setDoctorBasicInfo(docData.doctorBasicInfo||{})
setDoctorDesignation(docData.doctorDesignation||{})
setDoctorOfficial(docData.doctorOfficial||{})
setDoctorAccount(docData.doctorAccount||{})

setEditData(docData)

setIsViewMode(false)
setIsEditMode(true)

setDoctorStep(1)
}}
className="bg-blue-500 text-white px-3 py-2 rounded"
>
Edit
</button>

<button
onClick={async()=>{
await deleteDoc(
doc(db,"doctors",docData.id)
)
fetchDoctors()
}}
className="bg-red-500 text-white px-3 py-2 rounded"
>
Delete
</button>

<button
onClick={async()=>{
await updateDoc(
doc(db,"doctors",docData.id),
{
isDisabled: !docData.isDisabled
}
)
fetchDoctors()
}}
className={`px-3 py-2 rounded text-white ${
docData.isDisabled
? "bg-green-500"
: "bg-gray-500"
}`}
>
{docData.isDisabled ? "Enable" : "Disable"}
</button>

</div>

</div>

))}

</div>

        <div className="hidden lg:block w-full overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[600px] md:min-w-[900px] border border-gray-300 text-xs md:text-sm">

          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Speciality</th>
              <th className="border p-2">address</th>

              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>

          {doctorAccounts
.filter((docData)=>
  doctorSearch === ""
    ? true
    : (docData.doctorBasicInfo?.name || "")
        .toLowerCase()
        .includes(doctorSearch.toLowerCase())
)
.map((docData, index) => (

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

<td className="border p-2">
  <div className="flex flex-wrap gap-2">


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

                        </div>
                  </td>

                </tr>

              ))}

          </tbody>

        </table>
        </div>

      </div>

    )}


{tab === "account" && subMenu === "staff" && (

<div className="
flex flex-col md:flex-row
w-full max-w-7xl
border rounded-lg overflow-hidden
md:h-[450px]
h-auto
">

<div
className="
w-full
md:w-1/4
p-3
grid
grid-cols-2
sm:grid-cols-2
gap-2
md:flex
md:flex-col
"
>

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


  <div className="
w-full md:w-3/4
p-3 md:p-6
relative
overflow-y-auto
min-h-[600px]
bg-white
">


    {staffStep === 1 && (

      <div>

        <h3 className="text-lg font-bold mb-6">
          Basic Information
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">


        <div className="col-span-1 md:col-span-1 lg:col-span-1 min-w-0">
  <FloatingInput
    label="Name"
    required
    value={staffBasicInfo.name}
    disabled={isViewMode}
    onChange={(e) =>
      setStaffBasicInfo({
        ...staffBasicInfo,
        name: e.target.value
      })
    }
  />
</div>


          <FloatingInput label="Age" required type="number" value={staffBasicInfo.age} disabled={isViewMode}
            onChange={(e) =>
              setStaffBasicInfo({ ...staffBasicInfo, age: e.target.value })
            }
          />


<div className="relative col-span-1 md:col-span-1 lg:col-span-1 min-w-0">
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

{tab === "account" && subMenu === "staff" && (

<div className="mt-10">

  <h2 className="text-xl font-bold mb-4">Created Staff Accounts</h2>

  <div className="mb-6 mt-4">
  <input
    type="text"
    placeholder="Search Staff Name..."
    value={staffSearch}
    onChange={(e) => setStaffSearch(e.target.value)}
    className="
      w-full
      md:w-[400px]
      border
      rounded-xl
      px-4
      py-3
      outline-none
      focus:border-blue-500
    "
  />
</div>

  <div className="block lg:hidden space-y-4">

  {staffAccounts
.filter((staff)=>
  staffSearch === ""
    ? true
    : (staff.staffBasicInfo?.name || "")
        .toLowerCase()
        .includes(staffSearch.toLowerCase())
)
.map((staff,index)=>(

<div
key={index}
className="bg-white border rounded-2xl p-4 shadow"
>

<div className="flex justify-between mb-3">
<span className="font-semibold text-gray-500">
Name
</span>

<span className="font-bold">
{staff.staffBasicInfo?.name}
</span>
</div>

<div className="flex justify-between mb-3">
<span className="font-semibold text-gray-500">
Age
</span>

<span>
{staff.staffBasicInfo?.age}
</span>
</div>

<div className="flex justify-between mb-3">
<span className="font-semibold text-gray-500">
Contact
</span>

<span>
{staff.staffBasicInfo?.contact}
</span>
</div>

<div className="flex justify-between mb-4">
  <span className="font-semibold text-gray-500">
    Address
  </span>

  <span className="text-right break-words max-w-[60%]">
    {staff.staffBasicInfo?.address}
  </span>
</div>

<div className="flex flex-wrap gap-2">

{/* VIEW */}

<button
  onClick={() => {
    setViewData(staff)
    setShowStaffPopup(true)
  }}
  className="bg-green-500 text-white px-3 py-2 rounded"
>
  View
</button>

{/* EDIT */}

<button
onClick={() => {

setStaffBasicInfo(staff.staffBasicInfo || {})
setStaffDesignation(staff.staffDesignation || {})
setStaffOfficial(staff.staffOfficial || {})
setStaffAccount(staff.staffAccount || {})

setEditData(staff)

setIsViewMode(false)
setIsEditMode(true)

setStaffStep(1)

}}
className="bg-blue-500 text-white px-3 py-2 rounded"
>
Edit
</button>

{/* DELETE */}

<button
onClick={async () => {

await deleteDoc(
doc(db,"staffs",staff.id)
)

fetchStaffs()

}}
className="bg-red-500 text-white px-3 py-2 rounded"
>
Delete
</button>

{/* ENABLE / DISABLE */}

<button
onClick={async () => {

await updateDoc(
doc(db,"staffs",staff.id),
{
isDisabled: !staff.isDisabled
}
)

fetchStaffs()

}}
className={`px-3 py-2 rounded text-white ${
staff.isDisabled
? "bg-green-500"
: "bg-gray-500"
}`}
>
{staff.isDisabled ? "Enable" : "Disable"}
</button>

</div>

</div>

))}

</div>

  <div className="hidden lg:block w-full overflow-x-auto rounded-lg border">
  <table className="w-full min-w-[600px] md:min-w-[900px] border border-gray-300 text-xs md:text-sm">

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

    {staffAccounts
.filter((staff)=>
  staffSearch === ""
    ? true
    : (staff.staffBasicInfo?.name || "")
        .toLowerCase()
        .includes(staffSearch.toLowerCase())
)
.map((staff, index) => (

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




          <td className="border p-2">
  <div className="flex flex-wrap gap-2">

  <button
  onClick={() => {

    setStaffBasicInfo(staff.staffBasicInfo || {})
    setStaffDesignation(staff.staffDesignation || {})
    setStaffOfficial(staff.staffOfficial || {})
    setStaffAccount(staff.staffAccount || {})

    setIsViewMode(true)
    setIsEditMode(false)

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

                </div>
          </td>



        </tr>

      ))}

    </tbody>

  </table>
  </div>

</div>

)}

{tab === "account" && subMenu === "patients" && (

<div
  className="
  flex flex-col md:flex-row
  w-full max-w-7xl
  border rounded-lg overflow-hidden
  md:h-[450px]
  h-auto
"
>

<div
className="
w-full
md:w-1/4
p-3
grid
grid-cols-2
sm:grid-cols-2
gap-2
md:flex
md:flex-col
"
>

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




  <div
className="
w-full md:w-3/4
p-3 md:p-6
relative
overflow-y-auto
min-h-[600px]
bg-white
"
>

    {step === 1 && (

      <div>

        <h3 className="text-lg font-bold mb-6">
          Basic Information
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">


        <div className="col-span-1 md:col-span-1 lg:col-span-1 min-w-0">
  <FloatingInput
    label="Name"
    required
    value={basicInfo.name}
    disabled={isViewMode}
    onChange={(e) =>
      setBasicInfo({
        ...basicInfo,
        name: e.target.value
      })
    }
  />
</div>

          <FloatingInput label="Age" required type="number" value={basicInfo.age} disabled={isViewMode}
            onChange={(e) => setBasicInfo({ ...basicInfo, age: e.target.value })}
          />


<div className="relative col-span-1 md:col-span-1 lg:col-span-1 min-w-0">
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

{tab === "account" && subMenu === "patients" && (

<div className="mt-10 max-h-[300px] overflow-y-auto">

  <h2 className="text-xl font-bold mb-4">Created Patient Accounts</h2>

  <div className="mb-6 mt-4">
  <input
    type="text"
    placeholder="Search Patient Name..."
    value={patientSearch}
    onChange={(e) => setPatientSearch(e.target.value)}
    className="
      w-full
      md:w-[400px]
      border
      rounded-xl
      px-4
      py-3
      outline-none
      focus:border-blue-500
    "
  />
</div>

  <div className="block lg:hidden space-y-4">

{patientAccounts
.filter((patient)=>
  patientSearch === ""
    ? true
    : (patient.basicInfo?.name || "")
        .toLowerCase()
        .includes(patientSearch.toLowerCase())
)
.map((patient,index)=>(

<div
key={index}
className="bg-white border rounded-2xl p-4 shadow"
>

<div className="flex justify-between mb-3">
<span className="font-semibold text-gray-500">
Name
</span>

<span className="font-bold">
{patient.basicInfo?.name}
</span>
</div>

<div className="flex justify-between mb-3">
<span className="font-semibold text-gray-500">
Age
</span>

<span>
{patient.basicInfo?.age}
</span>
</div>

<div className="flex justify-between mb-3">
<span className="font-semibold text-gray-500">
Contact
</span>

<span>
{patient.basicInfo?.contact}
</span>
</div>

<div className="flex justify-between mb-4">
  <span className="font-semibold text-gray-500">
    Address
  </span>

  <span className="text-right break-words max-w-[60%]">
    {patient.basicInfo?.address}
  </span>
</div>

<div className="flex flex-wrap gap-2">

{/* VIEW */}

<button
onClick={() => {

  setViewData(patient)

  setShowPatientPopup(true)

}}
className="bg-green-500 text-white px-2 py-1 rounded"
>
View
</button>

{/* EDIT */}

<button
onClick={() => {

setBasicInfo(patient.basicInfo || {})
setInsuranceInfo(patient.insuranceInfo || {})
setMedicalHistory(patient.medicalHistory || {})
setReasonInfo(patient.reasonInfo || {})
setAccountInfo(patient.accountInfo || {})

setEditData(patient)

setIsViewMode(false)
setIsEditMode(true)

setStep(1)

}}
className="bg-blue-500 text-white px-3 py-2 rounded"
>
Edit
</button>

{/* DELETE */}

<button
onClick={async () => {

await deleteDoc(
doc(db,"patients",patient.id)
)

fetchPatients()

}}
className="bg-red-500 text-white px-3 py-2 rounded"
>
Delete
</button>

{/* ENABLE / DISABLE */}

<button
onClick={async () => {

await updateDoc(
doc(db,"patients",patient.id),
{
isDisabled: !patient.isDisabled
}
)

fetchPatients()

}}
className={`px-3 py-2 rounded text-white ${
patient.isDisabled
? "bg-green-500"
: "bg-gray-500"
}`}
>
{patient.isDisabled ? "Enable" : "Disable"}
</button>

</div>

</div>

))}

</div>

  <div className="hidden lg:block w-full overflow-x-auto rounded-lg border">
  <table className="w-full min-w-[700px] md:min-w-[900px] border border-gray-300 text-xs md:text-sm">

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

    {patientAccounts
  .filter((p) =>
    patientSearch === ""
      ? true
      : (p.basicInfo?.name || "")
          .toLowerCase()
          .trim() ===
        patientSearch.toLowerCase().trim()
  )
  .map((p, index) => (
        <tr key={index}>

          <td className={`border p-2 ${p.isDisabled ? "text-gray-400 line-through" : ""}`}>
            {p.basicInfo?.name || p.name}
          </td>
          <td className="border p-2">{p.basicInfo?.age || p.age}</td>
          <td className="border p-2">{p.basicInfo?.address || p.address}</td>
          <td className="border p-2">{p.basicInfo?.contact || p.contact}</td>

          <td className="border p-2">
  <div className="flex flex-wrap gap-2">

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

                </div>
          </td>

        </tr>
      ))}

    </tbody>

  </table>
  </div>

</div>

)}


{tab === "account" && subMenu === "pharmasi" && (

<div className="w-full max-w-7xl border rounded-xl overflow-hidden
flex flex-col md:flex-row
min-h-[760px] md:min-h-[620px]">

<div
className="
w-full
md:w-1/4
p-4
grid
grid-cols-2
gap-2
md:block
md:space-y-4
"
>

<h2 className="hidden md:block text-2xl font-bold">
Create Pharmasi Account
</h2>

<button
  onClick={() => {
    setIsViewMode(false);
    setPharmasiStep(1);
  }}
  className={`
    min-w-[140px]
    md:w-full
    p-3
    rounded
    text-white
    ${pharmasiStep === 1 ? "bg-blue-500" : "bg-gray-400"}
  `}
>
  Basic Info
</button>

<button
  onClick={() => {
    setIsViewMode(false);
    setPharmasiStep(2);
  }}
  className={`
    min-w-[140px]
    md:w-full
    p-3
    rounded
    text-white
    ${pharmasiStep === 2 ? "bg-blue-500" : "bg-gray-400"}
  `}
>
  Designation
</button>

<button
  onClick={() => {
    setIsViewMode(false);
    setPharmasiStep(3);
  }}
  className={`
    min-w-[140px]
    md:w-full
    p-3
    rounded
    text-white
    ${pharmasiStep === 3 ? "bg-blue-500" : "bg-gray-400"}
  `}
>
  Official Info
</button>

<button
  onClick={() => {
    setIsViewMode(false);
    setPharmasiStep(4);
  }}
  className={`
    min-w-[140px]
    md:w-full
    p-3
    rounded
    text-white
    ${pharmasiStep === 4 ? "bg-blue-500" : "bg-gray-400"}
  `}
>
  Account
</button>

</div>


<div className="w-full md:w-3/4 relative p-6 pb-28 min-h-[600px]">

{pharmasiStep===1 && (
<>
<h3 className="font-bold text-xl mb-6">
Basic Information
</h3>

<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">

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

<div className="relative">

  <select
    value={pharmasiBasicInfo.gender}
    onChange={(e) =>
      setPharmasiBasicInfo({
        ...pharmasiBasicInfo,
        gender: e.target.value
      })
    }
    className="
      w-full
      border
      rounded-xl
      px-4
      py-3
      outline-none
      bg-white
    "
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Others">Others</option>
  </select>

  <label className="
    absolute
    left-3
    -top-2
    bg-white
    px-1
    text-sm
    text-gray-500
  ">
    Gender <span className="text-red-500">*</span>
  </label>

</div>

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

<div className="col-span-2 flex flex-col gap-4">
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
<div className="
absolute
bottom-6
left-0
right-0
flex
justify-center md:justify-end
gap-4
px-6
flex-wrap
">

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

{tab === "account" && subMenu === "pharmasi" && (

<div className="mt-10">

<h2 className="text-xl font-bold mb-4">
Created Pharmasi Accounts
</h2>

<div className="mb-6 mt-4">
  <input
    type="text"
    placeholder="Search Pharmasi Name..."
    value={pharmasiSearch}
    onChange={(e) => setPharmasiSearch(e.target.value)}
    className="
      w-full
      md:w-[400px]
      border
      rounded-xl
      px-4
      py-3
      outline-none
      focus:border-blue-500
    "
  />
</div>

<div className="block lg:hidden space-y-4">

{pharmasiAccounts
.filter((pharmasi)=>
  pharmasiSearch === ""
    ? true
    : (pharmasi.pharmasiBasicInfo?.name || "")
        .toLowerCase()
        .trim() ===
      pharmasiSearch.toLowerCase().trim()
)
.map((pharmasi,index)=>(

<div
key={index}
className="bg-white border rounded-2xl p-4 shadow"
>

<div className="flex justify-between mb-3">
<span className="font-semibold text-gray-500">
Name
</span>

<span className="font-bold">
{pharmasi.pharmasiBasicInfo?.name}
</span>
</div>

<div className="flex justify-between mb-3">
<span className="font-semibold text-gray-500">
Age
</span>

<span>
{pharmasi.pharmasiBasicInfo?.age}
</span>
</div>

<div className="flex justify-between mb-3">
<span className="font-semibold text-gray-500">
Contact
</span>

<span>
{pharmasi.pharmasiBasicInfo?.contact}
</span>
</div>

<div className="flex justify-between mb-3">
<span className="font-semibold text-gray-500">
Designation
</span>

<span>
{pharmasi.pharmasiDesignation?.designation}
</span>
</div>

<div className="flex justify-between mb-4">
  <span className="font-semibold text-gray-500">
    Address
  </span>

  <span className="text-right break-words max-w-[60%]">
    {pharmasi.pharmasiBasicInfo?.address}
  </span>
</div>

<div className="flex flex-wrap gap-2">

{/* VIEW */}

<button
onClick={() => {
  setViewData(pharmasi)
  setShowPharmasiPopup(true)
}}
className="bg-green-500 text-white px-3 py-2 rounded"
>
View
</button>

{/* EDIT */}

<button
onClick={() => {

setPharmasiBasicInfo(pharmasi.pharmasiBasicInfo || {})
setPharmasiDesignation(pharmasi.pharmasiDesignation || {})
setPharmasiOfficial(pharmasi.pharmasiOfficial || {})
setPharmasiAccount(pharmasi.pharmasiAccount || {})

setEditData(pharmasi)

setIsViewMode(false)
setIsEditMode(true)

setPharmasiStep(1)

}}
className="bg-blue-500 text-white px-3 py-2 rounded"
>
Edit
</button>

{/* DELETE */}

<button
onClick={async () => {

await deleteDoc(
doc(db,"pharmasi",pharmasi.id)
)

fetchPharmasi()

}}
className="bg-red-500 text-white px-3 py-2 rounded"
>
Delete
</button>

{/* ENABLE / DISABLE */}

<button
onClick={async () => {

await updateDoc(
doc(db,"pharmasi",pharmasi.id),
{
isDisabled: !pharmasi.isDisabled
}
)

fetchPharmasi()

}}
className={`px-3 py-2 rounded text-white ${
pharmasi.isDisabled
? "bg-green-500"
: "bg-gray-500"
}`}
>
{pharmasi.isDisabled ? "Enable" : "Disable"}
</button>

</div>

</div>

))}

</div>

<div className="hidden lg:block w-full overflow-x-auto rounded-lg border">
<table className="w-full min-w-[700px] md:min-w-[900px] border border-gray-300 text-xs md:text-sm">

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

{pharmasiAccounts
.filter((item)=>
  pharmasiSearch === ""
    ? true
    : (item.pharmasiBasicInfo?.name || "")
        .toLowerCase()
        .trim() ===
      pharmasiSearch.toLowerCase().trim()
)
.map((item,index)=>(

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

<td className="border p-2">
  <div className="flex flex-wrap gap-2">

  <button
onClick={() => {

  setPharmasiBasicInfo(item.pharmasiBasicInfo || {})
  setPharmasiDesignation(item.pharmasiDesignation || {})
  setPharmasiOfficial(item.pharmasiOfficial || {})
  setPharmasiAccount(item.pharmasiAccount || {})

  setIsViewMode(true)
  setIsEditMode(false)

  setPharmasiStep(1)

}}
className="bg-green-500 text-white px-3 py-2 rounded"
>
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

</div>
</td>

</tr>

))}

</tbody>
</table>
</div>

</div>

)}

        </div>

      </div>


      {/* POPUP */}
      {selected?.type === "appointment" && (

<div className="
fixed inset-0 z-50
bg-black/50
overflow-y-auto
py-4 sm:py-6 md:py-10
px-3
">

<div className="
bg-white
w-full
max-w-5xl
mx-auto
rounded-[24px] md:rounded-[40px]
p-4 sm:p-6 md:p-10
relative
my-4
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
text-2xl
sm:text-3xl
md:text-5xl
lg:text-6xl
font-black
text-center
mb-6
md:mb-10
break-words
">
Appointment Details
</h1>

<div className="
flex
flex-col
md:flex-row
justify-center
items-center
gap-5
md:gap-10
mb-6
md:mb-10
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

<div
className="
space-y-4
text-base
sm:text-lg
md:text-xl
lg:text-2xl
font-semibold
break-words
"
>

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
<b>Appointment Number:</b>
{" "}
{selected.appointmentNo || "-"}
</p>

<p>
<b>Contact Number:</b>
{" "}
{selected.phone || selected.patientPhone || "-"}
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
<b>Address:</b>
{" "}
{selected.address || "-"}
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

{showViewPopup && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">

  <div className="bg-white rounded-xl p-6 w-full max-w-lg">

    <h2 className="text-xl font-bold mb-4">
      Details
    </h2>

    <div className="space-y-2 text-sm">

<p><b>Name :</b> {viewData?.doctorBasicInfo?.name}</p>

<p><b>Age :</b> {viewData?.doctorBasicInfo?.age}</p>

<p><b>Gender :</b> {viewData?.doctorBasicInfo?.gender}</p>

<p><b>Date Of Birth :</b> {viewData?.doctorBasicInfo?.dob}</p>

<p><b>Contact :</b> {viewData?.doctorBasicInfo?.contact}</p>

<p><b>Email :</b> {viewData?.doctorBasicInfo?.email}</p>

<p><b>Address :</b> {viewData?.doctorBasicInfo?.address}</p>

<p><b>Qualification :</b> {viewData?.doctorDesignation?.qualification}</p>

<p><b>Department :</b> {viewData?.doctorDesignation?.department}</p>

<p><b>Employee ID :</b> {viewData?.doctorOfficial?.employeeId}</p>

<p><b>Joining Date :</b> {viewData?.doctorOfficial?.joiningDate}</p>

<p><b>Username :</b> {viewData?.doctorAccount?.username}</p>

</div>

    <div className="mt-4">

      <button
        onClick={() => setShowViewPopup(false)}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Close
      </button>

    </div>

  </div>

</div>

)}


      {/* MOBILE + TAB BOTTOM MENU */}
{/* MOBILE + TAB BOTTOM MENU */}
<div className="fixed bottom-0 left-0 w-full bg-white border-t shadow md:hidden flex justify-around items-center py-3 px-2 z-50 overflow-x-auto">

  <button
    onClick={() => handleMenuChange("home")}
    className="flex flex-col items-center text-black min-w-[60px]"
  >
    <span className="text-xl">🏠</span>
    <p className="text-xs">Home</p>
  </button>

  <button
    onClick={() => handleMenuChange("subscription")}
    className="flex flex-col items-center text-black min-w-[60px]"
  >
    <span className="text-xl">💳</span>
    <p className="text-xs">Plans</p>
  </button>

  <button
    onClick={() => handleMenuChange("appointments")}
    className="flex flex-col items-center text-black min-w-[60px]"
  >
    <span className="text-xl">📅</span>
    <p className="text-xs">Appointments</p>
  </button>

  <button
    onClick={() => handleMenuChange("history")}
    className="flex flex-col items-center text-black min-w-[60px]"
  >
    <span className="text-xl">📜</span>
    <p className="text-xs">History</p>
  </button>

  <button
    onClick={() => handleMenuChange("journal")}
    className="flex flex-col items-center text-black min-w-[60px]"
  >
    <span className="text-xl">📖</span>
    <p className="text-xs">Journal</p>
  </button>

  <button
    onClick={() => handleMenuChange("account")}
    className="flex flex-col items-center text-black min-w-[60px]"
  >
    <span className="text-xl">👨‍⚕️</span>
    <p className="text-xs">Account</p>
  </button>

</div>

    </div>
  )
}

export default DemoMasterDashboard
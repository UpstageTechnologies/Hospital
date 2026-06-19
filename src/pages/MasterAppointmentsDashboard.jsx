import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  query,
  where
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import HospitalPaymentSection from "./hospitalPaymentSection";
import FloatingInput from "../components/FloatingInput";
import {
  setDoc,
  deleteDoc
} from "firebase/firestore";
const MasterAppointmentsDashboard = () => {


  const [showSetupPopup, setShowSetupPopup] = useState(false)
const [setupStep, setSetupStep] = useState(1)
const [ownerName, setOwnerName] = useState("")
const [hospitalName, setHospitalName] = useState("")
const [hospitalAddress, setHospitalAddress] = useState("")

useEffect(() => {

  const savedOwner =
    localStorage.getItem("setupOwnerName");

  const savedHospital =
    localStorage.getItem("setupHospitalName");

  const savedAddress =
    localStorage.getItem("setupHospitalAddress");

  if (savedOwner) {
    setOwnerName(savedOwner);
  }

  if (savedHospital) {
    setHospitalName(savedHospital);
  }

  if (savedAddress) {
    setHospitalAddress(savedAddress);
  }

}, []);

const [doctorCount, setDoctorCount] = useState("");
const [showDoctorPopup, setShowDoctorPopup] = useState(false);
const [showDoctorsListPopup, setShowDoctorsListPopup] = useState(false);

    const [appointments, setAppointments] = useState([])
    const [selected, setSelected] = useState(null)
    const [activePage, setActivePage] = useState("home")
    const [showUpgradePopup, setShowUpgradePopup] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [checkInTime, setCheckInTime] = useState(null)
    const [duration, setDuration] = useState(0)
    const [checkedOut, setCheckedOut] = useState(false)
    const [subMenu, setSubMenu] = useState("")
    const [adminStep, setAdminStep] = useState(1)

    const [journalEntries, setJournalEntries] = useState([])
const [filteredJournalEntries, setFilteredJournalEntries] = useState([])
const [selectedJournal, setSelectedJournal] = useState(null)

const [doctorSearch, setDoctorSearch] = useState("")
const [fromDate, setFromDate] = useState("")
const [toDate, setToDate] = useState("")

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
    const [adminAccounts, setAdminAccounts] = useState([])

    const doctorWisePatients = {}

appointments.forEach((appt) => {

  if (!appt.doctorName) return

  if (!doctorWisePatients[appt.doctorName]) {
    doctorWisePatients[appt.doctorName] = []
  }

  doctorWisePatients[appt.doctorName].push(appt)

})

    const [currentPlan, setCurrentPlan] = useState("basic")

const [planExpiry, setPlanExpiry] = useState(null)
    

const checkBasicPlanLimit = async (collectionName) => {

  const user = auth.currentUser

  if (!user) return true

  const q = query(
    collection(db, collectionName),
    where("createdBy", "==", user.uid)
  )

  const snap = await getDocs(q)

  if (currentPlan === "basic") {

    // patient limit
    if (
      collectionName === "patients" &&
      snap.docs.length >= 50
    ) {
      setShowUpgradePopup(true)
      return true
    }

    // other account limit
    if (
      collectionName !== "patients" &&
      snap.docs.length >= 1
    ) {
      setShowUpgradePopup(true)
      return true
    }
  }

  return false
}

    const handleCreateAdminFull = async () => {

      const blocked = await checkBasicPlanLimit("admins")

if (blocked) return
      try {
    
        const id = adminOfficial.adminId
    
        await setDoc(doc(db, "admins", id), {
          adminBasicInfo,
          adminDesignation,
          adminOfficial,
          adminAccount,
          isDisabled: false,
          createdBy: auth.currentUser.uid
        })
    
        alert("Admin saved")
        fetchAdmins()
    
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
        await fetchAdmins()
    
        setIsEditMode(false)
        setIsViewMode(false)
    
        setAdminStep(1)
    
      } catch (err) {
    
        console.log(err)
    
        alert(err.message)
      }
    }
    
    const handleCreateDoctorFull = async () => {

      const blocked = await checkBasicPlanLimit("doctors")

if(blocked) return
      const id = doctorOfficial.doctorId
    
      await setDoc(doc(db, "doctors", id), {
        doctorBasicInfo,
        doctorDesignation,
        doctorOfficial,
        doctorAccount,
        isDisabled: false,
        createdBy: auth.currentUser.uid
      })
    
      fetchDoctors()
      setShowDoctorPopup(true)
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

      const blocked = await checkBasicPlanLimit("staffs")

if(blocked) return
      const id = staffOfficial.staffId
    
      await setDoc(doc(db, "staffs", id), {
        staffBasicInfo,
        staffDesignation,
        staffOfficial,
        staffAccount,
        isDisabled: false,
        createdBy: auth.currentUser.uid
      })
    
      fetchStaffs()
      alert("Staff created")
    }
    
    const handleCreatePatient = async () => {

      const blocked = await checkBasicPlanLimit("patients")

if(blocked) return
      const id = basicInfo.email
    
      await setDoc(doc(db, "patients", id), {
        basicInfo,
        insuranceInfo,
        medicalHistory,
        reasonInfo,
        accountInfo,
        isDisabled: false,
        createdBy: auth.currentUser.uid
      })
    
      fetchPatients()
      alert("Patient created")
    }
    
    const handleCreatePharmasiFull = async () => {

      const blocked = await checkBasicPlanLimit("pharmasi")

if(blocked) return
      const id = pharmasiOfficial.pharmasiId
    
      await setDoc(doc(db, "pharmasi", id), {
        pharmasiBasicInfo,
        pharmasiDesignation,
        pharmasiOfficial,
        pharmasiAccount,
        isDisabled: false,
        createdBy: auth.currentUser.uid
      })
    
      fetchPharmasi()
      alert("Pharmasi created")
    }
    
    const fetchDoctors = async () => {

      const snapshot = await getDocs(
        collection(db, "doctors")
      )
    
      console.log(
        "TOTAL DOCTORS =",
        snapshot.docs.length
      )
    
      setDoctorAccounts(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      )
    }
    
    const fetchStaffs = async () => {
      const q = query(
        collection(db, "staffs"),
        where("createdBy", "==", auth.currentUser.uid)
      )
      
      const snapshot = await getDocs(q)

      setStaffAccounts(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      )
    }
    
    const fetchPatients = async () => {

      const snapshot = await getDocs(
        collection(db, "patients")
      )
    
      console.log(
        "TOTAL PATIENTS =",
        snapshot.docs.length
      )
    
      setPatientAccounts(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      )
    }
    
    const fetchPharmasi = async () => {
      const q = query(
        collection(db, "pharmasi"),
        where("createdBy", "==", auth.currentUser.uid)
      )
      
      const snapshot = await getDocs(q)
      setPharmasiAccounts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }

    const fetchAdmins = async () => {

      const user = auth.currentUser
    
      if (!user) return
    
      const q = query(
        collection(db, "admins"),
        where("createdBy", "==", user.uid)
      )
    
      const snapshot = await getDocs(q)
    
      setAdminAccounts(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      )
    }
    
    useEffect(() => {
      fetchDoctors()
      fetchStaffs()
      fetchPatients()
      fetchPharmasi()
      fetchAdmins()
    }, [])

    useEffect(() => {

      const popup =
        localStorage.getItem(
          "showMasterSetupPopup"
        );
    
      if (popup === "true") {
    
        setShowSetupPopup(true);
    
        localStorage.removeItem(
          "showMasterSetupPopup"
        );
    
      }
    
    }, []);

    useEffect(() => {

      const fetchPlan = async () => {
      
      const snap = await getDoc(
      doc(db,"hospitalPlans","currentPlan")
      )
      
      if(snap.exists()){
      
      const data = snap.data()
      
      if(
      data.plan === "premium" &&
      new Date(data.expiry) < new Date()
      ){
      
      setCurrentPlan("basic")
      
      await setDoc(
      doc(db,"hospitalPlans","currentPlan"),
      {
      plan:"basic",
      expiry:null
      }
      )
      
      }
      else{
      
      setCurrentPlan(data.plan)
      setPlanExpiry(data.expiry)
      
      }
      
      }
      
      }
      
      fetchPlan()
      
      },[])

    const navigate = useNavigate(); 

    useEffect(() => {

      window.history.pushState(
        { page: activePage },
        ""
      );
    
      const handleBackButton = () => {
    
        // 🔥 account / appointments / payment iruntha
        if (
          activePage === "appointments" ||
          activePage === "account" ||
          activePage === "payment"
        ) {
    
          setActivePage("home");
          setSubMenu("");
    
          window.history.pushState(
            { page: "home" },
            ""
          );
    
        }
    
        // 🔥 home la iruntha
        else {
    
          const logout = window.confirm(
            "Do you want to logout?"
          );
    
          if (logout) {
    
            localStorage.clear();
    
            navigate("/select-hospital");
    
          } else {
    
            window.history.pushState(
              { page: "home" },
              ""
            );
    
          }
    
        }
    
      };
    
      window.addEventListener(
        "popstate",
        handleBackButton
      );
    
      return () => {
    
        window.removeEventListener(
          "popstate",
          handleBackButton
        );
    
      };
    
    }, [activePage]);
    // ✅ ALL appointments (no filter)
    useEffect(() => {
        const fetchAppointments = async () => {
            const snap = await getDocs(collection(db, "appointments"))

            let list = []
            snap.forEach(doc => {
                list.push(doc.data())
            })

            setAppointments(list)
        }

        fetchAppointments()
    }, [])

    useEffect(() => {

      const fetchJournalEntries = async () => {
    
        const snap = await getDocs(
          collection(db, "appointmentHistory")
        )
    
        const data = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
    
        setJournalEntries(data)
        setFilteredJournalEntries(data)
    
      }
    
      fetchJournalEntries()
    
    }, [])

    const handleGenerateData = () => {

      if (!fromDate || !toDate) {
        alert("Select From Date & To Date")
        return
      }
    
      const filtered = journalEntries.filter((item) => {
    
        if (!item.date) return false
    
        const itemDate = new Date(item.date)
    
        return (
          itemDate >= new Date(fromDate) &&
          itemDate <= new Date(toDate)
        )
    
      })
    
      setFilteredJournalEntries(filtered)
    
    }

    const printJournalReport = () => {

      const win = window.open("", "_blank");
      
      win.document.write(`
      <html>
      <head>
      <title>Journal Report</title>
      
      <style>
      
      body{
      font-family:Arial;
      padding:20px;
      }
      
      table{
      width:100%;
      border-collapse:collapse;
      }
      
      th,td{
      border:1px solid #000;
      padding:8px;
      }
      
      </style>
      
      </head>
      
      <body>
      
      <h1>Hospital Journal Report</h1>
      
      <table>
      
      <thead>
      
      <tr>
      <th>Date</th>
      <th>Appointment No</th>
      <th>Patient</th>
      <th>Doctor</th>
      <th>Income</th>
      <th>Expense</th>
      </tr>
      
      </thead>
      
      <tbody>
      
      ${filteredJournalEntries.map(item => `
      <tr>
      <td>${item.date || "-"}</td>
      <td>${item.appointmentNo || "-"}</td>
      <td>${item.patientName || "-"}</td>
      <td>${item.doctorName || "-"}</td>
      <td>₹${item.totalAmount || 0}</td>
      <td>₹${item.medicineFee || 0}</td>
      </tr>
      `).join("")}
      
      </tbody>
      
      </table>
      
      </body>
      </html>
      `);
      
      win.document.close();
      
      setTimeout(() => {
      win.print();
      },500);
      
      };

    // ⏱ timer logic (same as patient)
    useEffect(() => {
        let interval
        if (checkInTime && !checkedOut) {
            interval = setInterval(() => {
                setDuration(Math.floor((Date.now() - checkInTime) / 1000))
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [checkInTime, checkedOut])

    return (
      
        <div className="flex flex-col md:flex-row min-h-screen">

            {/* ✅ SIDEBAR (ONLY 3 OPTIONS) */}
            <div className="hidden md:block w-[280px] min-h-screen bg-blue-600 text-white p-6">

<h2 className="text-4xl font-extrabold mb-10">
  Master Panel
</h2>
                <p 
  onClick={() => {
    setActivePage("home")
    setSubMenu("")
  }}
  className="mb-4 cursor-pointer"
>
  Home
</p>

<p
  onClick={() => {
    setActivePage("journal")
    setSubMenu("")
  }}
  className="mb-4 cursor-pointer"
>
  Journal Entry
</p>

<p
  onClick={() => {
    setActivePage("pharmacyJournal")
    setSubMenu("")
  }}
  className="mb-4 cursor-pointer"
>
  Pharmacy Journal Entry
</p>


<div className="mb-8">

<button

onClick={() => setActivePage("payment")}

className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 rounded-xl font-bold w-full"

>

Upgrade

</button>

  <div className="mt-5">

    <p className="text-sm text-gray-300">
      Plan
    </p>

    <h2 className="font-bold text-lg capitalize">
  {currentPlan}
</h2>

  </div>

  <div className="mt-4">

    <p className="text-sm text-gray-300">
      Expiry
    </p>

    <h2 className="font-bold">
  {planExpiry || "Free Plan"}
</h2>

  </div>

</div>



<p 
  onClick={() => {
    setActivePage("appointments")
    setSubMenu("")
  }}
  className="mb-4 cursor-pointer font-bold"
>
  Appointments
</p>

<p
  onClick={() => {
    setActivePage("account")
  }}
  className="mb-2 cursor-pointer"
>
  Account Creation
</p>

{activePage === "account" && (

<div className="ml-4 mt-2 space-y-2 text-sm">

  <p
    onClick={() => setSubMenu("admins")}
    className="cursor-pointer hover:text-gray-200"
  >
    Admins
  </p>

  <p
    onClick={() => setSubMenu("doctors")}
    className="cursor-pointer hover:text-gray-200"
  >
    Doctors
  </p>

  <p
    onClick={() => setSubMenu("staff")}
    className="cursor-pointer hover:text-gray-200"
  >
    Other Staffs
  </p>

  <p
    onClick={() => setSubMenu("patients")}
    className="cursor-pointer hover:text-gray-200"
  >
    Patients
  </p>


<p
onClick={() => setSubMenu("pharmasi")}
className="cursor-pointer hover:text-gray-200"
>
Pharmasi
</p>


</div>
)}

            </div>

            {/* MOBILE TOP NAVBAR */}



            {/* ✅ RIGHT CONTENT */}
            <div className="w-full md:w-4/5 p-4 md:p-6 pb-28">

            <h1 className="text-2xl font-bold mb-6">
 
  {activePage === "subscription" && "Subscription"}
  {activePage === "appointments" && "All Appointments"}
  
</h1>

{/* 🔥 STEP-5 — இதை இங்க add பண்ணு */}

{activePage === "home" && (

<div>

<h1 className="text-3xl md:text-5xl font-bold">
  Welcome to Master Home
</h1>

<p className="mt-5 text-gray-600 text-sm md:text-lg">
  Manage doctors, patients and appointments easily from master panel.
</p>

<div className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-3
gap-6
mt-10
">

<div
onClick={() => setActivePage("doctorsList")}
className="
border
rounded-xl
p-6
shadow
bg-white
cursor-pointer
hover:scale-105
transition
"
>

<h2 className="text-xl font-bold">
Total Doctors
</h2>

<p className="text-3xl mt-4 text-blue-600">
{doctorAccounts.length}
</p>

</div>



<div
onClick={() => setActivePage("appointmentsList")}
className="
border
rounded-xl
p-6
shadow
bg-white
cursor-pointer
hover:scale-105
transition
"
>

<h2 className="text-xl font-bold">
Appointments
</h2>

<p className="text-3xl mt-4 text-blue-600">
{appointments.length}
</p>

</div>

<div
onClick={() => setActivePage("patientsList")}
className="
border
rounded-xl
p-6
shadow
bg-white
cursor-pointer
hover:scale-105
transition
"
>
    <h2 className="text-xl font-bold">
      Total Patients
    </h2>

    <p className="text-3xl mt-4 text-blue-600">
      {patientAccounts.length}
    </p>
  </div>



</div>

</div>

)}

{activePage === "doctorsList" && (

<div>

<h1 className="text-3xl font-bold mb-6">
Doctors
</h1>

<div className="grid md:grid-cols-3 gap-4">

{doctorAccounts
.filter(doc =>
doc?.doctorBasicInfo?.name?.trim()
)
.map((doc, i) => (

<div
key={i}
onClick={() => {
setViewData(doc)
setShowDoctorPopup(true)
}}
className="
border
p-4
rounded-xl
shadow
cursor-pointer
hover:scale-105
"
>

<p className="font-bold">
{doc.doctorBasicInfo?.name}
</p>

<p>
{doc.doctorDesignation?.designation}
</p>

<p className="text-gray-500">
{doc.doctorBasicInfo?.email}
</p>

</div>

))}

</div>

</div>

)}


{activePage === "patientsList" && (

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

<h2 className="text-2xl font-bold text-blue-600 mb-2">
Dr. {doctorName}
</h2>

<p className="text-gray-500 mb-5">
Total Patients : {patients.length}
</p>

<div className="grid md:grid-cols-3 gap-4">

{patients.map((patient,i)=>(

<div
key={i}
className="
border
rounded-xl
p-4
"
>

<p className="font-bold">
{patient.patientName}
</p>

<p className="text-gray-500">
{patient.date}
</p>

<p className="text-gray-500">
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

{activePage === "appointmentsList" && (

<div>

<h1 className="text-3xl font-bold mb-6">
Doctor Wise Appointments
</h1>

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

{Object.entries(doctorWisePatients).map(
([doctorName, patients], index) => (

<div
key={index}
className="
bg-white
border
rounded-2xl
shadow
p-6
"
>

<h2 className="text-2xl font-bold text-blue-600">
Dr. {doctorName}
</h2>

<p className="mt-4 text-xl">
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

{showDoctorsListPopup && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

    <div className="bg-white w-[95%] md:w-[800px] max-h-[80vh] overflow-y-auto rounded-2xl p-6">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-2xl font-bold">
          Total Doctors ({doctorAccounts.length})
        </h2>

        <button
          onClick={() => setShowDoctorsListPopup(false)}
          className="text-red-500 font-bold text-xl"
        >
          ✕
        </button>

      </div>

      <table className="w-full border">

        <thead className="bg-gray-200">

          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Designation</th>
            <th className="border p-2">Contact</th>
          </tr>

        </thead>

        <tbody>

          {doctorAccounts.map((doctor, index) => (

            <tr key={index}>

              <td className="border p-2">
                {doctor.doctorBasicInfo?.name}
              </td>

              <td className="border p-2">
                {doctor.doctorDesignation?.designation}
              </td>

              <td className="border p-2">
                {doctor.doctorBasicInfo?.contact}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>
)}

{activePage === "payment" && (
 <HospitalPaymentSection />
)}

{activePage === "journal" && (

<div>

<h1 className="text-4xl font-bold mb-8">
Journal Entry
</h1>

<div className="mb-6">

<input
type="text"
placeholder="Search Doctor Name..."
value={doctorSearch}
onChange={(e)=>setDoctorSearch(e.target.value)}
className="
w-full
md:w-[400px]
border
rounded-xl
px-4
py-3
"
/>

</div>

<div className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-5
gap-6
mb-8
">

<input
type="date"
value={fromDate}
onChange={(e)=>setFromDate(e.target.value)}
className="border rounded-xl px-4 py-3"
/>

<input
type="date"
value={toDate}
onChange={(e)=>setToDate(e.target.value)}
className="border rounded-xl px-4 py-3"
/>

<button
onClick={handleGenerateData}
className="
bg-blue-600
text-white
px-6
py-3
rounded-xl
"
>
Generate Data
</button>

<button
onClick={printJournalReport}
className="
bg-green-600
text-white
px-6
py-3
rounded-xl
"
>
Print Report
</button>

</div>

<div className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-3
gap-6
mb-8
">

<div className="bg-white rounded-3xl shadow-lg p-6 border-l-[8px] border-blue-500">

<h3 className="text-gray-500 text-xl font-semibold">
Income
</h3>

<p className="text-4xl font-bold text-blue-500 mt-3">

₹{
filteredJournalEntries.reduce(
(sum,item)=>
sum + Number(item.totalAmount || 0),
0
)
}

</p>

</div>

<div className="bg-white rounded-3xl shadow-lg p-6 border-l-[8px] border-yellow-500">

<h3 className="text-gray-500 text-xl font-semibold">
Expense
</h3>

<p className="text-4xl font-bold text-yellow-500 mt-3">

₹{
filteredJournalEntries.reduce(
(sum,item)=>
sum + Number(item.medicineFee || 0),
0
)
}

</p>

</div>

<div className="bg-white rounded-3xl shadow-lg p-6 border-l-[8px] border-green-500">

<h3 className="text-gray-500 text-xl font-semibold">
Profit
</h3>

<p className="text-4xl font-bold text-green-500 mt-3">

₹{
filteredJournalEntries.reduce(
(sum,item)=>
sum +
(
Number(item.totalAmount || 0)
-
Number(item.medicineFee || 0)
),
0
)
}

</p>

</div>

</div>

<div className="hidden lg:block overflow-x-auto bg-white rounded-2xl shadow border">

<table className="w-full">

<thead className="bg-blue-600 text-white">

<tr>
<th className="p-4">Date</th>
<th className="p-4">Appointment No</th>
<th className="p-4">Patient Name</th>
<th className="p-4">Doctor Name</th>
<th className="p-4">Income</th>
<th className="p-4">Expense</th>
<th className="p-4">Action</th>
</tr>

</thead>

<tbody>

{filteredJournalEntries

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

<td className="p-4">{item.date}</td>

<td className="p-4">
{item.appointmentNo}
</td>

<td className="p-4">
{item.patientName}
</td>

<td className="p-4 font-bold">
{item.doctorName}
</td>

<td className="p-4 text-green-600 font-bold">
₹{item.totalAmount || 0}
</td>

<td className="p-4 text-red-600 font-bold">
₹{item.medicineFee || 0}
</td>

<td className="p-4">

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

{/* MOBILE + TAB CARD VIEW */}

<div className="block lg:hidden space-y-4">

{filteredJournalEntries.map((item,index)=>(

<div
key={index}
className="
bg-white
rounded-2xl
shadow
border
p-4
"
>

<div className="flex justify-between mb-3">
<span className="font-semibold text-gray-500">
Date
</span>

<span>
{item.date}
</span>
</div>

<div className="flex justify-between mb-3">
<span className="font-semibold text-gray-500">
Appointment No
</span>

<span>
{item.appointmentNo || "-"}
</span>
</div>

<div className="flex justify-between mb-3">
<span className="font-semibold text-gray-500">
Patient
</span>

<span>
{item.patientName}
</span>
</div>

<div className="flex justify-between mb-3">
<span className="font-semibold text-gray-500">
Doctor
</span>

<span className="font-bold">
{item.doctorName}
</span>
</div>

<div className="flex justify-between mb-3">
<span className="font-semibold text-green-600">
Income
</span>

<span className="font-bold text-green-600">
₹{item.totalAmount || 0}
</span>
</div>

<div className="flex justify-between mb-4">
<span className="font-semibold text-red-600">
Expense
</span>

<span className="font-bold text-red-600">
₹{item.medicineFee || 0}
</span>
</div>

<button
onClick={() => setSelectedJournal(item)}
className="
w-full
bg-blue-600
text-white
py-3
rounded-xl
font-semibold
"
>
Details
</button>

</div>

))}

</div>

</div>

)}


{activePage === "pharmacyJournal" && (

<div>

<h1 className="text-4xl font-bold mb-8">
Pharmacy Journal Entry
</h1>

<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-4
mb-8
">

<div className="bg-green-500 text-white rounded-3xl p-6">
<h3>Today's Sales</h3>
<p className="text-5xl font-bold mt-4">₹25000</p>
</div>

<div className="bg-orange-500 text-white rounded-3xl p-6">
<h3>Purchase Cost</h3>
<p className="text-5xl font-bold mt-4">₹13000</p>
</div>

<div className="bg-purple-500 text-white rounded-3xl p-6">
<h3>Profit</h3>
<p className="text-5xl font-bold mt-4">₹12000</p>
</div>

<div className="bg-blue-500 text-white rounded-3xl p-6">
<h3>Medicines Sold</h3>
<p className="text-5xl font-bold mt-4">120</p>
</div>

<div className="bg-red-500 text-white rounded-3xl p-6">
<h3>Low Stock</h3>
<p className="text-5xl font-bold mt-4">8</p>
</div>

</div>



<div className="hidden lg:block bg-white rounded-3xl shadow border p-6">

<h2 className="text-2xl font-bold mb-4">
Medicine Sales
</h2>

<div className="overflow-x-auto">

<table className="w-full">

<thead className="bg-blue-600 text-white">

<tr>
<th className="p-3">Date</th>
<th className="p-3">Bill No</th>
<th className="p-3">Patient</th>
<th className="p-3">Medicine</th>
<th className="p-3">Qty</th>
<th className="p-3">Amount</th>
</tr>

</thead>

<tbody>

<tr className="border-b">

<td className="p-3">
2026-06-12
</td>

<td className="p-3">
B001
</td>

<td className="p-3">
Sithu
</td>

<td className="p-3">
Paracetamol
</td>

<td className="p-3">
5
</td>

<td className="p-3">
₹250
</td>

</tr>

</tbody>

</table>

</div>

<div className="block lg:hidden space-y-4">

  <div className="
  bg-white
  rounded-2xl
  shadow
  border
  p-4
  ">

    <p><b>Date :</b> 2026-06-12</p>
    <p><b>Bill No :</b> B001</p>
    <p><b>Patient :</b> Sithu</p>
    <p><b>Medicine :</b> Paracetamol</p>
    <p><b>Qty :</b> 5</p>
    <p><b>Amount :</b> ₹250</p>

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


{showDoctorPopup && viewData && (

<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

  <div className="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">

    <div className="flex justify-between items-center mb-6">

      <h2 className="text-2xl font-bold">
        Doctor Details
      </h2>

      <button
        onClick={() => setShowDoctorPopup(false)}
        className="text-red-500 text-2xl"
      >
        ✕
      </button>

    </div>

    <div className="space-y-4">

      <p>
        <b>Name :</b>{" "}
        {viewData?.doctorBasicInfo?.name}
      </p>

      <p>
        <b>Designation :</b>{" "}
        {viewData?.doctorDesignation?.designation}
      </p>

      <p>
        <b>Email :</b>{" "}
        {viewData?.doctorBasicInfo?.email}
      </p>

      <p>
        <b>Contact :</b>{" "}
        {viewData?.doctorBasicInfo?.contact}
      </p>

      <p>
        <b>Address :</b>{" "}
        {viewData?.doctorBasicInfo?.address}
      </p>

      <p>
        <b>Doctor ID :</b>{" "}
        {viewData?.doctorOfficial?.doctorId}
      </p>

    </div>

  </div>

</div>

)}

{activePage === "account" && subMenu === "admins" && (

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

{showDoctorPopup && (
<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

<div className="bg-white rounded-3xl p-8 w-[500px]">

<h2 className="text-3xl font-bold text-center mb-3">
Doctor Created
</h2>

<p className="text-center text-gray-500 mb-6">
Do you want to create another doctor?
</p>

<div className="flex gap-3">

<button
className="flex-1 bg-blue-600 text-white py-3 rounded-xl"
onClick={() => {

  setShowDoctorPopup(false)
  
  setDoctorStep(1)
  
  setActivePage("account")
  
  setSubMenu("doctors")
  
  }}
>
Create Another Doctor
</button>

<button
className="flex-1 border py-3 rounded-xl"
onClick={() => {

  setShowDoctorPopup(false)
  
  setShowSetupPopup(true)
  
  setSetupStep(7)
  
  }}
>
Continue
</button>

<button
className="flex-1 border py-3 rounded-xl"
onClick={() => {

  setShowDoctorPopup(false)

  setShowSetupPopup(true)

  setSetupStep(7)

}}
>
Skip
</button>

</div>

</div>

</div>
)}



{activePage === "account" && subMenu === "doctors" && (

    <div className="flex flex-col md:flex-row w-full max-w-7xl border rounded-lg overflow-hidden mx-auto
                      min-h-[auto] md:h-[450px]">


    <div className=" w-full md:w-1/4  p-4 flex md:block gap-2 overflow-x-auto md:space-y-3">

    <h2 className="hidden md:block text-xl font-bold mb-4">
  Create Doctor Account
</h2>

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

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">


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


<FloatingInput
label="Address"
className="col-span-1 sm:col-span-2" inputClassName="h-[120px] pt-6"
                      value={doctorBasicInfo.address || ""} disabled={isViewMode}
                      onChange={(e) =>
                        setDoctorBasicInfo({ ...doctorBasicInfo, address: e.target.value })
                      }
                    />


<div className="col-span-1 sm:col-span-2 flex flex-col gap-4">

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


                    <FloatingInput
label="Email"
className="col-span-1 sm:col-span-2" value={doctorBasicInfo.email} disabled={isViewMode}
                      onChange={(e) =>
                        setDoctorBasicInfo({ ...doctorBasicInfo, email: e.target.value })
                      }
                    />


<FloatingInput
label="Occupation"
className="col-span-1 sm:col-span-2" value={doctorBasicInfo.occupation || ""} disabled={isViewMode}
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

{activePage === "account" &&
 subMenu === "doctors" && (

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


{activePage === "account" && subMenu === "staff" && (

<div className="
flex flex-col md:flex-row
w-full max-w-7xl
border rounded-lg overflow-hidden
h-auto md:h-[450px]
">

<div className="
w-full md:w-1/4
p-4
flex md:block
gap-2
overflow-x-auto
md:space-y-3
">

<h2 className="hidden md:block text-xl font-bold mb-4">
  Create Staff Account
</h2>

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

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">


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


                    <FloatingInput label="Address" required className="col-span-1 sm:col-span-2" inputClassName="h-[120px] pt-6"
                      value={staffBasicInfo.address || ""} disabled={isViewMode}
                      onChange={(e) =>
                        setStaffBasicInfo({ ...staffBasicInfo, address: e.target.value })
                      }
                    />


<div className="col-span-1 sm:col-span-2 flex flex-col gap-4">

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


                    <FloatingInput
label="Email"
className="col-span-1 sm:col-span-2" value={staffBasicInfo.email} disabled={isViewMode}
                      onChange={(e) =>
                        setStaffBasicInfo({ ...staffBasicInfo, email: e.target.value })
                      }
                    />


<FloatingInput
label="Occupation"
className="col-span-1 sm:col-span-2" value={staffBasicInfo.occupation || ""} disabled={isViewMode}
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

{activePage === "account" && subMenu === "patients" && (

<div className="
flex flex-col md:flex-row
w-full max-w-7xl
border rounded-lg overflow-hidden
h-auto md:h-[500px]
">

<div className="
w-full md:w-1/4
p-4
flex md:block
gap-2
overflow-x-auto
md:space-y-3
">

              <h2 className="hidden md:block text-xl font-bold mb-3">
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




            <div className="
w-full md:w-3/4
p-3 md:p-6
relative
overflow-y-auto
min-h-[650px]
bg-white
">

              {step === 1 && (

                <div>

                  <h3 className="text-lg font-bold mb-6">
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">


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


                    <FloatingInput label="Address" required className="col-span-1 sm:col-span-2"inputClassName="h-[120px] pt-6" value={basicInfo.address}
                      disabled={isViewMode} onChange={(e) => setBasicInfo({ ...basicInfo, address: e.target.value })}
                    />

<div className="col-span-1 sm:col-span-2 flex flex-col gap-4">

                      <FloatingInput label="Contact Number" required value={basicInfo.contact}
                        disabled={isViewMode} onChange={(e) => setBasicInfo({ ...basicInfo, contact: e.target.value })}
                      />

                      <FloatingInput label="EMR Contact" value={basicInfo.emrContact} disabled={isViewMode}
                        onChange={(e) => setBasicInfo({ ...basicInfo, emrContact: e.target.value })}
                      />

                    </div>


                    <FloatingInput
label="Email"
className="col-span-1 sm:col-span-2" value={basicInfo.email} disabled={isViewMode}
                      onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
                    />

<FloatingInput
label="Occupation"
className="col-span-1 sm:col-span-2" value={basicInfo.occupation}
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


{activePage === "account" && subMenu === "pharmasi" && (

<div className="w-full max-w-7xl border rounded-xl overflow-hidden
flex flex-col md:flex-row
min-h-[760px] md:min-h-[620px]">

<div className="
w-full md:w-1/4
p-4
flex md:block
gap-2
overflow-x-auto
md:overflow-visible
md:space-y-4
scrollbar-hide
">

<h2 className="hidden md:block text-2xl font-bold">
Create Pharmasi Account
</h2>

<button onClick={()=>{setIsViewMode(false);
  setPharmasiStep(1);
  }}
  className={`min-w-[140px] md:w-full p-3 rounded-xl text-white text-sm md:text-base ${
pharmasiStep===1?"bg-blue-500":"bg-gray-400"
}`}>
Basic Info
</button>

<button onClick={()=>{ setIsViewMode(false);
  setPharmasiStep(2);
  }}
  className={`min-w-[140px] md:w-full p-3 rounded-xl text-white text-sm md:text-base ${
pharmasiStep===2?"bg-blue-500":"bg-gray-400"
}`}>
Designation
</button>

<button onClick={()=>{ setIsViewMode(false);
  setPharmasiStep(3);
  }}
  className={`min-w-[140px] md:w-full p-3 rounded-xl text-white text-sm md:text-base ${
pharmasiStep===3?"bg-blue-500":"bg-gray-400"
}`}>
Official Info
</button>

<button onClick={()=>{ setIsViewMode(false);
  setPharmasiStep(4);
  }}
  className={`min-w-[140px] md:w-full p-3 rounded-xl text-white text-sm md:text-base ${
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

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

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
    onChange={(e)=>
      setPharmasiBasicInfo({
        ...pharmasiBasicInfo,
        gender:e.target.value
      })
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

<FloatingInput label="DOB" type="date" value={pharmasiBasicInfo.dob}
onChange={(e)=>
setPharmasiBasicInfo({
...pharmasiBasicInfo,
dob:e.target.value
})
}
/>

<FloatingInput label="Address" className="col-span-1 sm:col-span-2" inputClassName="h-[120px] pt-6" value={pharmasiBasicInfo.address}
onChange={(e)=>
setPharmasiBasicInfo({
...pharmasiBasicInfo,
address:e.target.value
})
}
/>

<div className="col-span-1 sm:col-span-2 flex flex-col gap-4">
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
className="col-span-1 sm:col-span-2"
/>

<FloatingInput label="Occupation" type="number" value={pharmasiBasicInfo.occupation}
onChange={(e)=>
setPharmasiBasicInfo({
  ...pharmasiBasicInfo,
  occupation:e.target.value
})}
className="col-span-1 sm:col-span-2"
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
<div
  className="
    sticky
    bottom-20
    left-0
    w-full
    flex
    justify-center
    md:justify-end
    gap-3
    px-4
    py-3
    bg-white
  "
>

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


{activePage === "appointments" && (
  <div className="grid grid-cols-2 gap-3 md:gap-4 justify-items-center">
    {appointments
.filter((item) => {
    const today = new Date().toISOString().split("T")[0]
    return item.date === today
  })
      .map((item, i) => (
        <div key={i}
          className="border p-3 rounded-xl max-w-[260px]"
        >
          <p><b>Patient:</b> {item.patientName}</p>
          <p><b>Doctor:</b> {item.doctorName}</p>
          <p><b>Date:</b> {item.date}</p>
          <p><b>Time:</b> {item.time}</p>
        </div>
      ))}
  </div>
)}


{activePage === "account" && subMenu === "" && (

<div className="w-full flex justify-center items-center py-10">

<div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:hidden">
    <div
      onClick={() => setSubMenu("admins")}
      className="bg-blue-500 text-white rounded-2xl p-6 text-center cursor-pointer shadow"
    >
      <p className="text-xl font-bold">
        Admins
      </p>
    </div>

    <div
      onClick={() => setSubMenu("doctors")}
      className="bg-green-500 text-white rounded-2xl p-6 text-center cursor-pointer shadow"
    >
      <p className="text-xl font-bold">
        Doctors
      </p>
    </div>

    <div
      onClick={() => setSubMenu("staff")}
      className="bg-purple-500 text-white rounded-2xl p-6 text-center cursor-pointer shadow"
    >
      <p className="text-xl font-bold">
        Staff
      </p>
    </div>

    <div
      onClick={() => setSubMenu("patients")}
      className="bg-orange-500 text-white rounded-2xl p-6 text-center cursor-pointer shadow"
    >
      <p className="text-xl font-bold">
        Patients
      </p>
    </div>

    <div
      onClick={() => setSubMenu("pharmasi")}
      className="bg-pink-500 text-white rounded-2xl p-6 text-center cursor-pointer shadow col-span-2"
    >
      <p className="text-xl font-bold">
        Pharmasi
      </p>
    </div>

  </div>

</div>

)}

            </div>

            {/* ================= POPUP ================= */}
            {selected && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">

                    <div className="bg-white w-[95%] md:w-[900px] rounded-lg flex flex-col md:flex-row overflow-hidden max-h-[90vh]">

                        {/* LEFT PANEL */}
                        <div className="w-full md:w-1/4 bg-gray-100 p-4 flex flex-col gap-2">
                            <h2 className="font-bold text-lg">Appointment Panel</h2>

                            <button onClick={() => setStep(1)}
                                className={`p-2 rounded text-white ${step === 1 ? "bg-blue-500" : "bg-gray-400"}`}>
                                Details
                            </button>

                            <button onClick={() => {
                                setStep(2)
                                if (!checkInTime) setCheckInTime(Date.now())
                            }}
                                className={`p-2 rounded text-white ${step === 2 ? "bg-blue-500" : "bg-gray-400"}`}>
                                Check-In
                            </button>

                            <button onClick={() => setStep(3)}
                                className={`p-2 rounded text-white ${step === 3 ? "bg-blue-500" : "bg-gray-400"}`}>
                                Payment
                            </button>
                        </div>

                        {/* RIGHT CONTENT */}
                        <div className="w-full md:w-3/4 p-6 relative">

                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-2 right-3 text-xl"
                            >
                                ✖
                            </button>

                            {/* STEP 1 */}
                            {step === 1 && (
                                <>
                                    <div className="flex justify-center mb-4">
                                        <img
                                            src={selected?.doctorImage}
                                            alt="doctor"
                                            className="w-20 h-20 rounded-full border"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <input value={selected.patientName} disabled className="border p-2 rounded" />
                                        <input value={selected.doctorName} disabled className="border p-2 rounded" />
                                        <input value={selected.date} disabled className="border p-2 rounded" />
                                        <input value={selected.time} disabled className="border p-2 rounded" />
                                    </div>
                                </>
                            )}

                            {/* STEP 2 */}
                            {step === 2 && (
                                <div className="text-center">
                                    {!checkedOut ? (
                                        <>
                                            <p className="text-xl mb-4">⏱ {duration}s</p>
                                            <button
                                                onClick={() => setCheckedOut(true)}
                                                className="bg-red-500 text-white px-6 py-2 rounded"
                                            >
                                                Check-Out
                                            </button>
                                        </>
                                    ) : (
                                        <p className="text-green-600 font-bold">
                                            Completed ✅ ({duration}s)
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* STEP 3 */}
                            {step === 3 && (
                                <div>
                                    <p className="mb-2">Total: ₹600</p>
                                    <button className="bg-blue-600 text-white px-6 py-2 rounded">
                                        Pay
                                    </button>
                                </div>
                            )}

                        </div>

                    </div>

                </div>
            )}

{/* MOBILE + TAB BOTTOM NAV */}

<div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50">

<div className="flex items-center justify-around px-3 py-3 gap-2">

    {/* HOME */}
    <button
      onClick={() => {
        setActivePage("home")
        setSubMenu("")
      }}
      className="flex flex-col items-center justify-center flex-1 text-gray-700"
    >
      <span className="text-lg">🏠</span>

      <span className="text-[11px] sm:text-xs">
        Home
      </span>
    </button>

    <button
onClick={()=>{
setActivePage("journal")
}}
className="flex flex-col items-center"
>
📒
<span className="text-xs">
Journal
</span>
</button>

<button
  onClick={() => {
    setActivePage("pharmacyJournal")
    setSubMenu("")
  }}
  className="flex flex-col items-center"
>
  💊
  <p className="text-xs">
    Pharmacy
  </p>
</button>


    {/* UPGRADE */}
    <button
      onClick={() => {
        setActivePage("payment")
        setSubMenu("")
      }}
      className="flex flex-col items-center justify-center flex-1 text-gray-700"
    >
      <span className="text-lg">💎</span>

      <span className="text-[11px] sm:text-xs">
        Upgrade
      </span>
    </button>

    {/* APPOINTMENTS */}
    <button
      onClick={() => {
        setActivePage("appointments")
        setSubMenu("")
      }}
      className="flex flex-col items-center justify-center flex-1 text-gray-700"
    >
      <span className="text-lg">📅</span>

      <span className="text-[11px] sm:text-xs">
        Appointments
      </span>
    </button>

    {/* ACCOUNT */}
    <button
  onClick={() => {
    setActivePage("account")
    setSubMenu("")
  }}
  className="flex flex-col items-center justify-center flex-1 text-gray-700"
>
      <span className="text-lg">👤</span>

      <span className="text-[11px] sm:text-xs">
        Account
      </span>
    </button>

  </div>

</div>
{showUpgradePopup && (

<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">

  <div className="bg-white p-8 rounded-3xl w-[90%] max-w-sm text-center">

    <h1 className="text-3xl font-bold text-red-500 mb-4">
      Upgrade Now
    </h1>

    <p className="text-gray-600 mb-6">
      You already created this account once.
      Upgrade your plan to create more.
    </p>

    <button
      onClick={() => {
        setShowUpgradePopup(false)
        setActivePage("payment")
      }}
      className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-3 rounded-xl w-full"
    >
      Upgrade Now
    </button>

  </div>

</div>

)}

{showSetupPopup && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

    <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">

      {/* STEP 1 */}
      {setupStep === 1 && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Owner Name
          </h2>

          <input
            type="text"
            placeholder="Enter Owner Name"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="input-style"
          />

<div className="flex gap-2 mt-4">

<button
  className="btn-style flex-1"
  onClick={() => setSetupStep(2)}
>
  Next
</button>

<button
  className="border rounded-xl px-4 py-3 flex-1"
  onClick={() => setSetupStep(2)}
>
  Skip
</button>

</div>
        </>
      )}

      {/* STEP 2 */}
      {setupStep === 2 && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Hospital Name
          </h2>

          <input
  type="text"
  placeholder="Enter Hospital Name"
  value={hospitalName}
  onChange={(e) => setHospitalName(e.target.value)}
  className="input-style"
/>

          <div className="flex gap-2 mt-4">

            <button
              className="border rounded-xl px-4 py-3 flex-1"
              onClick={() => setSetupStep(1)}
            >
              Back
            </button>

            <button
              className="btn-style flex-1"
              onClick={() => setSetupStep(3)}
            >
              Next
            </button>
            <button
  className="border rounded-xl px-4 py-3 flex-1"
  onClick={() => setSetupStep(3)}
>
  Skip
</button>

          </div>
        </>
      )}

      {/* STEP 3 */}
      {setupStep === 3 && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Hospital Address
          </h2>

          <textarea
            rows={4}
            placeholder="Enter Hospital Address"
            value={hospitalAddress}
            onChange={(e) => setHospitalAddress(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          <div className="flex gap-2 mt-4">

            <button
              className="border rounded-xl px-4 py-3 flex-1"
              onClick={() => setSetupStep(2)}
            >
              Back
            </button>

            <button
              className="btn-style flex-1"
              onClick={() => setSetupStep(4)}
            >
              Next
            </button>

            <button
  className="border rounded-xl px-4 py-3 flex-1"
  onClick={() => setSetupStep(4)}
>
  Skip
</button>

          </div>
        </>
      )}

     {/* STEP 4 */}
{setupStep === 4 && (
  <>
    <h2 className="text-2xl font-bold mb-4 text-center">
      Number Of Doctors
    </h2>

    <input
      type="number"
      placeholder="Enter Number Of Doctors"
      value={doctorCount}
      onChange={(e) => setDoctorCount(e.target.value)}
      className="input-style"
    />

    <div className="flex gap-2 mt-4">

      <button
        className="border rounded-xl px-4 py-3 flex-1"
        onClick={() => setSetupStep(3)}
      >
        Back
      </button>

      <button
        className="btn-style flex-1"
        onClick={() => setSetupStep(5)}
      >
        Next
      </button>

      <button
  className="border rounded-xl px-4 py-3 flex-1"
  onClick={() => setSetupStep(5)}
>
  Skip
</button>

    </div>
  </>
)}

     {/* STEP 5 */}
{setupStep === 5 && (
  <>
    <h2 className="text-2xl font-bold mb-2 text-center">
      Create Doctors?
    </h2>

    <p className="text-center text-gray-500 mb-6">
      Do you want to create doctors now?
    </p>

    <div className="flex flex-col gap-3">

      <button
        className="btn-style"
        onClick={() => setSetupStep(6)}
      >
        Create Doctor
      </button>

      <button
        className="border border-gray-300 rounded-xl py-3"
        onClick={() => setSetupStep(7)}
      >
        Skip
      </button>

    </div>
  </>
)}

{/* STEP 6 */}
{setupStep === 6 && (
  <>
    <h2 className="text-2xl font-bold mb-4 text-center">
      Create Doctors
    </h2>

    <p className="text-center text-gray-500 mb-6">
      Click below to open Doctor Account Creation Form
    </p>

    <button
      className="btn-style"
      onClick={() => {

        

        setActivePage("account")

        setSubMenu("doctors")

      }}
    >
      Open Doctor Form
    </button>
  </>
)}

{/* STEP 7 */}
{setupStep === 7 && (
  <>
    <div className="text-center">

      <div className="text-6xl mb-4">
        🎉
      </div>

      <h2 className="text-3xl font-bold mb-3">
        Setup Completed
      </h2>

      <p className="text-gray-500 mb-6">
        Your hospital setup has been completed successfully.
      </p>

      <div className="bg-blue-50 rounded-2xl p-4 mb-6 text-left">

        <p>
          <b>Owner :</b> {ownerName}
        </p>

        <p>
          <b>Hospital :</b> {hospitalName}
        </p>

        <p>
          <b>Doctors :</b> {doctorCount}
        </p>

      </div>

      <button
        className="
        w-full
        py-4
        rounded-2xl
        text-white
        font-bold
        text-lg
        bg-blue-600
        hover:bg-blue-700
        transition
        "
        onClick={() => {

          localStorage.setItem(
            "hospitalSetup",
            JSON.stringify({
              ownerName,
              hospitalName,
              hospitalAddress,
              doctorCount
            })
          )
        
          localStorage.removeItem("showMasterSetupPopup")
        
          setShowSetupPopup(false)
        
          setActivePage("home")
        
          setSubMenu("")
        
        }}
      >
        🚀 Get Started
      </button>

    </div>
  </>
)}

    </div>

  </div>
)}
        </div>
    )
}



export default MasterAppointmentsDashboard;
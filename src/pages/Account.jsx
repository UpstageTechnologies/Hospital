import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth, db } from "../firebase"
import { doc, setDoc, getDoc, deleteDoc, updateDoc } from "firebase/firestore"
import {
  collection,
  getDocs,
  onSnapshot
} from "firebase/firestore"
import { useNavigate } from "react-router-dom";
import FloatingInput from "../components/FloatingInput"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useLocation } from "react-router-dom";
import Calendar from "../components/Calendar";
import PatientProfileView from "../components/PatientProfileView";



const Account = () => {

  const [menu, setMenu] = useState("appointments")
  const [type,setType] = useState("");
  const [medicine,setMedicine] = useState("");
  const [inventoryItems,setInventoryItems]=useState([]);
  const [patientsData,setPatientsData] = useState([]);

  useEffect(()=>{

    const storedPatients =
    JSON.parse(
    localStorage.getItem("patientsData")
    ) || [];
    
    setPatientsData(storedPatients);
    
    },[]);

const [qty,setQty] = useState("");
const [purchase,setPurchase] = useState("");
const [sales,setSales] = useState("");

const [activeDescribeCategory,setActiveDescribeCategory] =
useState("All");

const categoryMap={
 Tablet:["Paracetamol","Dolo"],
 Injection:["Insulin"],
 Capsule:["Omeprazole"],
 Syrup:["Cough Syrup"],
 Drops:["Eye Drops"],
 Ointment:["Burn Cream"],
 Inhaler:["Salbutamol"]
};



  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
  
    if (tab === "settings") {
      setMenu("settings");
    }
  }, [location]);


  const hospital = location.state?.hospital || "";
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [doctorStep, setDoctorStep] = useState(1)
  const [doctorImage, setDoctorImage] = useState("")
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
    qualification: ""
  })

  const [doctorOfficial, setDoctorOfficial] = useState({
    doctorId: "",
    joiningDate: "",
    relievingDate: ""
  })

  const [doctorAccount, setDoctorAccount] = useState({
    doctorId: "",
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [staffId, setStaffId] = useState("")

  const [staffStep, setStaffStep] = useState(1)


  const [staffBasicInfo, setStaffBasicInfo] = useState({
    name: "",
    age: "",
    gender: "",
    dob: "",
    address: "",
    contact: "",
    email: "",
    occupation: ""
  })

  const [staffDesignation, setStaffDesignation] = useState({
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

  const [staffAccounts, setStaffAccounts] = useState([])
  const [address, setAddress] = useState("")
  const [experience, setExperience] = useState("")
  const [accounts, setAccounts] = useState([])
  const [doctorAccounts, setDoctorAccounts] = useState([])
  const [adminsAccounts, setAdminsAccounts] = useState([])
  const [pharmasiAccounts,setPharmasiAccounts]=useState([]);
  const [showAccountPopup, setShowAccountPopup] = useState(false)
  const [adminStep, setAdminStep] = useState(1)

  const [pharmasiStep,setPharmasiStep] = useState(1);

const [pharmasiBasicInfo,setPharmasiBasicInfo] = useState({
name:"",
age:"",
gender:"",
dob:"",
address:"",
contact:"",
emrContact:"",
email:"",
occupation:""
});

const [pharmasiDesignation,setPharmasiDesignation] = useState({
designation:""
});

const [pharmasiOfficial,setPharmasiOfficial] = useState({
pharmasiId:"",
joiningDate:"",
relievingDate:""
});

const [pharmasiAccount,setPharmasiAccount] = useState({
pharmasiId:"",
password:"",
confirmPassword:""
});

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
  const [patientAccounts, setPatientAccounts] = useState([])

  const today = new Date().toISOString().split("T")[0];

  const currentAppointments =
  patientAccounts.filter((p) => {
  
    if (!p.date || !p.time)
      return false;
  
    const now = new Date();
  
    const endTime =
      p.time.split("-")[1]?.trim();
  
    if (!endTime) return false;
  
    const match =
      endTime.match(
        /(\d+):(\d+)(am|pm)/i
      );
  
    if (!match) return false;
  
    let hours =
      parseInt(match[1]);
  
    const minutes =
      parseInt(match[2]);
  
    const modifier =
      match[3].toLowerCase();
  
    if (
      modifier === "pm" &&
      hours !== 12
    ) {
      hours += 12;
    }
  
    if (
      modifier === "am" &&
      hours === 12
    ) {
      hours = 0;
    }
  
    const appointmentEnd =
      new Date(p.date);
  
    appointmentEnd.setHours(
      hours,
      minutes,
      0,
      0
    );
  
    return appointmentEnd >= now;
  
  });
  
  
  
  const historyAppointments =
  patientAccounts.filter((p) => {
  
    if (!p.date || !p.time)
      return false;
  
    const now = new Date();
  
    const endTime =
      p.time.split("-")[1]?.trim();
  
    if (!endTime) return false;
  
    const match =
      endTime.match(
        /(\d+):(\d+)(am|pm)/i
      );
  
    if (!match) return false;
  
    let hours =
      parseInt(match[1]);
  
    const minutes =
      parseInt(match[2]);
  
    const modifier =
      match[3].toLowerCase();
  
    if (
      modifier === "pm" &&
      hours !== 12
    ) {
      hours += 12;
    }
  
    if (
      modifier === "am" &&
      hours === 12
    ) {
      hours = 0;
    }
  
    const appointmentEnd =
      new Date(p.date);
  
    appointmentEnd.setHours(
      hours,
      minutes,
      0,
      0
    );
  
    return appointmentEnd < now;
  
  });  


  const [callData, setCallData] = useState(null)
  const navigate = useNavigate();
  const [viewData, setViewData] = useState(null)
  const [editData, setEditData] = useState(null)
  const [editCollection, setEditCollection] = useState("")
  const [step, setStep] = useState(1)
  const [editIndex, setEditIndex] = useState(null)
  const [isViewMode, setIsViewMode] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const [basicInfo, setBasicInfo] = useState({
    name: "",
    age: "",
    gender: "",
    dob: "",
    address: "",
    contact: "",
    emrContact: "",
    email: "",
    occupation: "",

  })

  const [accountInfo, setAccountInfo] = useState({
    username: "",
    password: "",
    confirmPassword: ""
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


  const handlePrint = () => {
    const printContent = document.getElementById("print-section")?.innerHTML;
  
    const win = window.open("", "", "width=900,height=700");
  
    win.document.write(`
      <html>
        <head>
          <title>Patient Report</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h2 { text-align: center; }
            .box { margin-bottom: 10px; font-size: 16px; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
  
    win.document.close();
    win.print();
  };




  const doctorList = [
    {
      id: 1,
      name: "Dr. Richard James",
      speciality: "General physician",
      image: "/Doctors/doc1.png"
    },
    {
      id: 2,
      name: "Dr. Emily Larson",
      speciality: "Gynecologist",
      image: "/Doctors/doc2.png"
    },
    {
      id: 3,
      name: "Dr. Sarah Patel",
      speciality: "Dermatologist",
      image: "/Doctors/doc3.png"
    },
    {
      id: 4,
      name: "Dr. Christopher Lee",
      speciality: "Pediatricians",
      image: "/Doctors/doc4.png"
    },
    {
      id: 5,
      name: "Dr. Jennifer Garcia",
      speciality: "Neurologist",
      image: "/Doctors/doc5.png"
    },
    {
      id: 6,
      name: "Dr. Andrew Williams",
      speciality: "Neurologist",
      image: "/Doctors/doc6.png"
    },
    {
      id: 7,
      name: "Dr. Christopher Davis",
      speciality: "General physician",
      image: "/Doctors/doc7.png"
    },
    {
      id: 8,
      name: "Dr. Timothy White",
      speciality: "Gynecologist",
      image: "/Doctors/doc8.png"
    },
    {
      id: 9,
      name: "Dr. Ava Mitchell",
      speciality: "Dermatologist",
      image: "/Doctors/doc9.png"
    },
    {
      id: 10,
      name: "Dr. Jeffrey King",
      speciality: "Pediatricians",
      image: "/Doctors/doc10.png",
    },
    {
      id: 11,
      name: "Dr. Zoe Kelly",
      speciality: "Gastroenterologist",
      image: "/Doctors/doc11.png",

    },
    {
      id: 12,
      name: "Dr. Patrick Harris",
      speciality: "Neurologist",
      image: "/Doctors/doc12.png",
    },
    {
      id: 13,
      name: "Dr. Chloe Evans",
      speciality: "General physician",
      image: "/Doctors/doc13.png",
    },
    {
      id: 14,
      name: "Dr. Ryan Martinez",
      speciality: "Gynecologist",
      image: "/Doctors/doc14.png",
    },
    {
      id: 15,
      name: "Dr. Amelia Hill",
      speciality: " Dermatologist",
      image: "/Doctors/doc15.png",
    }

  ]


  const fetchStaffs = async () => {
    const querySnapshot = await getDocs(collection(db, "staffs"))

    const list = []

    querySnapshot.forEach((doc) => {
      list.push({
        id: doc.id,
        ...doc.data()
      })
    })

    setStaffAccounts(list)
  }


  const fetchDoctors = async () => {

    try {

      const querySnapshot = await getDocs(collection(db, "doctors"))

      const doctorList = []

      querySnapshot.forEach((doc) => {
        doctorList.push({
          id: doc.id,
          ...doc.data()
        })
      })

      setDoctorAccounts(doctorList)

    }
    catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {

    fetchStaffs()
    fetchDoctors()
    fetchAdmins()
    fetchPharmasi()
  
    const unsub = onSnapshot(
      collection(db, "appointments"),
      (snapshot) => {
  
        const patientList = []
  
        snapshot.forEach((doc) => {
  
          patientList.push({
            id: doc.id,
            ...doc.data()
          })
  
        })
  
        setPatientAccounts(patientList)
  
      }
    )
  
    return () => unsub()
  
  }, [])


  useEffect(() => {

    const handleBackButton = (event) => {
  
      event.preventDefault();
  
      // ✅ if not home → go home
      if (menu !== "home") {
  
        setMenu("home");
  
        window.history.pushState(
          null,
          "",
          window.location.href
        );
  
      }
  
      // ✅ if already home → logout popup
      else {
  
        const confirmLogout =
          window.confirm(
            "Are you sure you want to logout?"
          );
  
        if (confirmLogout) {
  
          localStorage.clear();
  
          navigate("/select-hospital");
  
        }
  
        else {
  
          window.history.pushState(
            null,
            "",
            window.location.href
          );
  
        }
  
      }
  
    };
  
    window.history.pushState(
      null,
      "",
      window.location.href
    );
  
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
  
  }, [menu]);



  const fetchAdmins = async () => {

    try {

      const querySnapshot = await getDocs(collection(db, "admins"))

      const adminsList = []

      querySnapshot.forEach((doc) => {
        adminsList.push({
          id: doc.id,
          ...doc.data()
        })
      })

      setAdminsAccounts(adminsList)

    } catch (error) {
      console.log(error)
    }

  }

  const fetchPharmasi = async () => {

    try{
    
    const querySnapshot =
    await getDocs(
    collection(db,"pharmasi")
    );
    
    const pharmasiList=[];
    
    querySnapshot.forEach((doc)=>{
    pharmasiList.push({
    id:doc.id,
    ...doc.data()
    });
    });
    
    setPharmasiAccounts(
    pharmasiList
    );
    
    }
    catch(error){
    console.log(error)
    }
    
    }

    const fetchPatients = async () => {

      try {
    
        const querySnapshot =
          await getDocs(
            collection(db, "appointments")
          )
    
        const patientList = []
    
        querySnapshot.forEach((doc) => {
    
          patientList.push({
            id: doc.id,
            ...doc.data()
          })
    
        })
    
        setPatientAccounts(patientList)
    
      } catch (error) {
    
        console.log(error)
    
      }
    
    }


  const createAccount = async (role) => {

    if (role === "staffs" && staffId.trim() === "") {
      alert("Please enter Staff ID")
      return
    }

    if (role === "admins") {

      const adminsRef = doc(db, "admins", email)
      const adminsSnap = await getDoc(adminsRef)

      if (adminsSnap.exists()) {
        alert("admins already exists")
        return
      }

      await setDoc(adminsRef, {
        name: name,
        email: email,
        password: password,
        role: "admins"
      })

      alert("Admins account created")

      await fetchAdmins()

    }

    try {

      if (role === "doctors") {

        const doctorRef = doc(db, "doctors", email)
        const doctorSnap = await getDoc(doctorRef)

        if (doctorSnap.exists()) {
          alert("Doctor already exists")
          return
        }

        await setDoc(doctorRef, {
          name: name,
          email: email,
          password: password,
          role: "doctor"
        })

        alert("Doctor account created")

        await fetchDoctors()

      }

      if (role === "patients") {

        const patientRef = doc(db, "patients", email)
        const patientSnap = await getDoc(patientRef)

        if (patientSnap.exists()) {
          alert("Patient already exists")
          return
        }

        await setDoc(patientRef, {
          name: name,
          email: email,
          password: password,
          role: "patient"
        })

        alert("Patient account created")

        await fetchPatients()

      }

      if (role === "staffs") {

        if (staffId.trim() === "") {
          alert("Enter Staff ID")
          return
        }

        const staffRef = doc(db, "staffs", staffId)
        const staffSnap = await getDoc(staffRef)

        if (staffSnap.exists()) {
          alert("Staff ID already exists")
          return
        }

        await setDoc(staffRef, {
          name: name,
          staffId: staffId,
          password: password,
          address: address,
          experience: experience,
          role: "staff"
        })

        alert("Staff account created")

        await fetchStaffs()

        setAccounts(prev => [
          ...prev,
          {
            name: name,
            email: email,
            password: password,
            staffId: staffId,
            address: address,
            experience: experience
          }
        ])

      }

      setName("")
      setEmail("")
      setPassword("")
      setStaffId("")
      setAddress("")
      setExperience("")


    } catch (error) {
      console.log(error)
      alert(error.message)
    }

  }

  const handleView = (data) => {
    setViewData(data)
  }

  const handleEdit = (data, collectionName) => {
    setEditData(data)
    setEditCollection(collectionName)
    setName(data.name || "")
    setEmail(data.email || "")
    setStaffId(data.staffId || "")
    setAddress(data.address || "")
    setExperience(data.experience || "")
  }

  const handleDelete = async (collectionName, id) => {
    try {

      await deleteDoc(doc(db, collectionName, id))

      alert("Deleted successfully")

      fetchAdmins()
      fetchDoctors()
      fetchStaffs()
      fetchPatients()

    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async () => {

    try {

      let id = email

      if (editCollection === "staffs") {
        id = staffId
      }

      const ref = doc(db, editCollection, id)

      if (editCollection === "staffs") {
        await updateDoc(ref, {
          name: name,
          staffId: staffId,
          address: address,
          experience: experience
        })
      }
      else {
        await updateDoc(ref, {
          name: name,
          email: email
        })
      }

      alert("Updated successfully")

      setEditData(null)

      fetchAdmins()
      fetchDoctors()
      fetchStaffs()
      fetchPatients()

    } catch (error) {
      console.log(error)
    }

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

      alert("Admin saved ")

      fetchAdmins()

      // 🔥 RESET ALL FORM DATA
      setAdminBasicInfo({
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

      setIsViewMode(false)
      setAdminStep(1)

    } catch (err) {
      console.log(err)
    }
  }

  const handleCreatePharmasiFull = async()=>{

    try{
    
    if(!pharmasiOfficial.pharmasiId){
    alert("Enter Pharmasi ID");
    return;
    }
    
    if(
    !pharmasiAccount.password ||
    !pharmasiAccount.confirmPassword
    ){
    alert("Enter Password");
    return;
    }
    
    if(
    pharmasiAccount.password !==
    pharmasiAccount.confirmPassword
    ){
    alert("Password mismatch");
    return;
    }
    
    await setDoc(
    doc(
    db,
    "pharmasi",
    pharmasiOfficial.pharmasiId
    ),
    {
    pharmasiBasicInfo,
    pharmasiDesignation,
    pharmasiOfficial,
    pharmasiAccount,
    isDisabled:false,
    createdAt:new Date()
    }
    );
    
    alert("Pharmasi Created Successfully");
    
    await fetchPharmasi();
    
    
    setPharmasiBasicInfo({
    name:"",
    age:"",
    gender:"",
    dob:"",
    address:"",
    contact:"",
    emrContact:"",
    email:"",
    occupation:""
    });
    
    setPharmasiDesignation({
    designation:""
    });
    
    setPharmasiOfficial({
    pharmasiId:"",
    joiningDate:"",
    relievingDate:""
    });
    
    setPharmasiAccount({
    pharmasiId:"",
    password:"",
    confirmPassword:""
    });
    
    setPharmasiStep(1);
    
    }
    catch(error){
    
    console.log(error);
    alert("Save Failed");
    
    }
    
    }

  const handleCreatePatient = async () => {
    try {

      const patientId = basicInfo.email

      await setDoc(doc(db, "patients", patientId), {
        basicInfo,
        insuranceInfo,
        medicalHistory,
        reasonInfo,
        accountInfo,
        status: "pending",
        isDisabled: false,
        createdAt: new Date()
      })

      alert("Patient saved ")

      fetchPatients()

      // reset
      setBasicInfo({
        name: "", age: "", gender: "", dob: "",
        address: "", contact: "", emrContact: "",
        email: "", occupation: ""
      })

      setInsuranceInfo({
        provider: "", policy: "", agentName: "", agentNumber: ""
      })

      setMedicalHistory({
        bloodGroup: "", treated: "", diabetes: false,
        hypertension: false, heart: false, stroke: false, other: false
      })

      setReasonInfo({
        condition: "", visitReason: "", primaryReason: "", duration: "", treatedBefore: ""
      })

      setAccountInfo({
        username: "", password: "", confirmPassword: ""
      })

      setIsViewMode(false)
      setStep(1)

    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }



  const handleCreateDoctorFull = async () => {
    try {

      const email = doctorBasicInfo.email


      await setDoc(doc(db, "doctors", email), {

        // 🔥 FULL FORM SAVE
        doctorBasicInfo,
        doctorDesignation,
        doctorOfficial,
        doctorAccount,

        // display fields (unchanged)
        name: doctorBasicInfo.name,
        speciality: doctorDesignation.designation,
        hospital: doctorBasicInfo.address,
        map: `https://www.google.com/maps?q=${doctorBasicInfo.address}`,
        image:
  doctorImage ||
  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        isDisabled: false

      })

      alert("Doctor saved")
      setDoctorImage("")
      fetchDoctors()

    } catch (err) {
      console.log(err)
    }
  }
  const handleUpdateDoctor = async () => {
    try {

      const ref = doc(db, "doctors", editData.id)

      await updateDoc(ref, {
        doctorBasicInfo,
        doctorDesignation,
        doctorOfficial,
        doctorAccount,
        name: doctorBasicInfo.name,
        speciality: doctorDesignation.designation,
        hospital: doctorBasicInfo.address,
      })

      alert("Updated successfully")

      setIsEditMode(false)
      setEditData(null)

      fetchDoctors()

    } catch (err) {
      console.log(err)
    }
  }

  const handleCreateStaffFull = async () => {
    try {
      const id = staffOfficial.staffId

      await setDoc(doc(db, "staffs", id), {
        staffBasicInfo,
        staffOfficial,
        staffAccount,
        isDisabled: false
      })

      alert("Staff saved")

      fetchStaffs()


      setStaffBasicInfo({
        name: "",
        age: "",
        gender: "",
        dob: "",
        address: "",
        contact: "",
        email: ""
      })

      setStaffOfficial({
        staffId: "",
        joiningDate: "",
        relievingDate: ""
      })

      setStaffAccount({
        staffId: "",
        password: "",
        confirmPassword: ""
      })

      setStaffStep(1)

    } catch (err) {
      console.log(err)
    }
  }

  const handleItemPrint = (item) => {

    const win = window.open("", "", "width=900,height=700");
  
    win.document.write(`
      <html>
        <head>
          <title>Medicine Bill</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h2 { text-align: center; }
            .box { margin: 10px 0; font-size: 16px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: center; }
          </style>
        </head>
  
        <body>
  
          <h2>Pharmacy Bill</h2>
  
          <div class="box"><b>Patient Name:</b> ${selectedPatient?.name || "Demo Patient"}</div>
          <div class="box"><b>Date:</b> ${new Date().toLocaleDateString()}</div>
  
          <table>
            <tr>
              <th>Medicine</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
  
            <tr>
              <td>${item.medicine || item.subCategory}</td>
              <td>${item.type}</td>
              <td>${item.qty}</td>
              <td>₹${item.salesPrice}</td>
              <td>₹${item.qty * item.salesPrice}</td>
            </tr>
          </table>
  
          <h3 style="text-align:right; margin-top:20px;">
            Grand Total: ₹${item.qty * item.salesPrice}
          </h3>
  
        </body>
      </html>
    `);
  
    win.document.close();
    win.print();
  };

  return (

    

    <div className="flex flex-col md:flex-row min-h-screen w-full">


<div className="hidden md:block w-64 bg-blue-600 text-white p-4 md:p-6 min-h-screen">

        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-gray-200" onClick={() => setMenu("home")} >
            Home
          </li>

          {/* <li className="cursor-pointer hover:text-gray-200" onClick={() => setMenu("subscription")} >
            Subscription
          </li> */}


          <li className="cursor-pointer hover:text-gray-200" onClick={()=>setMenu("describe")}>
            Prescribe
          </li>

          <li className="cursor-pointer hover:text-gray-200" onClick={() => setMenu("appointments")}>
            Appointments
          </li>

          <li className="cursor-pointer hover:text-gray-200" onClick={() => setMenu("history")}>
            Appointment History
        </li>



        </ul>

      </div>


      <div className="flex-1 p-4 md:p-6 pb-20 md:pb-6 overflow-auto">







        {menu === "settings" && (
          <div className="flex justify-center items-start mt-10">
            <Calendar
              onSave={async (date, title, type) => {
                await setDoc(doc(db, "calendar", date), {
                  title,
                  type,
                  date
                })
              }}
            />
          </div>
        )}

{menu === "appointments" && (

  <div>

    
    <h1 className="text-2xl font-bold mb-6">Current Appointments</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {currentAppointments.length === 0 ? (
  <p>No Current Appointments</p>
) : (
  currentAppointments.map((p, index) => (
    <div
      key={index}
      onClick={() => setCallData(p)}
      className="cursor-pointer bg-white p-4 rounded-xl shadow"
    >
<p><b>Patient:</b> {p.patientName}</p>

<p><b>Email:</b> {p.patientEmail}</p>

<p><b>Reason:</b> {p.reason}</p>

<p><b>Doctor:</b> {p.doctorName}</p>

<p><b>Date:</b> {p.date}</p>

<p><b>Time:</b> {p.time}</p>
    </div>
  ))
)}
    </div>

  </div>
)}

{menu==="describe" && (

<div className="p-6 w-full">

<h1 className="text-5xl font-bold mb-8">
Prescribe
</h1>

<div className="overflow-x-auto bg-white rounded-2xl shadow">

<table className="w-full">

<thead className="bg-blue-600 text-white">

<tr>

<th className="p-4 text-left">
Patient
</th>

<th className="p-4 text-left">
Doctor
</th>

<th className="p-4 text-left">
Reason
</th>

<th className="p-4 text-left">
Solution
</th>

<th className="p-4 text-left">
Tablet
</th>

<th className="p-4 text-left">
Action
</th>

</tr>

</thead>

<tbody>

{patientsData.length === 0 ? (

<tr>

<td
colSpan="6"
className="text-center p-6"
>

No Patients Found

</td>

</tr>

) : (

patientsData.map((item,index)=>(

<tr
key={index}
className="border-b"
>

<td className="p-4">
{item.patientName}
</td>

<td className="p-4">
{item.doctorName}
</td>

<td className="p-4">
{item.reasonNotes}
</td>

<td className="p-4">
{item.solution || "Not Updated"}
</td>

<td className="p-4">
{item.tablet || "Not Updated"}
</td>

<td className="p-4">

<button

onClick={()=>
setSelectedPatient(item)
}

className="
bg-green-500
hover:bg-green-600
text-white
px-4
py-2
rounded-xl
"

>

Visit

</button>

</td>

</tr>

))

)}

</tbody>

</table>

</div>

</div>

)}

{menu === "history" && (

<div>

  <h1 className="text-2xl font-bold mb-6">
    Appointment History
  </h1>

  <div className="overflow-x-auto bg-white rounded-xl shadow">

    <table className="w-full">

      <thead className="bg-blue-600 text-white">

        <tr>

          <th className="p-3 text-left">Patient</th>

          <th className="p-3 text-left">Email</th>

          <th className="p-3 text-left">Reason</th>

          <th className="p-3 text-left">Condition</th>

          <th className="p-3 text-left">Date</th>

          <th className="p-3 text-left">Time</th>

        </tr>

      </thead>

      <tbody>

        {historyAppointments.length === 0 ? (

          <tr>
            <td colSpan="6" className="p-4 text-center">
              No History Found
            </td>
          </tr>

        ) : (

          historyAppointments.map((p, index) => (

            <tr
              key={index}
              className="border-b"
            >

              <td className="p-3">
              {p.patientName}
              </td>

              <td className="p-3">
              {p.patientEmail}
              </td>

              <td className="p-3">
              {p.reason}
              </td>

              <td className="p-3">
              General Checkup
              </td>

              <td className="p-3">
                {p.date}
              </td>

              <td className="p-3">
                {p.time}
              </td>

            </tr>

          ))

        )}

      </tbody>

    </table>

  </div>

</div>

)}

{callData && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    
    <div className="bg-white rounded-2xl p-8 w-[700px] relative">

      <button 
        onClick={() => setCallData(null)}
        className="absolute top-4 right-4 text-xl"
      >
        ✖
      </button>

      <div className="flex flex-col items-center">
        <img 
          src="/Doctors/doc1.png" 
          className="w-24 h-24 rounded-full mb-4"
        />

        <h2 className="text-xl font-bold mb-4">
          Patient Confirmation Panel
        </h2>

        <a
          href={`tel:${callData.patientPhone || ""}`}
          className="bg-green-500 text-white px-6 py-3 rounded-xl mb-6"
        >
          📞 Call Patient
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4">

<input
  value={callData.patientName || ""}
  disabled
  className="border p-3 rounded-xl"
/>

<input
  value={callData.patientEmail || ""}
  disabled
  className="border p-3 rounded-xl"
/>

<input
  value={callData.reason || ""}
  disabled
  className="border p-3 rounded-xl"
/>

<input
  value={callData.doctorName || ""}
  disabled
  className="border p-3 rounded-xl"
/>

<input
  value={callData.date || ""}
  disabled
  className="border p-3 rounded-xl"
/>

<input
  value={callData.time || ""}
  disabled
  className="border p-3 rounded-xl"
/>

</div>

      <p className={`text-center mt-4 font-semibold ${
        callData.status === "completed"
          ? "text-green-600"
          : callData.status === "arrived"
          ? "text-blue-500"
          : "text-red-500"
      }`}>
        Status: {callData.status || "pending"}
      </p>

      <div className="flex justify-center mt-4">
  <button
    onClick={handlePrint}
    className="bg-purple-600 text-white px-6 py-2 rounded-lg"
  >
    🖨 Print Report
  </button>
</div>

      <div className="flex justify-center gap-4 mt-6">

        <button
          onClick={() => setCallData({ ...callData, status: "arrived" })}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          ✅ Arrived
        </button>

        <button
          onClick={async () => {

            const updatedData = {
              ...callData,
              status: "completed"
            };
          
            setCallData(updatedData);
          
            try {
          
              await updateDoc(
                doc(
                  db,
                  "patients",
                  callData.basicInfo?.email
                ),
                {
                  status: "completed"
                }
              );
          
              fetchPatients();
          
            } catch (error) {
          
              console.log(error);
          
            }
          
          }}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          🩺 Completed
        </button>

      </div>

    </div>
  </div>
)}

 </div>


      {/* MOBILE + TAB BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg md:hidden z-50">

<div className="flex justify-around items-center py-3">

  {/* HOME */}
  <button
    onClick={() => setMenu("home")}
    className={`flex flex-col items-center text-xs ${
      menu === "home" ? "text-blue-600" : "text-gray-600"
    }`}
  >
    <span className="text-xl">🏠</span>
    <span className="mt-1">Home</span>
  </button>

  {/* DESCRIBE */}
  <button
    onClick={() => setMenu("describe")}
    className={`flex flex-col items-center text-xs ${
      menu === "describe" ? "text-blue-600" : "text-gray-600"
    }`}
  >
    <span className="text-xl">🧾</span>
    <span className="mt-1">Prescribe</span>
  </button>

  {/* APPOINTMENTS */}
  <button
    onClick={() => setMenu("appointments")}
    className={`flex flex-col items-center text-xs ${
      menu === "appointments" ? "text-blue-600" : "text-gray-600"
    }`}
  >
    <span className="text-xl">📅</span>
    <span className="mt-1">Appointments</span>
  </button>

  {/* HISTORY */}
  <button
    onClick={() => setMenu("history")}
    className={`flex flex-col items-center text-xs ${
      menu === "history" ? "text-blue-600" : "text-gray-600"
    }`}
  >
    <span className="text-xl">📜</span>
    <span className="mt-1">History</span>
  </button>

</div>

</div>

{selectedPatient && (

<div className="
fixed
inset-0
bg-black/40
z-50
overflow-y-auto
py-10
">

<PatientProfileView

patient={selectedPatient}

onSave={(updatedPatient)=>{

const updatedPatients =
patientsData.map((p)=>{

if(
p.appointmentNo ===
updatedPatient.appointmentNo
){

return updatedPatient;

}

return p;

});

setPatientsData(updatedPatients);

localStorage.setItem(
"patientsData",
JSON.stringify(updatedPatients)
);

setSelectedPatient(null);

}}

onClose={()=>{
setSelectedPatient(null);
}}

/>

</div>

)}

    </div >

    
    

  )

}

export default Account
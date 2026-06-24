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
import PatientsTable from "../components/PatientsTable";
import { addDoc } from "firebase/firestore";




const Account = () => {

  const [menu, setMenu] = useState("home")
  const [type,setType] = useState("");
  const [medicine,setMedicine] = useState("");
  const [inventoryItems,setInventoryItems]=useState([]);
  const [patientsData,setPatientsData] = useState([]);
  const [treatedData, setTreatedData] = useState(null);
  const [selectedJournal, setSelectedJournal] = useState(null);

  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, "prescriptions"),
      (snapshot) => {
   
        const list = [];
   
        snapshot.forEach((doc) => {
   
          list.push({
            id: doc.id,
            ...doc.data()
          });
   
        });
   
        setPatientsData(list);
   
      }
    );
   
    return () => unsub();
   
   }, []);

const [qty,setQty] = useState("");
const [purchase,setPurchase] = useState("");
const [sales,setSales] = useState("");
const [historySearch, setHistorySearch] = useState("");
const [journalSearch,setJournalSearch] =useState("")

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

  const fetchPatientsList = async () => {

const snap =
await getDocs(collection(db,"patients"));

const list = [];

snap.forEach((docSnap)=>{

list.push({
id: docSnap.id,
...docSnap.data()
});

});

setPatientsList(list);

};

useEffect(() => {
  fetchPatientsList();
}, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
  
    if (tab === "settings") {
      setMenu("settings");
    }
  }, [location]);


  const hospital = location.state?.hospital || "";
  const [selectedPatient, setSelectedPatient] = useState(null)

  const [selectedPatientData,setSelectedPatientData] =
useState(null);

  const [showPatientHistoryPopup,setShowPatientHistoryPopup] =
useState(false);

const [patientHistory,setPatientHistory] =
useState([]);

  const [showDoctorPopup,setShowDoctorPopup] =
useState(false);

const [selectedDoctor,setSelectedDoctor] =
useState(null);

const [selectedSlot,setSelectedSlot] =
useState("");

const [doctorSlots,setDoctorSlots] =
useState([]);

const [appointmentNo,setAppointmentNo] =
useState("");

const [appointmentDate,setAppointmentDate] =
useState(
new Date()
.toISOString()
.split("T")[0]
);

const generateAppointmentNo = () => {

  const numbers =
  patientAccounts
  .map((item) => {
  
  const num = parseInt(
  (item.appointmentNo || "")
  .replace("API", "")
  );
  
  return isNaN(num) ? 0 : num;
  
  });
  
  const lastNo =
  numbers.length > 0
  ? Math.max(...numbers)
  : 0;
  
  return `API${String(
  lastNo + 1
  ).padStart(3, "0")}`;
  
  };

const [showDoctorDropdown,setShowDoctorDropdown] =
useState(false);

const [doctorSearch,setDoctorSearch] =
useState("");

  const [patientSearch, setPatientSearch] = useState("");
const [showPatientDropdown, setShowPatientDropdown] = useState(false);
const [showPatientPopup, setShowPatientPopup] = useState(false);


const [patientsList, setPatientsList] = useState([]);
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
  patientAccounts.filter(
    (p) => p.date === today
  );
  
  
  
  const historyAppointments =
  patientAccounts.filter((p) => {
  
    if (!p.date || !p.time)
      return false;
  
    const now = new Date();
  
    const endTime =
      p.time.split("-")[1]?.trim();
  
    if (!endTime) return false;
  
    const match =
    endTime
      .replace(/\s/g, "")
      .match(/(\d+):(\d+)(am|pm)/i);
  
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

  const filteredHistoryAppointments =
historyAppointments.filter((item) =>
(item.patientName || "")
.toLowerCase()
.includes(historySearch.toLowerCase())
);

const filteredJournal =
historyAppointments.filter((item)=>{

const search =
journalSearch.toLowerCase();

return (
(item.patientName || "")
.toLowerCase()
.includes(search)

||

(item.doctorName || "")
.toLowerCase()
.includes(search)

||

(item.appointmentNo || "")
.toString()
.toLowerCase()
.includes(search)
);

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


    setStaffAccounts(list)
  }


  const fetchDoctors = async () => {

    try {
  
      const querySnapshot =
        await getDocs(
          collection(db, "doctors")
        )
  
      const doctorList = []
  
      // 👇 THIS BLOCK REPLACE
      querySnapshot.forEach((docSnap) => {
  
        const data = docSnap.data();
  
        doctorList.push({
  
          id: docSnap.id,
  
          ...data,
  
          name:
            data.name ||
            data.doctorBasicInfo?.name ||
            "",
  
          speciality:
            data.speciality ||
            data.doctorDesignation?.designation ||
            "",
  
          hospital:
            data.hospital ||
            data.doctorBasicInfo?.address ||
            "",
  
          image:
            data.image ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  
        });
  
      });
  
      setDoctorAccounts(doctorList)
  
    }
    catch(error){
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

      const patientId = Date.now().toString()
      console.log("REASON INFO =", reasonInfo);

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

      alert(
        "Patient Created Successfully"
        );
        setShowPatientPopup(false);

        await fetchPatientsList();

      fetchPatients()

      // reset
      setBasicInfo({
        name: "",address: "", contact: ""
      })

      

      setReasonInfo({
         visitReason: ""
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

  const handlePatientPrint = (item) => {

    const win = window.open("", "", "width=900,height=700");
  
    win.document.write(`
      <html>
        <head>
          <title>Patient Prescription</title>
          <style>
            body{
              font-family: Arial;
              padding:20px;
            }
  
            h2{
              text-align:center;
            }
  
            table{
              width:100%;
              border-collapse:collapse;
              margin-top:20px;
            }
  
            th,td{
              border:1px solid #000;
              padding:10px;
              text-align:left;
            }
          </style>
        </head>
  
        <body>
  
          <h2>Patient Prescription</h2>
  
          <table>
  
            <tr>
              <th>Patient</th>
              <td>${item.patientName}</td>
            </tr>
  
            <tr>
              <th>Doctor</th>
              <td>${item.doctorName}</td>
            </tr>
  
            <tr>
              <th>Reason</th>
              <td>${item.reasonNotes}</td>
            </tr>
  
            <tr>
              <th>Solution</th>
              <td>${item.solution}</td>
            </tr>
  
            <tr>
              <th>Tablet</th>
              <td>${item.tablet}</td>
            </tr>
  
            <tr>
              <th>Date</th>
              <td>${new Date().toLocaleDateString()}</td>
            </tr>
  
          </table>
  
        </body>
      </html>
    `);
  
    win.document.close();
    win.focus();
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

        <li
className="cursor-pointer hover:text-gray-200"
onClick={() => setMenu("journal")}
>
Journal Entry
</li>



        </ul>

      </div>


      <div className="flex-1 p-4 md:p-6 pb-20 md:pb-6 overflow-auto">


      {menu === "home" && (

<div className="space-y-6">

  <h1 className="text-4xl font-bold">
    Hospital Dashboard
  </h1>

  {/* Stats Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-gray-500">
        Total Appointments
      </h3>
      <p className="text-4xl font-bold text-blue-600">
        {patientAccounts.length}
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-gray-500">
        Today's Appointments
      </h3>
      <p className="text-4xl font-bold text-green-600">
        {currentAppointments.length}
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-gray-500">
        Doctors
      </h3>
      <p className="text-4xl font-bold text-purple-600">
        {doctorAccounts.length}
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-gray-500">
        Staffs
      </h3>
      <p className="text-4xl font-bold text-red-600">
        {staffAccounts.length}
      </p>
    </div>

  </div>


  {/* Recent Appointments */}
  <div className="bg-white rounded-2xl shadow p-6">

    <h2 className="text-2xl font-bold mb-4">
      Recent Appointments
    </h2>

    <div className="space-y-3">

      {patientAccounts.slice(0,5).map((item,index)=>(
        <div
          key={index}
          className="
          border
          rounded-xl
          p-4
          flex
          justify-between
          items-center
          "
        >
          <div>
            <p className="font-bold">
              {item.patientName}
            </p>

            <p className="text-gray-500">
              {item.doctorName}
            </p>
          </div>

          <div>
            {item.date}
          </div>
        </div>
      ))}

    </div>

  </div>

</div>

)}




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

<div>

<div className="relative flex-1">

<input
type="text"
placeholder="Search Patient Name / Mobile"
value={patientSearch}
onChange={(e) => {

setPatientSearch(e.target.value);

setShowPatientDropdown(
  e.target.value.trim() !== ""
);

}}
className="
w-full
border
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-blue-500
"
/>

{showPatientDropdown && (

<div
className="
absolute
top-full
left-0
right-0
bg-white
border
rounded-xl
shadow-xl
z-50
max-h-[250px]
overflow-y-auto
mt-1
"
>

{
patientsList
.filter((patient) => {

  const name =
patient.basicInfo?.name ||
patient.patientName ||
"";
  
  const phone =
  patient.phone ||
  patient.patientPhone ||
  "";

return (

name
.toLowerCase()
.includes(
patientSearch.toLowerCase()
)

||

phone.includes(patientSearch)

);

})
.map((patient) => (

<div
key={patient.id}
onClick={() => {

  console.log(
  "SELECTED PATIENT FULL DATA",
  patient
  );

  console.log("FULL PATIENT", patient);

console.log(
"visitReason = ",
patient?.reasonInfo?.visitReason
);

alert(
patient?.reasonInfo?.visitReason || "EMPTY"
);

console.log(patient);
console.log(patient.reasonInfo);
  
setSelectedPatientData({
  ...patient
});
  
  setPatientSearch(
  patient.basicInfo?.name ||
  patient.patientName ||
  patient.name ||
  ""
  );
  console.log(
    "SELECTED AFTER SET",
    patient?.reasonInfo?.visitReason
    );
  
  setShowPatientDropdown(false);
  
  }}

  
className="
p-3
cursor-pointer
hover:bg-gray-100
border-b
"
>

<div className="font-semibold">
{patient.basicInfo?.name ||
 patient.patientName}
</div>

<div className="text-sm text-gray-500">
{
patient.phone ||
patient.patientPhone
}
</div>

</div>

))
}


{
patientAccounts
.filter((patient) => patientSearch.trim() !== "")
.filter((patient) => {

  const name =
  patient.patientName || "";
  
  const phone =
  patient.phone ||
  patient.patientPhone ||
  "";

return (

name
.toLowerCase()
.includes(
patientSearch.toLowerCase()
)

||

phone.includes(patientSearch)

);

}).length === 0

&&

patientSearch.trim() !== ""

&& (

<button
type="button"
onClick={() => {

setShowPatientPopup(true);
setShowPatientDropdown(false);

}}
className="
w-full
p-3
text-left
bg-green-50
text-green-700
font-semibold
"
>
➕ Add New Patient
</button>

)

}

</div>

)}

</div>

</div>

    
    {/* Doctor Selection */}

<div className="mt-4 relative">

<label className="block mb-2 font-semibold">
Select Doctor
</label>

<input
type="text"
placeholder="Search Doctor"
value={
selectedDoctor
? selectedDoctor.name
: doctorSearch
}
onChange={(e)=>{

setDoctorSearch(e.target.value);
setShowDoctorDropdown(true);

}}
onFocus={() =>
setShowDoctorDropdown(true)
}
className="
w-full
border
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-blue-500
"
/>

{showDoctorDropdown && (

<div
className="
absolute
top-full
left-0
right-0
bg-white
border
rounded-xl
shadow-xl
z-50
max-h-[300px]
overflow-y-auto
mt-1
"
>

{doctorAccounts
.filter((doctor)=>

(doctor.name || "")
.toLowerCase()
.includes(
doctorSearch.toLowerCase()
)

)

.map((doctor)=>(

<div
key={doctor.id}
onClick={() => {

  console.log("Doctor Clicked");

  const slots = [
    "10:00 AM - 11:00 AM",
    "01:00 PM - 02:00 PM",
    "05:00 PM - 07:00 PM"
  ];

  setSelectedDoctor(doctor);
  setDoctorSearch(doctor.name);
  setShowDoctorDropdown(false);

  setDoctorSlots(slots);

  console.log("Slots:", slots);
}}
className="
p-4
cursor-pointer
hover:bg-blue-50
border-b
flex
items-center
gap-4
"
>

<img
src={
doctor.image ||
"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
}
alt=""
className="
w-16
h-16
rounded-full
object-cover
border
"
/>

<div>

<h3 className="font-bold text-lg">
{doctor.name}
</h3>

<p className="text-gray-500">
{doctor.speciality}
</p>

<p className="text-sm text-gray-400">
{doctor.hospital}
</p>

</div>

</div>

))}

</div>

)}

</div>


{/* Slot Selection */}

<div className="mt-4">

<label className="block mb-2 font-semibold">
Select Slot
</label>
<select
value={selectedSlot}
onChange={(e)=>{

  setSelectedSlot(
  e.target.value
  );
  
  setAppointmentNo(
  generateAppointmentNo()
  );
  
  }}
className="
w-full
border
rounded-xl
p-3
"
>

<option value="">
Select Slot
</option>

{doctorSlots.map((slot,index)=>(

<option
key={index}
value={slot}
>
{slot}
</option>

))}

</select>

</div>


<div className="grid md:grid-cols-2 gap-4 mt-4">

<div>

<label className="block mb-2 font-semibold">
Appointment Date
</label>

<input
type="date"
value={appointmentDate}
min={new Date().toISOString().split("T")[0]}
onChange={(e)=>{

setAppointmentDate(e.target.value);

setSelectedSlot("");
setAppointmentNo("");

}}
className="
w-full
border
rounded-xl
p-3
"
/>

</div>

<div>

<label className="block mb-2 font-semibold">
Appointment No
</label>

<input
type="text"
value={appointmentNo}
readOnly
className="
w-full
border
rounded-xl
p-3
bg-gray-100
"
/>

</div>

</div>

<div className="mt-6 flex justify-end">

<button
onClick={async () => {

  console.log("SELECTED PATIENT DATA =", selectedPatientData);
  const patientReason =
  selectedPatientData?.reasonInfo?.visitReason ||
  selectedPatientData?.reasonInfo?.primaryReason ||
  selectedPatientData?.reasonInfo?.condition ||
  selectedPatientData?.visitReason ||
  selectedPatientData?.reason ||
  "";
  const appointmentData = {
    appointmentNo,
  
    patientName:
    selectedPatientData?.basicInfo?.name ||
    patientSearch ||
    "",
  
    patientPhone:
    selectedPatientData?.basicInfo?.contact ||
    "",
  
    patientAddress:
    selectedPatientData?.basicInfo?.address ||
    "",
  
    reason: patientReason,
  
    doctorName: selectedDoctor?.name || "",
    date: appointmentDate,
    time: selectedSlot,
    status: "pending",
    createdAt: new Date()
  };

  console.log("SAVING =>", appointmentData);

 

  await addDoc(
    collection(db, "appointments"),
    appointmentData
  );

  alert("Appointment Booked Successfully ✅");

}}
className="
bg-blue-600
hover:bg-blue-700
text-white
font-semibold
px-8
py-3
rounded-xl
"
>
Book Appointment
</button>

</div>

    
<div className="mt-8 md:mt-10 pt-6 border-t border-gray-200">
  <h1 className="text-2xl font-bold">
    Current Appointments
  </h1>
</div>

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
<p>
<b>Reason:</b>
{String(p.reason || "NO REASON")}
</p>
<p><b>Doctor:</b> {p.doctorName}</p>

<p><b>Date:</b> {p.date}</p>

<p><b>Time:</b> {p.time}</p>
    </div>
  ))
)}
    </div>

  </div>
)}

{menu === "describe" && (

<PatientsTable
  patientsData={patientsData}
/>

)}



{menu === "history" && (

<div>

  <h1 className="text-2xl font-bold mb-6">
    Appointment History
  </h1>

  {/* Search */}
  <div className="mb-4">

    <input
      type="text"
      placeholder="Search Patient Name..."
      value={historySearch}
      onChange={(e) =>
        setHistorySearch(e.target.value)
      }
      className="
      w-full
      border
      rounded-xl
      p-3
      outline-none
      focus:ring-2
      focus:ring-blue-500
      "
    />

  </div>

  {/* Desktop Table */}
  <div className="hidden lg:block overflow-x-auto bg-white rounded-xl shadow">

    <table className="w-full">

      <thead className="bg-blue-600 text-white">

        <tr>
        <th className="p-3 text-left">Patient</th>
        <th className="p-3 text-left">Doctor</th>
        <th className="p-3 text-left">Address</th>
        <th className="p-3 text-left">Contact</th>
        <th className="p-3 text-left">Reason</th>
        <th className="p-3 text-left">Solution</th>
        <th className="p-3 text-left">Date</th>
        <th className="p-3 text-left">Time</th>
        <th className="p-3 text-left">Action</th>
        </tr>

      </thead>

      <tbody>

        {filteredHistoryAppointments.length === 0 ? (

          <tr>
            <td
              colSpan="6"
              className="p-4 text-center"
            >
              No History Found
            </td>
          </tr>

        ) : (

          filteredHistoryAppointments.map((p,index)=>(

<tr
  key={index}
  className="border-b"
>

  <td className="p-3">
    {p.patientName || "-"}
  </td>

  <td className="p-3">
    {p.doctorName || "-"}
  </td>

  <td className="p-3">
    {p.address || p.patientAddress || "-"}
  </td>

  <td className="p-3">
  {p.phone || "-"}
  </td>

  <td className="p-3">
    {p.reason || "-"}
  </td>

  <td className="p-3">
    {p.solution || p.notes || "-"}
  </td>

  <td className="p-3">
    {p.date}
  </td>

  <td className="p-3">
    {p.time}
  </td>

  <td className="p-3">
    <div className="flex gap-2">

      <button
        onClick={() => setCallData(p)}
        className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
      >
        Follow Up
      </button>

      <button
  onClick={() => setTreatedData(p)}
  className="bg-green-600 text-white px-3 py-2 rounded-lg"
>
  Treated
</button>

      <button
        onClick={() => handlePatientPrint(p)}
        className="bg-purple-600 text-white px-3 py-2 rounded-lg"
      >
        Print
      </button>

    </div>
  </td>

</tr>

            

          ))

        )}

      </tbody>

    </table>

  </div>

  {/* Mobile + Tablet Card View */}

  <div className="block lg:hidden space-y-4">

    {filteredHistoryAppointments.length === 0 ? (

      <div className="bg-white rounded-xl shadow p-6 text-center">
        No History Found
      </div>

    ) : (

      filteredHistoryAppointments.map((p,index)=>(

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

<div className="space-y-3">

  <div className="flex justify-between">
    <span className="font-semibold text-gray-500">
      Patient
    </span>
    <span className="font-bold text-right">
      {p.patientName || "-"}
    </span>
  </div>

  <div className="flex justify-between">
    <span className="font-semibold text-gray-500">
      Doctor
    </span>
    <span className="font-bold text-right">
      {p.doctorName || "-"}
    </span>
  </div>

  <div className="flex justify-between">
    <span className="font-semibold text-gray-500">
      Contact
    </span>
    <span className="font-bold text-right">
      {p.phone || p.contact || p.patientPhone || "-"}
    </span>
  </div>

  <div className="flex justify-between">
    <span className="font-semibold text-gray-500">
      Address
    </span>
    <span className="font-bold text-right break-words max-w-[60%]">
      {p.address || p.patientAddress || "-"}
    </span>
  </div>

  <div className="flex justify-between">
    <span className="font-semibold text-gray-500">
      Reason
    </span>
    <span className="font-bold text-right break-words max-w-[60%]">
      {p.reason || "-"}
    </span>
  </div>

  <div className="flex justify-between">
    <span className="font-semibold text-gray-500">
      Solution
    </span>
    <span className="font-bold text-right break-words max-w-[60%]">
      {p.solution || p.notes || "-"}
    </span>
  </div>

  <div className="flex justify-between">
    <span className="font-semibold text-gray-500">
      Date
    </span>
    <span className="font-bold text-right">
      {p.date}
    </span>
  </div>

  <div className="flex justify-between">
    <span className="font-semibold text-gray-500">
      Time
    </span>
    <span className="font-bold text-right">
      {p.time}
    </span>
  </div>

  <div className="flex flex-wrap justify-center gap-4 mt-6">

    <button
      onClick={() => setCallData(p)}
      className="
      bg-yellow-500
      text-white
      px-5
      py-3
      rounded-xl
      min-w-[110px]
      "
    >
      Follow Up
    </button>

    <button
  onClick={() => setTreatedData(p)}
  className="
  bg-green-600
  text-white
  px-5
  py-3
  rounded-xl
  min-w-[110px]
  "
>
  Treated
</button>

    <button
      onClick={() => handlePatientPrint(p)}
      className="
      bg-purple-600
      text-white
      px-5
      py-3
      rounded-xl
      min-w-[110px]
      "
    >
      Print
    </button>

  </div>

</div>

        </div>

      ))

    )}

  </div>

</div>

)}


{menu === "journal" && (
<div>
  <h1 className="text-4xl font-bold mb-6">
    Journal Entry
  </h1>

  <div className="mb-6">

<input
type="text"
placeholder="Search Patient / Doctor..."
value={journalSearch}
onChange={(e)=>
setJournalSearch(e.target.value)
}
className="
w-full
md:w-[400px]
border
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-blue-500
"
/>

</div>

  <div className="
grid
grid-cols-2
lg:grid-cols-5
gap-4
mb-8
">

<div className="
bg-blue-100
rounded-2xl
p-4
shadow
">
<p className="text-sm text-gray-600">
Patients Today
</p>

<h2 className="text-2xl font-bold">
👨 45
</h2>
</div>

<div className="
bg-green-100
rounded-2xl
p-4
shadow
">
<p className="text-sm text-gray-600">
Revenue
</p>

<h2 className="text-2xl font-bold">
💰 ₹25,000
</h2>
</div>

<div className="
bg-yellow-100
rounded-2xl
p-4
shadow
">
<p className="text-sm text-gray-600">
Consultations
</p>

<h2 className="text-2xl font-bold">
📋 38
</h2>
</div>

<div className="
bg-purple-100
rounded-2xl
p-4
shadow
">
<p className="text-sm text-gray-600">
Follow-Ups
</p>

<h2 className="text-2xl font-bold">
🔄 12
</h2>
</div>

<div className="
bg-emerald-100
rounded-2xl
p-4
shadow
">
<p className="text-sm text-gray-600">
Completed
</p>

<h2 className="text-2xl font-bold">
✅ 33
</h2>
</div>

</div>

  {/* Desktop Table */}

<div className="hidden lg:block overflow-x-auto bg-white rounded-2xl shadow">

<table className="w-full">

<thead className="bg-blue-600 text-white">

<tr>
<th className="p-4">Appointment No</th>
<th className="p-4">Patient</th>
<th className="p-4">Doctor</th>
<th className="p-4">Date</th>
<th className="p-4">Contact</th>
<th className="p-4">Reason</th>
<th className="p-4">Action</th>
</tr>

</thead>

<tbody>

{filteredJournal.map((item,index)=>(

<tr key={index} className="border-b">

<td className="p-4">{item.appointmentNo || "-"}</td>
<td className="p-4">{item.patientName || "-"}</td>
<td className="p-4">{item.doctorName || "-"}</td>
<td className="p-4">{item.date || "-"}</td>
<td className="p-4">{item.patientPhone || item.phone || "-"}</td>
<td className="p-4">{item.reason || "-"}</td>

<td className="p-4">

<button
onClick={() => setSelectedJournal(item)}
className="bg-blue-600 text-white px-4 py-2 rounded-lg"
>
Details
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

{/* Mobile + Tablet */}

<div className="block lg:hidden space-y-4">

{filteredJournal.map((item,index)=>(

<div
key={index}
onClick={() => setSelectedJournal(item)}
className="bg-white rounded-2xl shadow p-4 cursor-pointer"
>

<p><b>Appointment :</b> {item.appointmentNo || "-"}</p>
<p><b>Patient :</b> {item.patientName || "-"}</p>
<p><b>Doctor :</b> {item.doctorName || "-"}</p>
<p><b>Date :</b> {item.date || "-"}</p>
<p><b>Contact :</b> {item.patientPhone || item.phone || "-"}</p>
<p><b>Reason :</b> {item.reason || "-"}</p>

</div>

))}

</div>
</div>
)}

{treatedData && (
  <div
  className="
  fixed inset-0
  bg-black/40
  flex items-center justify-center
  p-2 md:p-4
  z-[9999]
  "
>
    
<div
  className="
  bg-white
  rounded-2xl
  p-4 md:p-8
  w-[95vw]
  max-w-[850px]
  h-[85vh]
  md:h-auto
  overflow-y-auto
  pb-32
  relative
  "
>

      <button 
        onClick={() => setTreatedData(null)}
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
      </div>

      <div className="grid grid-cols-2 gap-4">

<input
  value={treatedData.patientName || ""}
  disabled
  className="border p-3 rounded-xl"
/>

<div>
  

  <input
    value={
      treatedData.patientPhone ||
      treatedData.phone ||
      treatedData.contact ||
      ""
    }
    disabled
    className="border p-3 rounded-xl w-full"
  />
</div>

<input
  value={treatedData.reason || ""}
  disabled
  className="border p-3 rounded-xl"
/>

<input
  value={treatedData.doctorName || ""}
  disabled
  className="border p-3 rounded-xl"
/>

<input
  value={treatedData.date || ""}
  disabled
  className="border p-3 rounded-xl"
/>

<input
  value={treatedData.time || ""}
  disabled
  className="border p-3 rounded-xl"
/>

</div>

<p className={`text-center mt-4 font-semibold ${
  treatedData.status === "completed"
    ? "text-green-600"
    : "text-orange-500"
}`}>
  Status: {treatedData.status || "pending"}
</p>

      <div className="flex justify-center mt-4">
  
</div>

<div className="flex flex-col md:flex-row justify-center gap-4 mt-6">

<button
  onClick={async () => {

    await updateDoc(
      doc(db, "appointments", treatedData.id),
      {
        status: "followup-required"
      }
    );

    setTreatedData({
      ...treatedData,
      status: "followup-required"
    });

  }}
  className="
  bg-orange-500
  text-white
  px-6
  py-3
  rounded-xl
  "
>
  🔄 Follow Up Required
</button>

<button
  onClick={async () => {

    await updateDoc(
      doc(db, "appointments", treatedData.id),
      {
        status: "completed"
      }
    );

    setTreatedData({
      ...treatedData,
      status: "completed"
    });

  }}
  className="
  bg-green-600
  text-white
  px-6
  py-3
  rounded-xl
  "
>
  ✅ Completed
</button>

</div>

    </div>
  </div>
)}

{callData && (

<div
  className="
  fixed inset-0
  bg-black/40
  flex items-center justify-center
  p-2 md:p-4
  z-[9999]
  "
>

<div
  className="
  bg-white
  rounded-2xl
  p-4 md:p-6
  w-[95vw]
  max-w-[850px]
  h-[85vh]
  md:h-auto
  overflow-y-auto
  pb-32
  relative
  "
>

    <button
      onClick={() => setCallData(null)}
      className="absolute top-4 right-4 text-xl"
    >
      ✖
    </button>

    <div className="flex flex-col items-center mb-6">

    <img
  src="/Doctors/doc1.png"
  alt="Doctor"
  className="
  w-20 h-20
  md:w-28 md:h-28
  object-contain
  mb-3
  "
/>

<h2 className="text-2xl font-bold text-center">
  Follow Up Patient
</h2>

<div className="flex justify-center mt-4 mb-4">

  <button
    className="
    bg-blue-600
    text-white
    px-8
    py-3
    rounded-xl
    font-bold
    text-lg
    cursor-default
    "
  >
    Appointment No : {
      callData.appointmentNo ||
      callData.appointmentId ||
      callData.id ||
      "N/A"
    }
  </button>

</div>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">

      <input
        value={callData.patientName || ""}
        disabled
        className="border p-3 rounded-xl"
      />

<div>
<input
  value={
    callData.phone ||
    callData.contact ||
    callData.patientPhone ||
    ""
  }
  disabled
  className="border p-3 rounded-xl w-full"
/>

</div>

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

    <p className="
  text-center
  text-2xl
  font-bold
  text-green-600
  mt-3
  mb-5
">
  📱 {
    callData.phone ||
    callData.contact ||
    callData.patientPhone ||
    ""
  }
</p>

    <div className="flex justify-center mt-6">

      <a
        href={`tel:${
          callData.phone ||
          callData.contact ||
          callData.patientPhone ||
          ""
        }`}
        className="bg-green-600 text-white px-8 py-3 rounded-xl"
      >
        📞 Contact Number
      </a>

    </div>

  </div>

</div>

)}

{false && (

<div
className="
fixed inset-0
bg-black/50
flex items-center justify-center
z-[999999]
p-4
"
>

<div
className="
bg-white
rounded-3xl
w-full
max-w-5xl
max-h-[85vh]
overflow-y-auto
p-6
relative
"
>

<button
onClick={() =>
setShowPatientHistoryPopup(false)
}
className="
absolute
top-4
right-4
text-2xl
font-bold
"
>
✕
</button>

<h2 className="text-3xl font-bold mb-6">
Patient Full History
</h2>

{patientHistory.length > 0 && (

<div
className="
border
rounded-2xl
p-4
"
>

<div className="grid md:grid-cols-2 gap-4">

<div>
<b>Patient :</b>
{patientHistory[0].patientName}
</div>

<div>
<b>Phone :</b>
{patientHistory[0].phone}
</div>

<div>
<b>Doctor :</b>
{patientHistory[0].doctorName}
</div>

<div>
<b>Reason :</b>
{patientHistory[0].reason}
</div>

<div>
<b>Date :</b>
{patientHistory[0].date}
</div>

<div>
<b>Time :</b>
{patientHistory[0].time}
</div>

<div>
<b>Address :</b>
{patientHistory[0].address}
</div>

<div>
<b>Appointment No :</b>
{patientHistory[0].appointmentNo}
</div>

</div>

</div>

)}

</div>

</div>

)}


{showDoctorPopup && selectedDoctor && (

<div
className="
fixed inset-0
bg-black/50
flex items-center justify-center
z-[999999]
p-4
"
>

<div
className="
bg-white
rounded-3xl
w-full
max-w-4xl
overflow-hidden
relative
"
>

<button
onClick={() =>
setShowDoctorPopup(false)
}
className="
absolute
top-4
right-4
text-2xl
font-bold
"
>
✕
</button>

<div
className="
flex
flex-col
md:flex-row
"
>

{/* LEFT */}

<div
className="
w-full
md:w-2/3
p-6
"
>

<h2 className="text-3xl font-bold">
{selectedDoctor.name}
</h2>

<p className="mt-4 text-lg">
🏥 Hospital :
{" "}
{selectedDoctor.hospital ||
"City Hospital"}
</p>

<p className="mt-3 text-lg">
📍 Address :
{" "}
{selectedDoctor.doctorBasicInfo?.address ||
selectedDoctor.hospital ||
"N/A"}
</p>

<p className="mt-3 text-lg text-blue-600 font-semibold">
🩺
{" "}
{selectedDoctor.speciality}
</p>

<button
onClick={() => {

alert(
`${selectedDoctor.name} Selected Successfully ✅`
);

setShowDoctorPopup(false);

}}
className="
mt-8
bg-green-600
text-white
px-8
py-3
rounded-xl
"
>
Choose Doctor
</button>

</div>

{/* RIGHT */}

<div
className="
w-full
md:w-1/3
bg-gray-100
flex
items-center
justify-center
p-6
"
>

<img
src={
selectedDoctor.image ||
"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
}
alt=""
className="
w-48
h-48
object-cover
rounded-2xl
shadow-lg
"
/>

</div>

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

  <button
onClick={() => setMenu("journal")}
className={`flex flex-col items-center text-xs ${
menu === "journal"
? "text-blue-600"
: "text-gray-600"
}`}
>
<span className="text-xl">📖</span>
<span className="mt-1">Journal</span>
</button>

</div>

</div>


{selectedJournal && (

<div className="
fixed inset-0
bg-black/50
z-[999999]
overflow-y-auto
p-2 md:p-6
">

<div className="
bg-white
rounded-3xl
shadow-xl
w-full
max-w-7xl
mx-auto
p-4 md:p-8
mb-20
">

<h1 className="
text-3xl
md:text-6xl
font-bold
mb-8
">
Journal Entry
</h1>

<div className="
border
rounded-3xl
p-4 md:p-8
">

<div className="
flex
flex-col
md:flex-row
justify-between
gap-4
mb-8
">

<h2 className="
text-xl
md:text-5xl
font-bold
break-words
">
Appointment :
{selectedJournal.appointmentNo || "-"}
</h2>

<button
onClick={() => window.print()}
className="
bg-blue-600
text-white
px-6
py-3
rounded-xl
w-full
md:w-auto
"
>
Print
</button>

</div>

<div className="
grid
grid-cols-1
lg:grid-cols-2
gap-8
">

<div className="space-y-3">

<p>
<b>Patient :</b>
{" "}
{selectedJournal.patientName || "-"}
</p>

<p>
<b>Doctor :</b>
{" "}
{selectedJournal.doctorName || "-"}
</p>

<p>
<b>Date :</b>
{" "}
{selectedJournal.date || "-"}
</p>

<p>
<b>Requirement :</b>
{" "}
{selectedJournal.reason || "-"}
</p>

<p>
<b>Doctor Notes :</b>
{" "}
{selectedJournal.solution || "-"}
</p>

<p>
<b>Lab Tests :</b>
{" "}
{
selectedJournal.labTests?.length
? selectedJournal.labTests.join(", ")
: "No Lab Test"
}
</p>

</div>

<div className="space-y-3">

<p>
<b>Age :</b>
{" "}
{selectedJournal.age || "-"}
</p>

<p>
<b>Phone :</b>
{" "}
{selectedJournal.patientPhone ||
 selectedJournal.phone ||
 "-"}
</p>

<p>
<b>Address :</b>
{" "}
{selectedJournal.address || "-"}
</p>

<p>
<b>Time :</b>
{" "}
{selectedJournal.time || "-"}
</p>

<p>
<b>Emergency Contact :</b>
{" "}
{selectedJournal.emergencyContact ||
 selectedJournal.emrContact ||
 "-"}
</p>

<p>
<b>Payment Status :</b>
{" "}
{selectedJournal.paymentStatus || "Paid"}
</p>

</div>

</div>

<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-5
mt-10
mb-10
">

<div className="
bg-green-100
rounded-2xl
p-6
">

<h3 className="
font-bold
text-xl
mb-2
">
Consultancy Fee
</h3>

₹ {selectedJournal.consultancyFee || 0}

</div>

<div className="
bg-blue-100
rounded-2xl
p-6
">

<h3 className="
font-bold
text-xl
mb-2
">
Medicine Fee
</h3>

₹ {selectedJournal.medicineFee || 0}

</div>

<div className="
bg-yellow-100
rounded-2xl
p-6
">

<h3 className="
font-bold
text-xl
mb-2
">
Total
</h3>

₹ {selectedJournal.totalAmount || 0}

</div>

</div>

<div className="
mt-10
pt-6
border-t
flex
justify-center
">

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

)}



{showPatientPopup && (

<div
className="
fixed inset-0
bg-black/50
z-[9999999]
flex items-center justify-center
p-2 md:p-4
"
>

<div
className="
bg-white
w-[90vw]
max-w-[900px]
h-auto
max-h-[85vh]
overflow-y-auto
rounded-3xl
relative
p-5 md:p-6
"
>

<button
onClick={() => setShowPatientPopup(false)}
className="
absolute
top-6
right-6
w-10
h-10
flex
items-center
justify-center
rounded-full
bg-red-500
text-white
font-bold
shadow-lg
hover:bg-red-600
z-[999999]
"
>
✕
</button>


<div className="
flex flex-col md:flex-row
w-full
border rounded-lg
overflow-hidden
min-h-[500px]
">

<div className="
w-full md:w-[220px]
p-4
flex md:block
gap-2
overflow-x-auto
md:space-y-3
">

              <h2 className="hidden md:block text-xl font-bold mb-3">
  Create Patient Account
</h2>

             <button
onClick={() => setStep(1)}
className={`min-w-[140px] md:w-full p-3 rounded-xl text-white ${
step === 1
? "bg-blue-500"
: "bg-gray-400"
}`}
>
Basic Info
</button>

<button
onClick={() => setStep(2)}
className={`min-w-[140px] md:w-full p-3 rounded-xl text-white ${
step === 2
? "bg-blue-500"
: "bg-gray-400"
}`}
>
Reason
</button>

<button
onClick={() => setStep(3)}
className={`min-w-[140px] md:w-full p-3 rounded-xl text-white ${
step === 3
? "bg-blue-500"
: "bg-gray-400"
}`}
>
Create Account
</button>

            </div>




<div className="
w-full md:w-3/4
p-4 md:p-6
flex
flex-col
bg-white
min-h-[420px]
">

              {step === 1 && (

                <div>

                  <h3 className="text-lg font-bold mb-6">
                    Basic Information
                  </h3>

<div
className="
grid
grid-cols-1
gap-4
max-w-[700px]
"
>


                   <div>
<FloatingInput
label="Name"
required
value={basicInfo.name}
disabled={isViewMode}
onChange={(e) => {

setBasicInfo({
  ...basicInfo,
  name: e.target.value
});

setAccountInfo({
  ...accountInfo,
  username: e.target.value
});

}}
/>
</div>


                   <div className="lg:col-span-2">
<FloatingInput
label="Address"
required
inputClassName="h-[80px] pt-6"
value={basicInfo.address}
disabled={isViewMode}
onChange={(e)=>
setBasicInfo({
...basicInfo,
address:e.target.value
})
}
/>
</div>

<div className="lg:col-span-2">

                      <FloatingInput label="Contact Number" required value={basicInfo.contact}
                        disabled={isViewMode} onChange={(e) => setBasicInfo({ ...basicInfo, contact: e.target.value })}
                      />

                    </div>

                  </div>

                  <div className="
mt-6
flex
justify-center md:justify-end
gap-4
flex-wrap
">
  
  <button
  onClick={() => setStep(2)}
  className="
  px-6 py-3
  rounded-xl
  bg-gray-500
  text-white
  "
>
  Skip
</button>
                    <button
onClick={() => {

if(
!basicInfo.name.trim() ||
!basicInfo.address.trim() ||
!basicInfo.contact.trim()
){
alert(
"Name, Address, Contact Number required"
);
return;
}

setStep(2);

}}
className="
bg-blue-600
hover:bg-blue-700
text-white
px-10
py-3
rounded-xl
font-semibold
"
>
Next
</button>
                  </div>

                  

                </div>

              )}

              {step === 2 && (

                <div>

                  <h3 className="text-lg font-bold mb-6">
                    Reason
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">

                    <FloatingInput label="Reason For Visit *" value={reasonInfo.visitReason} disabled={isViewMode}
                      onChange={(e) => setReasonInfo({ ...reasonInfo, visitReason: e.target.value })}
                    />

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

                    <button
  onClick={() => setStep(3)}
  className="
  px-6 py-3
  rounded-xl
  bg-gray-500
  text-white
  "
>
  Skip
</button>

                    <button
onClick={() => {

if(
!reasonInfo.visitReason.trim()
){
alert(
" Reason For Visit required"
);
return;
}

setStep(3);

}}
className="
bg-blue-600
hover:bg-blue-700
text-white
px-8
py-3
rounded-xl
font-semibold
"
>
Next
</button>


                  </div>

                </div>

              )}

              {step === 3 && (

                <div>

                  <h3 className="text-lg font-bold mb-6">
                    Create Account
                  </h3>

                  <div className="flex flex-col gap-6 max-w-md">

                    <FloatingInput label="Username *" value={accountInfo.username}
                      disabled={isViewMode} onChange={(e) => setAccountInfo({ ...accountInfo, username: e.target.value })}
                    />

                    <FloatingInput label="Password *" type="password" value={accountInfo.password}
                      disabled={isViewMode} onChange={(e) => setAccountInfo({ ...accountInfo, password: e.target.value })}
                    />

                    <FloatingInput label="Confirm Password *" type="password" value={accountInfo.confirmPassword}
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
                    <button
  onClick={() => {
    setShowPatientPopup(false);
    setStep(1);
  }}
  className="
  bg-gray-500
  hover:bg-gray-600
  text-white
  px-8
  py-3
  rounded-xl
  font-semibold
  "
>
  Skip
</button>

                    <button
onClick={() => {

if(
!accountInfo.username.trim() ||
!accountInfo.password.trim() ||
!accountInfo.confirmPassword.trim()
){
alert(
"Username, Password, Confirm Password required"
);
return;
}

if(
accountInfo.password !==
accountInfo.confirmPassword
){
alert(
"Password mismatch"
);
return;
}

const handleBookAppointment = async () => {

  try{
  
  if(!selectedPatientData){
  alert("Select Patient");
  return;
  }
  
  if(!selectedDoctor){
  alert("Select Doctor");
  return;
  }
  
  if(!selectedSlot){
  alert("Select Slot");
  return;
  }
  
  const appointmentId =
  Date.now().toString();
  
  await setDoc(
    doc(db,"appointments",appointmentId),
    {
      appointmentNo,
      patientName:selectedPatientData.patientName,
      patientEmail:selectedPatientData.patientEmail,
      patientPhone:selectedPatientData.patientPhone,
      address:selectedPatientData.address,
      reason:selectedPatientData.reason,
      doctorName:selectedDoctor.name,
      date:appointmentDate,
      time:selectedSlot,
      status:"pending",
      createdAt:new Date()
    }
  );
  
  await fetchPatients();
  
  alert("Appointment Booked Successfully");
    
    await fetchPatients();
    
    setSelectedDoctor(null);
    setSelectedSlot("");
    setAppointmentNo("");
  
  }
  catch(error){
  
  console.log(error);
  alert("Booking Failed");
  
  }
  
  };

handleCreatePatient();

}}
className="
bg-green-600
hover:bg-green-700
text-white
px-8
py-3
rounded-xl
font-semibold
"
>
Completed
</button>

                  </div>

                </div>

              )}

            </div>

          </div>

</div>

</div>

)}



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
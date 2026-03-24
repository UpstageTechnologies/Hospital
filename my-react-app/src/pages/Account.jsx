import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth, db } from "../firebase"
import { doc, setDoc, getDoc, deleteDoc, updateDoc } from "firebase/firestore"
import { collection, getDocs } from "firebase/firestore"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import FloatingInput from "../components/FloatingInput"
import { createUserWithEmailAndPassword } from "firebase/auth"



const Account = () => {

  const [menu, setMenu] = useState("home")
  const [subMenu, setSubMenu] = useState("")


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
  const [patientAccounts, setPatientAccounts] = useState([])
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
    fetchPatients()

  }, [])




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

  const fetchPatients = async () => {

    try {

      const querySnapshot = await getDocs(collection(db, "patients"))

      const patientList = []

      querySnapshot.forEach((doc) => {
        patientList.push(doc.data())
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

  const handleCreatePatient = async () => {
    try {

      const patientId = basicInfo.email

      await setDoc(doc(db, "patients", patientId), {
        basicInfo,
        insuranceInfo,
        medicalHistory,
        reasonInfo,
        accountInfo,
        isDisabled: false
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
        doctorBasicInfo,
        doctorDesignation,
        doctorOfficial,
        doctorAccount,
        isDisabled: false
      })

      alert("Doctor saved")

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

  return (

    <div className="flex flex-col md:flex-row min-h-screen w-full">

      <div className="w-64 bg-blue-600 text-white p-4 md:p-6 h-auto md:h-screen">

        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-gray-200" onClick={() => setMenu("home")} >
            Home
          </li>

          <li className="cursor-pointer hover:text-gray-200" onClick={() => setMenu("subscription")} >
            Subscription
          </li>

          <li className="cursor-pointer hover:text-gray-200" onClick={() => setMenu(menu === "account" ? null : "account")} >
            Account Creation
          </li>
          {menu === "account" && (
            <ul className="ml-4 mt-2 space-y-2 text-sm">

              <li className="cursor-pointer hover:text-gray-200" onClick={() => setSubMenu("admins")}>
                Admins
              </li>

              <li className="cursor-pointer hover:text-gray-200" onClick={() => setSubMenu("doctors")}>
                Doctors
              </li>

              <li className="cursor-pointer hover:text-gray-200" onClick={() => setSubMenu("staff")}>
                Other Staffs
              </li>

              <li className="cursor-pointer hover:text-gray-200" onClick={() => setSubMenu("patients")}>
                Patients
              </li>

            </ul>
          )}

          <li className="cursor-pointer hover:text-gray-200" onClick={() => setMenu("doctors")} >
            Doctors
          </li>

        </ul>

      </div>


      <div className="flex-1 p-4 md:p-6 overflow-auto">

        {subMenu === "admins" && (

          <div className="flex w-full max-w-7xl border rounded-lg overflow-hidden h-[450px]">

            <div className="w-1/4 p-4 space-y-3">
              <h2 className="text-xl font-bold">Create Admin Account</h2>

              <button onClick={() => setAdminStep(1)}
                className={`w-full p-2 rounded text-white ${adminStep === 1 ? "bg-blue-500" : "bg-gray-400"}`}>
                Basic Info
              </button>

              <button onClick={() => setAdminStep(2)}
                className={`w-full p-2 rounded text-white ${adminStep === 2 ? "bg-blue-500" : "bg-gray-400"}`}>
                Designation
              </button>

              <button onClick={() => setAdminStep(3)}
                className={`w-full p-2 rounded text-white ${adminStep === 3 ? "bg-blue-500" : "bg-gray-400"}`}>
                Official Info
              </button>

              <button onClick={() => setAdminStep(4)}
                className={`w-full p-2 rounded text-white ${adminStep === 4 ? "bg-blue-500" : "bg-gray-400"}`}>
                Account
              </button>

            </div>



            <div className="w-3/4 p-6 relative overflow-hidden h-[450px]">



              {adminStep === 1 && (
                <div>

                  <h3 className="text-lg font-bold mb-6">
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">


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


                    <FloatingInput label="Address" className="col-span-2" inputClassName="h-[120px] pt-6" value={adminBasicInfo.address || ""} disabled={isViewMode}
                      onChange={(e) =>
                        setAdminBasicInfo({ ...adminBasicInfo, address: e.target.value })
                      }
                    />


                    <div className="col-span-2 flex flex-col gap-4">

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


                    <FloatingInput label="Email" className="col-span-2" value={adminBasicInfo.email} disabled={isViewMode}
                      onChange={(e) =>
                        setAdminBasicInfo({ ...adminBasicInfo, email: e.target.value })
                      }
                    />


                    <FloatingInput label="Occupation" className="col-span-2" value={adminBasicInfo.occupation || ""} disabled={isViewMode}
                      onChange={(e) =>
                        setAdminBasicInfo({ ...adminBasicInfo, occupation: e.target.value })
                      }
                    />

                  </div>

                  <div className="absolute bottom-4 right-6 flex gap-4">
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

                  <div className="absolute bottom-4 right-6 flex gap-4">
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

                  <div className="absolute bottom-4 right-6 flex gap-4">
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

                  <div className="absolute bottom-4 right-6 flex gap-4">

                    <button
                      onClick={() => setAdminStep(3)}
                      className="bg-gray-500 text-white px-6 py-2 rounded">
                      Previous
                    </button>

                    <button
                      onClick={isEditMode ? handleUpdateAdmin : handleCreateAdminFull}
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

            <h2 className="text-xl font-bold mb-4">Created Admin Accounts</h2>

            <table className="w-full border border-gray-300">

              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">Full Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Password</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>

              <tbody>

                {adminsAccounts.map((adm, index) => (
                  <tr key={index}>

                    <td className="border p-2">
                      {adm.adminBasicInfo?.name}
                    </td>

                    <td className="border p-2">
                      {adm.adminBasicInfo?.email}
                    </td>

                    <td className="border p-2">
                      {adm.adminAccount?.password}
                    </td>

                    <td className="border p-2 flex gap-2">

                      <button onClick={() => {

                        setAdminBasicInfo(adm.adminBasicInfo)
                        setAdminDesignation(adm.adminDesignation)
                        setAdminOfficial(adm.adminOfficial)
                        setAdminAccount(adm.adminAccount)

                        setIsViewMode(true)
                        setAdminStep(1)

                      }} className="bg-green-500 text-white px-2 py-1 rounded">
                        View
                      </button>

                      <button
                        onClick={() => {
                          setAdminBasicInfo(adm.adminBasicInfo)
                          setAdminDesignation(adm.adminDesignation)
                          setAdminOfficial(adm.adminOfficial)
                          setAdminAccount(adm.adminAccount)

                          setIsViewMode(false)
                          setIsEditMode(true)
                          setAdminStep(1)
                        }}
                      >
                        Edit
                      </button>

                      <button onClick={async () => {
                          await deleteDoc(doc(db, "admins", adm.id))
                          fetchAdmins()
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>

                      <button onClick={async () => {
                          await updateDoc(doc(db, "admins", adm.id), {
                            isDisabled: !adm.isDisabled
                          })
                          fetchAdmins()
                        }}
                        className={`px-2 py-1 rounded text-white ${adm.isDisabled ? "bg-green-500" : "bg-gray-500"
                          }`}
                      >
                        {adm.isDisabled ? "Enable" : "Disable"}
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        )}

        {subMenu === "doctors" && (

          <div className="flex w-full max-w-7xl border rounded-lg overflow-hidden h-[450px]">


            <div className="w-1/4 p-4 space-y-3">

              <h2 className="text-xl font-bold mb-4">Create Doctor Account</h2>

              <button onClick={() => setDoctorStep(1)}
                className={`w-full p-2 rounded text-white ${doctorStep === 1 ? "bg-blue-500" : "bg-gray-400"}`}>
                Basic Info
              </button>

              <button onClick={() => setDoctorStep(2)}
                className={`w-full p-2 rounded text-white ${doctorStep === 2 ? "bg-blue-500" : "bg-gray-400"}`}>
                Designation
              </button>

              <button onClick={() => setDoctorStep(3)}
                className={`w-full p-2 rounded text-white ${doctorStep === 3 ? "bg-blue-500" : "bg-gray-400"}`}>
                Official Info
              </button>

              <button onClick={() => setDoctorStep(4)}
                className={`w-full p-2 rounded text-white ${doctorStep === 4 ? "bg-blue-500" : "bg-gray-400"}`}>
                Account
              </button>

            </div>


            <div className="w-3/4 p-6 relative overflow-hidden h-[450px]">


              {doctorStep === 1 && (

                <div>

                  <h3 className="text-lg font-bold mb-6">
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">


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

                  <div className="absolute bottom-4 right-6 flex gap-4">
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

                  <div className="absolute bottom-4 right-6 flex gap-4">

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

                  <div className="absolute bottom-4 right-6 flex gap-4">
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

                  <div className="absolute bottom-4 right-6 flex gap-4">

                    <button onClick={() => setDoctorStep(3)} className="bg-gray-500 text-white px-8 py-2 rounded">
                      Previous
                    </button>

                    <button onClick={handleCreateDoctorFull} className="bg-green-500 text-white px-8 py-2 rounded">
                      Create Doctor
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
                  <th className="border p-2">age</th>
                  <th className="border p-2">address</th>
                  <th className="border p-2">contact</th>
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
                      {docData.doctorBasicInfo?.age}
                    </td>

                    <td className="border p-2">
                      {docData.doctorBasicInfo?.address}
                    </td>

                    <td className="border p-2">
                      {docData.doctorBasicInfo?.contact}
                    </td>

                    <td className="border p-2 flex gap-2">


                      <button
                        onClick={() => {
                          setDoctorBasicInfo(docData.doctorBasicInfo)
                          setDoctorDesignation(docData.doctorDesignation)
                          setDoctorOfficial(docData.doctorOfficial)
                          setDoctorAccount(docData.doctorAccount)

                          setIsViewMode(true)
                          setDoctorStep(1)
                        }}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        View
                      </button>


                      <button
                        onClick={() => {
                          setDoctorBasicInfo(docData.doctorBasicInfo)
                          setDoctorDesignation(docData.doctorDesignation)
                          setDoctorOfficial(docData.doctorOfficial)
                          setDoctorAccount(docData.doctorAccount)

                          setIsViewMode(false)
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


        {subMenu === "staff" && (

          <div className="flex w-full max-w-7xl border rounded-lg overflow-hidden h-[450px]">

            <div className="w-1/4 p-4 space-y-3">

              <h2 className="text-xl font-bold mb-4">Create Staff Account</h2>

              <button onClick={() => setStaffStep(1)} className={`w-full p-2 rounded text-white ${staffStep === 1 ? "bg-blue-500" : "bg-gray-400"}`}>
                Basic Info
              </button>

              <button onClick={() => setStaffStep(2)} className={`w-full p-2 rounded text-white ${staffStep === 2 ? "bg-blue-500" : "bg-gray-400"}`}>
                Designation
              </button>

              <button onClick={() => setStaffStep(3)} className={`w-full p-2 rounded text-white ${staffStep === 3 ? "bg-blue-500" : "bg-gray-400"}`}>
                Official Info
              </button>

              <button onClick={() => setStaffStep(4)} className={`w-full p-2 rounded text-white ${staffStep === 4 ? "bg-blue-500" : "bg-gray-400"}`}>
                create Account
              </button>

            </div>


            <div className="w-3/4 p-6 relative overflow-hidden h-[450px]">


              {staffStep === 1 && (

                <div>

                  <h3 className="text-lg font-bold mb-6">
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">


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

                  <div className="absolute bottom-4 right-6 flex gap-4">
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

                  <div className="absolute bottom-4 right-6 flex gap-4">

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

                  <div className="absolute bottom-4 right-6 flex gap-4">
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

                  <div className="absolute bottom-4 right-6 flex gap-4">

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

        {subMenu === "patients" && (

          <div className="flex w-full max-w-7xl border rounded-lg overflow-hidden h-[500px]">

            <div className="w-1/4 p-4 space-y-3">

              <h2 className="text-xl font-bold mb-3">
                Create Patient Account
              </h2>

              <button onClick={() => setStep(1)} className={`w-full p-2 rounded text-white ${step === 1 ? "bg-blue-500" : "bg-gray-400"}`}>
                Basic Info
              </button>

              <button onClick={() => setStep(2)} className={`w-full p-2 rounded text-white ${step === 2 ? "bg-blue-500" : "bg-gray-400"}`}>
                Insurance
              </button>

              <button onClick={() => setStep(3)} className={`w-full p-2 rounded text-white ${step === 3 ? "bg-blue-500" : "bg-gray-400"}`}>
                Medical History
              </button>

              <button onClick={() => setStep(4)} className={`w-full p-2 rounded text-white ${step === 4 ? "bg-blue-500" : "bg-gray-400"}`}>
                Reason
              </button>

              <button onClick={() => setStep(5)} className={`w-full p-2 rounded text-white ${step === 5 ? "bg-blue-500" : "bg-gray-400"}`}>
                Create Account
              </button>

            </div>




            <div className="w-3/4 p-6 relative overflow-hidden">

              {step === 1 && (

                <div>

                  <h3 className="text-lg font-bold mb-6">
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">


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

                  <div className="absolute bottom-4 right-6 flex gap-4">
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

                  <div className="absolute bottom-4 right-6 flex gap-4">

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

                  <div className="absolute bottom-4 right-6 flex gap-4">

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

                  <div className="absolute bottom-4 right-6 flex gap-4">

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

                  <div className="absolute bottom-4 right-6 flex gap-4">

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



        {menu === "home" && (
          <div>
            <p className="text-2xl font-bold">Welcome Master Admin</p>
          </div>
        )}

        {menu === "subscription" && (
          <div>
            <h1 className="text-2xl font-bold">Subscription</h1>
          </div>
        )}

        {menu === "doctors" && (

          <div>

            <h1 className="text-2xl font-bold mb-6">Doctors</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">

              {doctorList.map((doc) => (

                <div
                  key={doc.id}
                  onClick={() => navigate(`/appointment/${doc.id}`)}
                  className="cursor-pointer border border-blue-200 rounded-xl overflow-hidden hover:translate-y-[-8px] transition duration-300 max-w-[240px]"
                >

                  <img
                    src={doc.image}
                    className="bg-blue-50 w-full h-[150px] object-cover"
                  />

                  <div className="p-3">

                    <div className="flex items-center gap-2 text-green-500 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p>Available</p>
                    </div>

                    <p className="font-semibold">{doc.name}</p>
                    <p className="text-gray-600">{doc.speciality}</p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

        {viewData && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">

            <div className="bg-white p-6 rounded shadow w-80">

              <h2 className="text-lg font-bold mb-3">Account Details</h2>

              <p><b>Name:</b> {viewData.name}</p>

              {viewData.email && (
                <p><b>Email:</b> {viewData.email}</p>
              )}

              {viewData.staffId && (
                <p><b>Staff ID:</b> {viewData.staffId}</p>
              )}

              {viewData.address && (
                <p><b>Address:</b> {viewData.address}</p>
              )}

              {viewData.experience && (
                <p><b>Experience:</b> {viewData.experience}</p>
              )}

              {viewData.password && (
                <p><b>Password:</b> {viewData.password}</p>
              )}

              <button onClick={() => setViewData(null)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Close
              </button>

            </div>

          </div>
        )}

        {editData && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white p-6 rounded shadow w-80">

              <h2 className="text-lg font-bold mb-3">Edit Account</h2>
              <input className="border p-2 w-full mb-3" placeholder="Name" value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {editCollection !== "staffs" && (
                <input className="border p-2 w-full mb-3" placeholder="Email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}

              {editCollection === "staffs" && (
                <>
                  <input className="border p-2 w-full mb-3" placeholder="Staff ID" value={staffId}
                    onChange={(e) => setStaffId(e.target.value)} />

                  <input className="border p-2 w-full mb-3" placeholder="Address" value={address}
                    onChange={(e) => setAddress(e.target.value)} />

                  <input className="border p-2 w-full mb-3" placeholder="Experience" value={experience}
                    onChange={(e) => setExperience(e.target.value)} />
                </>
              )}

              <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded" >
                Save
              </button>

            </div>
          </div>
        )}

      </div>

    </div >

  )

}

export default Account
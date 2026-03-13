import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth, db } from "../firebase"
import { doc, setDoc, getDoc, deleteDoc, updateDoc } from "firebase/firestore"
import { collection, getDocs } from "firebase/firestore"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";



const Account = () => {

  const [menu, setMenu] = useState("home")
  const [subMenu, setSubMenu] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [staffId, setStaffId] = useState("")
  const [address, setAddress] = useState("")
  const [experience, setExperience] = useState("")
  const [accounts, setAccounts] = useState([])
  const [doctorAccounts, setDoctorAccounts] = useState([])
  const [adminsAccounts, setAdminsAccounts] = useState([])
  const [patientAccounts, setPatientAccounts] = useState([])
  const navigate = useNavigate();
  const [viewData, setViewData] = useState(null)
  const [editData, setEditData] = useState(null)
  const [editCollection, setEditCollection] = useState("")
  const [step, setStep] = useState(1)
  const [editIndex, setEditIndex] = useState(null)

  const [basicInfo, setBasicInfo] = useState({
    name: "",
    age: "",
    address: "",
    contact: ""
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

  const [patients, setPatients] = useState(
    JSON.parse(localStorage.getItem("patients")) || []
  )

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients))
  }, [patients])



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

    try {

      const querySnapshot = await getDocs(collection(db, "staffs"))

      const staffList = []

      querySnapshot.forEach((doc) => {
        staffList.push(doc.data())
      })

      setAccounts(staffList)

    } catch (error) {
      console.log(error)
    }

  }


  const fetchDoctors = async () => {

    try {

      const querySnapshot = await getDocs(collection(db, "doctors"))

      const doctorList = []

      querySnapshot.forEach((doc) => {
        doctorList.push(doc.data())
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
        adminsList.push(doc.data())
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

  return (

    <div className="flex min-h-screen w-full">

      <div className="w-64 bg-blue-600 text-white p-6 min-h-screen">

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


      <div className="flex-1 p-6">

        {subMenu === "admins" && (

          <div className="max-w-md border p-6 rounded-lg shadow">

            <h2 className="text-xl font-bold mb-4">Create Admin Account</h2>

            <form className="flex flex-col gap-4">

              <input type="text" placeholder="Full Name" className="border p-2 rounded" value={name}
                onChange={(e) => setName(e.target.value)} />

              <input type="email" placeholder="Email" className="border p-2 rounded" value={email}
                onChange={(e) => setEmail(e.target.value)} />

              <div className="relative">

                <input type={showPassword ? "text" : "password"} placeholder="Password" className="border p-2 rounded w-full pr-10"
                  value={password} onChange={(e) => setPassword(e.target.value)} />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>

              </div>

              <button type="button" onClick={() => createAccount("admins")} className="bg-blue-500 text-white py-2 rounded" >
                Create Admins
              </button>

            </form>

          </div>

        )}

        {subMenu === "admins" && adminsAccounts.length > 0 && (

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

                    <td className="border p-2">{adm.name}</td>
                    <td className="border p-2">{adm.email}</td>
                    <td className="border p-2">{adm.password}</td>
                    <td className="border p-2 flex gap-2">

                      <button onClick={() => handleView(adm)} className="bg-green-500 text-white px-2 py-1 rounded">
                        View
                      </button>

                      <button onClick={() => handleEdit(adm)} className="bg-blue-500 text-white px-2 py-1 rounded">
                        Edit
                      </button>

                      <button onClick={() => handleDelete("admins", adm.email)} className="bg-red-500 text-white px-2 py-1 rounded">
                        Delete
                      </button>

                      <button className="bg-gray-500 text-white px-2 py-1 rounded">
                        Disable
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        )}

        {subMenu === "doctors" && (

          <div className="max-w-md border p-6 rounded-lg shadow">

            <h2 className="text-xl font-bold mb-4">Create Doctor Account</h2>

            <form className="flex flex-col gap-4">

              <input type="text" placeholder="Full Name" className="border p-2 rounded" value={name}
                onChange={(e) => setName(e.target.value)} />

              <input type="email" placeholder="Email" className="border p-2 rounded" value={email}
                onChange={(e) => setEmail(e.target.value)} />

              <div className="relative">

                <input type={showPassword ? "text" : "password"} placeholder="Password" className="border p-2 rounded w-full pr-10"
                  value={password} onChange={(e) => setPassword(e.target.value)} />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)} >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>

              </div>

              <button type="button" onClick={() => createAccount("doctors")} className="bg-blue-500 text-white py-2 rounded">
                Create Doctor
              </button>

            </form>

          </div>

        )}

        {subMenu === "doctors" && doctorAccounts.length > 0 && (

          <div className="mt-10">

            <h2 className="text-xl font-bold mb-4">Created Doctor Accounts</h2>

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

                {doctorAccounts.map((doc, index) => (

                  <tr key={index}>

                    <td className="border p-2">{doc.name}</td>
                    <td className="border p-2">{doc.email}</td>
                    <td className="border p-2">{doc.password}</td>

                    <td className="border p-2 flex gap-2">

                      <button onClick={() => handleView(doc)} className="bg-green-500 text-white px-2 py-1 rounded">
                        View
                      </button>

                      <button onClick={() => handleEdit(doc, "doctors")} className="bg-blue-500 text-white px-2 py-1 rounded">
                        Edit
                      </button>

                      <button onClick={() => handleDelete("doctors", doc.email)} className="bg-red-500 text-white px-2 py-1 rounded">
                        Delete
                      </button>

                      <button className="bg-gray-500 text-white px-2 py-1 rounded">
                        Disable
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}


        {subMenu === "staff" && (

          <div className="max-w-md border p-6 rounded-lg shadow">

            <h2 className="text-xl font-bold mb-4">Create Staff Account</h2>

            <form className="flex flex-col gap-4">

              <input type="text" placeholder="Full Name" className="border p-2 rounded" value={name}
                onChange={(e) => setName(e.target.value)} />

              <input type="email" placeholder="Email" className="border p-2 rounded" value={email}
                onChange={(e) => setEmail(e.target.value)} />

              <input type="text" placeholder="Staff ID" className="border p-2 rounded" value={staffId}
                onChange={(e) => setStaffId(e.target.value)} />

              <input type="text" placeholder="Address" className="border p-2 rounded" value={address}
                onChange={(e) => setAddress(e.target.value)} />

              <input type="text" placeholder="Experience" className="border p-2 rounded" value={experience}
                onChange={(e) => setExperience(e.target.value)} />

              <div className="relative">

                <input type={showPassword ? "text" : "password"} placeholder="Password" className="border p-2 rounded w-full pr-10"
                  value={password} onChange={(e) => setPassword(e.target.value)} />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>

              </div>

              <button type="button" onClick={() => createAccount("staffs")} className="bg-blue-500 text-white py-2 rounded">
                Create Staff
              </button>

            </form>

          </div>
        )}

        {subMenu === "staff" && accounts.length > 0 && (

          <div className="mt-10">

            <h2 className="text-xl font-bold mb-4">Created Staff Accounts</h2>

            <table className="w-full border border-gray-300">

              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">Full Name</th>
                  <th className="border p-2">Staff ID</th>
                  <th className="border p-2">Address</th>
                  <th className="border p-2">Experience</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>

              <tbody>

                {accounts.map((acc, index) => (
                  <tr key={index}>

                    <td className="border p-2">{acc.name}</td>
                    <td className="border p-2">{acc.staffId}</td>
                    <td className="border p-2">{acc.address}</td>
                    <td className="border p-2">{acc.experience}</td>
                    <td className="border p-2 flex gap-2">

                      <button onClick={() => handleView(acc)} className="bg-green-500 text-white px-2 py-1 rounded">
                        View
                      </button>

                      <button onClick={() => handleEdit(acc, "staffs")} className="bg-blue-500 text-white px-2 py-1 rounded">
                        Edit
                      </button>

                      <button onClick={() => handleDelete("staffs", acc.staffId)} className="bg-red-500 text-white px-2 py-1 rounded">
                        Delete
                      </button>

                      <button className="bg-gray-500 text-white px-2 py-1 rounded">
                        Disable
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        )}

        {subMenu === "patients" && (

          <div className="flex w-full">

            <div className="w-1/4 border rounded p-4 space-y-3">

              <h2 className="text-xl font-bold mb-3">
                Create Patient Account
              </h2>

              <button onClick={() => setStep(1)} className="w-full bg-blue-500 text-white p-2 rounded">
                Basic Info
              </button>

              <button onClick={() => setStep(2)} className="w-full bg-blue-500 text-white p-2 rounded">
                Insurance
              </button>

              <button onClick={() => setStep(3)} className="w-full bg-blue-500 text-white p-2 rounded">
                Medical History
              </button>

              <button onClick={() => setStep(4)} className="w-full bg-blue-500 text-white p-2 rounded">
                Reason
              </button>

            </div>




            <div className="w-3/4 border rounded p-6 min-h-[350px] relative">

              {step === 1 && (

                <div>

                  <h3 className="text-lg font-bold mb-6">
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-4 gap-6 max-w-3xl">

                    <input type="text" placeholder="Name" className="border p-2" value={basicInfo.name} required
                      onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })} 
                    />

                    <input type="number" placeholder="Age" className="border p-2" value={basicInfo.age} required
                      onChange={(e) => setBasicInfo({ ...basicInfo, age: e.target.value })} 
                    />

                    <select className="border p-2" value={basicInfo.gender}
                      onChange={(e) => setBasicInfo({ ...basicInfo, gender: e.target.value })}
                    >
                      <option>Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>

                    <input type="date" placeholder="DOB" className="border p-2 " />
                    <input type="text" placeholder="Address" className="border p-2 col-span-3" value={basicInfo.address} required
                      onChange={(e) => setBasicInfo({ ...basicInfo, address: e.target.value })} 
                    />

                    <input type="tel" placeholder="Contact" className="border p-2" value={basicInfo.contact} required
                      onChange={(e) => setBasicInfo({ ...basicInfo, contact: e.target.value })} 
                    />

                    <input type="text" placeholder="EMR Contact" className="border p-2" />
                    <input type="email" placeholder="Email" className="border p-2 " />
                    <input type="text" placeholder="Occupation" className="border p-2 col-span-2" />

                  </div>

                  <div className="absolute bottom-4 right-6 flex gap-4">

                    <button
                      onClick={() => setStep(2)}
                      className="bg-blue-500 text-white px-8 py-2 rounded"
                    >
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

                  <div className="grid grid-cols-2 gap-6 max-w-3xl">

                    <input type="text" placeholder="Insurance Provider" className="border p-2" />
                    <input type="text" placeholder="Policy Number" className="border p-2" />
                    <input type="text" placeholder="Agent Name" className="border p-2" />
                    <input type="text" placeholder="Agent Number" className="border p-2" />

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

                  <h3 className="text-lg font-bold mb-6">
                    Medical History
                  </h3>

                  <div className="grid grid-cols-2 gap-6 max-w-3xl">

                    <input type="text" placeholder="Blood Group" className="border p-2" />

                    <div className="flex items-center gap-4">

                      <p className="text-sm">Already Treated</p>

                      <label className="flex items-center gap-1">
                        <input type="radio" name="treated" />
                        Yes
                      </label>

                      <label className="flex items-center gap-1">
                        <input type="radio" name="treated" />
                        No
                      </label>

                    </div>

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

                  <div className="grid grid-cols-2 gap-6 max-w-3xl">

                    <input type="text" placeholder="Current Condition" className="border p-2" />
                    <input type="text" placeholder="Reason for Visit" className="border p-2" />
                    <input type="text" placeholder="Primary Reason for Visit" className="border p-2" />
                    <input type="text" placeholder="How long have you had this issue?" className="border p-2" />

                    <div className="flex items-center gap-4 col-span-2">

                      <p>Have you been treated for this before?</p>

                      <label className="flex items-center gap-1">
                        <input type="radio" name="treatedBefore" />
                        Yes
                      </label>

                      <label className="flex items-center gap-1">
                        <input type="radio" name="treatedBefore" />
                        No
                      </label>

                    </div>

                  </div>

                  <div className="absolute bottom-4 right-6 flex gap-4">

                    <button onClick={() => setStep(3)} className="bg-gray-500 text-white px-6 py-2 rounded">
                      Previous
                    </button>

                    <button
                      onClick={() => {

                        if (editIndex !== null) {

                          const updated = [...patients]
                          updated[editIndex] = basicInfo
                          setPatients(updated)
                          setEditIndex(null)

                        } else {

                          setPatients([...patients, basicInfo])

                        }

                        setBasicInfo({
                          name: "",
                          age: "",
                          gender: "",
                          contact: ""
                        })

                        setStep(1)

                      }}

                      className="bg-green-500 text-white px-6 py-2 rounded"
                    >
                      Create Patient
                    </button>

                  </div>

                </div>

              )}

            </div>

          </div>

        )}

        {subMenu === "patients" && (

          <div className="mt-10">

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

                {patients.map((p, index) => (
                  <tr key={index}>

                    <td className="border p-2">{p.name}</td>
                    <td className="border p-2">{p.age}</td>
                    <td className="border p-2">{p.address}</td>
                    <td className="border p-2">{p.contact}</td>

                    <td className="border p-2 flex gap-2">

                      <button onClick={() => {
                        setBasicInfo(p)
                        setStep(1)
                      }} className="bg-green-500 text-white px-2 py-1 rounded">
                        View
                      </button>

                      <button onClick={() => {
                        setBasicInfo(p)
                        setEditIndex(index)
                        setStep(1)
                      }} className="bg-blue-500 text-white px-2 py-1 rounded">
                        Edit
                      </button>

                      <button onClick={() => {
                        const updated = patients.filter((_, i) => i !== index)
                        setPatients(updated)
                      }} className="bg-red-500 text-white px-2 py-1 rounded">
                        Delete
                      </button>

                      <button className="bg-gray-500 text-white px-2 py-1 rounded">
                        Disable
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

    </div>

  )

}

export default Account
import React, { useState, useEffect } from 'react'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { assets } from '../assets/assets'
import { db, auth } from "../firebase";


const MyProfile = () => {

  const [userData, setUserData] = useState(null)

  const [isEdit, setIsEdit] = useState(false)



  useEffect(() => {

    const email = localStorage.getItem("patientEmail")

    if (!email) {
      console.log("No email found ")
      return
    }

    const fetchData = async () => {

      const docRef = doc(db, "patients", email)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {

        setUserData(docSnap.data())

      } else {

        console.log("No patient data found ")

      }

    }

    fetchData()

  }, [])


  if (!userData) return <div>Patient Profile...</div>;

  return (
    <div className="flex min-h-screen">


      <div className="w-64 bg-blue-600 text-white p-6 space-y-6">
        {/* <p className="text-xl font-bold">Prescripto</p>
        <p>Home</p>
        <p>Subscription</p>
        <p>Account Creation</p>
        <p>Doctors</p> */}
      </div>


      <div className="flex-1 p-10">

        <div className="max-w-5xl mx-auto">


          <div className="flex items-center gap-6 mb-10">

            <img src={userData.image || assets.profile_pic} className="w-32 h-32 rounded-full object-cover" />

            <h1 className="text-3xl font-bold">
              {userData.basicInfo?.name}
            </h1>

          </div>


          <div className="grid grid-cols-2 gap-x-16 gap-y-6">


            <div className="space-y-4">

              {[
                { label: "Name", key: "name", section: "basicInfo" },
                { label: "Gender", key: "gender", section: "basicInfo" },
                { label: "Address", key: "address", section: "basicInfo" },
                { label: "EMR Contact", key: "emrContact", section: "basicInfo" },
                { label: "Occupation", key: "occupation", section: "basicInfo" },
                { label: "Policy Number", key: "policy", section: "insuranceInfo" },
                { label: "Agent Number", key: "agentNumber", section: "insuranceInfo" },
                { label: "Current Condition", key: "condition", section: "reasonInfo" },
                { label: "Primary Reason", key: "primaryReason", section: "reasonInfo" },
              ].map((item) => (
                <div key={item.label} className="grid grid-cols-[180px_1fr] items-center">
                  <span className="font-semibold">{item.label} :</span>

                  <input
                    disabled={!isEdit}
                    value={userData[item.section]?.[item.key] || ""}
                    className="border px-3 py-2 rounded w-full"
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        [item.section]: {
                          ...userData[item.section],
                          [item.key]: e.target.value
                        }
                      })
                    }
                  />
                </div>
              ))}

            </div>


            <div className="space-y-4">

              {[
                { label: "Age", key: "age", section: "basicInfo" },
                { label: "DOB", key: "dob", section: "basicInfo" },
                { label: "Contact", key: "contact", section: "basicInfo" },
                { label: "Email", key: "email", section: "basicInfo" },
                { label: "Insurance Provider", key: "provider", section: "insuranceInfo" },
                { label: "Agent Name", key: "agentName", section: "insuranceInfo" },
                { label: "Blood Group", key: "bloodGroup", section: "medicalHistory" },
                { label: "Reason For Visit", key: "visitReason", section: "reasonInfo" },
                { label: "Duration", key: "duration", section: "reasonInfo" },
              ].map((item) => (
                <div key={item.label} className="grid grid-cols-[180px_1fr] items-center">
                  <span className="font-semibold">{item.label} :</span>

                  <input
                    disabled={!isEdit}
                    value={userData[item.section]?.[item.key] || ""}
                    className="border px-3 py-2 rounded w-full"
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        [item.section]: {
                          ...userData[item.section],
                          [item.key]: e.target.value
                        }
                      })
                    }
                  />
                </div>
              ))}

            </div>

          </div>



          <div className="flex justify-end gap-6 mt-6">

            {!isEdit ? (
              <button onClick={() => setIsEdit(true)} className="border border-blue-500 px-8 py-2 rounded-full">
                Edit
              </button>
            ) : (
              <button onClick={async () => {

                const email = localStorage.getItem("patientEmail")
                const ref = doc(db, "patients", email)

                await updateDoc(ref, userData)

                alert("Saved")
                setIsEdit(false)

              }} className="bg-blue-500 text-white px-8 py-2 rounded-full">
                Save
              </button>
            )}

          </div>
        </div>
      </div>

    </div>


  )
}

export default MyProfile
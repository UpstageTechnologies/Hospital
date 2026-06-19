import React, { useEffect, useState } from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useNavigate } from "react-router-dom";

const StaffProfile = () => {

    const [staffData, setStaffData] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {

        const savedStaff =
        JSON.parse(localStorage.getItem("staffData"));
        
        if(savedStaff){
        setStaffData(savedStaff);
        }
        
        }, []);

    if (!staffData) return <p className="p-10">Loading...</p>

    const handleChange = (section, field, value) => {
        setStaffData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }))
    }

    const handleSave = async () => {

        const staffId = localStorage.getItem("staffId")
        const ref = doc(db, "staffs", staffId)

        await updateDoc(ref, staffData)

        alert("Saved Successfully ")
        setIsEdit(false)
    }

    return (

        <div className="flex min-h-screen">


<div className="hidden md:flex w-72 bg-gradient-to-b from-blue-700 to-blue-500 text-white flex-col shadow-xl">

  <div className="p-8 border-b border-blue-400">
    <h2 className="text-3xl font-bold">
      Staff Panel
    </h2>
    <p className="text-blue-100 text-sm mt-2">
      Employee Management
    </p>
  </div>

  <div className="flex-1 p-4">

    <button
      onClick={() => navigate("/staff-dashboard")}
      className="w-full text-left px-5 py-4 rounded-xl hover:bg-white/10 transition mb-3"
    >
      🏠 Home
    </button>

    <button
      onClick={() => navigate("/staff-profile")}
      className="w-full text-left px-5 py-4 rounded-xl bg-white/20 font-semibold"
    >
      👤 Profile
    </button>

  </div>

</div>


            <div className="flex-1 p-4 sm:p-6 md:p-10 pb-24">

                <h1 className="text-3xl font-bold mb-10">Staff Profile</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">


                    <div className="space-y-4">

                        <Input label="Name"
                            value={staffData.staffBasicInfo?.name}
                            isEdit={isEdit}
                            onChange={(v) => handleChange("staffBasicInfo", "name", v)}
                        />

                        <Input label="Gender"
                            value={staffData.staffBasicInfo?.gender}
                            isEdit={isEdit}
                            onChange={(v) => handleChange("staffBasicInfo", "gender", v)}
                        />

                        <Input label="Address"
                            value={staffData.staffBasicInfo?.address}
                            isEdit={isEdit}
                            onChange={(v) => handleChange("staffBasicInfo", "address", v)}
                        />

                        <Input label="Contact"
                            value={staffData.staffBasicInfo?.contact}
                            isEdit={isEdit}
                            onChange={(v) => handleChange("staffBasicInfo", "contact", v)}
                        />

                    </div>

                    {/* RIGHT */}
                    <div className="space-y-4">

                        <Input label="Age"
                            value={staffData.staffBasicInfo?.age}
                            isEdit={isEdit}
                            onChange={(v) => handleChange("staffBasicInfo", "age", v)}
                        />

                        <Input label="DOB"
                            value={staffData.staffBasicInfo?.dob}
                            isEdit={isEdit}
                            onChange={(v) => handleChange("staffBasicInfo", "dob", v)}
                        />

                        <Input label="Email"
                            value={staffData.staffBasicInfo?.email}
                            isEdit={isEdit}
                            onChange={(v) => handleChange("staffBasicInfo", "email", v)}
                        />

                        <Input label="Qualification"
                            value={staffData.staffDesignation?.qualification}
                            isEdit={isEdit}
                            onChange={(v) => handleChange("staffDesignation", "qualification", v)}
                        />

                    </div>

                </div>


                <div className="mt-10 space-y-4">

                    <Input label="Staff ID" value={staffData.staffOfficial?.staffId}
                        isEdit={isEdit}  
                        onChange={(v) => handleChange("staffOfficial", "staffId", v)}
                    />

                    <Input label="Joining Date"
                        value={staffData.staffOfficial?.joiningDate}
                        isEdit={isEdit}
                        onChange={(v) => handleChange("staffOfficial", "joiningDate", v)}
                    />

                    <Input label="Relieving Date"
                        value={staffData.staffOfficial?.relievingDate}
                        isEdit={isEdit}
                        onChange={(v) => handleChange("staffOfficial", "relievingDate", v)}
                    />

                </div>


                <div className="mt-8 flex justify-center md:justify-end">

                    {!isEdit ? (
                        <button
                            onClick={() => setIsEdit(true)}
                            className="border border-blue-500 px-8 py-2 rounded-full"
                        >
                            Edit
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 text-white px-8 py-2 rounded-full"
                        >
                            Save
                        </button>
                    )}

                </div>

                <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-3 z-50">

  <button
    onClick={() => navigate("/staff-dashboard")}
    className="text-center"
  >
    🏠
    <p>Home</p>
  </button>

  <button
    onClick={() => navigate("/staff-profile")}
    className="text-center text-blue-600 font-semibold"
  >
    👤
    <p>Profile</p>
  </button>

</div>

            </div>

        </div>

        
    )
}

export default StaffProfile


const Input = ({ label, value, isEdit, onChange }) => (
    <div className="grid grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] gap-3 items-center">
  
      <span className="font-semibold text-gray-700">
        {label} :
      </span>
  
      {isEdit ? (
        <input
          value={value || ""}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full"
        />
      ) : (
        <p className="break-words">
          {value || "-"}
        </p>
      )}
  
    </div>
  );
import React, { useEffect, useState } from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

const DoctorProfile = () => {

    const [doctorData, setDoctorData] = useState(null)
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {

        const email = localStorage.getItem("doctorEmail")

        if (!email) return

        const fetchData = async () => {
            const ref = doc(db, "doctors", email)
            const snap = await getDoc(ref)

            if (snap.exists()) {
                setDoctorData(snap.data())
            }
        }

        fetchData()

    }, [])

    if (!doctorData) return <p className="p-10">Loading...</p>

    const handleChange = (section, field, value) => {
        setDoctorData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }))
    }

    const handleSave = async () => {

        const email = localStorage.getItem("doctorEmail")
        const ref = doc(db, "doctors", email)

        await updateDoc(ref, doctorData)

        alert("Saved Successfully ")
        setIsEdit(false)
    }

    return (

        <div className="flex min-h-screen">

      
            <div className="w-64 bg-blue-600 text-white p-6">
                <h2 className="text-xl font-bold mb-6">Doctor Panel</h2>
                <p className="mb-3">Dashboard</p>
                <p className="mb-3">Appointments</p>
                <p className="mb-3">Patients</p>
                <p className="mb-3">Profile</p>
            </div>

           
            <div className="flex-1 p-10">

                <h1 className="text-3xl font-bold mb-10">Doctor Profile</h1>

                <div className="grid grid-cols-2 gap-10">

                 
                    <div className="space-y-4">

                        <Input label="Name" value={doctorData.doctorBasicInfo?.name}
                            isEdit={isEdit}
                            onChange={(v) => handleChange("doctorBasicInfo", "name", v)}
                        />

                        <Input label="Gender" value={doctorData.doctorBasicInfo?.gender}
                            isEdit={isEdit}
                            onChange={(v) => handleChange("doctorBasicInfo", "gender", v)}
                        />

                        <Input label="Address" value={doctorData.doctorBasicInfo?.address}
                            isEdit={isEdit}
                            onChange={(v) => handleChange("doctorBasicInfo", "address", v)}
                        />

                        <Input label="Contact" value={doctorData.doctorBasicInfo?.contact}
                            isEdit={isEdit}
                            onChange={(v) => handleChange("doctorBasicInfo", "contact", v)}
                        />

                        <Input label="Occupation" value={doctorData.doctorBasicInfo?.occupation}
                            isEdit={isEdit}
                            onChange={(v) => handleChange("doctorBasicInfo", "occupation", v)}
                        />

                    </div>

                   
                    <div className="space-y-4">

                        <Input label="Age" value={doctorData.doctorBasicInfo?.age}
                            isEdit={isEdit}
                            onChange={(v) => handleChange("doctorBasicInfo", "age", v)}
                        />

                        <Input label="DOB" value={doctorData.doctorBasicInfo?.dob}
                            isEdit={isEdit}
                            onChange={(v) => handleChange("doctorBasicInfo", "dob", v)}
                        />

                        <Input label="Email" value={doctorData.doctorBasicInfo?.email}
                            isEdit={isEdit}
                            onChange={(v) => handleChange("doctorBasicInfo", "email", v)}
                        />

                        <Input label="Designation" value={doctorData.doctorDesignation?.designation}
                            isEdit={isEdit}
                            onChange={(v) => handleChange("doctorDesignation", "designation", v)}
                        />

                        <Input label="Qualification" value={doctorData.doctorDesignation?.qualification}
                            isEdit={isEdit}
                            onChange={(v) => handleChange("doctorDesignation", "qualification", v)}
                        />

                    </div>

                </div>

                
                <div className="mt-10 space-y-4">

                    <Input label="Doctor ID" value={doctorData.doctorOfficial?.doctorId}
                        isEdit={isEdit}
                        onChange={(v) => handleChange("doctorOfficial", "doctorId", v)}
                    />

                    <Input label="Joining Date" value={doctorData.doctorOfficial?.joiningDate}
                        isEdit={isEdit}
                        onChange={(v) => handleChange("doctorOfficial", "joiningDate", v)}
                    />

                    <Input label="Relieving Date" value={doctorData.doctorOfficial?.relievingDate}
                        isEdit={isEdit}
                        onChange={(v) => handleChange("doctorOfficial", "relievingDate", v)}
                    />

                </div>

               
                <div className="mt-8 flex justify-end gap-4">

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

            </div>

        </div>
    )
}

export default DoctorProfile



const Input = ({ label, value, isEdit, onChange }) => {

    return (
        <div className="grid grid-cols-[150px_1fr] items-center">
            <span className="font-semibold">{label} :</span>

            {isEdit ? (
                <input
                    value={value || ""}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                />
            ) : (
                <p>{value || "-"}</p>
            )}

        </div>
    )
}
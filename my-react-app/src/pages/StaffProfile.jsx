import React, { useEffect, useState } from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

const StaffProfile = () => {

    const [staffData, setStaffData] = useState(null)
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {

        const staffId = localStorage.getItem("staffId")

        if (!staffId) return

        const fetchData = async () => {

            const ref = doc(db, "staffs", staffId)
            const snap = await getDoc(ref)

            if (snap.exists()) {
                setStaffData(snap.data())
            }

        }

        fetchData()

    }, [])

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


            <div className="w-64 bg-blue-600 text-white p-6">
                {/* <h2 className="text-xl font-bold mb-6">Staff Panel</h2>
                <p className="mb-3">Dashboard</p>
                <p className="mb-3">Profile</p> */}
            </div>


            <div className="flex-1 p-10">

                <h1 className="text-3xl font-bold mb-10">Staff Profile</h1>

                <div className="grid grid-cols-2 gap-10">


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


                <div className="mt-8 flex justify-end">

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

export default StaffProfile


const Input = ({ label, value, isEdit, onChange }) => (
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
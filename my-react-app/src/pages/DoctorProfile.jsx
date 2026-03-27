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
                <p className="mb-3">Appointments</p>
                <p className="mb-3">Patients</p>
                <p className="mb-3">Profile</p>
            </div>

            <div className="p-8">

                <h1 className="text-4xl font-bold">
                    Doctor Dashboard
                </h1>

                <p className="mt-2 text-gray-600 text-lg">
                    Welcome Doctor 👨‍⚕️
                </p>

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
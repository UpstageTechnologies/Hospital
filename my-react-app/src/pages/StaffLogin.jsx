import React, { useState } from "react"
import { db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const StaffLogin = () => {

    const [staffId, setStaffId] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = async () => {

        const docRef = doc(db, "staffs", staffId)
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
            alert("Invalid Staff ID")
            return
        }

        const data = docSnap.data()

        if (data.password !== password) {
            alert("Wrong Password")
            return
        }

        localStorage.setItem("staffLogin", "true")

        navigate("/staff-dashboard")

    }

    return (

        <div className="flex justify-center items-center min-h-screen">

            <div className="border p-6 rounded shadow w-96">

                <h2 className="text-xl font-bold mb-4 text-center">
                    Staff Login
                </h2>

                <input type="text" placeholder="Staff ID" className="border p-2 rounded w-full mb-4"
                    value={staffId} onChange={(e) => setStaffId(e.target.value)}/>

                <div className="relative">

                    <input type={showPassword ? "text" : "password"} placeholder="Password"
                        className="border p-2 rounded w-full pr-10" value={password}
                        onChange={(e) => setPassword(e.target.value)}/>

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>

                </div>
                <br />

                <button onClick={handleLogin} className="bg-blue-500 text-white w-full py-2 rounded">
                    Login
                </button>

            </div>

        </div>

    )

}

export default StaffLogin
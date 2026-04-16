import React, { useState } from "react"
import { db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useLocation } from "react-router-dom";

const StaffLogin = () => {

    const [staffId, setStaffId] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const location = useLocation();
    const fromRole = location.state?.fromRole === true;

    const handleLogin = async () => {

        const docRef = doc(db, "staffs", staffId)
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
            alert("Invalid Staff ID")
            return
        }

        const data = docSnap.data()


        if (data.staffAccount?.password !== password) {
            alert("Wrong Password")
            return
        }

        localStorage.setItem("staffId", staffId)

        navigate("/staff-profile")

    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 
bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200">

            <div className="backdrop-blur-lg bg-white/60 shadow-2xl 
    rounded-2xl p-6 sm:p-8 w-full max-w-[350px]">

                <h2 className="text-2xl font-bold text-center mb-4">
                    Staff Login
                </h2>

                <input placeholder="Staff ID"
                    value={staffId}
                    autoComplete="off"
                    onChange={(e) => setStaffId(e.target.value)}
                   className="input-style w-full"/>

                <div className="relative">
                    <input type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-style w-full" />

                    <span className="eye-icon"
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <button onClick={handleLogin} className="btn-style mt-3 w-full">
                    Login
                </button>

            </div>
        </div>
    )

}

export default StaffLogin
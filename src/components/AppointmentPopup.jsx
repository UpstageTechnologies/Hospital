import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { db } from "../firebase"
import { collection, addDoc, getDocs } from "firebase/firestore"


const AppointmentPopup = ({ close, doctor, slotTime }) => {

    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [showRegister, setShowRegister] = useState(false)
    const [users, setUsers] = useState([])
    const [loginEmail, setLoginEmail] = useState("sundar@gmail.com")
    const [loginPassword, setLoginPassword] = useState("sundar11")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [gender, setGender] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [reason, setReason] = useState("")
    const [currentUser, setCurrentUser] = useState(null)

    // 🔥 REGISTER
    const handleRegister = async () => {
        if (!name || !email || !password || !address || !phone || !gender) {
            return alert("Fill all fields")
        }

        try {
            // check duplicate email
            const querySnapshot = await getDocs(collection(db, "users"))
            const exists = querySnapshot.docs.find(
                doc => doc.data().email === email
            )

            if (exists) {
                return alert("User already exists")
            }

            await addDoc(collection(db, "users"), {
                name,
                email,
                password,
                address,
                phone,
                gender
            })

            alert("Account Created")
            setShowRegister(false)

        } catch (err) {
            console.log(err)
            alert("Error")
        }
    }

    // 🔥 LOGIN
    const handleLogin = async () => {

        // Demo patient auto login
        if (
          loginEmail === "sundar@gmail.com" &&
          loginPassword === "sundar11"
        ) {
      
          const demoUser = {
            name: "Sundar",
            email: "sundar@gmail.com",
            address: "Madurai",
            phone: "9876543210",
            gender: "Male"
          }
      
          setIsLoggedIn(true)
          setCurrentUser(demoUser)
      
          localStorage.setItem(
            "currentUser",
            JSON.stringify(demoUser)
          )
      
          alert("Login Success ✅")
      
          setStep(2) // Reason page open
          return
        }
      
        // Normal firestore login (existing)
        try {
          const querySnapshot = await getDocs(collection(db,"users"))
      
          const users = querySnapshot.docs.map(doc => doc.data())
      
          const user = users.find(
            (u) =>
              u.email === loginEmail &&
              u.password === loginPassword
          )
      
          if (!user) {
            return alert("Invalid Login ❌")
          }
      
          setIsLoggedIn(true)
          setCurrentUser(user)
      
          localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
          )
      
          setStep(2)
      
        } catch(err){
          console.log(err)
          alert("Error")
        }
      }
    // 🔥 BOOK
    const handleBook = () => {
        if (!isLoggedIn) {
            return alert("Login first ")
        }

        if (!reason) {
            return alert("Enter reason ")
        }

        setStep(4)
    }


    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("currentUser"))

        if (savedUser) {
            setIsLoggedIn(true)
            setCurrentUser(savedUser)
            setStep(2)
        }
    }, [])

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

           <div className="bg-white w-full max-w-[95%] md:w-[800px] rounded-xl flex flex-col md:flex-row overflow-hidden">

                {/* LEFT */}
               <div className="w-full md:w-1/3 bg-blue-600 text-white p-4 md:p-6 flex md:flex-col flex-row justify-around md:gap-4 gap-2">
                    <button onClick={() => setStep(1)}>Login</button>
                    <button onClick={() => setStep(2)}>Reason</button>
                    <button onClick={() => setStep(3)}>Details</button>
                </div>

                {/* RIGHT */}
               <div className="w-full md:w-2/3 p-4 md:p-6">

                    {/* STEP 1 */}
                    {step === 1 && (
                        showRegister ? (
                            <>
                                <h2 className="text-xl font-bold mb-4">Create Account</h2>

                                <input
                                    placeholder="Name"
                                    className="border p-2 w-full mb-2"
                                    onChange={(e) => setName(e.target.value)}
                                />

                                <input
                                    placeholder="Email"
                                    className="border p-2 w-full mb-2"
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <input
                                    placeholder="Password"
                                    type="password"
                                    className="border p-2 w-full mb-2"
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <input
                                    placeholder="Address"
                                    className="border p-2 w-full mb-2"
                                    onChange={(e) => setAddress(e.target.value)}
                                />

                                <input
                                    placeholder="Phone Number"
                                    className="border p-2 w-full mb-2"
                                    onChange={(e) => setPhone(e.target.value)}
                                />

                                <select
                                    className="border p-2 w-full mb-2"
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>

                                <button
                                    onClick={handleRegister}
                                    className="bg-blue-600 text-white px-6 py-2 w-full"
                                >
                                    Create Account
                                </button>

                                <p
                                    onClick={() => setShowRegister(false)}
                                    className="text-blue-600 cursor-pointer"
                                >
                                    Already have account? Login
                                </p>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl font-bold mb-4">Login</h2>

                                <input
 value={loginEmail}
 placeholder="Email"
 className="border p-2 w-full mb-2"
 onChange={(e) => setLoginEmail(e.target.value)}
/>

<input
 value={loginPassword}
 placeholder="Password"
 type="password"
 className="border p-2 w-full mb-2"
 onChange={(e) => setLoginPassword(e.target.value)}
/>
                                <button
                                    onClick={handleLogin}
                                    className="bg-blue-600 text-white px-6 py-2 w-full"
                                >
                                    Login
                                </button>

                                <p className="text-center">
                                    Create account?{" "}
                                    <span
                                        onClick={() => setShowRegister(true)}
                                        className="text-blue-600 cursor-pointer"
                                    >
                                        Register here
                                    </span>
                                </p>
                            </>
                        )
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <>
                            <h2 className="text-xl font-bold mb-4">Reason</h2>

                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                               className="border w-full p-3 rounded min-h-[120px]"
                            />

                           <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
                                <button onClick={() => setStep(1)}>Previous</button>

                                <button
                                    onClick={() => {
                                        if (!reason) return alert("Enter reason ❌")
                                        setStep(3)
                                    }}
                                    className="bg-blue-600 text-white px-6 py-2"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <>
                            <h2 className="text-xl font-bold mb-4">Details</h2>

                            <p><b>Doctor:</b> {doctor.name}</p>
                            <p><b>Patient:</b> {currentUser?.name}</p>
                            <p><b>Email:</b> {currentUser?.email}</p>
                            <p><b>Address:</b> {currentUser?.address}</p>
                            <p><b>Phone:</b> {currentUser?.phone}</p>
                            <p><b>Gender:</b> {currentUser?.gender}</p>
                            <p><b>Time:</b> {slotTime}</p>
                            <p><b>Reason:</b> {reason}</p>

                            <div className="flex justify-end gap-3 mt-4">
                                <button onClick={() => setStep(2)}>Previous</button>

                                <button
                                    onClick={handleBook}
                                    className="bg-green-600 text-white px-6 py-2"
                                >
                                    Book
                                </button>
                            </div>
                        </>
                    )}

                    {step === 4 && (
                        <div className="text-center">

                            <h2 className="text-2xl font-bold text-green-600 mb-4">
                                Appointment Booked ✅
                            </h2>

                            <p className="mb-4">
                                Appointment No: API882
                            </p>

                            <p
                                onClick={() => navigate("/dashboard")}
                                className="text-blue-600 underline cursor-pointer"
                            >
                                Go to Dashboard
                            </p>

                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default AppointmentPopup
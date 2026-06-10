import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { db } from "../firebase"
import { collection, addDoc, getDocs } from "firebase/firestore"


const AppointmentPopup = ({
  close,
  doctor,
  slotTime,
  date,
  isDemo = false
}) => {

    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [users, setUsers] = useState([])
    const [loginEmail, setLoginEmail] = useState(
      isDemo ? "sithu@gmail.com" : ""
    )
    
    const [loginPassword, setLoginPassword] = useState(
      isDemo ? "123456" : ""
    )

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [gender, setGender] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [reason, setReason] = useState("")
    const [currentUser, setCurrentUser] = useState(null)
    const [age, setAge] = useState("")
    const [appointmentNo, setAppointmentNo] = useState(
      "API" + Math.floor(1000 + Math.random() * 9000)
    )

    // 🔥 REGISTER
    const handleRegister = async () => {

      if (
        !name ||
        !age ||
        !email ||
        !password ||
        !address ||
        !phone ||
        !gender
      ) {
        return alert("Fill all fields")
      }
    
      try {
    
        const querySnapshot = await getDocs(
          collection(db, "users")
        )
    
        const exists = querySnapshot.docs.find(
          doc => doc.data().email === email
        )
    
        if (exists) {
          return alert("User already exists")
        }
    
        await addDoc(collection(db, "users"), {
          name,
          age,
          email,
          password,
          address,
          phone,
          gender
        })
    
        alert("Account Created Successfully ✅")
    
        // auto fill login
        setLoginEmail(email)
        setLoginPassword(password)
    
        // clear register form
        setName("")
        setAge("")
        setEmail("")
        setPassword("")
        setAddress("")
        setPhone("")
        setGender("")
    
        // go login page
        setStep(1)
    
      } catch (err) {
        console.log(err)
        alert("Error")
      }
    }

    // 🔥 LOGIN
    const handleLogin = async () => {

        // Demo patient auto login
        if (
          isDemo &&
          loginEmail === "sithu@gmail.com" &&
          loginPassword === "123456"
        ){
      
          const demoUser = {
            name: "Sithu",
            age: "25",
            email: "sithu@gmail.com",
            address: "Chennai",
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
    const handleBook = async () => {

        if (!isLoggedIn) {
            return alert("Login first ")
        }
    
        if (!reason) {
            return alert("Enter reason ")
        }

        const generatedAppointmentNo = appointmentNo
    
        const appointmentData = {
          patientName: currentUser.name,
          patientEmail: currentUser.email,
      
          address: currentUser.address,
          phone: currentUser.phone,
          gender: currentUser.gender,
      
          age: currentUser.age || "",
          dob: currentUser.dob || "",
          emrContact: currentUser.emrContact || "",
      
          doctorName: doctor.name,
          doctorEmail: doctor.email,
          doctorImage: doctor.image,
          speciality: doctor.speciality,
      
          time: slotTime,
          date: (date || new Date()).toISOString().split("T")[0],
      
          reason: reason,
          appointmentNo: generatedAppointmentNo,
      
          isDemo: doctor.demo === true,
      };
    
        // 🔥 IMPORTANT FIX
        await addDoc(
            collection(db,"appointments"),
            appointmentData
        );

        setTimeout(() => {
          navigate("/demopatientdashboard")
        }, 1500)
    
        setStep(4)
    }


    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("currentUser"))

        if (savedUser) {
            setIsLoggedIn(true)
            setCurrentUser(savedUser)
            setStep(1)
        }
    }, [])

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

<div className="relative bg-white w-full max-w-[95%] md:w-[800px] rounded-xl flex flex-col md:flex-row overflow-hidden">

  {/* CLOSE BUTTON */}
  <button
    onClick={close}
    className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-black"
  >
    ✕
  </button>
                <div className="w-full md:w-1/3 bg-blue-600 text-white p-4 md:p-6 flex md:flex-col flex-row justify-around md:gap-4 gap-2">
<button
onClick={()=>setStep(1)}
className={`rounded px-4 py-3 ${
step===1 ? "bg-white text-blue-600 font-bold" : ""
}`}
>
Login
</button>

<button
onClick={()=>setStep(2)}
className={`rounded px-4 py-3 ${
step===2 ? "bg-white text-blue-600 font-bold" : ""
}`}
>
Reason
</button>

<button
onClick={()=>setStep(3)}
className={`rounded px-4 py-3 ${
step===3 ? "bg-white text-blue-600 font-bold" : ""
}`}
>
Details
</button>

</div>

                {/* RIGHT */}
               <div className="w-full md:w-2/3 p-4 md:p-6">

                    {/* STEP 1 */}
{/* STEP 1 */}
{step === 1 && (
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
      className="bg-blue-600 text-white px-6 py-2 w-full rounded"
    >
      Login
    </button>

    {!isDemo && (
  <p className="text-center mt-4 text-sm">
    Don't have an account?{" "}
    <span
      onClick={() => setStep(5)}
      className="text-blue-600 font-semibold cursor-pointer underline"
    >
      Register
    </span>
  </p>
)}
  </>
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

                            <p><b>Appointment No:</b> {appointmentNo}</p>

<p><b>Doctor Name:</b> {doctor.name}</p>

<p><b>Patient Name:</b> {currentUser?.name}</p>

<p><b>Age:</b> {currentUser?.age}</p>

<p><b>Email:</b> {currentUser?.email}</p>

<p><b>Address:</b> {currentUser?.address}</p>

<p><b>Contact Number:</b> {currentUser?.phone}</p>

<p><b>Gender:</b> {currentUser?.gender}</p>

<p><b>Appointment Time:</b> {slotTime}</p>

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
  Appointment No: {appointmentNo}
</p>

                            <p
                                onClick={() => navigate("/demopatientdashboard")}
                                className="text-blue-600 underline cursor-pointer"
                            >
                                Go to Dashboard
                            </p>

                        </div>
                    )}

                    {/* STEP 5 REGISTER */}

{step === 5 && (

<>
<h2 className="text-xl font-bold mb-4">
Patient Registration
</h2>

<input
type="text"
placeholder="Patient Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="border p-2 w-full mb-2"
/>

<input
type="number"
placeholder="Age"
value={age}
onChange={(e)=>setAge(e.target.value)}
className="border p-2 w-full mb-2"
/>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="border p-2 w-full mb-2"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="border p-2 w-full mb-2"
/>

<input
type="text"
placeholder="Address"
value={address}
onChange={(e)=>setAddress(e.target.value)}
className="border p-2 w-full mb-2"
/>

<input
type="text"
placeholder="Contact Number"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
className="border p-2 w-full mb-2"
/>

<select
value={gender}
onChange={(e)=>setGender(e.target.value)}
className="border p-2 w-full mb-2"
>
<option value="">Select Gender</option>
<option value="Male">Male</option>
<option value="Female">Female</option>
<option value="Other">Other</option>
</select>

<button
onClick={handleRegister}
className="bg-green-600 text-white px-6 py-2 rounded w-full"
>
Create Account
</button>

</>

)}

                </div>
            </div>
        </div>
    )
}

export default AppointmentPopup
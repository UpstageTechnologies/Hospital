import React, { useEffect, useState } from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore"
import { onSnapshot } from "firebase/firestore"
import AdminCalendar from "../components/Calendar"
import { setDoc } from "firebase/firestore"
import { assets } from "../assets/assets"
import { useNavigate } from "react-router-dom";

const Calendar = ({ onSelect = () => { }, selectedDate = null, events = {}, type = "doctor" }) => {

    const [popup, setPopup] = useState(false)   
    const [slots, setSlots] = useState([])
    const [selectedSlotDate, setSelectedSlotDate] = useState("")
    const today = new Date()

    const [currentMonth, setCurrentMonth] = useState(today)

    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const todayStr = new Date().toISOString().split("T")[0]


    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]



    const dates = []

    // empty slots before 1st date
    for (let i = 0; i < firstDay; i++) {
        dates.push(null)
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`
        dates.push(fullDate)
    }

    const formatTime = (time) => {
        if (!time) return ""

        let [h, m] = time.split(":")
        h = parseInt(h)

        let ampm = h >= 12 ? "PM" : "AM"

        let displayHour = h % 12
        if (displayHour === 0) displayHour = 12

        return `${displayHour}:${m} ${ampm}`
    }

    const convertTo24Hour = (time, index) => {
        let [h, m] = time.split(":")
        h = parseInt(h)


        if (index === 0) {
            return `${h.toString().padStart(2, "0")}:${m}`
        }

        // 👉 next slots PM assume
        if (h < 12) {
            h += 12
        }

        return `${h.toString().padStart(2, "0")}:${m}`
    }

    return (
        <div className="bg-white rounded-2xl shadow p-2 sm:p-4 md:p-6 w-full md:max-w-[650px] mx-auto">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <button onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
                    className="bg-blue-500 text-white px-2 sm:px-3 py-2 rounded-lg sm:rounded-xl text-sm">◀</button>

<h2 className="text-base sm:text-xl font-bold text-center w-full">
                    {currentMonth.toLocaleString("default", { month: "long" })} {year}
                </h2>

                <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
                    className="bg-blue-500 text-white px-2 sm:px-3 py-2 rounded-lg sm:rounded-xl text-sm">▶</button>
            </div>

            {/* WEEK DAYS */}
            <div className="grid grid-cols-7 mb-2 sm:mb-3 text-center font-semibold text-[10px] sm:text-sm text-gray-500">
                {days.map((d, i) => (
                    <div key={i}>{d}</div>
                ))}
            </div>

            {/* DATES */}
            <div className="grid grid-cols-7 gap-2 sm:gap-3 md:gap-4">

                {dates.map((date, i) => {
                    if (!date) return (
                        <div key={i} className="aspect-square"></div>
                      )

                    const dayOnly = date.split("-")[2]
                    const eventData =
                        events?.[date] ||
                        events?.[`day-${dayOnly}`] ||
                        null

                    const day = parseInt(date.split("-")[2])
                    const isToday = date === todayStr
                    const isSelected = date === selectedDate
                    const dayIndex = new Date(date).getDay()
                    const isSunday = dayIndex === 0

                    return (
                        <button
                            key={i}
                            onClick={() => onSelect && onSelect(date)}
                            onDoubleClick={() => {
                                const dayOnly = date.split("-")[2]
                                const eventData = events[date] || events[`day-${dayOnly}`]

                                if (eventData) {

                                    // ✅ REMOVE LEAVE SLOTS
                                    const activeSlots = eventData.slots.filter(s => !s.leave)

                                    setSlots(activeSlots)
                                    setSelectedSlotDate(date)
                                    setPopup(true)
                                }
                            }}
                            className={`aspect-square
                            flex flex-col items-center justify-center
                            rounded-xl sm:rounded-2xl
                            text-center transition font-semibold
                            text-sm sm:text-base
                            overflow-hidden

${type === "doctor"
                                    ? (
                                        events?.[date]?.type?.toLowerCase() === "holiday"
                                            ? "bg-green-500 text-white"
                                            : events?.[date]?.type?.toLowerCase() === "gov" || isSunday
                                                ? "bg-red-500 text-white"
                                                : "bg-gray-100"
                                    )
                                    : (
                                      isSunday
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-100"
                                    )
                                }
`}
                        >
                            <p className="text-sm sm:text-lg font-semibold">{day}</p>
                            {isSunday && !events[date] && (
    <p className="text-[10px] absolute bottom-1 opacity-0">
        Sunday
    </p>
)}

                            {eventData && eventData.slots && (
                                <p className="text-[9px] sm:text-xs text-blue-500 mt-1 leading-none">
                                    {eventData.slots.filter(s => !s.leave).length} slots
                                </p>
                            )}

                        </button>


                    )
                })}
                {popup && (
                    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

                        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-5 rounded-xl w-[320px] text-white">

                            <h2 className="font-bold mb-3">
                                Slots - {selectedSlotDate}
                            </h2>

                            <div className="space-y-2">
                                {slots.map((slot, i) => (
                                    <div key={i} className="flex justify-between items-center bg-white text-black p-2 rounded">

                                        {slot.isEditing ? (
                                            <div className="flex gap-2 w-full">
                                                <input
                                                    type="time"
                                                    value={slot.start}
                                                    onChange={(e) => {
                                                        const updated = [...slots]
                                                        updated[i].start = e.target.value
                                                        setSlots(updated)
                                                    }}
                                                    className="p-1 rounded text-black w-full"
                                                />
                                                <input
                                                    type="time"
                                                    value={slot.end}
                                                    onChange={(e) => {
                                                        const updated = [...slots]
                                                        updated[i].end = e.target.value
                                                        setSlots(updated)
                                                    }}
                                                    className="p-1 rounded text-black w-full"
                                                />
                                            </div>
                                        ) : (
                                            <span>
                                                {formatTime(slot.start)} - {formatTime(slot.end)}
                                            </span>
                                        )}

                                        {/* LEAVE */}
                                        <input
                                            type="checkbox"
                                            checked={slot.leave || false}
                                            onChange={(e) => {
                                                const updated = [...slots]
                                                updated[i].leave = e.target.checked
                                                setSlots(updated)
                                            }}
                                        />

                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-2 mt-4">

                                <button
                                    onClick={() => {
                                        setSlots(slots.map(s => ({ ...s, isEditing: true })))
                                    }}
                                    className="bg-blue-500 text-white px-3 py-2 rounded w-full"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        const updated = slots.map(s => ({
                                            ...s,
                                            leave: !s.leave
                                        }))
                                        setSlots(updated)
                                    }}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded w-full"
                                >
                                    Leave
                                </button>

                                <button
                                    onClick={async () => {
                                        await setDoc(doc(db, "appointments", selectedSlotDate), {
                                            slots: slots
                                                .filter(s => !s.leave) // 🔥 REMOVE leave slots permanently
                                                .map((s, i) => ({
                                                    start: convertTo24Hour(s.start, i),
                                                    end: convertTo24Hour(s.end, i)
                                                }))
                                        }, { merge: true })

                                        setPopup(false)
                                    }}
                                    className="bg-green-500 text-white px-3 py-2 rounded w-full"
                                >
                                    Save
                                </button>

                            </div>

                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

const DoctorProfile = () => {

    const [doctorData, setDoctorData] = useState(null)
    const [slots, setSlots] = useState([])
    const [newSlot, setNewSlot] = useState("")
    const [doctorImage, setDoctorImage] = useState("")
    const [appointments, setAppointments] = useState([])
    const [page, setPage] = useState("home")
    const [selected, setSelected] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [step, setStep] = useState(1)
    const [patientTab, setPatientTab] = useState("current")
    const [doctorEvents, setDoctorEvents] = useState({})
    const [appointmentEvents, setAppointmentEvents] = useState({})
    const navigate = useNavigate();

    const handleDateSelect = (date) => {
        setSelectedDate(date)
    }



    const updateStatus = (appointmentNo, newStatus) => {

        const updated = appointments.map(item => {

            if (item.appointmentNo === appointmentNo) {
                return {
                    ...item,
                    status: newStatus   // 🔥 force update
                }
            }

            return item
        })

        setAppointments(updated)
        setSelected(null)
    }

    useEffect(() => {
        const email = localStorage.getItem("doctorEmail")
        if (!email) return

        const fetchData = async () => {
            const ref = doc(db, "doctors", email)
            const snap = await getDoc(ref)

            if (snap.exists()) {
                const data = snap.data()
                setDoctorData(data)
                setDoctorImage(data.image)
                setSlots(data.slots || [])
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        const fetchAppointments = async () => {

            const email = localStorage.getItem("doctorEmail")
            const snap = await getDocs(collection(db, "appointments"))

            let list = []

            snap.forEach(doc => {
                const data = doc.data()

                if (
                    data.doctorEmail === email ||
                    data.doctorId === email
                ) {
                    list.push(data)
                }
            })

            setAppointments(list)
        }

        fetchAppointments()
    }, [])

    useEffect(() => {

        const ref = collection(db, "users", "demoAdmin", "calendar") // 🔥 IMPORTANT

        const unsub = onSnapshot(ref, (snap) => {
            let data = {}

            snap.forEach(doc => {
                data[doc.id] = doc.data()
            })

            // 🔴 govt holidays auto add
            const govt = {
                "2026-01-26": "Republic Day",
                "2026-08-15": "Independence Day",
                "2026-10-02": "Gandhi Jayanti"
            }

            Object.keys(govt).forEach(date => {
                if (!data[date]) {
                    data[date] = {
                        title: govt[date],
                        type: "gov"
                    }
                }
            })

            setDoctorEvents(data)   // only doctor ku
        })

        return () => unsub()

    }, [])

    useEffect(() => {

        const email = localStorage.getItem("doctorEmail")
        if (!email) return

        const ref = collection(db, "users", "demoAdmin", "calendar")

        const unsub = onSnapshot(ref, (snap) => {

            let data = {}

            snap.forEach(doc => {
                const d = doc.data()

                if (d.slots) {
                    // FULL DATE
                    data[doc.id] = {
                        slots: d.slots
                    }

                    // DAY ONLY (repeat every month)
                    const dayOnly = doc.id.split("-")[2]

                    data[`day-${dayOnly}`] = {
                        slots: d.slots
                    }
                }
            })

            setAppointmentEvents(data)

        })

        return () => unsub()

    }, [])

    if (!doctorData) return <p className="p-10">Loading...</p>

    return (

        <div className="flex flex-col md:flex-row min-h-screen pb-16 md:pb-0">

            {/* LEFT PANEL */}
            <div className="hidden md:block w-full md:w-64 bg-blue-600 text-white p-3 md:p-6">
                <p onClick={() => setPage("home")} className="mb-3 md:mb-3 cursor-pointer shrink-0">Home</p>

                <p onClick={() => setPage("appointments")} className="mb-3 md:mb-3 cursor-pointer shrink-0">
                    Appointments
                </p>

                <p onClick={() => setPage("profile")} className="mb-3 md:mb-3 cursor-pointer shrink-0">
                    Profile
                </p>

                <p onClick={() => setPage("settings")} className="mb-3 md:mb-3 cursor-pointer shrink-0">
                    Settings
                </p>
            </div>

            {/* ================= APPOINTMENTS PAGE ================= */}
            {page === "appointments" && (
                <div className="p-4 md:p-8 w-full">

<h1 className="text-2xl font-bold mb-6 text-center md:text-left">
                        Appointments
                    </h1>

                    <br />

                    <h2 className="text-lg font-semibold mb-3">
                        Set Slot Timing
                    </h2>

                    <Calendar
                        onSelect={handleDateSelect}
                        selectedDate={selectedDate}
                        events={appointmentEvents}
                        type="appointment"
                    />

                    {selectedDate && (
                        <div className="mt-6 bg-white p-6 rounded-xl shadow">

                            <h2 className="text-lg font-semibold mb-4">
                                Schedule - {selectedDate}
                            </h2>

                            <div className="space-y-4">

                                {Array.from({ length: 20 }, (_, i) => 9 * 60 + i * 30).map((minutes, i) => {

                                    const hour = Math.floor(minutes / 60)
                                    const min = minutes % 60

                                    const timeLabel =
                                        `${hour > 12 ? hour - 12 : hour}:${min === 0 ? "00" : min} ${hour >= 12 ? "PM" : "AM"}`

                                    const booking = appointments.find(a => {

                                        if (!a.date || !a.time) return false

                                        const d = new Date(a.date).toLocaleDateString("en-CA")

                                        const timePart = a.time.split("-")[0] // "9:30am"

                                        let [h, m] = timePart.replace(/am|pm/i, "").split(":")
                                        h = parseInt(h)
                                        m = parseInt(m || "0")

                                        if (timePart.toLowerCase().includes("pm") && h !== 12) h += 12
                                        if (timePart.toLowerCase().includes("am") && h === 12) h = 0

                                        const totalMinutes = h * 60 + m

                                        return d === selectedDate && totalMinutes === minutes
                                    })

                                    const current = new Date()
                                    const currentMinutes = current.getHours() * 60 + current.getMinutes()

                                    const isCurrent = Math.floor(currentMinutes / 30) === Math.floor(minutes / 30)

                                    return (
                                        <div key={i} className="flex items-start gap-4">

                                            <p className="w-20 text-gray-500 font-medium">
                                                {timeLabel}
                                            </p>

                                            <div className="flex-1 relative border-l-2 border-gray-300 h-10">

                                                {isCurrent && (
                                                    <div className="absolute -left-3 top-1 text-blue-600 text-xl">
                                                        ➤
                                                    </div>
                                                )}

                                                {booking && (
                                                    <div className="absolute left-4 top-0 bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm shadow">
                                                        <div>👤 {booking.patientName}</div>
                                                        <div className="text-xs">📝 {booking.reason}</div>
                                                    </div>
                                                )}

                                            </div>

                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                    )}


                </div>
            )}


            {/* ================= HOME PAGE ================= */}
            {page === "home" && (
                <>

<h1 className="text-2xl font-bold mb-6 text-center md:text-left">
  Current Appointments
</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-20 md:pb-0 px-4 sm:px-6 md:px-0">

                        {appointments.map((item, index) => (

                            <div
                                key={index}
                                onClick={() => {
                                    setSelectedAppointment(item)
                                    setStep(1)
                                }}
                                className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4 cursor-pointer hover:shadow-lg transition w-full"
                            >

                                {/* PATIENT IMAGE */}
                                <img
                                    src={item.patientImage || assets.profile_pic}
                                    className="w-16 h-16 rounded-full object-cover"
                                />

                                {/* DETAILS */}
                                <div>
                                    <h2 className="text-lg font-bold">
                                        {item.patientName}
                                    </h2>

                                    <p className="text-gray-600">
                                        {item.time}
                                    </p>

                                    <p className="text-gray-400 text-sm">
                                        {item.date}
                                    </p>
                                </div>

                            </div>

                        ))}

                    </div>

                    {/* 🔥 👉 இதே இடத்துல தான் popup போடணும் */}
                    {selectedAppointment && (
                        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">

                            <div className="bg-white w-[95%] md:w-[900px] h-auto md:h-[520px] flex flex-col md:flex-row">

                                {/* LEFT PANEL */}
                                <div className="w-1/4 bg-gray-100 p-4 space-y-3">

                                    <h2 className="font-bold text-lg">Appointment Panel</h2>

                                    <button
                                        onClick={() => setStep(1)}
                                        className={`w-full p-2 rounded text-white ${step === 1 ? "bg-blue-500" : "bg-gray-400"}`}
                                    >
                                        Patient Details
                                    </button>

                                    <button
                                        onClick={() => setStep(2)}
                                        className={`w-full p-2 rounded text-white ${step === 2 ? "bg-blue-500" : "bg-gray-400"}`}
                                    >
                                        Check-In
                                    </button>

                                    <button
                                        onClick={() => setStep(3)}
                                        className={`w-full p-2 rounded text-white ${step === 3 ? "bg-blue-500" : "bg-gray-400"}`}
                                    >
                                        Pay
                                    </button>

                                </div>

                                {/* RIGHT CONTENT */}
                                <div className="w-3/4 p-6 flex flex-col h-full justify-between relative">

                                    <button
                                        onClick={() => setSelectedAppointment(null)}
                                        className="absolute top-2 right-3 text-xl"
                                    >
                                        ✖
                                    </button>

                                    {/* STEP 1 */}
                                    {step === 1 && (
                                        <div className="flex flex-col h-full">

                                            <div className="flex justify-center mb-4">
                                                <img
                                                    src={selectedAppointment.patientImage || assets.profile_pic}
                                                    className="w-20 h-20 rounded-full object-cover border"
                                                />
                                            </div>

                                            <h3 className="text-lg font-bold mb-6 text-center">
                                                Patient & Appointment Info
                                            </h3>

                                            <div className="grid grid-cols-2 gap-6">

                                                <div className="space-y-4">
                                                    <input value={selectedAppointment.patientName} disabled className="w-full border p-3 rounded-xl" />
                                                    <input value={selectedAppointment.phone || ""} disabled className="w-full border p-3 rounded-xl" />
                                                    <input value={selectedAppointment.address || ""} disabled className="w-full border p-3 rounded-xl" />
                                                    <input value={selectedAppointment.doctorName} disabled className="w-full border p-3 rounded-xl" />
                                                </div>

                                                <div className="space-y-4">
                                                    <input value={selectedAppointment.appointmentNo} disabled className="w-full border p-3 rounded-xl" />
                                                    <input value={selectedAppointment.date} disabled className="w-full border p-3 rounded-xl" />
                                                    <input value={selectedAppointment.time} disabled className="w-full border p-3 rounded-xl" />
                                                </div>

                                            </div>

                                            <div className="flex justify-end gap-4 mt-6">

                                                {/* VIEW PROFILE */}
                                                <button
                                                    onClick={() => navigate("/my-profile")}
                                                    className="bg-green-600 text-white px-6 py-2 rounded"
                                                >
                                                    View Profile
                                                </button>

                                                {/* NEXT */}
                                                <button
                                                    onClick={() => setStep(2)}
                                                    className="bg-blue-600 text-white px-6 py-2 rounded"
                                                >
                                                    Next
                                                </button>

                                            </div>
                                        </div>
                                    )}
                                    {step === 2 && (
                                        <div className="flex flex-col h-full justify-between">

                                            <div className="flex flex-col items-center">

                                                <h3 className="text-xl font-bold mb-6">Consultation</h3>

                                                <div className="text-3xl mb-6">⏱ 1s</div>

                                                <button className="bg-red-500 text-white px-8 py-3 rounded-lg text-lg">
                                                    Check-Out
                                                </button>

                                            </div>

                                            {/* FIXED BUTTONS */}
                                            <div className="flex justify-end gap-4 mt-6">
                                                <button
                                                    onClick={() => setStep(1)}
                                                    className="bg-gray-400 text-white px-6 py-2 rounded"
                                                >
                                                    Previous
                                                </button>

                                                <button
                                                    onClick={() => setStep(3)}
                                                    className="bg-blue-600 text-white px-6 py-2 rounded"
                                                >
                                                    Next
                                                </button>
                                            </div>

                                        </div>
                                    )}

                                    {/* STEP 3 PAYMENT */}
                                    {step === 3 && (
                                        <div className="flex flex-col h-full justify-between">

                                            <div>
                                                <h3 className="text-xl font-bold mb-6">Payment</h3>

                                                <div className="space-y-4 max-w-md">

                                                    <input
                                                        value={`Paid Amount - ₹${selectedAppointment.paidAmount || 600}`}
                                                        disabled
                                                        className="w-full border p-4 rounded-xl text-lg"
                                                    />

                                                </div>
                                            </div>

                                            {/* FIXED BUTTON */}
                                            <div className="mt-6">
                                                <button
                                                    onClick={() => setStep(2)}
                                                    className="bg-gray-400 text-white px-6 py-2 rounded"
                                                >
                                                    Previous
                                                </button>
                                            </div>

                                        </div>
                                    )}

                                </div>

                            </div>

                        </div>
                    )}
                </>
            )}

            {/* MOBILE BOTTOM NAV */}
<div className="fixed bottom-0 left-0 w-full bg-white border-t shadow md:hidden flex justify-around items-center py-2 z-50">

<button onClick={() => setPage("home")} className="flex flex-col items-center text-sm">
    🏠
    <span>Home</span>
</button>

<button onClick={() => setPage("appointments")} className="flex flex-col items-center text-sm">
    📅
    <span>Appointments</span>
</button>

<button onClick={() => setPage("profile")} className="flex flex-col items-center text-sm">
    👤
    <span>Profile</span>
</button>

<button onClick={() => setPage("settings")} className="flex flex-col items-center text-sm">
    ⚙️
    <span>Settings</span>
</button>

</div>

            {page === "profile" && (
                <div className="p-8 w-full">

                    <h1 className="text-2xl font-bold mb-6">
                        Patient History
                    </h1>

                    {/* TABS */}
                    <div className="flex gap-4 mb-6">

                        <button
                            onClick={() => setPatientTab("current")}
                            className={`px-4 py-2 rounded-xl
          ${patientTab === "current"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100"}
        `}
                        >
                            Current Condition
                        </button>

                        <button
                            onClick={() => setPatientTab("previous")}
                            className={`px-4 py-2 rounded-xl
          ${patientTab === "previous"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100"}
        `}
                        >
                            Previous Condition
                        </button>

                        <button
                            onClick={() => setPatientTab("details")}
                            className={`px-4 py-2 rounded-xl
          ${patientTab === "details"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100"}
        `}
                        >
                            Patient Details
                        </button>

                    </div>

                    {/* CONTENT */}

                    {patientTab === "current" && (
                        <div className="bg-blue-50 p-6 rounded-xl">
                            <h3 className="font-bold text-blue-700 mb-2">
                                Current Condition
                            </h3>
                            <p>Patient currently has fever and mild cough.</p>
                        </div>
                    )}

                    {patientTab === "previous" && (
                        <div className="bg-yellow-50 p-6 rounded-xl">
                            <h3 className="font-bold text-yellow-700 mb-2">
                                Previous Condition
                            </h3>
                            <p>Patient had viral infection last month.</p>
                        </div>
                    )}

                    {patientTab === "details" && (
                        <div className="bg-gray-50 p-6 rounded-2xl space-y-4">

                            {/* BASIC DETAILS */}
                            <div className="bg-white p-5 rounded-xl shadow space-y-2">
                                <p><b>Hospital Name:</b> City Hospital</p>
                                <p><b>Doctor Name:</b> {doctorData?.name}</p>
                                <p><b>Patient Name:</b> Sundar</p>
                                <p><b>Age:</b> 35</p>
                                <p><b>Mobile Number:</b> 5678909876</p>
                                <p><b>Address:</b> Coimbatore</p>
                            </div>

                            {/* CURRENT CONDITION */}
                            <div className="bg-blue-50 p-5 rounded-xl">
                                <p className="font-semibold text-blue-700">
                                    Current Condition
                                </p>
                                <p className="text-gray-700 mt-1">
                                    Fever, mild cough, under treatment.
                                </p>
                            </div>

                            {/* PREVIOUS CONDITION */}
                            <div className="bg-yellow-50 p-5 rounded-xl">
                                <p className="font-semibold text-yellow-700">
                                    Previous Condition
                                </p>
                                <p className="text-gray-700 mt-1">
                                    Viral infection, recovered last month.
                                </p>
                            </div>

                        </div>
                    )}

                </div>
            )}
            {page === "settings" && (
                <div className="w-full px-2 sm:px-4 md:p-8 flex justify-center md:justify-center">

<div className="w-full max-w-[100%] sm:max-w-[600px] md:max-w-[750px] lg:max-w-[900px] mx-auto px-2 sm:px-0">

                        <h1 className="text-2xl font-bold mb-6">
                            Calendar Settings
                        </h1>

                        <AdminCalendar adminId="demoAdmin" enableSlots={true} />
                    </div>

                </div>
            )}



        </div>
    )
}

export default DoctorProfile
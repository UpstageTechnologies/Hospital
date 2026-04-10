import React, { useEffect, useState } from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore"
import { onSnapshot } from "firebase/firestore"
import AdminCalendar from "../components/Calendar"
import { setDoc } from "firebase/firestore"


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
        <div className="bg-white rounded-2xl shadow p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <button onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
                    className="bg-blue-500 text-white px-3 py-2 rounded-xl">◀</button>

                <h2 className="text-xl font-bold">
                    {currentMonth.toLocaleString("default", { month: "long" })} {year}
                </h2>

                <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
                    className="bg-blue-500 text-white px-3 py-2 rounded-xl">▶</button>
            </div>

            {/* WEEK DAYS */}
            <div className="grid grid-cols-7 mb-3 text-center font-semibold text-gray-500">
                {days.map((d, i) => (
                    <div key={i}>{d}</div>
                ))}
            </div>

            {/* DATES */}
            <div className="grid grid-cols-7 gap-3">

                {dates.map((date, i) => {
                    if (!date) return <div key={i}></div>

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
                            className={`p-4 rounded-2xl text-center transition font-semibold

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
                            <p className="text-lg">{day}</p>
                            {isSunday && !events[date] && (
                                <p className="text-xs mt-1">Sunday</p>
                            )}

                            {eventData && eventData.slots && (
                                <p className="text-xs text-blue-400 mt-1">
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

    const [patientTab, setPatientTab] = useState("current")
    const [doctorEvents, setDoctorEvents] = useState({})
    const [appointmentEvents, setAppointmentEvents] = useState({})

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

        <div className="flex min-h-screen">

            {/* LEFT PANEL */}
            <div className="w-64 bg-blue-600 text-white p-6">
                <p onClick={() => setPage("home")} className="mb-3 cursor-pointer">Home</p>

                <p onClick={() => setPage("appointments")} className="mb-3 cursor-pointer">
                    Appointments
                </p>

                <p onClick={() => setPage("profile")} className="mb-3 cursor-pointer">
                    Profile
                </p>

                <p onClick={() => setPage("settings")} className="mb-3 cursor-pointer">
                    Settings
                </p>
            </div>

            {/* ================= APPOINTMENTS PAGE ================= */}
            {page === "appointments" && (
                <div className="p-8 w-full">

                    <h1 className="text-2xl font-bold mb-6">
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
                    {/* 
                    <h2 className="text-lg font-semibold mb-3">
                        Old Appointments
                    </h2>

                    <div className="bg-white rounded-xl shadow overflow-x-auto">

                        <table className="w-full text-left border-collapse">

                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="p-3">Patient Name</th>
                                    <th className="p-3">Time</th>
                                    <th className="p-3">Appointment No</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {appointments
                                    .filter(item => {
                                        const today = new Date(item.date)
                                        const now = new Date()
                                        return today < new Date(now.setHours(0, 0, 0, 0))
                                    })
                                    .map((item, i) => (

                                        <tr key={i} className="border-b hover:bg-gray-50">

                                            <td className="p-3 font-semibold">
                                                {item.patientName}
                                            </td>

                                            <td className="p-3">
                                                {item.time}
                                            </td>

                                            <td className="p-3 text-gray-500">
                                                {item.appointmentNo}
                                            </td>

                                            <td className="p-3">
                                                <span className={`
                px-2 py-1 rounded text-sm font-medium

                ${item.status === "completed" && "bg-green-100 text-green-700"}
                ${item.status === "cancelled" && "bg-red-100 text-red-600"}
                ${!item.status && "bg-yellow-100 text-yellow-700"}
              `}>
                                                    {item.status ? item.status : "pending"}
                                                </span>
                                            </td>

                                            <td className="p-3">

                                                <button
                                                    onClick={() => updateStatus(item.appointmentNo, "cancelled")}
                                                    className="text-red-500 hover:underline"
                                                >
                                                    Cancel
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                            </tbody>

                        </table>

                    </div> */}

                </div>
            )}


            {/* ================= HOME PAGE ================= */}
            {page === "home" && (
                <div className="p-8 w-full flex flex-col items-center">

                    <img src={doctorImage} className="w-24 h-24 rounded-full mb-4" />

                    <h1 className="text-3xl font-bold">{doctorData.name}</h1>

                    <h2 className="text-xl font-semibold mt-10 mb-4">
                        Current Appointments
                    </h2>

                    <div className="grid grid-cols-2 gap-4">

                        {appointments.filter(item => {
                            const today = new Date(item.date)
                            const now = new Date()
                            return today >= new Date(now.setHours(0, 0, 0, 0))
                                && item.status !== "completed"
                                && item.status !== "cancelled"
                        }).map((item, i) => (

                            <div key={i} className="bg-white shadow p-4 rounded border flex gap-4 items-center">

                                <img src={doctorImage} className="w-12 h-12 rounded-full" />

                                <div>
                                    <p className="font-semibold">{item.patientName}</p>
                                    <p className="text-sm text-gray-500">{item.time}</p>

                                    <button
                                        onClick={() => updateStatus(item.appointmentNo, "completed")}
                                        className="text-green-600 text-sm mt-1"
                                    >
                                        Complete
                                    </button>

                                </div>
                            </div>

                        ))}

                    </div>

                </div>
            )}

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
                <div className="p-8 w-full flex justify-center">

                    <div className="w-full max-w-3xl">

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
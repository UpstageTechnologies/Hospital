import React, { useEffect, useState } from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { auth, db } from "../firebase"
import {
    collection,
    getDocs,
    addDoc,
    serverTimestamp,
    deleteDoc,
    query,
    where
    } from "firebase/firestore"
import { onSnapshot } from "firebase/firestore"
import AdminCalendar from "../components/Calendar"
import { setDoc } from "firebase/firestore"
import { assets } from "../assets/assets"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import TodayVisitors from "../components/TodayVisitors";
import PatientsTable from "../components/PatientsTable";



const Calendar = ({
    onSelect = () => {},
    selectedDate = null,
    events = {},
    type = "doctor",
    appointments = []
    }) => {

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

const appointmentCount =
appointments.filter((item) => {

try {

if (!item.date)
return false;

const bookingDate =
new Date(item.date)
.toISOString()
.split("T")[0];

return bookingDate === date;

} catch {

return false;

}

}).length;
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

                                const activeSlots =
eventData?.slots?.filter(s => !s.leave) || [];
                                
                                setSlots(activeSlots);
                                setSelectedSlotDate(date);
                                setPopup(true);
                            }}
                            className={`aspect-square
                            flex flex-col items-center justify-center
                            rounded-xl sm:rounded-2xl
                            text-center transition font-semibold
                            text-sm sm:text-base
                            overflow-hidden

                            ${isToday
                                ? "bg-pink-500 text-white ring-4 ring-pink-200"
                                : type === "doctor"
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
                            <p
className={`
text-sm sm:text-lg
${isToday ? "font-bold text-white text-2xl" : "font-semibold"}
`}
>
{day}
</p>


                            {isSunday && !events[date] && (
    <p className="text-[10px] absolute bottom-1 opacity-0">
        Sunday
    </p>
)}

{appointmentCount > 0 && (

<p className="
text-[9px]
sm:text-xs
text-blue-600
mt-1
leading-none
text-center
font-semibold
">

{appointmentCount} Appointment
{appointmentCount > 1 ? "s" : ""}

</p>

)}

                        </button>


                    )
                })}
                {popup && (
                    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

                        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-5 rounded-xl w-[320px] text-white">

                        <h2 className="font-bold mb-3">
    Appointments - {selectedSlotDate}
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
                                        await setDoc(doc(db, "users", "demoAdmin", "calendar", selectedSlotDate), {
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

const DoctorProfile = ({ hideDemoNav }) => {

    const [doctorData, setDoctorData] = useState(null)
    const [slots, setSlots] = useState([])
    const [newSlot, setNewSlot] = useState("")
    const [doctorImage, setDoctorImage] = useState("")
    const [appointments, setAppointments] = useState([])
    const [
        appointmentHistory,
        setAppointmentHistory
        ] = useState([]);
    const [patientsData,setPatientsData] = useState([]);
    const [page, setPage] = useState("appointments")
    const [selected, setSelected] = useState(null)
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
        )
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [visitPopup, setVisitPopup] = useState(null);

const [visitForm, setVisitForm] = useState({
  solution: "",
  tablet: ""
});
    
const [showTabletDropdown,setShowTabletDropdown] =
useState(false);

const [summaryPopup,setSummaryPopup] =
useState(false);

const [summaryType,setSummaryType] =
useState("");

const [tabletSearch,setTabletSearch] =
useState("");

    const [selectedPatient, setSelectedPatient] = useState(null)
    const [step, setStep] = useState(1)

    const [checkInTime, setCheckInTime] = useState(null);
const [checkOutTime, setCheckOutTime] = useState(null);
const [consultationSeconds, setConsultationSeconds] = useState(0);

const [selectedMedicine, setSelectedMedicine] = useState("");
const [
    showMedicineDropdown,
    setShowMedicineDropdown
    ] = useState(false);
const [prescriptionText, setPrescriptionText] = useState("");

const [prescriptionList, setPrescriptionList] = useState([]);
const [totalAmount, setTotalAmount] = useState(0);

const [doseMorning, setDoseMorning] = useState("");
const [doseAfternoon, setDoseAfternoon] = useState("");
const [doseNight, setDoseNight] = useState("");
const [doseDays, setDoseDays] = useState("");

    const [patientTab, setPatientTab] = useState("current")
    const [doctorEvents, setDoctorEvents] = useState({})
    const [appointmentEvents, setAppointmentEvents] = useState({})

    const [type,setType] = useState("");
const [medicine,setMedicine] = useState("");
const [qty,setQty] = useState("");
const [purchase,setPurchase] = useState("");
const [sales,setSales] = useState("");
const [search,setSearch] = useState("");
const [historySearch,setHistorySearch] =useState("");
const [journalSearch,setJournalSearch] = useState("");
const [fromDate,setFromDate] = useState("");
const [toDate,setToDate] = useState("");
const [filteredJournalEntries,setFilteredJournalEntries] = useState([]);   
const [selectedJournal,setSelectedJournal] = useState(null);

const [showFollowupPopup,setShowFollowupPopup] = useState(false);
const [showTreatedPopup,setShowTreatedPopup] = useState(false);
const [historySelected,setHistorySelected] = useState(null);

const pendingPatients =
appointmentHistory.filter(
item => item.status === "Pending"
);

const completedPatients =
appointmentHistory.filter(
item => item.status === "Completed"
);

const [describeItems,setDescribeItems] = useState([]);

const syncPharmacyItems = async () => {

    try {

        const snap = await getDocs(
            collection(db, "inventory")
        );

        let items = [];

        snap.forEach((doc) => {

            const data = doc.data();

            items.push({

                id: doc.id,

                type: data.type || "",

                medicine:
                    data.medicine ||
                    data.subCategory ||
                    "",

                qty: Number(data.qty || 0),

                purchasePrice:
                    Number(data.purchasePrice || 0),

                salesPrice:
                    Number(data.salesPrice || 0)

            });

        });

        setDescribeItems(items);

    } catch (err) {

        console.log(err);

    }

};

const printHistory = (item) => {

    const printWindow =
    window.open("", "_blank");
    
    printWindow.document.write(`
    
    <h2>Patient Report</h2>
    
    <p><b>Patient :</b> ${item.patientName}</p>
    
    <p><b>Doctor :</b> ${item.doctorName}</p>
    
    <p><b>Reason :</b> ${item.reason}</p>
    
    <p><b>Solution :</b> ${item.solution}</p>
    
    <p><b>Date :</b> ${item.date}</p>
    
    <p><b>Contact :</b> ${item.patientPhone}</p>
    
    `);
    
    printWindow.document.close();
    
    printWindow.print();
    
    };

    const printHospitalReport = () => {

        const hospitalLogo =
          localStorage.getItem("hospitalLogo") || "";
      
        const hospitalName =
          localStorage.getItem("hospitalName") || "Hospital";
      
        const win = window.open("", "_blank");
      
        win.document.write(`
        <html>
        <head>
          <title>Hospital Patient Report</title>
      
          <style>
      
            body{
              font-family: Arial, sans-serif;
              padding:20px;
            }
      
            .header{
              display:flex;
              align-items:center;
              gap:20px;
              margin-bottom:20px;
              border-bottom:2px solid #ddd;
              padding-bottom:15px;
            }
      
            .logo{
              width:90px;
              height:90px;
              object-fit:contain;
            }
      
            .hospital-title{
              flex:1;
            }
      
            .hospital-title h1{
              margin:0;
              font-size:28px;
            }
      
            .hospital-title p{
              margin-top:5px;
              color:#555;
            }
      
            table{
              width:100%;
              border-collapse:collapse;
              margin-top:20px;
            }
      
            th,td{
              border:1px solid #000;
              padding:8px;
              text-align:left;
              font-size:12px;
            }
      
            th{
              background:#f3f4f6;
            }
      
            .summary{
              margin-top:25px;
            }
      
            .summary h3{
              margin:8px 0;
            }
      
          </style>
      
        </head>
      
        <body>
      
          <div class="header">
      
            <img
              src="${hospitalLogo}"
              class="logo"
            />
      
            <div class="hospital-title">
      
              <h1>${hospitalName}</h1>
      
              <p>Patient Journal Report</p>
      
              <p>
                Generated On :
                ${new Date().toLocaleString()}
              </p>
      
            </div>
      
          </div>
      
          <table>
      
            <thead>
      
              <tr>
      
                <th>Appointment No</th>
                <th>Date</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Reason</th>
                <th>Notes</th>
                <th>Consultancy</th>
                <th>Medicine</th>
                <th>Total</th>
                <th>Status</th>
      
              </tr>
      
            </thead>
      
            <tbody>
      
              ${filteredJournalEntries.map(item => `
      
                <tr>
      
                  <td>${item.appointmentNo || "-"}</td>
      
                  <td>${item.date || "-"}</td>
      
                  <td>${item.patientName || "-"}</td>
      
                  <td>${item.doctorName || "-"}</td>
      
                  <td>${item.patientPhone || "-"}</td>
      
                  <td>${item.address || "-"}</td>
      
                  <td>${item.reason || "-"}</td>
      
                  <td>${item.solution || "-"}</td>
      
                  <td>₹${item.consultancyFee || 0}</td>
      
                  <td>₹${item.medicineFee || 0}</td>
      
                  <td>₹${item.totalAmount || 0}</td>
      
                  <td>${item.status || "-"}</td>
      
                </tr>
      
              `).join("")}
      
            </tbody>
      
          </table>
      
          <div class="summary">
      
            <h3>
              Total Income :
              ₹${filteredJournalEntries.reduce(
                (sum,item)=>
                  sum + Number(item.totalAmount || 0),
                0
              )}
            </h3>
      
            <h3>
              Total Expense :
              ₹${filteredJournalEntries.reduce(
                (sum,item)=>
                  sum + Number(item.medicineFee || 0),
                0
              )}
            </h3>
      
            <h3>
              Total Profit :
              ₹${filteredJournalEntries.reduce(
                (sum,item)=>
                  sum +
                  (
                    Number(item.totalAmount || 0)
                    -
                    Number(item.medicineFee || 0)
                  ),
                0
              )}
            </h3>
      
          </div>
      
        </body>
      
        </html>
        `);
      
        win.document.close();
      
        setTimeout(() => {
          win.print();
        }, 500);
      
      };

const [activeDescribeCategory,setActiveDescribeCategory]=
useState("All");

// ✅ OPEN RAZORPAY
const openRazorpay = (amount) => {

    if (!window.Razorpay) {

        alert("Razorpay SDK Failed To Load");

        return;
    }

    const options = {

        key: "rzp_test_RqckwEGqKZFqMk",

        amount: amount * 100,

        currency: "INR",

        name: "Hospital Management",

        description: "Appointment Payment",

        handler: function (response) {

            console.log(response);

            alert("Payment Successful ✅");

            setStep(5);
        },

        prefill: {

            email: selectedAppointment?.email || "",

            contact: selectedAppointment?.phone || "",
        },

        theme: {

            color: "#2563eb",
        },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
};

const categoryMap={
 Tablet:["Paracetamol","Dolo"],
 Injection:["Insulin"],
 Capsule:["Omeprazole"],
 Syrup:["Cough Syrup"],
 Drops:["Eye Drops"],
 Ointment:["Burn Cream"],
 Inhaler:["Salbutamol"]
};

    const navigate = useNavigate();

    useEffect(() => {

        const handleBack = () => {
      
          const confirmLogout =
            window.confirm(
              "Are you sure you want to logout?"
            );
      
          if (confirmLogout) {
      
            localStorage.clear();
      
            navigate("/select-hospital", {
              replace: true
            });
      
          }
      
          else {
      
            window.history.pushState(
              null,
              "",
              window.location.href
            );
      
          }
      
        };
      
        window.history.pushState(
          null,
          "",
          window.location.href
        );
      
        window.addEventListener(
          "popstate",
          handleBack
        );
      
        return () => {
      
          window.removeEventListener(
            "popstate",
            handleBack
          );
      
        };
      
      }, []);



    const location = useLocation();

    useEffect(() => {

        const params =
        new URLSearchParams(location.search);
      
        const tab =
        params.get("tab");
      
        if (tab === "settings") {
          setPage("settings");
        }
      
      }, [location.search]);
const isDemo = location.state?.demo === true;

    const handleDateSelect = (date) => {
        setSelectedDate(date)
    }



    const updateStatus = async (appointmentNo, newStatus) => {

        try {
            const snap = await getDocs(collection(db, "appointments"))
    
            let updatedList = []
    
            for (let docItem of snap.docs) {
    
                const data = docItem.data()
    
                if (data.appointmentNo === appointmentNo) {
    
                    // 🔥 FIRESTORE UPDATE
                    await updateDoc(doc(db, "appointments", docItem.id), {
                        status: newStatus
                    })
    
                    updatedList.push({ ...data, status: newStatus })
                } else {
                    updatedList.push(data)
                }
            }
    
            // 🔥 UI update
            setAppointments(updatedList)
    
            alert(`Status updated to ${newStatus} ✅`)
    
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {

        const savedDoctor =
        JSON.parse(localStorage.getItem("doctorData"));
        
        if(savedDoctor){
        
        setDoctorData(savedDoctor);
        
        setDoctorImage(
        savedDoctor.image || ""
        );
        
        }
        
        }, []);

    useEffect(() => {

    if (!doctorData) return;

    const fetchAppointments = async () => {

        const email =
        localStorage.getItem("doctorEmail");

        const snap = await getDocs(
        collection(db, "appointments")
        );

        let list = [];
        const doctorEmail =
(localStorage.getItem("doctorEmail") || "")
.trim()
.toLowerCase();
const today =
new Date().toISOString().split("T")[0];

snap.forEach(docItem => {

  const data = docItem.data();

  const appointmentDate =
  data.date
    ? new Date(data.date)
        .toISOString()
        .split("T")[0]
    : "";

  if (
    data.status !== "Completed" &&
    appointmentDate === today
  ) {

    list.push({
      id: docItem.id,
      ...data
    });

  }

});

        console.log("Appointments:", list);

        setAppointments(list);
    };

    fetchAppointments();

}, [doctorData]);
useEffect(() => {
    console.log("UPDATED APPOINTMENTS", appointments);
    }, [appointments]);

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

        if(email === "demodoctor007"){

            setDoctorData({
            name:"Demo Doctor",
            email:"demodoctor007",
            image:assets.profile_pic,
            speciality:"General physician"
            });
            
            setDoctorImage(assets.profile_pic);
            
            return;
            }
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

        const createDefaultSlots = async () => {

            for(let d=1; d<=31; d++){
            
            const date =
            `2026-04-${String(d).padStart(2,"0")}`;
            
            await setDoc(
            doc(db,"users","demoAdmin","calendar",date),
            {
            slots:[
             {start:"11:00", end:"12:00"},
             {start:"16:00", end:"17:00"},
             {start:"19:00", end:"20:00"}
            ]
            },
            {merge:true}
            );
            
            }
            
            };
            
            createDefaultSlots();

        return () => unsub()

    }, [])

    useEffect(() => {

        const unsub = onSnapshot(
          collection(db, "appointmentHistory"),
          (snapshot) => {
       
            const list = [];
       
            snapshot.forEach((doc) => {
       
              list.push({
                id: doc.id,
                ...doc.data()
              });
       
            });
       
            setPatientsData(list);
       
          }
        );
       
        return () => unsub();
       
       }, []);

        useEffect(() => {

            let interval = null;
        
            if (checkInTime && !checkOutTime) {
        
                interval = setInterval(() => {
        
                    const diff =
                        Math.floor(
                            (new Date() - new Date(checkInTime)) / 1000
                        );
        
                    setConsultationSeconds(diff);
        
                }, 1000);
        
            }
        
            return () => clearInterval(interval);
        
        }, [checkInTime, checkOutTime]);

        useEffect(() => {

            syncPharmacyItems();
        
        }, []);

        useEffect(() => {

            const fetchHistory = async () => {
            
            const snap = await getDocs(
            collection(db, "appointmentHistory")
            );
            
            let list = [];
            
            snap.forEach((doc)=>{
            
            list.push({
            id: doc.id,
            ...doc.data()
            });
            
            });
            
            setAppointmentHistory(list);
            
            };
            
            fetchHistory();
            
            }, []);

            const filteredHistory = [...appointmentHistory]

            .filter((item) => {
            
            const searchText =
            historySearch.toLowerCase();
            
            return (
            
            (item.patientName || "")
            .toLowerCase()
            .includes(searchText)
            
            ||
            
            (item.doctorName || "")
            .toLowerCase()
            .includes(searchText)
            
            );
            
            })
            
            .sort((a,b)=>{
            
            const aTime =
            a.createdAt?.seconds || 0;
            
            const bTime =
            b.createdAt?.seconds || 0;
            
            return bTime - aTime;
            
            });

            useEffect(() => {
                setFilteredJournalEntries(appointmentHistory);
              }, [appointmentHistory]);

              const handleGenerateData = () => {

                if(!fromDate || !toDate){
                  alert("Select From Date & To Date");
                  return;
                }
              
                const startDate = new Date(fromDate);
                const endDate = new Date(toDate);
              
                endDate.setHours(23,59,59,999);
              
                const filtered =
                appointmentHistory.filter(item => {
              
                  if(!item.date) return false;
              
                  const itemDate =
                  new Date(item.date);
              
                  return (
                    itemDate >= startDate &&
                    itemDate <= endDate
                  );
              
                });
              
                setFilteredJournalEntries(filtered);
              
              };

            const filteredJournal = appointmentHistory

    const formatConsultationTime = (seconds) => {

        const savePrescriptionToFirebase = async () => {

            try {
            
            await addDoc(
            collection(db, "prescriptions"),
            {
            
            patientName:
            selectedAppointment?.patientName || "",
            
            patientId:
            selectedAppointment?.patientId || "",
            
            doctorName:
selectedAppointment?.doctorName || "",
            
doctorEmail:
selectedAppointment?.doctorEmail || "",
            
            appointmentNo:
            selectedAppointment?.appointmentNo || "",
            
            reason:
            selectedAppointment?.reason ||
            selectedAppointment?.problem ||
            "",
            
            prescriptionText,
            
            medicines: prescriptionList,
            
            consultationTime:
            formatConsultationTime(consultationSeconds),
            
            checkInTime:
            checkInTime
            ? new Date(checkInTime).toISOString()
            : "",
            
            checkOutTime:
            checkOutTime
            ? new Date(checkOutTime).toISOString()
            : "",
            
            date:
            new Date().toLocaleDateString(),

            consultancyFee: 600,

medicineFee: totalAmount,

totalAmount:
Number(600) +
Number(totalAmount || 0),

medicines:
prescriptionList || [],
            
            createdAt:
            serverTimestamp()
            
            }
            );
            
            alert("Prescription Saved ✅");
            
            } catch (err) {
            
            console.log(err);
            
            alert("Firebase Save Failed ❌");
            
            }
            
            };

        const hrs =
            String(Math.floor(seconds / 3600)).padStart(2, "0");
    
        const mins =
            String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    
        const secs =
            String(seconds % 60).padStart(2, "0");
    
        return `${hrs}:${mins}:${secs}`;
    };
    console.log("doctorData", doctorData);
        if(!doctorData){
        return <p className="p-10">Loading...</p>
        }
        return (

            <>
           
            
            <div className="flex flex-col md:flex-row min-h-[calc(100vh-90px)] pb-16 md:pb-0">

            {/* LEFT PANEL */}
            <div className="hidden md:block w-full md:w-64 bg-blue-600 text-white p-3 md:p-6">
                <p onClick={() => setPage("home")} className="mb-3 md:mb-3 cursor-pointer shrink-0">Home</p>

                <p onClick={() => setPage("appointments")} className="mb-3 md:mb-3 cursor-pointer shrink-0">
                    Appointments
                </p>

                <p onClick={() => setPage("describe")}className="mb-3 cursor-pointer">
                    Prescribe
                </p>

                <p onClick={() => setPage("patients")}className="mb-3 cursor-pointer">
                    Patients
                </p>

                <p onClick={() => setPage("appointmentHistory")}className="mb-3 cursor-pointer">
                    Appointment History
                </p>

                <p onClick={() => setPage("journalEntry")}className="mb-3 cursor-pointer">
                    Journal Entry
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
                    Set Appointments
                    </h2>

                    <div className="
flex
flex-col
xl:flex-row
gap-6
items-start
">

<div className="
w-full
xl:w-[650px]
shrink-0
">
<Calendar
    onSelect={handleDateSelect}
    selectedDate={selectedDate}
    events={appointmentEvents}
    type="appointment"
    appointments={appointments}
/>
</div>

<div className="
w-full
flex-1
">

{selectedDate && (
<div className="
bg-white
p-6
rounded-xl
shadow
">

<h2 className="text-lg font-semibold mb-4">
Schedule - {selectedDate}
</h2>

{/* UN SCHEDULE CODE FULLY SAME */}

                            <div className="space-y-4">

                                {Array.from({ length: 27 }, (_, i) => 9 * 60 + i * 30).map((minutes, i) => {

                                    const hour = Math.floor(minutes / 60)
                                    const min = minutes % 60

                                    const timeLabel =
                                        `${hour > 12 ? hour - 12 : hour}:${min === 0 ? "00" : min} ${hour >= 12 ? "PM" : "AM"}`
                                        const bookings = appointments.filter((a) => {

                                            try {
                                            
                                            if (!a.date || !a.time)
                                            return false;
                                            
                                            const bookingDate =
                                            new Date(a.date)
                                            .toISOString()
                                            .split("T")[0];
                                            
                                            const selected =
                                            new Date(selectedDate)
                                            .toISOString()
                                            .split("T")[0];
                                            
                                            if (bookingDate !== selected)
                                            return false;
                                            
                                            const startTime =
                                            a.time.split("-")[0]?.trim();
                                            
                                            if (!startTime)
                                            return false;
                                            
                                            const match =
                                            startTime.match(
                                            /(\d+):(\d+)(am|pm)/i
                                            );
                                            
                                            if (!match)
                                            return false;
                                            
                                            let hours =
                                            parseInt(match[1]);
                                            
                                            const mins =
                                            parseInt(match[2]);
                                            
                                            const modifier =
                                            match[3].toLowerCase();
                                            
                                            if (
                                            modifier === "pm" &&
                                            hours !== 12
                                            ) {
                                            hours += 12;
                                            }
                                            
                                            if (
                                            modifier === "am" &&
                                            hours === 12
                                            ) {
                                            hours = 0;
                                            }
                                            
                                            const appointmentMinutes =
                                            (hours * 60) + mins;
                                            
                                            return appointmentMinutes === minutes;
                                            
                                            } catch {
                                            
                                            return false;
                                            
                                            }
                                            
                                            });
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

{bookings.length > 0 && (

<div className="ml-6 flex flex-col gap-2">

{bookings.map((booking,index)=>(

<div
key={index}
className="
bg-yellow-100
border
border-yellow-400
rounded-xl
px-4
py-2
shadow
w-fit
"
>

<p className="font-semibold text-black">
👤 {booking.patientName}
</p>

<p className="text-sm text-gray-700">
📝 {booking.reason || booking.problem || "No Reason"}
</p>

</div>

))}

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

</div>

                </div>
            )}


{page==="describe" && (
<TodayVisitors appointments={appointments} />
)}


{page==="patients" && (

<PatientsTable
patientsData={patientsData}
/>

)}

{summaryPopup && (

<div className="
fixed
inset-0
bg-black/50
z-[99999]
flex
items-center
justify-center
p-4
">

<div className="
bg-white
w-full
max-w-5xl
rounded-3xl
p-6
max-h-[90vh]
overflow-y-auto
relative
">

<button
onClick={()=>
setSummaryPopup(false)
}
className="
absolute
top-4
right-5
text-4xl
font-bold
"
>
×
</button>

<h2 className="
text-3xl
font-bold
mb-6
">

{summaryType === "Completed"
? "Treated Patients"
: "Pending Patients"}

</h2>

<div className="
grid
grid-cols-1
md:grid-cols-2
gap-4
">

{appointmentHistory

.filter(item =>

summaryType === "Completed"

? item.status === "Completed"

: item.status === "Pending"

)

.map((item,index)=>(

<div
key={index}
className="
border
rounded-2xl
p-4
shadow-sm
bg-gray-50
"
>

<h3 className="
font-bold
text-xl
mb-3
">
{item.patientName}
</h3>

<p>
<b>Doctor :</b>
{item.doctorName}
</p>

<p>
<b>Phone :</b>
{item.patientPhone}
</p>

<p>
<b>Date :</b>
{item.date}
</p>

<p>
<b>Reason :</b>
{item.reason}
</p>

<p>
<b>Status :</b>
{item.status}
</p>

</div>

))}

</div>

</div>

</div>

)}

{page === "appointmentHistory" && (

<div className="flex-1 p-3 sm:p-5 md:p-6 pb-28">

<h1 className="text-2xl font-bold mb-6 text-center md:text-left">
Appointment History
</h1>

<div className="
grid
grid-cols-2
gap-4
mb-6
">

<div
onClick={()=>{
setSummaryType("Pending");
setSummaryPopup(true);
}}
className="
bg-orange-500
text-white
rounded-2xl
p-5
shadow
cursor-pointer
hover:scale-[1.02]
transition
"
>

<p className="text-sm">
Pending Patients
</p>

<p className="text-4xl font-bold mt-2">
{pendingPatients.length}
</p>

</div>

<div
onClick={()=>{
setSummaryType("Completed");
setSummaryPopup(true);
}}
className="
bg-green-600
text-white
rounded-2xl
p-5
shadow
cursor-pointer
hover:scale-[1.02]
transition
"
>

<p className="text-sm">
Treated Patients
</p>

<p className="text-4xl font-bold mt-2">
{completedPatients.length}
</p>

</div>

</div>

{/* SEARCH */}

<div className="mb-5">

<input
type="text"
placeholder="Search Patient / Doctor Name..."
value={historySearch}
onChange={(e)=>
setHistorySearch(e.target.value)
}
className="
w-full
border
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-blue-500
"
/>

</div>

{/* DESKTOP TABLE */}

<div className="
hidden
lg:block
bg-white
rounded-2xl
shadow
overflow-x-auto
">

<table className="w-full">

<thead className="bg-blue-600 text-white">

<tr>

<th className="p-4 text-left">Patient</th>
<th className="p-4 text-left">Doctor</th>
<th className="p-4 text-left">Address</th>
<th className="p-4 text-left">Reason</th>
<th className="p-4 text-left">Solution</th>
<th className="p-4 text-left">Date</th>
<th className="p-4 text-left">Contact</th>
<th className="p-4 text-left">Check-In</th>
<th className="p-4 text-left">Check-Out</th>
<th className="p-4 text-left">Duration</th>
<th className="p-4 text-left">Action</th>

</tr>

</thead>

<tbody>

{filteredHistory.map((item,index)=>(

<tr
key={index}
className="border-b hover:bg-gray-50"
>

<td className="p-4">
{item.patientName}
</td>

<td className="p-4">
{item.doctorName}
</td>

<td className="p-4">
{item.address || "-"}
</td>

<td className="p-4">
{item.reason || item.problem || "-"}
</td>

<td className="p-4">
{item.solution || "-"}
</td>

<td className="p-4">
{item.date || "-"}
</td>

<td className="p-4">
{item.patientPhone || "-"}
</td>

<td className="p-4">
{
item.checkInTime
? new Date(item.checkInTime).toLocaleTimeString()
: "-"
}
</td>

<td className="p-4">
{
item.checkOutTime
? new Date(item.checkOutTime).toLocaleTimeString()
: "-"
}
</td>

<td className="p-4">
{item.consultationTime || "-"}
</td>

<td className="p-4">
<div className="flex gap-2">

<button
className="
bg-yellow-500
hover:bg-yellow-600
text-white
px-3
py-1
rounded-lg
text-sm
"
onClick={()=>{
    setHistorySelected(item);
    setShowFollowupPopup(true);
    }}
>
Follow Up
</button>

<button
className="
bg-green-600
hover:bg-green-700
text-white
px-3
py-1
rounded-lg
text-sm
"
onClick={()=>{
    setHistorySelected(item);
    setShowTreatedPopup(true);
    }}
>
Treated
</button>

<button
className="
bg-blue-600
hover:bg-blue-700
text-white
px-3
py-1
rounded-lg
text-sm
"
onClick={()=>{
window.print();
}}
>
Print
</button>

</div>
</td>

</tr>

))}

</tbody>

</table>

</div>

{/* MOBILE + TABLET CARD VIEW */}

<div className="block lg:hidden space-y-4">

{filteredHistory.map((item,index)=>(

<div
key={index}
className="
bg-white
rounded-2xl
shadow
border
p-4
"
>

<div className="space-y-3">

<div className="block xl:hidden space-y-4">

{filteredHistory.map((item,index)=>(

<div
key={index}
className="
bg-white
rounded-2xl
shadow-md
border
p-4
"
>

<div className="flex justify-between items-start mb-4">

<div>
<h2 className="font-bold text-lg">
{item.patientName}
</h2>

<p className="text-sm text-gray-500">
{item.date}
</p>
</div>

<span className="
bg-green-100
text-green-700
px-3
py-1
rounded-full
text-xs
font-semibold
">
{item.status || "Treated"}
</span>

</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

<div><b>Doctor :</b> {item.doctorName}</div>

<div><b>Phone :</b> {item.patientPhone}</div>


<div className="sm:col-span-2">
<b>Reason :</b> {item.reason}
</div>

<div className="sm:col-span-2">
<b>Solution :</b> {item.solution}
</div>

<div>
<b>Check In :</b>
<br />
{
item.checkInTime
? new Date(item.checkInTime).toLocaleTimeString()
: "-"
}
</div>

<div>
<b>Check Out :</b>
<br />
{
item.checkOutTime
? new Date(item.checkOutTime).toLocaleTimeString()
: "-"
}
</div>

<div>
<b>Duration :</b>
<br />
{item.consultationTime || "-"}
</div>

<div>
<b>Payment :</b>
<br />
{item.paymentStatus || "Paid"}
</div>

</div>

<div className="
flex
flex-wrap
gap-2
mt-4
pt-4
border-t
">

<button
onClick={()=>{
setHistorySelected(item);
setShowFollowupPopup(true);
}}
className="
flex-1
bg-yellow-500
text-white
py-2
rounded-xl
"
>
Follow Up
</button>

<button
onClick={()=>{
setHistorySelected(item);
setShowTreatedPopup(true);
}}
className="
flex-1
bg-green-600
text-white
py-2
rounded-xl
"
>
Treated
</button>

<button
onClick={()=>printHistory(item)}
className="
flex-1
bg-blue-600
text-white
py-2
rounded-xl
"
>
Print
</button>

</div>

</div>

))}

</div>

</div>

</div>

))}

</div>

</div>

)}

{page === "journalEntry" && (

<div className="flex-1 p-4 md:p-8">

<h1 className="text-3xl font-bold mb-6">
Journal Entry
</h1>

<div className="mb-5">

<input
type="text"
placeholder="Search Appointment No / Patient / Doctor"
value={journalSearch}
onChange={(e)=>setJournalSearch(e.target.value)}
className="
w-full
md:w-[450px]
border
rounded-xl
p-3
"
/>

</div>

<div className="
flex
flex-col
md:flex-row
gap-3
mb-5
">

<input
type="date"
value={fromDate}
onChange={(e)=>setFromDate(e.target.value)}
className="border rounded-xl p-3"
/>

<input
type="date"
value={toDate}
onChange={(e)=>setToDate(e.target.value)}
className="border rounded-xl p-3"
/>

<button
onClick={handleGenerateData}
className="
bg-blue-600
text-white
px-6
rounded-xl
"
>
Generate Data
</button>

<button
onClick={printHospitalReport}
className="
bg-green-600
text-white
px-6
rounded-xl
"
>
Print Report
</button>

</div>

{/* Income Expense Profit */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

<div className="
bg-white
rounded-3xl
shadow-lg
p-6
border-l-[8px]
border-blue-500
">
<p className="text-gray-500 text-lg font-semibold">
 Income
</p>

<p className="text-4xl font-bold text-blue-500 mt-3">
₹{
filteredJournalEntries.reduce(
(sum,item)=>
sum + Number(item.totalAmount || 0),
0
)
}
</p>
</div>

<div className="
bg-white
rounded-3xl
shadow-lg
p-6
border-l-[8px]
border-yellow-500
">
<p className="text-gray-500 text-lg font-semibold">
 Expense
</p>

<p className="text-4xl font-bold text-yellow-500 mt-3">
₹{
filteredJournalEntries.reduce(
(sum,item)=>
sum + Number(item.medicineFee || 0),
0
)
}
</p>
</div>

<div className="
bg-white
rounded-3xl
shadow-lg
p-6
border-l-[8px]
border-green-500
">
<p className="text-gray-500 text-lg font-semibold">
 Profit
</p>

<p className="text-4xl font-bold text-green-500 mt-3">
₹{
filteredJournalEntries.reduce(
    (sum,item)=>
    sum +
    (
    Number(item.totalAmount || 0)
    -
    Number(item.medicineFee || 0)
    ),
    0
    )
}
</p>
</div>

</div>


{/* Desktop */}

<div className="hidden lg:block bg-white rounded-2xl shadow overflow-x-auto">

<table className="w-full">

<thead className="bg-blue-600 text-white">

<tr>
<th className="p-4">Date</th>
<th className="p-4">Appointment No</th>
<th className="p-4">Patient</th>
<th className="p-4">Income</th>
<th className="p-4">Expense</th>
<th className="p-4">Action</th>
</tr>

</thead>

<tbody>

{filteredJournalEntries.map((item,index)=>(

<tr key={index} className="border-b">

<td className="p-4">{item.date || "-"}</td>

<td className="p-4 font-semibold">
{item.appointmentNo || "-"}
</td>

<td className="p-4">
{item.patientName || "-"}
</td>

<td className="p-4 text-green-600 font-bold">
₹{item.totalAmount || 0}
</td>

<td className="p-4 text-red-600 font-bold">
₹{item.medicineFee || 0}
</td>

<td className="p-4">

<button
onClick={()=>setSelectedJournal(item)}
className="bg-blue-600 text-white px-4 py-2 rounded-lg"
>
Details
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

<div className="block lg:hidden space-y-4">

{filteredJournalEntries.map((item,index)=>(

<div
key={index}
onClick={()=>setSelectedJournal(item)}
className="
bg-white
rounded-2xl
shadow
p-4
cursor-pointer
"
>

<p><b>Date :</b> {item.date}</p>

<p><b>Appointment No :</b>
{item.appointmentNo || "-"}
</p>

<p><b>Patient :</b>
{item.patientName}
</p>

<p className="text-green-600 font-bold">
Income : ₹{item.totalAmount || 0}
</p>

<p className="text-red-600 font-bold">
Expense : ₹{item.medicineFee || 0}
</p>

</div>

))}

</div>

</div>

)}

{selectedJournal && (

<div
className="
fixed
inset-0
bg-black/50
z-[99999]
flex
items-center
justify-center
p-4
"
>

<div
className="
bg-white
w-full
max-w-7xl
max-h-[95vh]
overflow-y-auto
rounded-3xl
shadow-2xl
border
p-5
relative
"
>

<button
onClick={()=>setSelectedJournal(null)}
className="
absolute
top-4
right-4
text-4xl
font-bold
"
>
×
</button>

<div
className="
bg-white
rounded-2xl
shadow-lg
border
p-5
"
>

<div className="
flex
justify-between
items-center
flex-wrap
gap-3
"
>

<h2 className="font-bold text-xl">
Appointment :
{selectedJournal.appointmentNo}
</h2>



</div>

<div className="
grid
grid-cols-1
md:grid-cols-2
gap-4
mt-5
"
>

<div>
<b>Patient :</b>
{selectedJournal.patientName}
</div>

<div>
<b>Age :</b>
{selectedJournal.age}
</div>

<div>
<b>Doctor :</b>
{selectedJournal.doctorName}
</div>

<div>
<b>Phone :</b>
{selectedJournal.patientPhone}
</div>

<div>
<b>Date :</b>
{selectedJournal.date}
</div>

<div>
<b>Duration :</b>
{selectedJournal.consultationTime}
</div>

<div className="md:col-span-2">
<b>Requirement :</b>
{selectedJournal.reason}
</div>

<div className="md:col-span-2">
<b>Doctor Notes :</b>
{selectedJournal.solution}
</div>

<div className="md:col-span-2">
<b>Lab Tests :</b>

{selectedJournal.labTests?.length > 0
? selectedJournal.labTests.join(", ")
: "No Lab Test"}
</div>

<div>
<b>Blood Group :</b>
{selectedJournal.bloodGroup || "-"}
</div>

<div>
<b>Gender :</b>
{selectedJournal.gender || "-"}
</div>

<div>
<b>Payment Status :</b>
{selectedJournal.paymentStatus || "Paid"}
</div>

<div>
<b>Status :</b>
{selectedJournal.status || "Completed"}
</div>

<div>
<b>Prescription Count :</b>
{selectedJournal.medicines?.length || 0}
</div>

</div>

<div className="
grid
grid-cols-1
md:grid-cols-3
gap-4
mt-5
"
>

<div className="bg-green-100 p-4 rounded-xl">
Consultancy Fee
<br/>
<b>₹{selectedJournal.consultancyFee || 0}</b>
</div>

<div className="bg-blue-100 p-4 rounded-xl">
Medicine Fee
<br/>
<b>₹{selectedJournal.medicineFee || 0}</b>
</div>

<div className="bg-yellow-100 p-4 rounded-xl">
Total
<br/>
<b>₹{selectedJournal.totalAmount || 0}</b>
</div>

<div className="mt-6 bg-white border rounded-2xl p-5">

<h2 className="text-xl font-bold mb-4">
Fee Details
</h2>

{/* Consultancy */}

<div className="mb-5">

<h3 className="font-bold text-green-700 text-lg">
Consultancy Fee
</h3>

<div className="flex justify-between border-b py-2">

<span>Doctor Consultation</span>

<span>
₹{selectedJournal.consultancyFee || 0}
</span>

</div>

</div>

{/* Medicine */}

<div className="mb-5">

<h3 className="font-bold text-blue-700 text-lg">
Medicine Details
</h3>

<div className="overflow-x-auto">

<table className="w-full min-w-[600px] border">

<thead className="bg-blue-100">

<tr>

<th className="p-3 text-left w-[40%]">
Medicine
</th>

<th className="p-3 text-center w-[15%]">
Qty
</th>

<th className="p-3 text-center w-[20%]">
Rate
</th>

<th className="p-3 text-center w-[25%]">
Amount
</th>

</tr>

</thead>

<tbody>

{selectedJournal.medicines?.map((med,index)=>{

const qty =
(Number(med.morning||0)+
Number(med.afternoon||0)+
Number(med.night||0))
*
Number(med.days||0)

return(

<tr
key={index}
className="border-b"
>

<td className="p-3">
{med.medicine}
</td>

<td className="p-3 text-center">
{qty}
</td>

<td className="p-3 text-center">
₹{med.price}
</td>

<td className="p-3 text-center font-semibold text-green-600">
₹{med.total}
</td>

</tr>

)

})}

</tbody>

</table>

</div>

</div>

{/* Total */}

<div className="
bg-yellow-100
rounded-xl
p-4
mt-4
">

<div className="flex justify-between">

<span className="font-bold">
Consultancy Fee
</span>

<span>
₹{selectedJournal.consultancyFee || 0}
</span>

</div>

<div className="flex justify-between mt-2">

<span className="font-bold">
Medicine Fee
</span>

<span>
₹{selectedJournal.medicineFee || 0}
</span>

</div>

<hr className="my-3"/>

<div className="flex justify-between text-xl font-bold">

<span>Total Amount</span>

<span>
₹{selectedJournal.totalAmount || 0}
</span>

</div>

</div>

</div>

<div className="
bg-blue-50
rounded-2xl
p-6
border
shadow-sm
">

<h3 className="font-bold text-xl mb-5">
Patient Summary
</h3>

<div className="space-y-4 text-[15px]">

<div className="flex justify-between">
<span>👤 Patient</span>
<b>{selectedJournal.patientName || "-"}</b>
</div>

<div className="flex justify-between">
<span>👨‍⚕️ Doctor</span>
<b>{selectedJournal.doctorName || "-"}</b>
</div>

<div className="flex justify-between">
<span>📅 Visit Date</span>
<b>{selectedJournal.date || "-"}</b>
</div>

<div className="flex justify-between">
<span>📞 Contact</span>
<b>{selectedJournal.patientPhone || "-"}</b>
</div>

<div className="flex justify-between">
<span>🎂 Age</span>
<b>{selectedJournal.age || "-"}</b>
</div>

<div className="flex justify-between">
<span>⚧ Gender</span>
<b>{selectedJournal.gender || "-"}</b>
</div>

<div className="flex justify-between">
<span>🩸 Blood Group</span>
<b>{selectedJournal.bloodGroup || "-"}</b>
</div>

<div className="flex justify-between">
<span>📍 Address</span>
<b>{selectedJournal.address || "-"}</b>
</div>

<div className="flex justify-between">
<span>🧪 Lab Tests</span>
<b>
{selectedJournal.labTests?.length || 0}
</b>
</div>

<div className="flex justify-between">
<span>💊 Prescriptions</span>
<b>
{selectedJournal.medicines?.length || 0}
</b>
</div>

<div className="flex justify-between">
<span>⏱ Duration</span>
<b>
{selectedJournal.consultationTime || "-"}
</b>
</div>

</div>

</div>


<div className="
bg-green-50
rounded-2xl
p-5
border
mt-5
">

<h3 className="font-bold text-xl mb-4">
Appointment Info
</h3>

<p>
📋 Appointment No :
<b> {selectedJournal.appointmentNo}</b>
</p>

<p className="mt-2">
💳 Payment :
<b> {selectedJournal.paymentStatus || "Paid"}</b>
</p>

<p className="mt-2">
📊 Status :
<b> {selectedJournal.status || "Completed"}</b>
</p>

<p className="mt-2">
💊 Medicines :
<b>
{selectedJournal.medicines?.length || 0}
</b>
</p>

</div>

</div>

<div className="
bg-purple-100
rounded-2xl
p-5
mt-5
"
>

<h3 className="font-bold text-xl mb-3">
Treatment Summary
</h3>

<p>
{selectedJournal.solution || "No Treatment Notes"}
</p>

</div>

<div className="
grid
grid-cols-2
md:grid-cols-4
gap-4
mt-5
"
>

<div className="bg-blue-100 p-4 rounded-xl">
👨 Patient Age
<br />
<b>{selectedJournal.age || "-"}</b>
</div>

<div className="bg-green-100 p-4 rounded-xl">
💊 Medicines
<br />
<b>{selectedJournal.medicines?.length || 0}</b>
</div>

<div className="bg-yellow-100 p-4 rounded-xl">
🧪 Lab Tests
<br />
<b>{selectedJournal.labTests?.length || 0}</b>
</div>

<div className="bg-red-100 p-4 rounded-xl">
⏱ Duration
<br />
<b>{selectedJournal.consultationTime || "-"}</b>
</div>

</div>

</div>

</div>

</div>

)}

{showFollowupPopup && (

<div className="fixed inset-0 bg-black/50 z-[99999] flex items-center justify-center p-3">

<div className="
bg-white
w-full
max-w-4xl
rounded-3xl
max-h-[95vh]
overflow-y-auto
p-5 md:p-8
relative
">

<button
onClick={()=>setShowFollowupPopup(false)}
className="absolute top-4 right-5 text-4xl"
>
×
</button>

<div className="text-center">

<img
src={assets.profile_pic}
className="
w-24 h-24
md:w-32 md:h-32
mx-auto
rounded-full
"
/>

<h2 className="
text-2xl
md:text-5xl
font-bold
mt-4
">
Follow Up Patient
</h2>

<div className="
inline-block
bg-blue-600
text-white
font-bold
text-lg
md:text-3xl
px-6
py-4
rounded-2xl
mt-6
">
Appointment No :
{historySelected?.appointmentNo}
</div>

</div>

<div className="
grid
grid-cols-1
md:grid-cols-2
gap-4
mt-8
">

<input readOnly value={historySelected?.patientName || ""} className="border p-4 rounded-xl"/>
<input readOnly value={historySelected?.patientPhone || ""} className="border p-4 rounded-xl"/>
<input readOnly value={historySelected?.doctorName || ""} className="border p-4 rounded-xl"/>
<input readOnly value={historySelected?.reason || ""} className="border p-4 rounded-xl"/>
<input readOnly value={historySelected?.date || ""} className="border p-4 rounded-xl"/>
<input readOnly value={historySelected?.address || ""} className="border p-4 rounded-xl"/>

</div>

<div className="text-center mt-8">

<div className="
text-green-600
font-bold
text-2xl
md:text-4xl
">
📞 {historySelected?.patientPhone}
</div>

<button className="
mt-5
bg-green-600
text-white
px-10
py-4
rounded-xl
font-bold
">
Contact Number
</button>

</div>

</div>

</div>

)}

{showTreatedPopup && (

<div className="fixed inset-0 bg-black/50 z-[99999] flex items-center justify-center p-3">

<div className="
bg-white
w-full
max-w-4xl
rounded-3xl
max-h-[95vh]
overflow-y-auto
p-5 md:p-8
relative
">

<button
onClick={()=>setShowTreatedPopup(false)}
className="absolute top-4 right-5 text-4xl"
>
×
</button>

<div className="text-center">

<img
src={assets.profile_pic}
className="
w-24 h-24
md:w-32 md:h-32
mx-auto
rounded-full
"
/>

<h2 className="
text-2xl
md:text-5xl
font-bold
mt-4
">
Patient Confirmation
</h2>

</div>

<div className="
grid
grid-cols-1
md:grid-cols-2
gap-4
mt-8
">

<input readOnly value={historySelected?.patientName || ""} className="border p-4 rounded-xl"/>
<input readOnly value={historySelected?.doctorName || ""} className="border p-4 rounded-xl"/>
<input readOnly value={historySelected?.patientPhone || ""} className="border p-4 rounded-xl"/>
<input readOnly value={historySelected?.reason || ""} className="border p-4 rounded-xl"/>
<input readOnly value={historySelected?.date || ""} className="border p-4 rounded-xl"/>
<input readOnly value={historySelected?.consultationTime || ""} className="border p-4 rounded-xl"/>

</div>

<div className="mt-8 space-y-4">

<button
onClick={async()=>{

await updateDoc(
doc(
db,
"appointmentHistory",
historySelected.id
),
{
status:"Pending"
}
);

setAppointmentHistory(prev =>
prev.map(item =>
item.id === historySelected.id
? {
...item,
status:"Pending"
}
: item
)
);

setShowTreatedPopup(false);

}}

className="
w-full
bg-orange-500
text-white
py-4
rounded-xl
font-bold
"
>
Follow Up Required
</button>

<button
onClick={async()=>{

await updateDoc(
doc(
db,
"appointmentHistory",
historySelected.id
),
{
status:"Completed"
}
);

setAppointmentHistory(prev =>
prev.map(item =>
item.id === historySelected.id
? {
...item,
status:"Completed"
}
: item
)
);

setShowTreatedPopup(false);

}}

className="
w-full
bg-green-600
text-white
py-4
rounded-xl
font-bold
"
>
Treated
</button>

</div>

</div>

</div>

)}

            {/* ================= HOME PAGE ================= */}
            {page === "home" && (
               <div className="flex-1 p-6 overflow-x-hidden">

<h1 className="text-2xl font-bold mb-6 text-center md:text-left">
  Current Appointments
</h1>

<div className="
grid
grid-cols-1
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
xl:grid-cols-5
2xl:grid-cols-6
gap-4
mt-10
w-full
">
{appointments
.filter(item => {

  const appointmentDate =
  item.date
    ? new Date(item.date)
        .toISOString()
        .split("T")[0]
    : "";

  return (
    item.status !== "Completed" &&
    appointmentDate ===
    new Date().toISOString().split("T")[0]
  );

})
.map((item, index) => (

  <div
    key={index}
    onClick={() => {
      setSelectedAppointment(item)
      setStep(1)
    }}
  >

                                {/* PATIENT IMAGE */}
                                <img
                                    src={item.patientImage || assets.profile_pic}
                                    className="w-12 h-12 rounded-full object-cover"
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

                    {/* Hospital Dashboard */}

<div className="mt-10">

<h2 className="text-2xl font-bold mb-5">
Hospital Overview
</h2>

<div className="
grid
grid-cols-2
md:grid-cols-2
lg:grid-cols-4
gap-4
">

<div className="bg-blue-500 text-white rounded-2xl p-5 shadow">
<p className="text-sm">Total Patients</p>
<p className="text-3xl font-bold mt-2">
{patientsData.length}
</p>
</div>

<div className="bg-green-500 text-white rounded-2xl p-5 shadow">
<p className="text-sm">Today's Appointments</p>
<p className="text-3xl font-bold mt-2">
{
appointments.filter(
a =>
a.date ===
new Date()
.toISOString()
.split("T")[0]
).length
}
</p>
</div>

<div className="bg-purple-500 text-white rounded-2xl p-5 shadow">
<p className="text-sm">Upcoming Appointments</p>
<p className="text-3xl font-bold mt-2">
{appointments.length}
</p>
</div>

<div className="bg-orange-500 text-white rounded-2xl p-5 shadow">
<p className="text-sm">Available Slots</p>
<p className="text-3xl font-bold mt-2">
27
</p>
</div>

</div>

</div>

<div className="mt-8 bg-white border rounded-2xl p-5 shadow">

<h2 className="text-xl font-bold mb-4">
Today's Summary
</h2>

<div className="space-y-3">

<p>
🏥 Total Patients :
<b> {patientsData.length}</b>
</p>

<p>
📅 Appointments :
<b> {appointments.length}</b>
</p>

<p>
👨‍⚕️ Doctor :
<b> {doctorData?.name}</b>
</p>

<p>
🕒 Consultation Hours :     
<b> 09:00 AM - 08:00 PM</b>
</p>

</div>

</div>

                    {/* 🔥 👉 இதே இடத்துல தான் popup போடணும் */}
                    {selectedAppointment && (
                        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">

<div className="
bg-white
w-[98%]
sm:w-[95%]
md:w-[90%]
lg:w-[1100px]
max-h-[95vh]
overflow-y-auto
rounded-2xl
shadow-2xl
flex
flex-col
md:flex-row
"
>

 {/* LEFT PANEL */}
<div className="
w-full
md:w-1/4
bg-gray-100
p-4
space-y-3
rounded-t-2xl
md:rounded-none
">

    <h2 className="font-bold text-lg">Appointment Panel</h2>

    {/* STEP 1 */}
    <button
        onClick={() => setStep(1)}
        className={`w-full p-2 rounded text-white ${
            step === 1 ? "bg-blue-500" : "bg-gray-400"
        }`}
    >
        Patient Details
    </button>

    {/* STEP 2 */}
    <button
        onClick={() => setStep(2)}
        className={`w-full p-2 rounded text-white ${
            step === 2 ? "bg-blue-500" : "bg-gray-400"
        }`}
    >
        Check-In
    </button>

    {/* NEW STEP 3 */}
    <button
        onClick={() => setStep(3)}
        className={`w-full p-2 rounded text-white ${
            step === 3 ? "bg-blue-500" : "bg-gray-400"
        }`}
    >
        Prescribe
    </button>

    {/* STEP 4 */}
    <button
        onClick={() => setStep(4)}
        className={`w-full p-2 rounded text-white ${
            step === 4 ? "bg-blue-500" : "bg-gray-400"
        }`}
    >
        Payment
    </button>

    {/* STEP 5 */}
    <button
        onClick={() => setStep(5)}
        className={`w-full p-2 rounded text-white ${
            step === 5 ? "bg-blue-500" : "bg-gray-400"
        }`}
    >
        Check-Out
    </button>

</div>

                                {/* RIGHT CONTENT */}
                                <div className="
w-full
md:w-3/4
overflow-y-auto
max-h-[90vh]
p-4
md:p-6
flex
flex-col
justify-between
relative
">

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
                                                    <input value={selectedAppointment.reason || ""} disabled className="w-full border p-3 rounded-xl" />
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

<h3 className="text-2xl font-bold mb-6">
Consultation
</h3>

<div className="text-5xl font-bold text-blue-600 mb-8">
{formatConsultationTime(consultationSeconds)}
</div>

<button

onClick={() => {

setCheckInTime(new Date());

setCheckOutTime(null);

setConsultationSeconds(0);

setStep(3);

}}

className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl text-xl"

>

Check-In

</button>

</div>

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

                                    {/* STEP 3 PRESCRIBE */}
                                    {step === 3 && (

<div className="flex flex-col h-full justify-between">

<div>

<h3 className="text-2xl font-bold mb-5">
Prescribe
</h3>

{/* PATIENT REASON */}

<div className="bg-red-100 border border-red-300 rounded-xl p-4 mb-5">

<p className="font-bold text-red-700 text-lg">
Patient Reason
</p>

<p className="text-lg mt-2">
{selectedAppointment?.reason ||
selectedAppointment?.problem ||
"No Reason"}
</p>

</div>

{/* TEXT AREA */}

<textarea

value={prescriptionText}

onChange={(e)=>
setPrescriptionText(e.target.value)
}

placeholder="Enter Prescription..."

className="w-full border p-4 rounded-xl h-36"

/>

{/* MEDICINE SECTION */}

<div className="mt-6">

<h4 className="font-bold text-lg mb-4">
Available Medicines
</h4>

<div className="
grid
grid-cols-1
md:grid-cols-2
gap-3
">

<div className="relative">

<input
value={selectedMedicine}
onChange={(e)=>{
setSelectedMedicine(e.target.value);
}}
onFocus={()=>setShowMedicineDropdown(true)}
placeholder="Search Medicine"
className="border p-3 rounded-xl w-full"
/>

<button
type="button"
onClick={()=>
setShowMedicineDropdown(
!showMedicineDropdown
)
}
className="absolute right-4 top-3"
>
⌄
</button>

{showMedicineDropdown && (

<div className="
absolute
top-16
left-0
w-full
bg-white
rounded-xl
shadow-lg
z-50
max-h-60
overflow-y-auto
border
">

{describeItems

.filter(item =>

item.medicine
.toLowerCase()
.includes(
selectedMedicine.toLowerCase()
)

)

.map((item,index)=>(

<div

key={index}

onClick={()=>{

setSelectedMedicine(item.medicine);

setShowMedicineDropdown(false);

}}

className="
px-4
py-3
cursor-pointer
hover:bg-blue-100
border-b
"

>

<div className="font-semibold">
{item.medicine}
</div>

<div className="
text-sm
text-gray-500
flex
justify-between
">

<span>
Stock: {item.qty}
</span>

<span>
₹{item.salesPrice}
</span>

</div>

</div>

))}

</div>

)}

</div>

<input
type="number"
placeholder="Morning"
value={doseMorning}
onChange={(e)=>setDoseMorning(e.target.value)}
className="border p-3 rounded-xl"
/>

<input
type="number"
placeholder="Afternoon"
value={doseAfternoon}
onChange={(e)=>setDoseAfternoon(e.target.value)}
className="border p-3 rounded-xl"
/>

<input
type="number"
placeholder="Night"
value={doseNight}
onChange={(e)=>setDoseNight(e.target.value)}
className="border p-3 rounded-xl"
/>

<input
type="number"
placeholder="Days"
value={doseDays}
onChange={(e)=>setDoseDays(e.target.value)}
className="border p-3 rounded-xl"
/>

<button

onClick={() => {

if(!selectedMedicine) return;

const selectedMedData =
describeItems.find(
med => med.medicine === selectedMedicine
);

const quantity =

Number(doseMorning || 0)
+
Number(doseAfternoon || 0)
+
Number(doseNight || 0);

const totalTablets =
quantity * Number(doseDays || 0);

const medicinePrice =
Number(selectedMedData?.salesPrice || 0);

const medicineTotal =
medicinePrice * totalTablets;

const newItem = {

medicine: selectedMedicine,

morning: doseMorning,

afternoon: doseAfternoon,

night: doseNight,

days: doseDays,

price: medicinePrice,

total: medicineTotal

};

setPrescriptionList(prev => [
...prev,
newItem
]);

setTotalAmount(prev =>

    prev + medicineTotal
    
    );



setSelectedMedicine("");
setDoseMorning("");
setDoseAfternoon("");
setDoseNight("");
setDoseDays("");

}}

className="bg-green-600 text-white rounded-xl px-4 py-3"

>

Add

</button>

</div>

</div>

{/* TABLE */}

<div className="mt-6 overflow-x-auto">

<table className="w-full border">

<thead className="bg-blue-600 text-white">

<tr>

<th className="p-2">Medicine</th>
<th className="p-2">Morning</th>
<th className="p-2">Afternoon</th>
<th className="p-2">Night</th>
<th className="p-2">Days</th>
<th className="p-2">Price</th>
<th className="p-2">Total</th>

</tr>

</thead>

<tbody>

{prescriptionList.map((item,index)=>(

<tr
key={index}
className="border-b text-center"
>

<td className="p-2">
{item.medicine}
</td>

<td>{item.morning}</td>

<td>{item.afternoon}</td>

<td>{item.night}</td>

<td>{item.days}</td>

<td>₹{item.price}</td>

<td className="font-bold text-green-600">
₹{item.total}
</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

<div className="flex justify-end gap-4 mt-6">

<button
onClick={() => setStep(2)}
className="bg-gray-400 text-white px-6 py-2 rounded"
>
Previous
</button>

<button
onClick={() => setStep(4)}
className="bg-blue-600 text-white px-6 py-2 rounded"
>
Next
</button>

</div>

</div>

)}

{step === 4 && (

<div className="flex flex-col h-full justify-between">

<div>

<h3 className="text-2xl font-bold mb-6">
Payment
</h3>

<div className="space-y-5">

<div className="
bg-green-100
border
border-green-300
p-4
rounded-xl
">

<p className="text-lg font-semibold">
Consultation Fee
</p>

<p className="text-3xl font-bold text-green-700 mt-2">
₹600
</p>

</div>

<div className="
bg-blue-100
border
border-blue-300
p-4
rounded-xl
">

<p className="text-lg font-semibold">
Medicine Amount
</p>

<p className="text-3xl font-bold text-blue-700 mt-2">
₹{totalAmount}
</p>

</div>

<div className="
bg-yellow-100
border
border-yellow-300
p-4
rounded-xl
">

<p className="text-lg font-semibold">
Total Payment
</p>

<p className="text-4xl font-bold text-yellow-700 mt-2">

₹{
Number(600)
+
Number(totalAmount || 0)
}

</p>

</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

<button
onClick={() => openRazorpay(600)}
className="
bg-green-600
hover:bg-green-700
text-white
py-4
rounded-xl
font-bold
text-lg
"
>
Pay Consultation Fee
₹600
</button>

<button
onClick={() => openRazorpay(Number(totalAmount || 0))}
className="
bg-blue-600
hover:bg-blue-700
text-white
py-4
rounded-xl
font-bold
text-lg
"
>
Pay Medicine
₹{totalAmount}
</button>

<button
onClick={() =>
openRazorpay(
Number(600) +
Number(totalAmount || 0)
)
}
className="
bg-yellow-500
hover:bg-yellow-600
text-white
py-4
rounded-xl
font-bold
text-lg
"
>
Pay Total
₹{
Number(600) +
Number(totalAmount || 0)
}
</button>

</div>

</div>

</div>

<div className="flex justify-end gap-4 mt-6">

<button
onClick={() => setStep(3)}
className="bg-gray-400 text-white px-6 py-2 rounded"
>
Previous
</button>

<button
onClick={() => setStep(5)}
className="bg-blue-600 text-white px-6 py-2 rounded"
>
Next
</button>

</div>

</div>

)}

                                    {/* STEP 5 CHECKOUT */}
                                    {step === 5 && (

<div className="flex flex-col h-full justify-between">

<div className="flex flex-col items-center justify-center h-full">

<h3 className="text-3xl font-bold mb-6 text-green-700">
Appointment Completed
</h3>

<div className="bg-gray-100 p-6 rounded-2xl w-full max-w-md text-center mb-6">

<p className="text-lg font-semibold mb-3">
Total Consultation Time
</p>

<p className="text-4xl font-bold text-blue-600">
{formatConsultationTime(consultationSeconds)}
</p>

</div>


<div className="block xl:hidden space-y-4">

{filteredHistory.map((item,index)=>(

<div
key={index}
className="
bg-white
rounded-2xl
shadow-md
border
p-4
"
>

<div className="flex justify-between items-start mb-3">

<div>
<h2 className="font-bold text-lg">
{item.patientName}
</h2>

<p className="text-sm text-gray-500">
{item.date || "-"}
</p>
</div>

<span className="
bg-green-100
text-green-700
px-3
py-1
rounded-full
text-xs
font-semibold
">
{item.status || "Treated"}
</span>

</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">

<div>
<b>Doctor :</b> {item.doctorName || "-"}
</div>

<div>
<b>Phone :</b> {item.patientPhone || "-"}
</div>


<div className="sm:col-span-2">
<b>Reason :</b> {item.reason || "-"}
</div>

<div className="sm:col-span-2">
<b>Solution :</b> {item.solution || "-"}
</div>

<div>
<b>Check In :</b>
<br />
{item.checkInTime || "-"}
</div>

<div>
<b>Check Out :</b>
<br />
{item.checkOutTime || "-"}
</div>

<div>
<b>Duration :</b>
<br />
{item.consultationTime || "-"}
</div>

<div>
<b>Payment :</b>
<br />
{item.paymentStatus || "Paid"}
</div>

</div>

<div className="
flex
flex-wrap
gap-2
mt-4
pt-4
border-t
">

<button
onClick={()=>{
alert(`Follow Up - ${item.patientName}`);
}}
className="
flex-1
min-w-[90px]
bg-yellow-500
text-white
py-2
rounded-xl
font-medium
"
>
Follow Up
</button>

<button
onClick={()=>{
alert(`${item.patientName} Treated`);
}}
className="
flex-1
min-w-[90px]
bg-green-600
text-white
py-2
rounded-xl
font-medium
"
>
Treated
</button>

<button
onClick={()=>{
printHistory(item);
}}
className="
flex-1
min-w-[90px]
bg-blue-600
text-white
py-2
rounded-xl
font-medium
"
>
Print
</button>

</div>

</div>

))}

</div>


<button

onClick={async () => {

try {

const outTime = new Date();

setCheckOutTime(outTime);

const historyData = {

    patientName:
    selectedAppointment?.patientName || "",
    
    patientPhone:
    selectedAppointment?.phone || "",
    
    doctorName:
    selectedAppointment?.doctorName || "",
    
    appointmentNo:
    selectedAppointment?.appointmentNo || "",
    
    age:
    selectedAppointment?.age || "",
    
    address:
    selectedAppointment?.address || "",
    
    reason:
    selectedAppointment?.reason ||
    selectedAppointment?.problem ||
    "",
    
    solution:
    prescriptionText || "",
    
    date:
    selectedAppointment?.date || "",
    
    checkInTime:
    checkInTime
    ? new Date(checkInTime).toLocaleTimeString()
    : "",
    
    checkOutTime:
    new Date().toLocaleTimeString(),
    
    consultationTime:
    formatConsultationTime(
    consultationSeconds
    ),
    
    paymentStatus:"Paid",
    
    /* 🔥 ADD THESE */
    
    consultancyFee: 600,
    
    medicineFee: Number(totalAmount || 0),
    
    totalAmount:
    Number(600) +
    Number(totalAmount || 0),
    
    medicines:
    prescriptionList || [],
    
    status:"Treated",
    
    createdAt:
    serverTimestamp()
    }

    await addDoc(
        collection(db, "appointmentHistory"),
        historyData
      );

    const appointmentQuery = query(

        collection(db, "appointments"),
        
        where(
        "appointmentNo",
        "==",
        selectedAppointment.appointmentNo
        )
        
        );
        
        const appointmentSnap =
        await getDocs(appointmentQuery);
        
        appointmentSnap.forEach(async(docItem)=>{
        
        await deleteDoc(
        
        doc(
        db,
        "appointments",
        docItem.id
        )
        
        );
        
        });

    setAppointmentHistory(prev => [

        historyData,
        
        ...prev
        
        ]);

        const updatedAppointments = appointments.filter(

            item =>
            
            item.appointmentNo !==
            selectedAppointment.appointmentNo
            
            );
            
            setAppointments(updatedAppointments);
alert("Patient Check-Out Completed ✅");

setSelectedAppointment(null);

} catch (err) {

console.log(err);

alert("Firebase Save Failed ❌");

}

}}

className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl text-xl"

>

Confirm Check-Out

</button>

</div>

<div className="flex justify-end gap-4 mt-6">

<button
onClick={() => setStep(4)}
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
                </div>
            )}

            {/* MOBILE BOTTOM NAV */}
<div className="fixed bottom-0 left-0 w-full bg-white border-t shadow md:hidden flex justify-around items-center py-3 px-2 gap-2 z-50">

<button onClick={() => setPage("home")} className="flex flex-col items-center text-sm">
    🏠
    <span>Home</span>
</button>

<button onClick={() => setPage("appointments")} className="flex flex-col items-center text-sm">
    📅
    <span>Appointments</span>
</button>

<button onClick={() => setPage("appointmentHistory")}className="flex flex-col items-center text-sm">
    📜
    <span>History</span>
</button>

<button onClick={() => setPage("journalEntry")}className="flex flex-col items-center text-sm">
📒
<span>Journal</span>
</button>

<button
  onClick={() => setPage("patients")}
  className="flex flex-col items-center text-sm"
>
    🧑‍⚕️
    <span>Patients</span>
</button>

<button onClick={() => setPage("describe")} className="flex flex-col items-center text-sm">
  🧾
  <span>Describe</span>
</button>



</div>

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

</>
)
}

export default DoctorProfile
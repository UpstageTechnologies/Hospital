import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, setDoc, doc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar({ adminId = "demoAdmin", enableSlots = false }) {

  const [current, setCurrent] = useState(new Date());
  const [events, setEvents] = useState({});
  const [popup, setPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("working");

  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const format = (day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const [slotCount, setSlotCount] = useState(1);
  const [slotInput, setSlotInput] = useState(1);
  const [slots, setSlots] = useState([{ start: "", end: "" }]);
  const [isEdit, setIsEdit] = useState(false);

  // 🔥 REALTIME FIRESTORE
  useEffect(() => {
    const ref = collection(db, "users", adminId, "calendar");

    return onSnapshot(ref, (snap) => {
      let data = {};
      snap.forEach(d => {
        data[d.id] = d.data();
      });
      setEvents(data);
    });
  }, []);

  const handleSlotChange = (count) => {
    setSlotCount(count);
    let newSlots = [];
    for (let i = 0; i < count; i++) {
      newSlots.push({ start: "", end: "" });
    }
    setSlots(newSlots);
  };

  const handleTimeChange = (index, field, value) => {
    const updated = [...slots];
    updated[index][field] = value;
    setSlots(updated);
  };

  const formatTime = (time) => {
    if (!time) return "";

    let [h, m] = time.split(":");
    h = parseInt(h);

    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;

    return `${h}:${m} ${ampm}`;
  };

  useEffect(() => {
    if (popup && events[selectedDate]?.slots) {
      setSlots(events[selectedDate].slots);
      setIsEdit(true);
    }
  }, [events]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow w-full max-w-2xl">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => setCurrent(new Date(year, month - 1, 1))}
          className="bg-purple-500 text-white px-3 py-2 rounded-xl">‹</button>

        <h2 className="text-xl font-bold">
          {current.toLocaleString("default", { month: "long" })} {year}
        </h2>

        <button onClick={() => setCurrent(new Date(year, month + 1, 1))}
          className="bg-purple-500 text-white px-3 py-2 rounded-xl">›</button>
      </div>

      {/* WEEK */}
      <div className="grid grid-cols-7 text-center font-semibold text-gray-500 mb-3">
        {days.map(d => <div key={d}>{d}</div>)}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-7 gap-3">

        {[...Array(firstDay)].map((_, i) => <div key={i}></div>)}

        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const dateStr = format(day);
          const dayOnly = dateStr.split("-")[2];
          const event = events[dateStr] || events[`day-${dayOnly}`];
          const dayIndex = new Date(dateStr).getDay();
          const isSunday = dayIndex === 0;

          let color = "bg-gray-100";

          if (event?.type?.toLowerCase() === "holiday") {
            color = "bg-green-500 text-white";
          } else if (event?.type?.toLowerCase() === "gov" || isSunday) {
            color = "bg-red-500 text-white";
          }

          return (
            <div
              key={day}
              onDoubleClick={() => {
                setSelectedDate(dateStr);
                setPopup(true);
                setTitle(event?.title || "");
                setType(event?.type || "working");

                // ✅ STEP 5 CORRECT PLACE
                const dayOnly = dateStr.split("-")[2];
                const eventData = events[dateStr] || events[`day-${dayOnly}`];

                if (enableSlots) {
                  const dateEvent = events[dateStr];
                  const dayEvent = events[`day-${dayOnly}`];

                  const finalData = dateEvent || dayEvent;

                  if (finalData?.slots && finalData.slots.length > 0) {
                    setSlots(finalData.slots);
                    setSlotCount(finalData.slots.length);
                    setSlotInput(finalData.slots.length);

                    // 🔥 IMPORTANT
                    setIsEdit(!!dateEvent); // only true if exact date exists
                  } else {
                    setSlots([{ start: "", end: "" }]);
                    setSlotCount(1);
                    setSlotInput(1);
                    setIsEdit(false);
                  }
                }
              }}


              className={`p-4 rounded-2xl text-center cursor-pointer ${color}`}


            >
              <p className="font-bold">{day}</p>
              {isSunday && !event && (
                <p className="text-xs">Sunday</p>
              )}

              {event?.slots && (
                <p className="text-xs text-blue-200">
                  {event.slots.length} slots
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* POPUP */}
      {popup && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          {/* ✅ MASTER POPUP */}
          {!enableSlots && (
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-2xl w-[350px] text-white">

              <h2 className="text-xl font-bold mb-4">
                Edit {selectedDate}
              </h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-3 rounded-xl mb-3 text-black"
              />

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-3 rounded-xl mb-4 text-black"
              >
                <option value="working">Working Day</option>
                <option value="holiday">Holiday</option>
                <option value="gov">Government Holiday</option>
              </select>

              <div className="flex gap-3">
                <button
                  onClick={async () => {

                    if (isEdit) {
                      // update current date
                      await setDoc(doc(db, "users", adminId, "calendar", selectedDate), {
                        slots
                      }, { merge: true });

                    } else {
                      // first save
                      await setDoc(doc(db, "users", adminId, "calendar", selectedDate), {
                        date: selectedDate,
                        slots,
                        type: "working"
                      }, { merge: true });

                      const dayOnly = selectedDate.split("-")[2];

                      await setDoc(doc(db, "users", adminId, "calendar", `day-${dayOnly}`), {
                        slots,
                        type: "working"
                      }, { merge: true });
                    }

                    setPopup(false);
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-xl w-full"
                >
                  {isEdit ? "Update" : "Save"}
                </button>

                {isEdit && (
                  <button
                    onClick={async () => {

                      const dayOnly = selectedDate.split("-")[2];

                      // 🔥 update common day
                      await setDoc(doc(db, "users", adminId, "calendar", `day-${dayOnly}`), {
                        slots
                      }, { merge: true });

                      setPopup(false);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl w-full"
                  >
                    Update All
                  </button>
                )}

                <button
                  onClick={() => setPopup(false)}
                  className="bg-gray-300 px-4 py-2 rounded-xl w-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* ✅ DOCTOR SLOT POPUP */}
          {enableSlots && (
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-2xl w-[350px] text-white shadow">

              <h2 className="text-lg font-bold mb-4">
                Slots - {selectedDate}
              </h2>

              {/* SLOT BUTTON */}
              <div className="mb-4">
                <p className="mb-2">Enter Slots</p>

                <input
                  type="number"
                  min="1"
                  value={slotInput}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    setSlotInput(value);

                    setSlotCount(value);

                    setSlots((prev) => {
                      let updated = [...prev];

                      // 🔥 ADD NEW SLOTS (only if increasing)
                      if (value > updated.length) {
                        for (let i = updated.length; i < value; i++) {
                          updated.push({ start: "", end: "" });
                        }
                      }

                      // 🔥 REMOVE EXTRA SLOTS (if decreasing)
                      if (value < updated.length) {
                        updated = updated.slice(0, value);
                      }

                      return updated;
                    });
                  }}
                  className="w-full p-2 rounded bg-white text-black"
                  placeholder="Enter number of slots"
                />
              </div>

              {/* SLOT TIME */}
              <div className="space-y-3 mb-4">
                {slots.map((slot, index) => (
                  <div key={index} className="flex flex-col gap-1">

                    {/* INPUT ROW */}
                    <div className="flex gap-2">
                      <input
                        type="time"
                        value={slot.start}
                        onChange={(e) =>
                          handleTimeChange(index, "start", e.target.value)
                        }
                        className="w-full p-2 rounded bg-white text-black"
                      />

                      <input
                        type="time"
                        value={slot.end}
                        onChange={(e) =>
                          handleTimeChange(index, "end", e.target.value)
                        }
                        className="w-full p-2 rounded bg-white text-black"
                      />
                    </div>

                    {/* 🔥 TIME DISPLAY BELOW */}
                    <p className="text-xs text-white text-center">
                      {formatTime(slot.start)} - {formatTime(slot.end)}
                    </p>

                  </div>
                ))}
              </div>

              <div className="flex gap-3">

                {/* SAVE / UPDATE */}
                <button
                  onClick={async () => {

                    if (isEdit) {
                      // 🔥 UPDATE (ONLY THIS DATE)
                      await setDoc(doc(db, "users", adminId, "calendar", selectedDate), {
                        slots
                      }, { merge: true });

                    } else {
                      // 🔥 FIRST SAVE
                      await setDoc(doc(db, "users", adminId, "calendar", selectedDate), {
                        date: selectedDate,
                        slots,
                        type: "working"
                      }, { merge: true });

                      const dayOnly = selectedDate.split("-")[2];

                      await setDoc(doc(db, "users", adminId, "calendar", `day-${dayOnly}`), {
                        slots,
                        type: "working"
                      }, { merge: true });
                    }

                    setPopup(false);
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-xl w-full"
                >
                  {isEdit ? "Update" : "Save"}
                </button>

                {/* 🔥 UPDATE ALL */}
                {isEdit && (
                  <button
                    onClick={async () => {

                      const dayOnly = selectedDate.split("-")[2];

                      await setDoc(doc(db, "users", adminId, "calendar", `day-${dayOnly}`), {
                        slots
                      }, { merge: true });

                      setPopup(false);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl w-full"
                  >
                    Update All
                  </button>
                )}

                <button
                  onClick={() => setPopup(false)}
                  className="bg-gray-300 px-4 py-2 rounded-xl w-full"
                >
                  Cancel
                </button>

              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
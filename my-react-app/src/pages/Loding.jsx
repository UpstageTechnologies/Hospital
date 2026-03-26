import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";

const Loding = () => {

    const [hospital, setHospital] = useState("");
    const [role, setRole] = useState("");
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const [hospitalList, setHospitalList] = useState([]);
    const [showHospitalDropdown, setShowHospitalDropdown] = useState(false);

    const navigate = useNavigate();

    const roles = ["master", "admin", "doctor", "staff", "patient"];


    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const snapshot = await getDocs(collection(db, "master"));
                const hospitals = snapshot.docs
                    .map(doc => doc.data().hospital)
                    .filter((h) => h && typeof h === "string");


                const localHistory = JSON.parse(localStorage.getItem("hospitalHistory")) || [];
                const combined = [...new Set([...localHistory, ...hospitals])];

                setHospitalList(combined);

            } catch (err) {
                console.log(err);
            }
        };

        fetchHospitals();
    }, []);



    const filteredHospitals = hospital
        ? hospitalList.filter((h) =>
            h && h.toLowerCase().includes(hospital.toLowerCase())
        )
        : hospitalList.filter((h) => h);

    const filteredRoles = roles.filter((r) =>
        r.toLowerCase().includes(search.toLowerCase())
    );



    const saveHospitalToLocal = (name) => {
        let history = JSON.parse(localStorage.getItem("hospitalHistory")) || [];

        if (!history.includes(name)) {
            history.unshift(name);
        }

        localStorage.setItem("hospitalHistory", JSON.stringify(history));
    };



    const handleContinue = async () => {

        if (!hospital) {
            alert("Select Hospital");
            return;
        }

        if (!role) {
            alert("Select Role");
            return;
        }

        try {
            const user = auth.currentUser;

            
            localStorage.setItem("selectedHospital", hospital.toLowerCase());

           
            if (user) {
                await setDoc(doc(db, "users", user.uid), {
                    hospital: hospital,
                    role: role
                }, { merge: true });
            }

            
            navigate("/home");

        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 md:px-28 lg:px-40 py-10 bg-gradient-to-br from-gray-100 to-gray-200 gap-10">
            <div className="max-w-xl mt-10 md:mt-16">

                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
                    Your <br />
                    <span className="text-blue-500">Hospital Management</span> <br />
                    Needs.
                </h1>

                <p className="text-gray-600 text-lg mb-8">
                    Manage doctors, patients, staff — all in one smart platform.
                </p>

                <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 w-[380px] mt-6 mb-10">

                    <div className="relative mb-4">

                        <input type="text" placeholder="Enter Hospital Name" value={hospital} onFocus={() => setShowHospitalDropdown(true)}
                            onChange={(e) => {
                                setHospital(e.target.value);
                                setShowHospitalDropdown(true);
                            }}
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />


                        {showHospitalDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-lg z-50 max-h-40 overflow-y-auto">

                                {filteredHospitals.length === 0 && (
                                    <div className="p-3 text-gray-400">No results</div>
                                )}

                                {filteredHospitals.map((item, i) => (
                                    <div key={i} onClick={() => {
                                        if (!item) return;
                                        setHospital(item);
                                        setShowHospitalDropdown(false);
                                    }}
                                        className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                                    >
                                        {item}
                                    </div>
                                ))}

                            </div>
                        )}

                    </div>


                    <div className="relative mb-5">

                        <input type="text" placeholder="Select Role" value={role} onFocus={() => setOpen(true)}
                            onChange={(e) => {
                                setRole(e.target.value);
                                setSearch(e.target.value);
                                setOpen(true);
                            }}
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        {open && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-lg z-50 max-h-40 overflow-y-auto">

                                {filteredRoles.length === 0 && (
                                    <div className="p-3 text-gray-400">Loding...</div>
                                )}

                                {filteredRoles.map((item, i) => (
                                    <div key={i} onClick={() => {
                                        setRole(item);
                                        setOpen(false);
                                        setSearch("");
                                    }}
                                        className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                                    >
                                        {item}
                                    </div>
                                ))}

                            </div>
                        )}

                    </div>


                    <button onClick={handleContinue} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg mb-3 transition">
                        Continue →
                    </button>

                    <button onClick={() => navigate("/master-login", { state: { isRegister: true } })} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg mb-3 transition">
                        New User →
                    </button>



                </div>

            </div>


            <div className="mt-10 md:mt-0 flex justify-center items-center md:ml-10">
                <div className="bg-gray-200 p-6 rounded-full shadow-inner">
                    <img src="/Doctors/doc1.png" alt="doctor" className="w-[260px] md:w-[320px] object-cover rounded-full" />
                </div>
            </div>

        </div>
    );
};

export default Loding;
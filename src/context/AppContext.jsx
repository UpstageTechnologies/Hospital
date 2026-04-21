import { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);

  const currencySymbol = '$';

  const fetchDoctors = async () => {
    try {
      const snapshot = await getDocs(collection(db, "doctors"));
      const list = [];

      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          email: doc.id,
          ...doc.data()
        });
      });

      setDoctors(list);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAppointments = async () => {
    try {
      const snapshot = await getDocs(collection(db, "appointments"));
      const list = [];

      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data()
        });
      });

      setAppointments(list);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  
    // ✅ இங்க தான் ADD பண்ணணும்
    setUser({
      id: "test123",   // 👈 இது temporary user id
      name: "Demo User"
    });
  
  }, []);

  const value = {
    doctors,
    appointments,
    user,
    currencySymbol
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
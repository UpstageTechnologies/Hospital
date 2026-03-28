import { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const [doctors, setDoctors] = useState([]);
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

  useEffect(() => {
    fetchDoctors();
  }, []);

  const value = {
    doctors,
    currencySymbol
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
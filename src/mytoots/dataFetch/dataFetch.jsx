import React, { useEffect, useState, createContext } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { App } from '../firebase/firebase.init'; // adjust the path as needed

export const DataContext = createContext();

export function DataFetch({ children }) {
  const [Fetchdata, setFetchdata] = useState(null);
  const [user, setuser] = useState(null);

  useEffect(() => {
    const fetchDataAndUser = async () => {
      try {
        // Fetch company data
        const response = await fetch('/company-data.json');
        const data = await response.json();
        setFetchdata(data);

        // Fetch user from localStorage
        let userData = localStorage.getItem('user');
        if (userData) {
          userData = JSON.parse(userData);
          const db = getFirestore(App);
          const preuser = await getDoc(doc(db, "users", userData.uid));

          if (preuser.exists()) {
            const userFire = preuser.data();
            if (userFire.email === userData.email && userFire.uid === userData.uid) {
              localStorage.setItem("user", JSON.stringify(userFire));
              setuser(userFire);
            } else {
              localStorage.removeItem("user");
              setuser(null);
            }
          } else {
            localStorage.removeItem("user");
            setuser(null);
          }
        } else {
          localStorage.removeItem("user");
          setuser(null);
        }
      } catch (error) {
        console.error("Error fetching data or user:", error);
      }
    };

    fetchDataAndUser();
  }, []);

  return (
    <DataContext.Provider value={{ Fetchdata, user, setuser }}>
      {children}
    </DataContext.Provider>
  );
}

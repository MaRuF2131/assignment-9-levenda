import React from 'react'
import { App } from '../firebase/firebase.init'; // adjust the path as needed
import { doc, getFirestore, setDoc } from 'firebase/firestore'


function store(user) {
    const done=async (user) => {
        try{
            const db = getFirestore(App);
            const userRef = doc(db, "users", user.uid);
            const userData = {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                createdAt: new Date(),
            };
            await setDoc(userRef, userData, { merge: true });
            localStorage.setItem("user", JSON.stringify(userData));
            return userData;
        }
        catch(error){
            return error.message;
        }
        
    }
   return done(user) ;
}

export default store
import React from 'react'
import { getAuth, signInWithPopup ,GoogleAuthProvider} from "firebase/auth";
import { App } from '../firebase/firebase.init'; // adjust the path as needed
import toast from 'react-hot-toast';
import Store from '../via login store/store';

 function viaGoogle() {
    const auth = getAuth(App);
    const provider = new GoogleAuthProvider();
    const via = async () => {
      try {
                    const result = await signInWithPopup(auth, provider);
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    const user = result.user;
                    if(user === 'Firebase: Error (auth/popup-closed-by-user).') retrun 
                     console.log(user);
                    return Store(user);
      } catch (error) {
                    return error.message;
              }	
      }
   return via() ;
}

export default viaGoogle
import React, { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { App } from '../../mytoots/firebase/firebase.init'; // adjust the path as needed
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../mytoots/loading';
import { DataContext } from '../../mytoots/dataFetch/dataFetch'; // adjust the path as needed
import ScrollToTop from '../../mytoots/go top of page/logic';
import Google from "../../mytoots/viaGoggle/viaGoogle";
import toast from 'react-hot-toast';

const Register = () => {
  ScrollToTop({ title: 'Register', fev: 'https://cdn-icons-png.flaticon.com/512/25/25231.png' });
  const auth = getAuth(App);
  const db = getFirestore(App); 
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const {user,setuser}=useContext(DataContext);
  
  const [formData, setFormData] = useState({ name: '', email: '', photoURL: '', uid: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();


   const viaGoogle = async () => {
		try {
            
					  const userData=await Google();
					  if(userData === 'Firebase: Error (auth/popup-closed-by-user).') return 
					  setuser(userData);
					  console.log(userData);
					  toast.success("Login successfully", {
						duration: 2500,
					  });
					  setIsLoading(true);
					  setTimeout(() => {
						navigate(`${location.state?.status || '/'}`);
						setIsLoading(false);
						}, 2000);

		} catch (error) {
					  const errorMessage = error.message;
					  toast.error(errorMessage, {
						  duration: 2500,
					 });
				}	
		} 						  
   

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword =async (pwd) => {
    if (pwd.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    if (!/[A-Z]/.test(pwd)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(pwd)) {
      return 'Password must contain at least one lowercase letter';
    }
    return true;
  };

  const handleRegister = async e => {
    e.preventDefault();
    setError('');
    const passwordError = await validatePassword(formData.uid);
    if (passwordError !== true) {
      setError(passwordError);
    }else{
          setIsLoading(true);
          try {
            const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.uid);

          if(user){
            await setDoc(doc(db, 'users', formData.uid), {
              uid: formData.uid,
              name: formData.name,
              email: formData.email,
              photoURL: formData.photoURL,
              createdAt: new Date(),
            });

                localStorage.setItem("user",JSON.stringify(formData));
                setuser(formData)
                if(location?.state?.status==='/login') navigate("/")
                navigate(`${location?.state?.status  || "/"}`); // redirect to home or dashboard

          }else{
            setError("error in creating user try later")
          }
            /* setIsLoading(false); */
          } catch (err) {
            setError(err.message);
          }
          finally{
              setIsLoading(false);
          }
        }
  };

  return (
    isLoading?<Loading/>
    :(<div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 to-purple-600 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Register</h2>
        <div className="my-6 space-y-4">
            <button onClick={viaGoogle} aria-label="Login with Google" type="button" className=" cursor-pointer flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1  border-gray-600 focus: ring-violet-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              <p>Login with Google</p>
            </button>

          </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="url"
            name="photoURL"
            placeholder="Photo URL"
            value={formData.photoURL}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            name="uid"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition duration-300"
          >
            Register
          </button>

          <button
            onClick={() => navigate('/login')}
            type="submit"
            className=" w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>)
  );
};

export default Register;

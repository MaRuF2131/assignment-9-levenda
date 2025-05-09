import ScrollToTop from "../../mytoots/go top of page/logic"
import{ motion } from "framer-motion"
import { useContext , useState } from "react";
import { DataContext } from "../../mytoots/dataFetch/dataFetch";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {App} from"../../mytoots/firebase/firebase.init"
import { getFirestore ,doc,getDoc, setDoc} from "firebase/firestore";
import toast from "react-hot-toast";
import LoadingSpinner from "../../mytoots/loading";
import Google from "../../mytoots/viaGoggle/viaGoogle";
function login() {
	  ScrollToTop({ title: "Login", fev: "https://cdn-icons-png.flaticon.com/512/25/25231.png" });
      const{user,setuser}=useContext(DataContext);
	  const[Email,setEmail]=useState("");
	  const[Password,setPassword]=useState("");
	  const[isLoading,setisLoading]=useState(false);
      const navigate=useNavigate()
	  const location=useLocation();

	  const viaGoogle = async () => {
		try {
            
					  const userData=await Google();
					  if(userData === 'Firebase: Error (auth/popup-closed-by-user).') return 
					  setuser(userData);
					  console.log(userData);
					  toast.success("Login successfully", {
						duration: 2500,
					  });
					  setisLoading(true);
					  setTimeout(() => {
						navigate(`${location.state?.status || '/'}`);
						setisLoading(false);
						}, 2000);

		} catch (error) {
					  const errorMessage = error.message;
					  toast.error(errorMessage, {
						  duration: 2500,
					 });
				}	
		} 						  
   
	  const HandleReg=(e)=>{
		e.preventDefault();
		e.stopPropagation();
		navigate("/registration",{
			state:{status:`${location.state?.status || '/'}`}
		})
	  }

	const Handlelogin = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		const db=getFirestore(App);
		const data=await getDoc(doc(db,"users",Password));

		if(data.exists()){
			const userData=data.data();
			if(userData.email===Email && userData.uid===Password){
				localStorage.setItem("user",JSON.stringify(userData));
				setuser(userData);
				toast.success("Login successfully", {
					duration:2500,
				})
				setisLoading(true);
				setTimeout(() => {
					navigate(`${location.state?.status || '/'}`);
					setisLoading(false);
				},2000);

			}else{
				toast.error("Invalid email or password", {
					duration: 2500,
				})
			}

		}else{
			toast.error("Invalid email or password", {
				duration: 2500,
			})
		}
		   
	  }

  return (
	isLoading?<LoadingSpinner/>
	:(< motion.div
	initial={{ opacity: 0, y: 40 }}
	animate={{ opacity: 1, y: 0 }}
	transition={{ duration: 0.6 }}
	>
    <div className="container mx-auto p-4 bg-gray-200 h-auto flex justify-center items-center">
        <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8  bg-gray-50  text-gray-800">
	<h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
	<p className="text-sm text-center  text-gray-600">Dont have account?
		<NavLink onClick={HandleReg}  className="focus:underline hover:underline text-green-700"> registration here</NavLink>
	</p>
	<div className="my-6 space-y-4">
		<button onClick={viaGoogle} aria-label="Login with Google" type="button" className=" cursor-pointer flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1  border-gray-600 focus: ring-violet-600">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
				<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
			</svg>
			<p>Login with Google</p>
		</button>

	</div>
	<div className="flex items-center w-full my-4">
		<hr  className="w-full  text-gray-600" />
		<p className="px-3  text-gray-600">OR</p>
		<hr  className="w-full  text-gray-600" />
	</div>
	<form noValidate="" action="" className="space-y-8">
		<div className="space-y-4">
			<div className="space-y-2">
				<label htmlFor="email" className="block text-sm">Email address</label>
				<input onChange={(e)=>setEmail(()=>e.target.value)} type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md  border-gray-300  bg-gray-50  text-gray-800 focus: border-violet-600" />
			</div>
			<div className="space-y-2">
				<div className="flex justify-between">
					<label htmlFor="password" className="text-sm">Password</label>
					<NavLink to='/password-reset' rel="noopener noreferrer" href="#" className="text-xs hover:underline  text-gray-600">Forgot password?</NavLink>
				</div>
				<input  onChange={(e)=>setPassword(()=>e.target.value)} type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md    bg-gray-50  text-gray-800 focus: border-violet-600" />
			</div>
		</div>
		<button type="button" onClick={Handlelogin} className="w-full cursor-pointer px-8 py-3 font-semibold rounded-md bg-violet-600 text-gray-50">Login</button>
	</form>
</div>
    </div>
	</motion.div>)
  )
}

export default login
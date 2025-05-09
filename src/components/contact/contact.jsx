import{ motion } from 'framer-motion';
import ScrollToTop from '../../mytoots/go top of page/logic';
import { useContext, useState } from 'react';
import { DataContext } from '../../mytoots/dataFetch/dataFetch'; // assumes you have context
import Handlelogout from '../../mytoots/handlelogout/handlelogout';
function contact(){
   	Handlelogout({nextnavigate:'/contact'})

	  ScrollToTop({title:"Contact Us" , fev: "https://cdn-icons-png.flaticon.com/512/25/25348.png"});
	  const {user} = useContext(DataContext);
	  const [formData, setFormData] = useState({
		name: user?.name || "",
		email: user?.email || "",
		message:"",
	  });
	
	  const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	  }

  return (
	< motion.div
	initial={{ opacity: 0, y: 40 }}
	animate={{ opacity: 1, y: 0 }}
	transition={{ duration: 0.6 }}
	>	
    <div className='container mx-auto'>
    <section className="py-6   bg-gray-100   text-gray-900">
	<div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
		<div className="py-6 md:py-0 md:px-6">
			<h1 className="text-4xl font-bold">Get in touch</h1>
			<p className="pt-2 pb-4">Fill in the form to start a conversation</p>
			<div className="space-y-4">
				<p className="flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
						<path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
					</svg>
					<span>Fake address, 9999 City</span>
				</p>
				<p className="flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
						<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
					</svg>
					<span>+8801770887721</span>
				</p>
				<p className="flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
						<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
						<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
					</svg>
					<span>marufahmmed916@gmail.com</span>
				</p>
			</div>
		</div>
		<form noValidate="" className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
			<label className="block">
				<span className="mb-1">Full name</span>
				<input onChange={handleChange} value={formData.name} type="text" name='name' placeholder="Leroy Jenkins" className="block w-full px-2 py-3 rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-600   bg-gray-100" />
			</label>
			<label className="block">
				<span className="mb-1">Email address</span>
				<input onChange={handleChange} value={formData.email} type="email" name='email' placeholder="leroy@jenkins.com" className="block w-full px-2 py-3 rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-600   bg-gray-100" />
			</label>
			<label className="block">
				<span className="mb-1">Message</span>
				<textarea onChange={handleChange} value={formData.message} name='message' rows="3" className="block w-full px-2 py-3 rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-600   bg-gray-100"></textarea>
			</label>
			<button type="button" className="self-center cursor-pointer px-8 py-3 text-lg rounded focus:ring hover:ring focus:ring-opacity-75   bg-violet-600   text-gray-50 focus:ring-violet-600 hover:ring-violet-600">Submit</button>
		</form>
	</div>
</section>
    </div>
	</motion.div>
  )
}

export default contact
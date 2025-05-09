 import { useContext, useEffect } from "react";
 import { DataContext } from "../../mytoots/dataFetch/dataFetch"; // Adjust the path as needed
 import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../../mytoots/go top of page/logic"; // Adjust the path as needed
import Handlelogout from "../../mytoots/handlelogout/handlelogout";

const MyProfile = () => {
  const {user,setuser} = useContext(DataContext); // Assuming you have a context that provides user data
  Handlelogout({nextnavigate:'/'})

  const navigate = useNavigate();
  ScrollToTop({title:"My Profile", fev:"https://i.pinimg.com/564x/4f/0b/4f0b5a2c8d1e3c7a6d9e1c3f2b5a2c8d.jpg"}) 
   

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <div className="flex flex-col items-center text-center">
          <img
            className="w-32 h-32 rounded-full border-4 border-blue-300"
            src={user?.photoURL || "https://i.pravatar.cc/150"}
            alt="Profile"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">{user?.name || "John Doe"}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <button
          onClick={() => navigate("/update-profile")}
          className="mt-6 cursor-pointer px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Update
        </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { App } from "../../mytoots/firebase/firebase.init";
import { DataContext } from "../../mytoots/dataFetch/dataFetch"; // assumes you have context
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Handlelogout from "../../mytoots/handlelogout/handlelogout";
import ScrollToTop from "../../mytoots/go top of page/logic";

const ProfileUpdate = () => {
  Handlelogout({ nextnavigate: "/" });
  ScrollToTop({ title: "Update Profile", fev: "https://cdn-icons-png.flaticon.com/512/25/25231.png" });
  const { user, setuser } = useContext(DataContext);
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    photoURL: user?.photoURL || "",
  });

  const db = getFirestore(App);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user?.uid) return toast.error("User not found");

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, formData);
      setuser({ ...user, ...formData });
      localStorage.setItem("user", JSON.stringify({ ...user, ...formData }));
      toast.success("Profile updated successfully");
      setTimeout(() => {
        Navigate(`/profile/${user.name}`); // Redirect to profile page after update
      },300);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-500 px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Update Profile</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Photo URL</label>
            <input
              type="url"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full py-2 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ProfileUpdate;

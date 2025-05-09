import { useContext, useState } from "react";
import { DataContext } from "../../mytoots/dataFetch/dataFetch";
import { useNavigate } from "react-router-dom";
import Hero from "../hero/hero";
import Work from "../how it work/work";
import { motion } from "framer-motion";
import ScrollToTop from "../../mytoots/go top of page/logic";

function Home() {
  const { Fetchdata, user } = useContext(DataContext);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  ScrollToTop({
    title: "Home",
    fev: "https://cdn-icons-png.flaticon.com/512/25/25231.png"
  });

  const categories = ["All", ...new Set(Fetchdata?.map(app => app.category))];

  const filteredApps = Fetchdata?.filter(app =>
    app.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || app.category === category)
  );

  const handleNavigate = (app) => {
    if (!user) {
      navigate('/login', { state: { status: `/appDetails/${app.name}/${app.id}` } });
    } else {
      navigate(`/appDetails/${app.name}/${app.id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Hero />

      <div className="min-h-screen bg-gradient-to-tr from-sky-100 to-indigo-100 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">🚀 Discover Top Apps</h1>
          <p className="text-center text-gray-600 text-lg mb-10">
            Browse popular and trending apps across various categories.
          </p>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
            <input
              type="text"
              placeholder="🔍 Search apps..."
              className="w-full sm:w-1/2 px-5 py-3 rounded-xl border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-400 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="w-full sm:w-1/4 px-5 py-3 rounded-xl border border-gray-300 shadow-md focus:ring-2 focus:ring-indigo-400 transition"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* App Grid */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {filteredApps?.length > 0 ? (
              filteredApps.map((app,index) =>(
                <>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  key={app.id}
                  onClick={() => handleNavigate(app)}
                  className="bg-white/70 cursor-pointer backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition p-6 border border-gray-200 hover:-translate-y-1 transform"
                >
                  

                  
                  <div className="flex items-center justify-center h-40 mb-4 bg-white rounded-lg">
                    <img
                      src={app.thumbnail}
                      alt={app.name}
                      className="h-24 object-contain"
                    />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold text-gray-800 text-center">{app.name}</h2>

                    {/* Stars for Rating */}
                    <div className="flex justify-center items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < Math.round(app.rating) ? "text-yellow-400" : "text-gray-300"}>★</span>
                      ))}
                      <span className="text-sm text-gray-500 ml-1">({app.rating})</span>
                    </div>

                    {/* Views */}
                    <p className="text-sm text-center text-gray-500">
                      👁 {app.viue.toLocaleString()} views
                    </p>

                    {/* Category */}
                    <div className="flex justify-center">
                      <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                        {app.category}
                      </span>
                    </div>
                  </div>
                </motion.button>
                </>

              ))
            ) : (
              <p className="col-span-full text-center text-red-500 text-lg">
                No apps found.
              </p>
            )}
          </div>
        </div>
      </div>

      <Work />
    </motion.div>
  );
}

export default Home;

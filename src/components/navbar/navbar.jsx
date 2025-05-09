/* import { a } from 'react-router-dom'; */
import { useContext } from 'react';
/*import { AuthContext } from '../providers/AuthProvider'; */

import { Link, NavLink, useNavigate } from "react-router-dom";
import { DataContext } from '../../mytoots/dataFetch/dataFetch';

const Navbar = () => {
  const { user, setuser } = useContext(DataContext);
  const navigate = useNavigate(); // Assuming you have a navigate function from react-router-dom
  const Handellogout = () => {
    localStorage.removeItem('user');
    setuser(()=>null);
  }

  const myprofile = () => {
    navigate(`/profile/${user.name}`); // Navigate to the profile page
  }



  const activeClass = "text-blue-600 font-bold border-b-2 border-blue-600";
  const normalClass = "hover:text-blue-600";

  return (
  <div className="container mx-auto fixed top-0 left-0 right-0 z-[100] h-auto  "> 
    <div className="container mx-auto z-[100] inline-flex justify-between items-center h-fit w-full bg-base-100 shadow-md ">
      {/* Left - Logo */}
      <div className=" ">
        <Link to="/" className="text-xl font-bold">
                    <svg
                          width=""
                          height="70"
                          viewBox="0 0 320 100"
                          xmlns="http://www.w3.org/2000/svg"
                          role="img"
                          aria-label="Job Hunter logo"
                        >
                          <rect width="320" height="100" rx="16" fill="#f9fafb" />
                          <text
                            x="20"
                            y="60"
                            fill="#111827"
                            fontFamily="Poppins, sans-serif"
                            fontSize="42"
                            fontWeight="800"
                          >
                            APP
                          </text>
                          <text
                            x="115"
                            y="60"
                            fill="#3b82f6"
                            fontFamily="cursive"
                            fontSize="38"
                          >
                            HOME
                          </text>
                </svg>
        </Link>
      </div>

      {/* Right - Menu Items */}
      <div className="flex items-center justify-between">
        <div className="hidden md:flex gap-4 items-center mr-4">
          <NavLink to="/" className={({isActive})=>isActive?activeClass:normalClass } >Home</NavLink>
          <NavLink to="/contact" className={({isActive})=>isActive?activeClass:normalClass }>Contact</NavLink>
        </div>
        

        {/* Auth Options */}
        {
           user ? (
            <div className="dropdown dropdown-end ml-4 flex gap-4 items-center mr-4">
                <button title={user.name} onClick={myprofile}  className="rounded-full h-fit w-fit cursor-pointer">
                  <div className=" w-16 h-16 ">
                    <img className='w-full h-full rounded-full' src={user.photoURL} alt="Profile" />
                  </div>
                </button>
                <button onClick={Handellogout} className='bg-blue-800 rounded-md px-2 py-1 text-white cursor-pointer'>Logout</button>
              </div>
            ) : (
              <div className="ml-4 flex gap-2 mr-4">
                <NavLink to="/login" className={({isActive})=>isActive?activeClass:normalClass }>Login</NavLink>
                <NavLink to="/registration" className={({isActive})=>isActive?activeClass:normalClass }>Register</NavLink>
              </div>
            ) 
          }
      {/* Mobile Dropdown */}
            <div className="dropdown dropdown-end md:hidden">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </label>
                <ul tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1]  shadow bg-base-100 rounded-box w-52">
                  <li><NavLink to="/" className={({isActive})=>isActive?activeClass:normalClass }>Home</NavLink></li>
                  <NavLink to="/contact" className={({isActive})=>isActive?activeClass:normalClass }>Contact</NavLink>
                </ul>
          </div>
      </div>
    </div>
  </div>  
  );
};

export default Navbar;

import Navbar from "../navbar/navbar"
import { Outlet } from "react-router-dom"
import Footer from "../footer/footer"
import { motion } from "framer-motion"

function mainLeyout() {
  return (
    <div className="container mx-auto">
        
         <Navbar></Navbar>
         <div className="mt-20">
             <Outlet></Outlet>
         </div>
         <Footer></Footer>
    </div>
  )
}

export default mainLeyout
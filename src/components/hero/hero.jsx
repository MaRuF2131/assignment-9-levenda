import { useContext } from "react"
import Marquee from "react-fast-marquee"
import { DataContext } from "../../mytoots/dataFetch/dataFetch"



function hero() {
  const{Fetchdata}=useContext(DataContext)

  return (
    <div className="container mx-auto h-auto ">
    <Marquee>
    <div className="flex gap-4 p-4 py-4 transition-colors duration-300 bg-gray-900 ">
  {/* Second Card */}
  {Fetchdata?.map((item, index) => (
  <div className="flex-shrink-0 hover:bg-blue-500 w-[150px] sm:w-[170px] md:w-[180px] lg:w-[190px] xl:w-[200px] transform transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-lg">
    <div className="flex flex-col p-4 mt-4 divide-y rounded-md shadow-lg text-gray-50">
      <h1 className="p-2 mb-4 text-sm font-bold transition-all duration-300 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
        <img
          src={item.thumbnail}
          className="w-80 h-35  rounded-md"
          alt="Card Image"
        />
      </h1>
    </div>
  </div>))}
  
 </div>

    </Marquee>
    </div>
  )
}
export default hero
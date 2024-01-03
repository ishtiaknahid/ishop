/* eslint-disable react/prop-types */
import Footer from "../../sections/Footer"
import VendorNavbar from "./VendorNavbar"


function VendorLayout({children}) {
  return (
    <div className="bg-gray-100">
        <VendorNavbar />
        <div className="content mx-5 p-5 min-h-[85vh]">
            {children}
        </div>
        <Footer />
    </div>
  )
}

export default VendorLayout
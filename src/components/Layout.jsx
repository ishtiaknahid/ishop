/* eslint-disable react/prop-types */
import Footer from "../sections/Footer"
import Nav from "./Nav"


function Layout({children}) {
  return (
    <div className="">
        <Nav />
        <div className="content min-h-screen">
            {children}
        </div>
        <Footer />
    </div>
  )
}

export default Layout
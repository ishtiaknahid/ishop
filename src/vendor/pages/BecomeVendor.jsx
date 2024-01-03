import { useState } from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/firebase";
import {useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setVendorMode } from "../../redux/vendorModeSlice";
// import { setVendorDetails } from "../../redux/vendorDetailsSlice";

function BecomeVendor() {
 const { currentUser} = useAuth();
 const navigate = useNavigate(); 
 const dispatch = useDispatch();
 
 const [vendor, setVendor] = useState({
   matrixNumber: '', 
   shopName: '', 
   shopLogo:'', 
   address: '', 
   email: ''
  })
  const {matrixNumber, shopName, shopLogo, address} = vendor;

  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");


    // Register As Vendor
    const setVendorToDB = async () => {
      setLoading(true);
      try {
        const vendorRef = collection(fireDB, "vendors");
        await addDoc(vendorRef, vendor);
        toast.success("You are successfully registard as vendor.");
        // dispatch(setVendorDetails(vendor))
        localStorage.setItem('vendorDetails', JSON.stringify(vendor))
        // closeModal();
        setLoading(false);
        setVendor({
          ...vendor,
          matrixNumber: "",
          shopName: "",
          shopLogo: "",
          address: "",
        });
        dispatch(setVendorMode())
        navigate('/'); 
      } catch (error) {
        console.log(error);
        setError(error)
        setLoading(false);
      }
    };

  // Handle Submit 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      vendor.matrixNumber == "" ||
      vendor.shopName == "" ||
      vendor.shopLogo == "" ||
      vendor.address == "" 
    ){
      return toast.error("Please fill all fields");
    }
    setVendorToDB();
  }

  return (
    <Layout>
      <div className="text-center m-5 p-5 text-acqa">
        <p>Become a Vendor</p>
        <p>You need to have an IIUM Matric number or staff id </p>
      </div>
      <form
        className="flex flex-col items-center gap-5 my-5"
        onSubmit={handleSubmit}
      >
        <input
          className="border border-gray-300 w-[300px] rounded-2xl p-2 "
          placeholder="Enter your Matric or Staff Id"
          value={matrixNumber}
          onChange={(e) => setVendor({...vendor, matrixNumber: e.target.value, email: currentUser.email})}
        />

        <input
          className="border border-gray-300 w-[300px] rounded-2xl p-2 "
          placeholder="Enter your Shop Name"
          type="text"
          value={shopName}
          required
          onChange={(e) =>setVendor({...vendor, shopName: e.target.value})}
        />
        <input
          className="border border-gray-300 w-[300px] rounded-2xl p-2 "
          placeholder="Enter your Shop Logo Link"
          type="text"
          value={shopLogo}
          required
          onChange={(e) => setVendor({...vendor, shopLogo: e.target.value})}
        />
        <input
          className="border border-gray-300 w-[300px] rounded-2xl p-2 "
          placeholder="Enter your building name & room number"
          type="text"
          value={address}
          required
          onChange={(e) => setVendor({...vendor, address: e.target.value})}
        />
        {error && <p className="text-red text-xl">{error}</p>}
        <button
          className="bg-acqa p-3 rounded-2xl
                      border border-acqa text-white text-2xl
                      hover:bg-transparent hover:text-acqa
                      ease-out duration-100"
          type="submit"
          disabled={loading}
        >
          Become Vendor
        </button>
      </form>
    </Layout>
  );
 }


export default BecomeVendor;

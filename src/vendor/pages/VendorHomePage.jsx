import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { useAuth } from "../../contexts/AuthContext";
import { useProduct } from "../../contexts/ProductContext";
import VendorLayout from "../components/VendorLayout";
import { useCallback, useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { fireDB } from "../../firebase/firebase";
import OrderManagement from "./OrdersManagement";

function VendorHomePage() {
  const { products } = useProduct();
  const [vendorDetails, setVendorDetails] = useState({}); 
  const { currentUser } = useAuth();
  const { email, shopName, shopMoto, shopLogo, matrixNumber } = vendorDetails;
  const myProducts = products.filter(
    (product) => product.vendorEmail === email
  );
  
  const getVendorDetails = useCallback(
    async () => {
      if (currentUser) {
        try {
          const q = query(
            collection(fireDB, "vendors"),
            where("email", "==", `${currentUser?.email}`)
          );
          const data = onSnapshot(q, (QuerySnapshot) => {
        
            QuerySnapshot.forEach((doc) => {
             setVendorDetails({ ...doc.data(), id: doc.id });
             // setLoading(false);
            });
            return () => data;
          });
        } catch (error) {
          console.log(error);
          //setLoading(false);
        }
      }
    }, [currentUser]
  )

  localStorage.setItem('vendorDetails', JSON.stringify(vendorDetails));

  useEffect(() => {
    getVendorDetails()
  } , [getVendorDetails])


  
  return (
    <VendorLayout>
      <div className="mt-5 flex flex-col">
        <div className="m-auto flex flex-col justify-center items-center">
        <img src={shopLogo} alt={shopName} className="rounded-2xl border border-red-500 hover:scale-110 duration-200" width={65} height={65} />
        <p className="text-3xl text-center">{shopName}</p>
        <p className="text-sm text-center">{shopMoto}</p>
        <p className="text-sm text-center"><span className="font-bold">Matric/ Stuff Id:</span> {matrixNumber}</p>
        </div>
      <div className="order">
        <p className="text-3xl text-center">Your orders</p>
        <OrderManagement />
        </div>
      
        <div className="flex self-end mr-4 mt-2">
          <Link className="border border-acqa p-3 rounded-xl w-fit bg-acqa text-white hover:bg-transparent hover:text-acqa transition duration-300"  to='/addproduct'>Add More Products</Link>
        </div>
        <div className="flex flex-wrap gap-10 my-5 justify-around">
          {myProducts.length === 0 && <p>You have no products. Click to the Add Products button</p>}
          {myProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>

      </div>
    </VendorLayout>
  );
}

export default VendorHomePage;

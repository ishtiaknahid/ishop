import {FaUserTie, FaPuzzlePiece  } from 'react-icons/fa';
import DashboardTab from '../components/DashboardTab';
import { useProduct } from '../../contexts/ProductContext';
import VendorLayout from '../components/VendorLayout';
import { useGetOrdersQuery } from '../../redux/apiSlice';
import { useAuth } from '../../contexts/AuthContext';


function Dashboard() {
   const {mode, products} = useProduct();
   const {currentUser} = useAuth(); 
   const myProducts = products.filter(product => product.vendorEmail === currentUser.email)
   const {data: orders, isLoading, isError} = useGetOrdersQuery(currentUser.email)

  return (
    <VendorLayout>
        <section className="text-gray-600 body-font mt-10 mb-10">
            <div className="container px-5 mx-auto mb-10">
                <div className="flex flex-wrap -m-4 text-center">
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className=" border-2 hover:shadow-acqa shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                            <div className="text-acqa w-12 h-12 mb-3 inline-block">
                            <FaPuzzlePiece size={50} />
                            </div>
                            <h2 className="title-font font-medium text-3xl text-black fonts1" style={{ color: mode === 'dark' ? 'white' : ''}}>{myProducts.length}</h2>
                            <p className=" text-acqa  font-bold" style={{ color: mode === 'dark' ? 'white' : ''}}>Total Products</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className=" border-2 hover:shadow-acqa shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                            <div className="text-acqa w-12 h-12 mb-3 inline-block">
                                <FaUserTie size={50} />
                            </div>
                            <h2 className="title-font font-medium text-3xl text-black fonts1" style={{ color: mode === 'dark' ? 'white' : ''}}>{!isLoading && !isError ? orders.length : ''}</h2>
                            <p className=" text-acqa  font-bold" style={{ color: mode === 'dark' ? 'white' : ''}}>Total Orders</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className=" border-2 hover:shadow-acqa shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                            <div className="text-acqa w-12 h-12 mb-3 inline-block">
                                <FaUserTie size={50} />
                            </div>
                            <h2 className="title-font font-medium text-3xl text-black fonts1" style={{ color: mode === 'dark' ? 'white' : ''}}>20</h2>
                            <p className=" text-acqa  font-bold" style={{ color: mode === 'dark' ? 'white' : ''}}>Total Followers</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className=" border-2 hover:shadow-acqa shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                            <div className="text-acqa w-12 h-12 mb-3 inline-block">
                                <FaUserTie size={50} />
                            </div>
                            <h2 className="title-font font-medium text-3xl text-black fonts1" style={{ color: mode === 'dark' ? 'white' : ''}}>20</h2>
                            <p className=" text-acqa  font-bold" style={{ color: mode === 'dark' ? 'white' : ''}}>Total Products</p>
                        </div>
                    </div>
                </div>
            </div>

            <DashboardTab />
        </section>
    </VendorLayout>
  )
}

export default Dashboard
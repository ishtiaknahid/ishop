/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useGetOrdersQuery, useUpdateOrderMutation } from "../../redux/apiSlice";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "../../utils/Loader";
import { HashLoader } from "react-spinners";

const OrderManagement = () => {
  const [showCompleteOrders, setShowCompleteOrders] = useState(false);

  const { currentUser } = useAuth();
  const {
    data: orders,
    isLoading,
    isError,
    error,
    refetch: refetchOrders
  } = useGetOrdersQuery(currentUser.email);

  const [updateStatus] = useUpdateOrderMutation();

  const handleUpdateStatus = ({id, newStatus}) => {
    updateStatus({id, newStatus})
    refetchOrders()
  }

 


  let content = null;

  if (isLoading) content = <HashLoader color="#36d7b7" />
  if (!isLoading && isError) console.log(error);
  if (!isLoading && !isError && orders.length === 0) {
    content = <p>You donot have any order.</p>;
  }

  if (!isLoading && !isError && orders.length > 0) {
    let ordersToRender = orders.filter(order => order.status !== 'delivered')
    if(showCompleteOrders){
      ordersToRender = orders.filter(order => order.status === 'delivered')
    }

    content = ordersToRender.map((order) => (
      <tr key={order.id} className="hover:bg-gray-100 border text-center">
        <td className="py-2 px-4 border-b text-sm">{order.id}</td>
        <td className="py-2 px-4 border-b">
          <ul>
            <li>
              <span className="font-bold">Name:</span> {order.customerName}
            </li>
            <li>
              <span className="font-bold">Address:</span> {order.address}
            </li>
            <li>
         
              <span className="font-bold">Phone:</span>
              {order.customerPhoneNumber}
            </li>
          </ul>
        </td>

        <td className="py-2 px-4 border-b">
          <ul>
            <li>
              <img
                src={order.product.imgUrl}
                alt={order.product.title}
                width={50}
                height={30}
                className="m-auto hover:scale-110 duration-300 border border-acqa rounded-md"
              />
            </li>
            <li>
              <span className="font-bold">ID:</span>
              {order.product.id}
            </li>
          </ul>
        </td>
        <td className="py-2 px-4 border-b">{order.product.title}</td>
        <td className="py-2 px-4 border-b">{order.product.unit}</td>

        <td className="py-2 px-4 border-b text-left">
          RM {order.product.price * order.product.unit}
        </td>
        <td
          className={`py-2 px-4 border-b text-white`}
        >
          <span
            className={`p-1 rounded-xl ${
              order.status == "pending"
                ? "bg-orange-500"
                : order.status == "shipped"
                ? "bg-[#008000]"
                : order.status == "delivered"
                ? "bg-acqa"
                : order.status == "rejected"
                ? "bg-[#ff0000]"
                : "bg-acqa"
            } `}
          >
            {order.status}
          </span>
        </td>
        <td className="py-2 px-4 border-b">
          <td className="py-2 px-4 border-b">
            <select
              value={order.status}
              disabled={order.status === 'delivered'}
                onChange={(e) => handleUpdateStatus({id: order.id, newStatus: e.target.value})}
              className="border rounded py-1 px-2"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="rejected">Rejected</option>
            </select>
          </td>
        </td>
      </tr>
    ));
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      <div className="flex self-end mr-4">
          <button className="border border-acqa p-3 m-2 ml-0 rounded-xl w-fit bg-acqa text-white hover:bg-transparent hover:text-acqa transition duration-300 text-end" onClick={()=> setShowCompleteOrders(!showCompleteOrders)} >{showCompleteOrders ? "Back to Orders" : "Delivered"} Orders</button>
        </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Customer</th>
            <th className="py-2 px-4 border-b">Product Image</th>
            <th className="py-2 px-4 border-b">Product Name</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Total Cost</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
};

export default OrderManagement;

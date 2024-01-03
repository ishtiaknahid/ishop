/* eslint-disable react/prop-types */
import ProgressBar from "./ProgressBar";

const OrderCard = ({order}) => {

  return (
    <div className="bg-black shadow-lg rounded-lg p-6 w-full flex flex-col gap-3">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Order Details
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Order ID: #{order.id}
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <img
            src={order.product.imgUrl ? order.product.imgUrl : "https://via.placeholder.com/150x100"}
            width={150}
            height={100}
            alt="Product Image"
            className="border border-acqa hover:scale-110 rounded-sm"
          />
          <div className="flex flex-1 ml-5 gap-2 flex-col text-white">
            <p className="font-bold">{order.product.title}</p>
            <p className="font-bold">Price Per Unit: {order.product.price}</p>
            <p className="font-bold">Quantity: {order.product.unit} </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Order Date: {order.date}
            </p>
          </div>

          <div className="flex flex-col items-center justify-between">
            <button className="bg-acqa text-white py-2 px-4 rounded">
              Contact Seller
            </button>
            <button className="bg-gray-300 w-full dark:bg-gray-700 text-gray-700 dark:text-gray-400 py-2 px-4 rounded">
              Reorder
            </button>
          </div>
        </div>

        <div className="flex flex-col border-t-[.5px]">
          <div className="flex py-3 justify-between">
          <p className="text-white ">Prepare to ship 3 days after order.</p>
          <p className="text-white">Total Cost: RM {(order.product.price * order.product.unit) + 5} </p>
          </div>
          <ProgressBar status={order.status} />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

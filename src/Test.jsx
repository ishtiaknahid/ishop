import { useState } from 'react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    
        {
          id: 1,
          customerName: 'John Doe',
          products: [
            { id: 101, name: 'Product A', quantity: 2 },
            { id: 102, name: 'Product B', quantity: 1 },
          ],
          totalCost: 150.0,
          status: 'Pending',
        },
        {
          id: 2,
          customerName: 'Jane Doe',
          products: [
            { id: 103, name: 'Product C', quantity: 3 },
            { id: 104, name: 'Product D', quantity: 1 },
          ],
          totalCost: 220.0,
          status: 'Shipped',
        },
      
    
    
  ]);

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Customer Name</th>
            <th className="py-2 px-4 border-b">Products</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Total Cost</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          
          
        </tbody>
      </table>

      {orders.map(order => JSON.stringify(order))}
    </div>
  );
};

export default OrderManagement;

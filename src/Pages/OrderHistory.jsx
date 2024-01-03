/* eslint-disable no-unused-vars */
import { HashLoader } from 'react-spinners';
import Layout from '../components/Layout'
import OrderCard from '../components/OrderCard';
import ProgressBar from '../components/ProgressBar'
import { useAuth } from '../contexts/AuthContext';
import { useGetOrdersForUserQuery } from '../redux/apiSlice';

function OrderHistory() {

  const { currentUser } = useAuth();
  const {
    data: orders,
    isLoading,
    isError,
  } = useGetOrdersForUserQuery(currentUser.email);

console.log(orders);

// decide what to render 
let content = null; 
if(!isLoading){
  content = <HashLoader/>
}
if(!isLoading && isError){
  content = <p>There is an error.</p>
}

if(!isLoading && !isError && orders.length === 0){
  content = <p>Order Something.</p>
}
if(!isLoading && !isError && orders.length > 0){
  content = orders.map(order => <OrderCard order={order} key={order.id} />)
}
  return (
    <Layout>
      <div className="p-5 flex flex-col gap-3">
        {content}
      </div>
    </Layout>
  )
}

export default OrderHistory
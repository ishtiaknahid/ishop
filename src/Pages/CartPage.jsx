import {useSelector} from "react-redux";
import Layout from "../components/Layout";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

function CartPage() {
  const cartItems = useSelector(state => state.cart); 

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + Number(item.price * item.unit), 0);
  };

  return (
    <Layout>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-semibold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="flex justify-around gap-10">
            <div className="flex-1">
              {cartItems.map((item) => (
              <CartItem item={item} key={item.id} />
              ))}
            </div>

            <div className="mt-4 w-[30%] flex flex-col bg-slate-200 p-5 gap-4">
              <div className="flex justify-between">
                Subtotal :<span>RM {getTotalPrice()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Charge :</span> <span>RM 5</span>{" "}
              </div>
                <div className="flex gap-5">
                    <input type="text" className="w-[60%] h-10 border border-acqa rounded-lg shadow-2xl outline-0" />
                    <button className="bg-acqa p-2 rounded-lg" >Apply Cupon</button>
                </div>
              <div className="flex justify-between text-xl font-semibold">
                <span>Total :</span> <span>RM {getTotalPrice() + 5}</span>{" "}
              </div>
                <Link to='/checkout' className="bg-acqa p-2 rounded-lg hover:bg-transparent hover:text-acqa trasition border border-acqa font-bold text-white text-center">
                  Checkout
                  </Link> 
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default CartPage;

import {useDispatch} from 'react-redux'
import { decreaseUnit, deleteFromCart, increaseUnit } from "../redux/cartSlice";
import { useEffect } from 'react';
import {useSelector} from 'react-redux';

/* eslint-disable react/prop-types */
function CartItem({item}) {
    const {id, title, imgUrl, price, unit} = item; 
    const cartItems = useSelector(state => state.cart)

    const dispatch = useDispatch(); 
    // handle increase unit 
    const increase = () => {
        dispatch(increaseUnit(id));
    }
    const decrease = () => {
        if(unit === 1){
            dispatch(deleteFromCart(id))
        }else{
            dispatch(decreaseUnit(id));
        }
    }
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
      }, [cartItems])
      
    return (
    <div
    key={id}
    className="flex flex-row items-center justify-between border-b border-gray-300 py-2"
  >
    <img src={imgUrl} alt="Product Image" width="60px" />
    <p className="font-semibold">{title}</p>
    <p className="text-gray-600">RM {price}</p>
    <div className="flex items-baseline gap-2">
      <button className="w-5 bg-acqa text-white" onClick={decrease}>-</button>
      {unit}x
      <button className="w-5 bg-acqa text-white" onClick={increase}>+</button>
    </div>
    <p className="text-gray-600">{unit} x {price}</p>
    <p className="text-gray-600">{price * unit}</p>
    {/* Add a remove button or quantity selector here if needed */}
  </div>
  )
}

export default CartItem
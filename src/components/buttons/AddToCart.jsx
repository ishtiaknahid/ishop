/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseUnit } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

function AddToCart({product}) {

    
  const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
      // Add To Cart
  const addCart = () => {
    if(cartItems.some(item => item.id === product.id)){
        dispatch(increaseUnit(product.id));
    }else{
        dispatch(addToCart(product));
    }
   
    console.log(cartItems)
    toast.success("Add to cart");
  };

  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  
  return (
    <button
            onClick={addCart}
            className="bg-acqa p-2 rounded-xl w-28 h-10 text-white border border-acqa hover:bg-transparent hover:text-acqa duration-200 "
          >
            Add to Cart
          </button>
  )
}

export default AddToCart
/* eslint-disable react/prop-types */
import { useProduct } from "../../contexts/ProductContext"
import { AiFillDelete } from "react-icons/ai";

function DeleteProduct({id}) {
    const {deleteProduct} = useProduct();
  return (
    <button
    onClick={() => deleteProduct(id)}
    className=" border-4 rounded-lg bg-red-600 text-white text-2xl border-red-600 hover:bg-transparent hover:text-red-600 transition duration-300 p-2 h-fit"
  >
    <AiFillDelete />
  </button>
  )
}

export default DeleteProduct
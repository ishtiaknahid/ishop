import { FaEdit } from "react-icons/fa";
import { useProduct } from "../../contexts/ProductContext";

function EditProduct() {
    const {editProduct} = useProduct()
  return (
    <button
    onClick={() => editProduct()}
    className=" border-4 rounded-lg bg-acqa text-white text-2xl border-acqa hover:bg-transparent hover:text-acqa duration-300 p-2 h-fit" 
  >
    <FaEdit />
  </button>
  )
}

export default EditProduct
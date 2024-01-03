import { useProduct } from "../../contexts/ProductContext";
import VendorLayout from "../components/VendorLayout";

function AddProduct() {
  const { product, setProduct, addProduct, data, setFile } = useProduct();
  const vendor = JSON.parse(localStorage.getItem("vendorDetails")) || {};

  return (
    <VendorLayout>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-white -800 text-black">
        <h1 className="text-xl font-bold capitalize text-center text-acqa">
          Add a new product
        </h1>
        <form onSubmit={addProduct}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-black" htmlFor="productname">
                Product Name
              </label>
              <input
                id="productname"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-gray-300 rounded-md dark:bg-white-800 dark:text-black-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={product.title}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    title: e.target.value,
                    vendorEmail: vendor.email,
                    shopName: vendor.shopName,
                    shopLogo: vendor.shopLogo,
                  })
                }
              />
            </div>

            <div>
              <label className="text-black dark:text-black-200" htmlFor="price">
                Price per unit (RM)
              </label>
              <input
                id="price"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-gray-300 rounded-md dark:bg-white-800 dark:text-black-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Product price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
            </div>

            <div>
              <label
                className="text-black dark:text-black-200"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-gray-300 rounded-md dark:bg-white-800 dark:text-black-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={product.unit} onChange={(e) => {
                  setProduct({...product, price: e.target.value})
                }}
              />
            </div>

            <div>
              <label
                className="text-black dark:text-black-200"
                htmlFor="passwordConfirmation"
              >
                Color variation
              </label>
              <div className="flex justify-around">
                <input
                  id="color"
                  type="color"
                  className="block w-[30%] px-4 h-10 py-2 mt-2 text-black-700 bg-white border border-gray-300 rounded-md dark:bg-white-800 dark:text-black-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                <input
                  id="color"
                  type="color"
                  className="block w-[30%] px-4 h-10 py-2 mt-2 text-black-700 bg-white border border-gray-300 rounded-md dark:bg-white-800 dark:text-black-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                <input
                  id="color"
                  type="color"
                  className="block w-[30%] px-4 h-10 py-2 mt-2 text-black-700 bg-white border border-gray-300 rounded-md dark:bg-white-800 dark:text-black-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
            </div>

            <div>
              <label
                className="text-black dark:text-black-200"
                htmlFor="passwordConfirmation"
              >
                Select
              </label>
              <select
                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-gray-300 rounded-md dark:bg-white-800 dark:text-black-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={product.category}
                onChange={(e) => setProduct({ ...product, category: e.target.value })}>
                <option  className="border border-b-2">Select One</option>
                <option value="food" className="border border-b-2">Food</option>
                <option value="electronics">Electornics </option>
                <option value="clothing">Clothing</option>
                <option value="service">Service</option>
                <option value="study-materials">Study Materials</option>
                <option value="transportation">Transportation</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div>
              <label
                className="text-black dark:text-black-200"
                htmlFor="passwordConfirmation"
              >
                Description (Max 500)
              </label>
              <textarea
                id="textarea"
                type="textarea"
                rows={5}
                maxLength={500}
                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-gray-300 rounded-md dark:bg-white-800 dark:text-black-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Product Description"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">
                Upload Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {
                    data.length === 0 ? (
                      <svg
                      className="mx-auto h-12 w-12 text-black"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    ) : (
                      <img src='' alt="product Image" />
                    )
                  }
                  <div className="flex text-sm text-black-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span className="">Upload an image</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        placeholder="Product Description"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </label>
                    <p className="pl-1 text-black">or drag and drop</p>
                  </div>
                  <p className="text-xs text-black">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>      
            <div>
              <label className="text-black" htmlFor="productimg">
                Product Image URL
              </label>
              <input
                id="productimg"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border border-gray-300 rounded-md dark:bg-white-800 dark:text-black-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={product.imgUrl}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    imgUrl: e.target.value,
                   
                  })
                }
              />
            </div>
             
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transhtmlForm bg-acqa -500 rounded-md hover:bg-acqa -700 focus:outline-none focus:bg-white-600" type="submit">
              Add product
            </button>
          </div>
        </form>
      </section>
    </VendorLayout>
  );
}

export default AddProduct;


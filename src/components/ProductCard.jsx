/* eslint-disable react/prop-types */
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import AddToCart from "./buttons/AddToCart";
import DeleteProduct from "./buttons/DeleteProduct";
import EditProduct from "./buttons/EditProduct";



export default function ProductCard({ product }) {
  const { imgUrl, price, title, id, shopName } = product;

  
  const vendorMode  = useSelector((state) => state.vendorMode);



  return (
    <div className="flex flex-col shadow-xl items-center justify-center gap-5 w-[260px] p-5 pb-10 rounded-lg bg-white">
      <Link to={`/products/product/${id}`}>
        <div className="flex flex-col items-center gap-2 justify-center">
          <img
            src={imgUrl}
            alt={title}
            className="w-[230px] h-[200px] hover:scale-110 transition"
          />
          <div className="text-center">
            <p className="text-slate-700">{title}</p>
            <p className="font-bold text-gray-500">{shopName}</p>
          </div>
        </div>
      </Link>

      <div className="flex gap-5 items-center">
        <div className="text-center flex flex-col gap-3">
          <p className="text-xl text-acqa font-bold">RM {price}</p>
          <p className="text-sm text-orange-500 font-bold">4.5 out 5</p>
        </div>

        {vendorMode ? (
          <div className="flex space-between gap-2 self-centar">
        <DeleteProduct id={id}/>
       
        <EditProduct/>
          </div>
        ) : (
          <AddToCart product={product}/>
        )}
      </div>
    </div>
  );
}

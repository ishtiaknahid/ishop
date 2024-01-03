import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Category({ category }) {
  const { label, icon, link } = category;

  return (
    <Link to={`/products/${link}`} className="">
      <div className="flex flex-col shadow-xl items-center justify-center gap-3 rounded-lg pb-2 bg-white hover:text-acqa hover:scale-110 duration-200">
        <div className="w-[200px] h-[150px] flex items-center justify-center">
          <img src={icon} alt={label} className="w-[100px]" />
        </div>
        <p>{label}</p>
      </div>
    </Link>
  );
}

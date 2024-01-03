import { Link, useNavigate } from "react-router-dom";
import { logoIcon, searchIcon } from "../../constants";
import { noti, switchIcon } from "../../assets/icons";
import { useDispatch } from "react-redux";
import { setVendorMode } from "../../redux/vendorModeSlice";
import { useGetVendorDetailsQuery } from "../../redux/apiSlice";
import { useAuth } from "../../contexts/AuthContext";
import { FaShop } from "react-icons/fa6";

const VendorNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const {
    data: vendorDetails,
    isLoading,
    isError,
  } = useGetVendorDetailsQuery(currentUser.email);
  let shopProfile = null;
  if (!isLoading && !isError) {
    shopProfile = (
      <li className="font-segeoUI leading-normal text-[14px] text-white flex flex-col items-center gap-1 relative group cursor-pointer">
  
        {vendorDetails.shopLogo ? (
          <img
            src={vendorDetails.shopLogo}
            alt={vendorDetails.shopName}
            height={42}
            width={30}
            className="rounded-2xl border border-red-400 hover:scale-125 duration-300"
          />
        ) : (
          <FaShop className="w-10" />
        )}
        <p>{vendorDetails.shopName}</p>
      </li>
    );
  }

  const handleVendorMode = () => {
    dispatch(setVendorMode());
    navigate("/");
  };

  return (
    <header className="padding-x py-2 z-50 w-full sticky top-0 bg-acqa shadow-3xl ">
      <nav className="flex flex-row items-center justify-around">
        <a href="/" className="inline-block">
          <img
            src={logoIcon}
            alt="Logo"
            width={100}
            height={50}
            className="inline-block"
          />
        </a>

        <div>
          <img
            src={searchIcon}
            alt="search icon"
            className="inline absolute w-8 ml-1 hover:rotate-90 duration-300"
          />
          <input
            className="p-1 text-center sm:w-[25rem] w-[20rem] rounded-3xl outline-gra"
            placeholder="Search here"
          />
        </div>

        <ul className="flex justify-center items-center gap-10 max-lg:hidden">
          <li>
            <Link
              to={`/notification`}
              className="font-segeoUI leading-normal text-[12px] text-white flex flex-col items-center gap-1"
            >
              <img
                className="hover:rotate-45 duration-200"
                src={noti}
                alt="NOTIFICATION"
                height={42}
                width={20}
              />
              <p>NOTIFICATION</p>
            </Link>
          </li>
         

          <li>
            <button
              onClick={handleVendorMode}
              className="font-segeoUI leading-normal text-[12px] text-white flex flex-col items-center gap-1"
            >
              <img
                className="hover:rotate-180 duration-200"
                src={switchIcon}
                alt="SWITCH"
                height={42}
                width={20}
              />
              <p>SWITCH ACCOUNT</p>
            </button>
          </li>
          {shopProfile}
        </ul>
      </nav>
    </header>
  );
};

export default VendorNavbar;

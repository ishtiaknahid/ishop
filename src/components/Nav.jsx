import { Link, useNavigate } from "react-router-dom";
import { profile } from "../assets/icons";
import { logoIcon, searchIcon } from "../constants";
import { useAuth } from "../contexts/AuthContext";
import { logOutIcon } from "../constants";
import { announce, cart, noti, switchIcon } from "../assets/icons";
import { useSelector, useDispatch } from "react-redux";
import { setVendorMode } from "../redux/vendorModeSlice";
import { useCallback, useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { fireDB } from "../firebase/firebase";

const Nav = () => {
  const [isVendor, setIsVendor] = useState(false);
  const { currentUser, logOut } = useAuth();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const checkVendor = useCallback(async () => {
    if (currentUser) {
      try {
        const q = query(
          collection(fireDB, "vendors"),
          where("email", "==", `${currentUser?.email}`)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          if (QuerySnapshot.empty) {
            setIsVendor(false);
          } else {
            setIsVendor(true);
          }
          return () => data;
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    checkVendor();
  }, [checkVendor]);

  const handleVendorMode = () => {
    if (isVendor) {
      // if the user is alreay vendor, then he can enable to go vendor mode.
      dispatch(setVendorMode());
      navigate("/");
    } else {
      navigate("/become-vendor");
    }
  };

  const [searchKey, setSearchKey] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products/search/${searchKey}`);
  };
  return (
    <header className="padding-x py-2 z-50 w-full sticky top-0 bg-acqa shadow-3xl">
      <nav className="flex flex-row items-center justify-around">
        <Link to="/" className="inline-block">
          <img
            src={logoIcon}
            alt="Logo"
            width={150}
            height={40}
          />
        </Link>

        <div>
          <img
            src={searchIcon}
            alt="search icon"
            className="inline absolute w-8 ml-1 hover:rotate-90 duration-300"
          />
          <form onSubmit={handleSearch}>
            <input
              className="p-1 text-center sm:w-[25rem] w-[20rem] rounded-3xl outline-gray"
              placeholder="Search here"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </form>
        </div>

        <ul className="flex justify-center items-center gap-10 max-lg:hidden ">
          {currentUser && (
            <li>
              <Link
                to={`/announcement`}
                className="font-segeoUI leading-normal text-[12px] text-white flex flex-col items-center gap-1"
              >
                <img
                  className="hover:scale-110 duration-100"
                  src={announce}
                  alt="announcement"
                  height={42}
                  width={20}
                />
                <p>ANNOUNCEMENTS</p>
              </Link>
            </li>
          )}
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
          {currentUser && (
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
          )}
          <li className="relative">
            <Link
              to={`/cart`}
              className="font-segeoUI leading-normal text-[12px] text-white flex flex-col items-center gap-1"
            >
              <img
                className="hover:scale-110 duration-100"
                src={cart}
                alt="cart"
                height={42}
                width={20}
              />
              <span className="text-[20px] text-red-400 text-bold absolute -top-3 right-2">
                {cartItems.length}
              </span>
              <p>VIEW CART</p>
            </Link>
          </li>

          {currentUser ? (
            <>
              <li className="font-segeoUI leading-normal text-[14px] text-white flex flex-col items-center gap-1 relative group cursor-pointer">
                <img
                  src={currentUser.imgURL ? currentUser.imgURL : profile}
                  alt="profile"
                  height={42}
                  width={30}
                />
                <p>{currentUser.displayName}</p>

                <ul className="absolute top-10 bg-white text-black p-6 rounded mt-2 transition-all duration-300 opacity-0 border border-b-2-gay-800 group-hover:opacity-100 w-[150px]">
                  <Link to="/user-profile">
                    <li className="mb-2 hover:scale-110 transition duration-300">
                      View Profile
                    </li>
                  </Link>
                  <Link to="/order-history">
                    <li className="mb-2 hover:scale-110 transition duration-300:">
                      Order History
                    </li>
                  </Link>
                  <li
                    className="mb-2 hover:scale-110 transition duration-300:"
                    onClick={logOut}
                  >
                    <span>Log out</span>

                    <img
                      src={logOutIcon}
                      alt="Log Out"
                      width={10}
                      className="mb-2 hover:scale-110 transition duration-300 inline ml-2"
                    />
                  </li>
                </ul>
              </li>
              {/*  */}
            </>
          ) : (
            <li className="mb-2 text-white hover:scale-110 transition duration-300:">
              <Link to="/login">Log in</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;

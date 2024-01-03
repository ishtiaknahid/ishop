import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/CartItem";
import { useAddOrderMutation, useGetUserQuery } from "../../redux/apiSlice";
import { useAuth } from "../../contexts/AuthContext";
import { deleteAllProduct } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [selfPickup, setSelfPickup] = useState(false);
  const [requestDelivery, setRequestDelivery] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [address, setAddress] = useState("");
  const [finalDetails, setFinalDetails] = useState("");

  const { currentUser } = useAuth();


  const dispatch = useDispatch();
  const navigate = useNavigate();

  // getting user data 
  const { data: user, isLoading, isError } = useGetUserQuery(currentUser.email);
  useEffect(() => {
    // Check if the query has loaded successfully and has data
    if (!isLoading && !isError && user) {
      // Use the data to set the initial value of your state
      setAddress(user.address);
    }
  }, [user, isError, isLoading]);

  const handleSelfPickupChange = () => {
    setSelfPickup(!selfPickup);

    // If self-pickup is selected, show the agreement
    if (!selfPickup) {
      setShowAgreement(true);
    } else {
      setShowAgreement(false);
    }
  };

  const handleRequestDeliveryChange = () => {
    setRequestDelivery(!requestDelivery);

    // If request delivery is selected, show the agreement
    if (!requestDelivery) {
      setShowAgreement(true);
    } else {
      setShowAgreement(false);
    }
  };

  const handleAgreementClose = () => {
    setShowAgreement(false);
  };

  const handleFinalDetailsChange = (event) => {
    setFinalDetails(event.target.value);
  };

  const cartItems = useSelector((state) => state.cart);
  const [addOrder] = useAddOrderMutation();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    const formData = {
      address,
      selfPickup,
      requestDelivery,
      finalDetails,
      // Add other form fields here
    };
    cartItems.map((item) => {
      addOrder({
        product: item,
        ...formData,
        status: "pending",
        customerId: currentUser.uid,
        customerName: currentUser.displayName,
        customerEmail: currentUser.email,
        customerPhoneNumber: 123445,
      });
    });
    dispatch(deleteAllProduct());
    navigate("/");
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="">
          {cartItems.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
        </div>

        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

          {/* Your checkout form */}
          <form onSubmit={handleSubmit}>
            {/* Address */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Address
              </label>
              <input
                className="border rounded w-full py-2 px-3"
                type="text"
                id="address"
                name="address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* Delivery Options */}
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selfPickup}
                  onChange={handleSelfPickupChange}
                />
                <span className="text-sm">Self Pickup</span>
              </label>
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={requestDelivery}
                  onChange={handleRequestDeliveryChange}
                />
                <span className="text-sm">Request Home Delivery</span>
              </label>
            </div>

            {/* Final Details */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="finalDetails"
              >
                Buyer Instructions
              </label>
              <textarea
                className="border rounded w-full py-2 px-3"
                id="finalDetails"
                name="finalDetails"
                placeholder="Add any additional instructions if needed"
                value={finalDetails}
                onChange={handleFinalDetailsChange}
              />
            </div>

            {/* Submit button */}
            <div className="mt-6 mx-auto">
              <button
                className="bg-acqa text-white font-semibold py-2 px-4 rounded-md border-acqa -800 transition hover:bg-transparent hover:text-acqa -800 border mt-2"
                type="submit"
              >
                {selfPickup
                  ? "Confirm Pickup"
                  : requestDelivery
                  ? "Confirm Home Delivery"
                  : "Request COD"}
              </button>
            </div>
          </form>

          {/* Agreement Modal */}
          {showAgreement && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">
                  {selfPickup
                    ? "Self Pickup Agreement"
                    : "Home Delivery Agreement"}
                </h2>
                <p className="text-sm mb-4">
                  By selecting {selfPickup ? "self pickup" : "home delivery"},by
                  clicking this option we hearby declare that you agree to the
                  terms and conditions specified for this option. ishop is not
                  responsible for any damage to the product or bad service.
                  {/* Add more agreement text here */}
                </p>
                <button
                  className="bg-acqa text-white font-semibold mt-4 py-2 px-4 rounded-md border-acqa -800 transition hover:bg-transparent hover:text-acqa -800 border "
                  onClick={handleAgreementClose}
                >
                  Agreed
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Checkout;

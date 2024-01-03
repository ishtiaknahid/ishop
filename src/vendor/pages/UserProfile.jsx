import Layout from "../../components/Layout";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useGetUserQuery, useUpdateUserMutation } from "../../redux/apiSlice";
import { profile } from "../../assets/icons";

const UserProfile = () => {
  const { currentUser } = useAuth();

  const { data: user, isLoading, isError, refetch: refetchUser } = useGetUserQuery(currentUser.email);
  const [updateUser] = useUpdateUserMutation(); 

  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    // Check if the query has loaded successfully and has data
    if (!isLoading && !isError && user) {
      // Use the data to set the initial value of your state
      console.log(user)
      setAddress(user.address);
      setPhoneNumber(user.phoneNumber);
      setProfilePicture(user.imgUrl);
    }
  }, [user, isError, isLoading]);

  // State for handling profile picture
  

  // State for handling user information in edit mode
  const [editMode, setEditMode] = useState(false);

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Function to handle updating user information
  const updateProfile = () => {
    // Implement your logic to update user information
    console.log("Update user information functionality goes here");
    if(!isLoading && !isError){
      updateUser({address, phoneNumber, imgUrl: profilePicture, id: user.id})
refetchUser()
    }
    // After updating, exit edit mode
    setEditMode(false);
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96 text-center mt-4">
          {/* Profile picture */}
          <img
            className="w-20 h-20 object-cover rounded-full mx-auto mb-4"
            src={profilePicture ? profilePicture : profile}
            alt="Profile"
          />
          <h2 className="text-2xl font-semibold my-4">
            {currentUser.displayName}
          </h2>
          {/* Editable user information */}
          {editMode && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Image URL
              </label>
              {
                <input
                  type="text"
                  className="w-full border rounded py-2 px-3"
                  value={user?.imgUrl}
                  onChange={(e) => setProfilePicture(e.target.value)}
                />
              }
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            {
              <input
                type="email"
                className="w-full border rounded py-2 px-3"
                value={currentUser.email}
                disabled
              />
            }
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            {editMode ? (
              <input
                type="text"
                className="w-full border rounded py-2 px-3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            ) : (
              <p className="text-gray-800">{address}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            {editMode ? (
              <input
                type="tel"
                className="w-full border rounded py-2 px-3"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            ) : (
              <p className="text-gray-800">{phoneNumber}</p>
            )}
          </div>

          {/* Edit and Update profile buttons */}
          <div>
            {editMode ? (
              <button
                className="bg-acqa text-white border border-acqa py-2 px-4 rounded mr-2 hover:bg-white hover:text-acqa outline-none"
                onClick={updateProfile}
              >
                Update Profile
              </button>
            ) : (
              <button
                className="bg-acqa text-white border border-acqa py-2 px-4 rounded mr-2 hover:bg-white hover:text-acqa outline-none"
                onClick={toggleEditMode}
              >
                Update Info
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;

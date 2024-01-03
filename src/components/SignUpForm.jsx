/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useAddUserMutation } from "../redux/apiSlice";

export default function SignUpForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const [seePassword, setSeePassword] = useState(false);
  const [seeRePassword, setSeeRePassword] = useState(false);

  const [addUser] = useAddUserMutation(); 

  const { signUp } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    // do validation
    if (password !== rePassword) {
      return setError("Password don't match.");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(email, password, userName );
      addUser({userName, email, address, phoneNumber});
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(err);
    }
  }

  return (
    <form className="flex flex-col items-center gap-5" onSubmit={handleSubmit}>
      <input
        className="border border-gray-300 w-[300px] rounded-2xl p-2 "
        placeholder="Enter your full name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <input
        className="border border-gray-300 w-[300px] rounded-2xl p-2 "
        placeholder="Enter your Email"
        type="email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border border-gray-300 w-[300px] rounded-2xl p-2 "
        placeholder="Enter your Address"
        type="text"
        value={address}
        required
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        className="border border-gray-300 w-[300px] rounded-2xl p-2 "
        placeholder="Enter your Phone Number"
        type="number"
        value={phoneNumber}
        required
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <div className="relative">
        <input
          className="border border-gray-300 w-[300px] rounded-2xl p-2"
          placeholder="Set your Password"
          value={password}
          type={seePassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          className="inline absolute top-0 right-0 cursor-pointer  box-border p-3"
          onClick={() => setSeePassword(!seePassword)}
        >
          {seePassword ? <IoMdEyeOff /> : <IoEye />}
        </div>
      </div>

      <div className="relative">
        <input
          className="border border-gray-300 w-[300px] rounded-2xl p-2"
          placeholder="Re-enter your Password"
          value={rePassword}
          type={seeRePassword ? "text" : "password"}
          onChange={(e) => setRePassword(e.target.value)}
        />
        <div
          className="inline absolute top-0 right-0 cursor-pointer  box-border p-3"
          onClick={() => setSeeRePassword(!seeRePassword)}
        >
          {seeRePassword ? <IoMdEyeOff /> : <IoEye />}
        </div>
      </div>
      {error && <p className="text-red-500 text-xl">{error}</p>}
      <button
        className="bg-acqa p-3 w-[8rem] rounded-2xl
                      border border-acqa text-white text-2xl
                      hover:bg-transparent hover:text-acqa
                      ease-out duration-100"
        type="submit"
        disabled={loading}
      >
        Sign Up
      </button>
    </form>
  );
}

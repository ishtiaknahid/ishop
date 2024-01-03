import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { googleLogo } from "../constants";
import { Link } from "react-router-dom";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSetPassword] = useState(false);

  // const [loading, setLoading] = useState(false);

  const { logIn, logInWithGmail, error, setError } = useAuth();

  const handleLoginWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await logInWithGmail();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await logIn(email, password);
      setPassword("");
    } catch (err) {
      console.log(err);
      // setLoading(false);
      setError(err);
    }
  };

  return (
    <form className="flex flex-col items-center gap-5" onSubmit={handleSubmit}>
      <input
        className="border border-gray-300 w-[300px] rounded-2xl p-2 "
        placeholder="Enter your Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="relative">
        <input
          className="border border-gray-300 w-[300px] rounded-2xl p-2"
          placeholder="Enter your Password"
          value={password}
          type={seePassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          className="inline absolute top-0 right-0 cursor-pointer  box-border p-3"
          onClick={() => setSetPassword(!seePassword)}
        >
          {seePassword ? <IoMdEyeOff /> : <IoEye />}
        </div>
      </div>
      <Link
        to="/forgotten-password"
        className="text-blue-500 self-start text-lg"
      >
        Forgotten Password?
      </Link>
      <button
        type="submit"
        className="bg-acqa p-3 w-[8rem] rounded-2xl
                        border border-acqa text-white text-2xl
                        hover:bg-transparent hover:text-acqa
                        transition cursor-pointer"
      >
        Log in
      </button>
      <div
        onClick={handleLoginWithGoogle}
        className="bg-acqa  cursor-pointer hover:bg-transparent hover:text-acqa text-white font-semibold py-1 px-6 rounded-full flex border border-acqa"
      >
        <img src={googleLogo} width={30} />{" "}
        <span className="ml-2">Log in </span>
      </div>

      {error && (
        <p className="bg-red-500 text-white text-xl p-2 rounded-lg">
          Your Email or Password doesn&apos;t match
        </p>
      )}
    </form>
  );
}

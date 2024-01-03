import { Link } from "react-router-dom";
import { loginPageLogo } from "../constants/index.js";
import LoginForm from "../components/LoginForm.jsx";
import backgroundSvg from "../assets/backgroundlogin.svg";
import { useLocation } from "react-router-dom";
import SignUpForm from "../components/SignUpForm.jsx";
import ForgottenPass from "../components/ForgottenPass.jsx";

export default function SignInUp() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="">
      <img src={backgroundSvg} alt="" className="z-[-1] fixed top-0" />
      <div className="flex flex-col items-center gap-1 mt-[3%]">
        <div className="bg-white p-10 rounded-2xl shadow-lg self-end mr-[5%]">
          <img
            src={loginPageLogo}
            alt="logo"
            className="w-[10rem] m-auto -mt-10"
          />
          {currentPath === "/login" ? (
            <LoginForm />
          ) : currentPath === "/signup" ? (
            <SignUpForm />
          ) : (
            <ForgottenPass />
          )}

          {currentPath === "/login" ? (
            <>
              <p className="mt-5">Don&apos;t have an account? </p>{" "}
              <Link to={"/signup"} className="underline text-blue-700">
                Sign up
              </Link>
            </>
          ) : currentPath === "/signup" ? (
            <>
              <p className="mt-5">Already have an account? </p>{" "}
              <Link to={"/login"} className="underline text-blue-700">
                Log in
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

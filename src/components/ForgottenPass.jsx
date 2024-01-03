import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ForgottenPass() {
  const [email, setEmail] = useState("");
  // const [loading, setLoading] = useState(false);
  const [resetStatus, setResetStatus] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setResetStatus('success');
    } catch (error) {
      console.error(error.message);
      setResetStatus('error');
    }
  };

  return (
    <form className="flex flex-col items-center gap-5" onSubmit={handleResetPassword}>
      <input
        className="border border-gray-300 w-[300px] rounded-2xl p-2 "
        placeholder="Enter your Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} required
      />      
      <button
        type="submit"
        className="bg-acqa p-3 rounded-2xl
                        border border-acqa text-white text-m
                        hover:bg-transparent hover:text-acqa
                        transition cursor-pointer flex align-center"
      >
        Send a reset password e-mail <FaArrowCircleRight className="self-center ml-2"/>
      </button>
      
      {resetStatus === 'success' && toast.success('Password reset email sent. Check your inbox.')}
      {resetStatus === 'error' && <p>Error: Unable to send the password reset email.</p>}
    </form>
  );
}

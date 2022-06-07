import { Alert, Button } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import useTitle from "../hooks/useTitle";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage("Check your inbox");
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      });
  };

  useTitle("Reset password | Twitter By Mahdi");

  return (
    <div className="flex justify-center items-center flex-col text-white h-screen">
      <div className="w-[400px] mb-4">
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-[400px] h-96 border p-10 pt-4 rounded space-y-7 bg-gray-900 autofill:bg-slate-900"
      >
        <h3 className="text-center mt-10">
          Enter your email address and we'll send you a link to reset ypur
          password{" "}
        </h3>
        <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
          <HiOutlineAtSymbol className="h-5 w-5 text-gray-400" />
          <input
            id="email"
            className="text-white pl-2 w-full outline-none border-none bg-gray-900"
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
          />
        </div>
        <button className="bg-[#1d9bf0] text-white rounded-full w-full px-4 py-2.5 mb-10 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default">
          Submit
        </button>
        <Button
          variant="outlined"
          sx={{ width: "100%", borderRadius: "9999px", padding: "7px" }}
        >
          <Link to="/login" className="text-sm">
            back to the login page
          </Link>
        </Button>
      </form>
    </div>
  );
}

export default ForgetPassword;

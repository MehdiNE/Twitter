import { useEffect, useState } from "react";
import { HiOutlineAtSymbol, HiOutlineLockClosed } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BsEyeFill, BsEyeSlashFill, BsGithub } from "react-icons/bs";
import ClipLoader from "react-spinners/ClipLoader";
import { Alert, Divider, Typography } from "@mui/material";
import { useLogin } from "../hooks/useLogin";
import useTitle from "../hooks/useTitle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const { login, isLoading, error } = useLogin();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login({ email, password });
  };

  useTitle("Login | Twitter By Mahdi");
  return (
    <div className="flex">
      <div className="w-2/4 hidden sm:block">
        <img
          src="assets/twitterLogin.png"
          alt="twitter"
          className="w-screen h-screen object-cover"
        />
      </div>
      <div className="flex w-full min-h-screen lg:w-1/2 justify-center items-center bg-black space-y-8">
        <div className="w-full px-2 md:px-32 lg:px-24">
          <form onSubmit={handleSubmit} className="rounded-md shadow-2xl p-5">
            <h1 className="text-white font-bold text-4xl mb-1">Hello Again!</h1>
            <p className="font-normal text-white mb-8">Welcome Back</p>
            {error && (
              <Alert className="my-2" severity="error">
                {error}
              </Alert>
            )}

            {/* login with */}
            <div className="flex flex-col space-y-1">
              <button
                type="button"
                className="text-black bg-[#ffffff] hover:bg-[#4285F4]/90 hover:text-white focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
              >
                <FcGoogle className="w-6 h-6 mr-2 -ml-1" />
                Sign in with Google
              </button>
              <button
                type="button"
                className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
              >
                <BsGithub className="w-5 h-5 mr-2 -ml-1" />
                Sign in with Github
              </button>
            </div>

            {/* Divider */}
            <div className="my-3">
              <Divider
                sx={{
                  "&::before, &::after": {
                    borderColor: "white",
                  },
                }}
              >
                <Typography color="white">OR</Typography>
              </Divider>
            </div>

            {/* inputs */}
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <HiOutlineAtSymbol className="h-5 w-5 text-gray-400" />
              <input
                id="email"
                className="bg-black text-white pl-2 w-full outline-none border-none"
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>

            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
              <HiOutlineLockClosed className="h-5 w-5 text-gray-400" />
              <input
                className="bg-black text-white pl-2 w-full outline-none border-none"
                type={passwordShown ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
              <button
                type="button"
                onClick={() => {
                  setPasswordShown(!passwordShown);
                }}
              >
                {passwordShown ? (
                  <BsEyeSlashFill className="text-white mr-3" />
                ) : (
                  <BsEyeFill className="text-white mr-3" />
                )}
              </button>
            </div>

            {/* {error && <p className="text-white">{error}</p>} */}

            {isLoading && (
              <button
                className="bg-[#1d9bf0] text-white rounded-full w-full px-4 py-2 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                disabled
              >
                <ClipLoader color="white" />
              </button>
            )}
            {!isLoading && (
              <button
                className="bg-[#1d9bf0] text-white rounded-full w-full px-4 py-2.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                type="submit"
              >
                Submit
              </button>
            )}

            <div className="flex justify-between mt-4">
              <Link
                to="/resetpassword"
                className="text-white text-xs sm:text-base ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >
                Forgot Password?
              </Link>

              <Link
                to="/signup"
                className="text-white text-xs sm:text-base ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >
                Don't have an account yet?
              </Link>
            </div>
          </form>
          <div className="text-gray-400 flex justify-center items-end h-28 space-x-2 -mb-16">
            <BsGithub className="text-2xl" />
            <p className="mb-0.5">Github</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

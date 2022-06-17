import React, { useRef, useState } from "react";
import {
  BsEyeFill,
  BsEyeSlashFill,
  BsFillCloudUploadFill,
  BsFillPersonFill,
  BsGithub,
} from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineAtSymbol, HiOutlineLockClosed } from "react-icons/hi";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Alert, Avatar, Divider, Typography } from "@mui/material";
import { useSignup } from "../hooks/useSignup";
import useTitle from "../hooks/useTitle";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setdisplayName] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const { signup, error, isLoading } = useSignup();

  const [avatar, setAvatar] = useState();
  const filePickerRef = useRef();

  const addImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setAvatar(readerEvent.target.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(email, password, displayName, avatar);
  };

  useTitle("Signup | Twitter By Mahdi");

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
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form onSubmit={handleSubmit} className=" rounded-md shadow-2xl p-5">
            <h1 className="text-white font-bold text-4xl mb-1">
              Happening now
            </h1>
            <p className="font-normal text-white mb-8">Join Twitter today.</p>
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
                Sign up with Google
              </button>
              <button
                type="button"
                className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
              >
                <BsGithub className="w-5 h-5 mr-2 -ml-1" />
                Sign up with Github
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
                required
              />
            </div>

            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl ">
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
                required
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

            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <BsFillPersonFill className="h-5 w-5 text-gray-400" />
              <input
                className="bg-black text-white pl-2 w-full outline-none border-none"
                type="text"
                name="displayName"
                placeholder="user name"
                onChange={(e) => {
                  setdisplayName(e.target.value);
                }}
                value={displayName}
                required
                minLength={3}
                maxLength={25}
              />
            </div>

            {/* select avatar */}
            <div className="flex justify-center items-center">
              <div className="relative flex justify-between w-56 h-14 mb-10 rounded-full">
                <div onClick={() => filePickerRef.current.click()}>
                  <button
                    type="button"
                    className="absolute w-full h-14 pl-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm p-2.5 space-x-2 flex justify-start items-center rounded-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <p>Choose a image</p>
                    <BsFillCloudUploadFill className="w-6 h-6 mt-1" />
                  </button>
                  <input
                    type="file"
                    ref={filePickerRef}
                    hidden
                    onChange={addImage}
                    multiple={false}
                    required
                  />
                </div>
                {avatar ? (
                  <Avatar
                    alt="avatar"
                    src={avatar}
                    sx={{ width: "56px", height: "56px" }}
                  />
                ) : (
                  <div className="relative bg-slate-300 rounded-full w-14 h-14">
                    <Avatar
                      src=""
                      alt="Avatar"
                      sx={{ width: "56px", height: "56px" }}
                    />
                  </div>
                )}
              </div>
            </div>

            {isLoading && (
              <button
                className="bg-[#1d9bf0] text-white rounded-full w-full px-4 py-2.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
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
                to="/login"
                className="text-white text-xs sm:text-base ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >
                already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Signup);

import { Avatar } from "@mui/material";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function MessagesFeed({ users, dimTheme, lightTheme }: any) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div
      className={`flex-grow border-l border-r max-w-2xl sm:ml-[73px] xl:ml-[370px] ${
        dimTheme && "bg-[#15202b]"
      } ${
        lightTheme
          ? "text-black border-gray-200 bg-white"
          : "text-[#d9d9d9] border-gray-700 "
      }`}
    >
      <div
        className={`flex items-center sm:justify-start py-2 px-3 sticky top-0 z-40 space-x-7 dark:bg-black/80  backdrop-blur-md ${
          dimTheme && "bg-[#15202b] bg-opacity-80"
        } ${lightTheme && "bg-slate-100/80 text-black border-gray-200"}`}
      >
        <BsArrowLeft
          size={18}
          className="cursor-pointer text-white"
          onClick={() => {
            navigate("/");
          }}
        />
        <p className="text-xl font-bold">Messages</p>
      </div>
    </div>
  );
}

export default MessagesFeed;

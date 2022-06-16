import { Avatar } from "@mui/material";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function MessagesFeed({ users, dimTheme, lightTheme }: any) {
  const navigate = useNavigate();

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

      {users?.map((result: any, index: any) => (
        <div
          className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-4 cursor-pointer transition duration-200 ease-out flex items-center"
          key={index}
          onClick={() => {
            navigate(`/messages/${result?.id}`);
            console.log(result.id);
          }}
        >
          <Avatar src={result.avatar} alt={result.displayName} />
          <div className="ml-4 leading-5 group">
            <h4 className="font-bold group-hover:underline">
              {result.displayName}
            </h4>
            <h5 className="text-gray-500 text-[15px]">
              @{result?.displayName?.split(" ")?.join("")?.toLocaleLowerCase()}
            </h5>
          </div>
          <button
            className={`ml-auto  dark:  dark:  rounded-full font-bold text-sm py-1.5 px-3.5 ${
              lightTheme ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            message
          </button>
        </div>
      ))}
    </div>
  );
}

export default MessagesFeed;

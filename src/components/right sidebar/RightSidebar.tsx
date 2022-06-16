import { Avatar } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useRecoilState } from "recoil";
import { dimModeState, lightModeState } from "../../atoms/modalAtom";
import { db } from "../../firebase/config";
import { messageAlert, openAlert, severityAlert } from "../../store/AlertSlice";
// import MessagesDrawer from "../Messages/MessagesDrawer";

const RightSidebar = React.memo(() => {
  const [users, setUsers] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [lightTheme, setLightTheme] = useRecoilState(lightModeState);
  const [dimTheme, setDimTheme] = useRecoilState(dimModeState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    let ref = collection(db, "users");

    onSnapshot(ref, (snapshot) => {
      let results: any = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setUsers(results);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5 mb-4">
      <div
        className={`sticky top-0 py-1.5 dark:bg-black  z-50 w-11/12 xl:w-9/12  ${
          lightTheme && "bg-white"
        }'} ${dimTheme && "bg-[#15202b"} `}
      >
        <div
          className={`flex items-center  p-3 rounded-full relative ${
            lightTheme ? "bg-[#f7f9f9]" : "bg-[#202327]"
          }`}
        >
          <BsSearch className="text-gray-500 h-5 z-50" />
          <input
            type="text"
            className={`bg-transparent placeholder-gray-500 outline-none dark:text-[#d9d9d9] text-black absolute inset-0 pl-11 border border-transparent w-full focus:border-[#1d9bf0] rounded-full focus:dark:bg-black focus:bg-[#f7f9f9] focus:shadow-lg ${
              dimTheme && "focus:bg-[#273340] bg-[#273340] text-[#d9d9d9]"
            }`}
            placeholder="Search Twitter"
          />
        </div>
      </div>

      <div
        className={`dark:text-[#d9d9d9] space-y-3 dark:bg-[#15181c]  pt-2 rounded-xl w-11/12 xl:w-9/12 ${
          lightTheme && "text-black bg-[#f7f9f9]"
        } ${dimTheme && "bg-[#1e2732] text-[#d9d9d9]"}`}
      >
        <h4 className="font-bold text-xl px-4">What's happening</h4>
        {/* {trendingResults.map((result, index) => (
          <Trending key={index} result={result} />
        ))} */}
        <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">
          Show more
        </button>
      </div>

      <div
        className={`dark:text-[#d9d9d9] space-y-3 dark:bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-9/12 ${
          lightTheme && "text-black bg-[#f7f9f9]"
        } ${dimTheme && "bg-[#1e2732] text-[#d9d9d9]"}`}
      >
        {isLoading && (
          <div className="text-center mt-4">
            <ClipLoader color="#1DA1F2" size={30} />
          </div>
        )}
        {!isLoading && (
          <>
            <h4 className="font-bold text-xl px-4">our users</h4>
            {users?.map((result: any, index: any) => (
              <div
                className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center"
                key={index}
                onClick={() => {
                  navigate(`/profile/${result?.id}`);
                  console.log(result.id);
                }}
              >
                <Avatar src={result.avatar} alt={result.displayName} />
                <div className="ml-4 leading-5 group">
                  <h4 className="font-bold group-hover:underline">
                    {result.displayName}
                  </h4>
                  <h5 className="text-gray-500 text-[15px]">
                    @
                    {result?.displayName
                      ?.split(" ")
                      ?.join("")
                      ?.toLocaleLowerCase()}
                  </h5>
                </div>
                <button
                  className={`ml-auto  dark:  dark:  rounded-full font-bold text-sm py-1.5 px-3.5 ${
                    lightTheme ? "bg-black text-white" : "bg-white text-black"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(openAlert());
                    dispatch(severityAlert("warning"));
                    dispatch(
                      messageAlert(
                        "follow/unfollow functionality is not ready yet!"
                      )
                    );
                  }}
                >
                  Follow
                </button>
              </div>
            ))}
          </>
        )}

        {/* <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">
          Show more
        </button> */}

        {/* <MessagesDrawer /> */}
      </div>
    </div>
  );
});

export default RightSidebar;

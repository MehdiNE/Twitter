import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { BsArrowLeft, BsCalendar3, BsPerson } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Post from "../Posts/Post";
import { useTag } from "../../hooks/useTag";
import Moment from "react-moment";
import { IoAttachOutline } from "react-icons/io5";
import { GoVerified } from "react-icons/go";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";

//redux
import { useDispatch } from "react-redux";
import { profileOpenModal } from "../../store/modalSlice";
import { openAlert, severityAlert, messageAlert } from "../../store/AlertSlice";

interface Props {
  userData: {
    0: {
      headerPic: string;
      id: string;
      verified: boolean;
      bio: string;
      location: {
        label: string;
      };
      age: string;
      website: string;
      avatar: string;
      displayName: string;
      timestamp: any;
    };
  };

  posts: any;

  loading: boolean;

  currentUser: {
    displayName: string;
    photoURL: string;
    uid: string;
    metadata: {
      createdAt: string;
    };
  };

  dimTheme: boolean;
  lightTheme: boolean;
}

function ProfileFeed({
  userData,
  posts,
  loading,
  currentUser,
  dimTheme,
  lightTheme,
}: Props) {
  //redux
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { userTag } = useTag(userData[0]?.displayName);

  const unixTimestamp = userData[0]?.timestamp?.seconds;

  useEffect(() => {
    document.title = `${userData[0]?.displayName} | Twitter By Mahdi`;
  }, [userData]);

  //modal
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
        <div className="text-xl font-bold">
          {userData[0]?.displayName}
          <span className="inline-block mt-1 ml-1 align-text-bottom text-lg">
            {userData[0]?.verified && <GoVerified color="white" />}
          </span>
        </div>
      </div>
      {loading ? (
        <div className="text-center mt-4">
          <ClipLoader color="#1DA1F2" />
        </div>
      ) : (
        <>
          <div className="w-full h-52">
            <img
              src={userData[0]?.headerPic}
              alt="banner"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className={`border-b ${
              lightTheme ? " border-gray-200" : "border-gray-700"
            }`}
          >
            <div className="flex flex-row justify-between ml-4 sm:ml-5">
              <Avatar
                src={userData[0]?.avatar}
                sx={{
                  width: "140px",
                  height: "140px",
                }}
                alt={userData[0]?.displayName}
                className={`-mt-20 border-4 border-black ${
                  lightTheme && "border-white"
                }`}
              />
              {currentUser?.uid === userData[0]?.id ? (
                <div className="mt-4 mr-4">
                  <button
                    onClick={() => dispatch(profileOpenModal())}
                    className={`relative rounded-full inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800`}
                  >
                    <span
                      className={`relative rounded-full px-5 py-2.5 transition-all ease-in duration-75 dark:bg-black group-hover:bg-opacity-0 ${
                        dimTheme && "bg-[#15202b] text-white"
                      } ${lightTheme && "bg-white"}`}
                    >
                      Edit profile
                    </span>
                  </button>
                </div>
              ) : (
                <div className="mt-4 mr-4">
                  <button
                    className="relative rounded-full inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
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
                    <span
                      className={`relative rounded-full px-5 py-2.5 transition-all ease-in duration-75 dark:bg-black group-hover:bg-opacity-0 ${
                        dimTheme && "bg-[#15202b] text-white"
                      } ${lightTheme && "bg-white"}`}
                    >
                      Follow
                    </span>
                  </button>
                </div>
              )}
            </div>
            <div className="ml-4 sm:ml-5 mt-4">
              <div
                className={`text-xl font-bold ${
                  lightTheme ? "text-black" : "text-white"
                }`}
              >
                {userData[0]?.displayName}
                <span className="inline-block mt-1 ml-1 align-text-bottom text-lg">
                  {userData[0]?.verified && (
                    <div>
                      <GoVerified
                        className="-mt-5"
                        color="white"
                        aria-owns={open ? "mouse-over-popover" : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                      />
                      <Popover
                        id="mouse-over-popover"
                        PaperProps={{
                          style: {
                            backgroundColor: "black",
                            color: "white",
                            boxShadow: "0px 0px 7px 2px #7f7e7ec5",
                            borderRadius: "20px",
                            padding: "14px 5px",
                          },
                        }}
                        sx={{
                          pointerEvents: "none",
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                      >
                        <div className=" w-96 flex justify-center items-center flex-col text-center space-y-3">
                          <GoVerified size={32} color="white" />
                          <p className="text-2xl font-bold">
                            Account information
                          </p>
                          <p className="opacity-60">
                            This account is verified because it’s notable in
                            government, news, entertainment, or another
                            designated category.
                          </p>
                        </div>
                      </Popover>
                    </div>
                  )}
                </span>
              </div>
              <h4 className="text-[#979fa5]">@{userTag}</h4>
            </div>

            {/* #6e767d */}
            <div className="space-y-2 text-sm">
              <div className="px-2 sm:px-4 ml-1 text-left">
                <p className="text-left my-4">{userData[0]?.bio}</p>
                <div className="flex flex-wrap text-[#7e8388] text-sm tracking-tight">
                  <div className="flex space-x-4 mb-3 mr-3">
                    <div className="flex space-x-1">
                      <HiOutlineLocationMarker size={18} />
                      <p className="-mt-0.5">{userData[0]?.location?.label}</p>
                    </div>
                    <div className="flex space-x-1">
                      <BsPerson size={18} />
                      <p className="-mt-0.5">
                        {userData[0]?.age}{" "}
                        {userData[0]?.age === "not selected" ? "" : "years old"}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1 ml-0 sm:ml-3">
                    <BsCalendar3 size={18} />
                    <span className="-mt-0.5">
                      Joined{" "}
                      <Moment unix format="D MMMM y">
                        {unixTimestamp}
                      </Moment>
                    </span>
                  </div>
                </div>
              </div>
              <div className="sm:px-4 ml-4 sm:ml-1">
                <div className="flex space-x-7 text-[#556673] text-sm tracking-tight">
                  <div className="flex space-x-0.5">
                    <IoAttachOutline size={20} />
                    <a
                      href={userData[0]?.website}
                      target="_blank"
                      className=" text-blue-400 text-sm"
                      rel="noreferrer"
                    >
                      {userData[0]?.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-2 ml-2 mb-4">
              <div className="flex space-x-7 text-[#6e767d] text-sm tracking-tight">
                <div className="flex space-x-1">
                  <p className={`${lightTheme ? "text-black" : "text-white"}`}>
                    1000
                  </p>
                  <p>Following</p>
                </div>
                <div className="flex space-x-1">
                  <p className={`${lightTheme ? "text-black" : "text-white"}`}>
                    10000
                  </p>
                  <p>Follwers</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="pb-72">
        {posts.map((post: any) => (
          <Post post={post.data()} key={post.id} id={post.id} />
        ))}
      </div>
    </div>
  );
}

export default ProfileFeed;

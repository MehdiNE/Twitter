import { Avatar } from "@mui/material";
import { useEffect } from "react";
import { BsArrowLeft, BsCalendar3, BsPerson } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Post from "../Post";
import { useTag } from "../../hooks/useTag";
import Moment from "react-moment";
import { IoAttachOutline } from "react-icons/io5";
import { GoVerified } from "react-icons/go";
import { useRecoilState } from "recoil";
import { profileModalState } from "../../atoms/modalAtom";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

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
}

function ProfileFeed({ userData, posts, loading, currentUser }: Props) {
  const [isOpen, setIsOpen] = useRecoilState(profileModalState);
  const navigate = useNavigate();

  const { userTag } = useTag(currentUser?.displayName);

  const unixTimestamp = +currentUser?.metadata?.createdAt;

  useEffect(() => {
    document.title = `${currentUser?.displayName} | Twitter By Mahdi`;
  }, []);

  return (
    <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
      <div className="text-[#d9d9d9] flex items-center sm:justify-start py-2 px-3 sticky top-0 z-50 space-x-7 bg-black">
        <BsArrowLeft
          className="text-white cursor-pointer hoverAnimation"
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="text-white text-xl font-bold">
          {currentUser?.displayName}
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
          <div className="border-b border-gray-700">
            <div className="flex flex-row justify-between ml-4 sm:ml-5">
              <Avatar
                src={currentUser?.photoURL}
                sx={{
                  width: "140px",
                  height: "140px",
                  border: "4px solid black",
                }}
                alt={currentUser?.displayName}
                className="-mt-20"
              />
              {currentUser?.uid === userData[0]?.id ? (
                <div className="mt-4 mr-4">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="relative rounded-full inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                  >
                    <span className="relative rounded-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-black group-hover:bg-opacity-0">
                      Edit profile
                    </span>
                  </button>
                </div>
              ) : (
                <div className="mt-4 mr-4">
                  <button className="relative rounded-full inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                    <span className="relative rounded-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-black group-hover:bg-opacity-0">
                      Follow
                    </span>
                  </button>
                </div>
              )}
            </div>
            <div className="ml-4 sm:ml-5 mt-4">
              <div className="text-white text-xl font-bold">
                {currentUser?.displayName}
                <span className="inline-block mt-1 ml-1 align-text-bottom text-lg">
                  {userData[0]?.verified && <GoVerified color="white" />}
                </span>
              </div>
              <h4 className="text-[#6e767d]">@{userTag}</h4>
            </div>

            <div className="space-y-2 text-sm">
              <div className="text-white px-2 sm:px-4 ml-1 text-left">
                <p className="text-left my-4">{userData[0]?.bio}</p>
                <div className="flex flex-wrap text-[#6e767d] text-sm tracking-tight">
                  <div className="flex space-x-4 mb-3 mr-3">
                    <div className="flex space-x-1">
                      <HiOutlineLocationMarker size={18} />
                      <p className="-mt-0.5">{userData[0]?.location?.label}</p>
                    </div>
                    <div className="flex space-x-1">
                      <BsPerson size={18} />
                      <p className="-mt-0.5">{userData[0]?.age} years old</p>
                    </div>
                  </div>
                  <div className="flex space-x-1 ml-0 sm:ml-3">
                    <BsCalendar3 size={18} />
                    <span className="-mt-0.5">
                      Joined <Moment format="D MMMM y">{unixTimestamp}</Moment>
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-white sm:px-4 ml-4 sm:ml-1">
                <div className="flex space-x-7 text-[#6e767d] text-sm tracking-tight">
                  <div className="flex space-x-0.5">
                    <IoAttachOutline size={20} />
                    <a
                      href={userData[0]?.website}
                      target="_blank"
                      className=" text-blue-300 text-sm"
                      rel="noreferrer"
                    >
                      {userData[0]?.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-white px-4 py-2 ml-2 mb-4">
              <div className="flex space-x-7 text-[#6e767d] text-sm tracking-tight">
                <div className="flex space-x-1">
                  <p className="text-white">1000</p>
                  <p>Following</p>
                </div>
                <div className="flex space-x-1">
                  <p className="text-white">10000</p>
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

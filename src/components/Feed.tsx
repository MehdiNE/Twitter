import { HiOutlineSparkles } from "react-icons/hi";
import Input from "./Input";
import Post from "./Posts/Post";
import { ClipLoader } from "react-spinners";
import MediaQuery from "react-responsive";
import { Avatar } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useDispatch } from "react-redux";
import { OpenDrawer } from "../store/modalSlice";
import { memo } from "react";

interface Props {
  lightTheme: boolean;
  dimTheme: boolean;
  posts: any;
  isLoading: boolean;
  error: null | string;
}

function Feed({ lightTheme, dimTheme, posts, isLoading, error }: Props) {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  return (
    <div
      className={`flex-grow sm:border-l sm:border-r max-w-2xl sm:ml-[73px] xl:ml-[370px] ${
        lightTheme ? "border-gray-200" : "border-gray-700"
      }`}
    >
      <div
        className={`flex items-center sm:border-b-0 border-b sm:justify-between py-2 px-3 sticky top-0 z-50 backdrop-blur-md dark:bg-black/80 ${
          lightTheme
            ? "text-black bg-slate-50/80 border-gray-200"
            : "border-gray-700 text-[#d9d9d9]"
        } ${dimTheme && "bg-[#15202b] bg-opacity-80"}`}
      >
        <MediaQuery maxWidth={700}>
          <Avatar
            src={currentUser?.photoURL}
            alt=""
            className="mr-7"
            sx={{ width: 32, height: 32 }}
            onClick={() => dispatch(OpenDrawer())}
          />
        </MediaQuery>
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
          <HiOutlineSparkles className="h-5 w-5" />
        </div>
      </div>
      <Input lightTheme={lightTheme} />

      {error && <div>{error}</div>}

      {isLoading ? (
        <div className="text-center mt-4">
          <ClipLoader color="#1DA1F2" />
        </div>
      ) : (
        <div className="pb-72">
          {posts.map((post: any) => (
            <Post
              post={post.data()}
              key={post.id}
              id={post.id}
              lightTheme={lightTheme}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(Feed);

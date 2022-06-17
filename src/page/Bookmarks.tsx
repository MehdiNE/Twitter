import { onSnapshot, collection, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Post from "../components/Posts/Post";
import RightSidebar from "../components/right sidebar/RightSidebar";
import Sidebar from "../components/sidebar/Sidebar";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase/config";
import MediaQuery from "react-responsive";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Bookmarks() {
  const lightTheme = useSelector((state: any) => state.theme.lightModeState);
  const dimTheme = useSelector((state: any) => state.theme.dimModeState);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useAuth();

  let empteyPost;
  if (posts.length === 0) {
    empteyPost = (
      <div className="text-center text-gray-200 mt-7 mx-16">
        <h3 className="font-bold text-lg">
          Looks like you haven't bookmarked any posts 😢
        </h3>
        <p>tap the bookmark icon on any posts to add to your bookmark!</p>
      </div>
    );
  }

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        where("bookmarkedBy", "array-contains", currentUser?.uid)
      ),
      (snapshot: any) => {
        setPosts(snapshot?.docs);
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [currentUser?.uid]);

  return (
    <main
      className={`dark:bg-black min-w-full min-h-screen flex max-w-[1500px] mx-auto ${
        lightTheme && "bg-white"
      } ${dimTheme && "bg-[#15202b]"}`}
    >
      <Sidebar />
      <div
        className={`flex-grow border-l border-r max-w-2xl sm:ml-[73px] xl:ml-[370px] ${
          lightTheme ? "border-gray-200" : "border-gray-700"
        }`}
      >
        <div
          className={`flex items-center border-b sm:justify-between py-2 px-3 sticky top-0 z-50 backdrop-blur-md dark:bg-black/80 ${
            lightTheme
              ? "text-black bg-slate-50/80 border-gray-200"
              : "border-gray-700 text-[#d9d9d9]"
          } ${dimTheme && "bg-[#15202b] bg-opacity-80"}`}
        >
          <div className="flex items-center space-x-7 text-sm sm:text-xl font-bold leading-tight">
            <MediaQuery maxWidth={700}>
              <Link to="/">
                <BsArrowLeft />
              </Link>
            </MediaQuery>
            <div>
              <h3>Bookmarks</h3>
              <p className="inline-block ml-1 align-text-bottom text-sm text-gray-500">
                @{currentUser?.displayName}
              </p>
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="flex justify-center mt-7">
            <ClipLoader color="#1DA1F2" size={40} />
          </div>
        )}

        {!isLoading && (
          <div className="pb-72">
            {empteyPost ? (
              <>{empteyPost}</>
            ) : (
              <>
                {posts.map((post: any) => (
                  <Post
                    post={post.data()}
                    key={post.id}
                    id={post.id}
                    lightTheme={lightTheme}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </div>
      <RightSidebar />
    </main>
  );
}

export default React.memo(Bookmarks);

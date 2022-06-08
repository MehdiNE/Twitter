import { useEffect, useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi";
import Input from "./Input";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import Post from "./Post";
import { ClipLoader } from "react-spinners";

interface Props {
  lightTheme: boolean;
  dimTheme: boolean;
}

function Feed({ lightTheme, dimTheme }: Props) {
  const [posts, setPosts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot?.docs);
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        console.log(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div
      className={`flex-grow border-l border-r max-w-2xl sm:ml-[73px] xl:ml-[370px] ${
        lightTheme ? "border-gray-200" : "border-gray-700"
      }`}
    >
      <div
        className={`flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 backdrop-blur-md dark:bg-black/80 ${
          lightTheme
            ? "text-black bg-slate-50/80 border-gray-200"
            : "border-gray-700 text-[#d9d9d9]"
        } ${dimTheme && "bg-[#15202b] bg-opacity-80"}`}
      >
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

export default Feed;

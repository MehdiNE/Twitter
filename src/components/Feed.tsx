import { useEffect, useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi";
import Input from "./Input";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import Post from "./Post";
import { ClipLoader } from "react-spinners";
import { Alert, Button, Snackbar, Stack } from "@mui/material";

function Feed() {
  const [posts, setPosts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
    <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
          <HiOutlineSparkles className="h-5 w-5 text-white" />
        </div>
      </div>
      <Input />

      {error && <div>{error}</div>}

      {isLoading ? (
        <div className="text-center mt-4">
          <ClipLoader color="#1DA1F2" />
        </div>
      ) : (
        <div className="pb-72">
          {posts.map((post: any) => (
            <Post post={post.data()} key={post.id} id={post.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Feed;

import { Tooltip } from "@mui/material";
import {
  onSnapshot,
  collection,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase/config";
import { Player } from "@lottiefiles/react-lottie-player";

interface Props {
  id: string;
}

function Like({ id }: Props) {
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [showLike, setShowLike] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot: any) =>
      setLikes(snapshot?.docs)
    );
  }, [id]);

  useEffect(
    () =>
      setLiked(
        likes.findIndex((like: any) => like?.id === currentUser?.uid) !== -1
      ),
    [currentUser?.uid, likes]
  );

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "posts", id, "likes", currentUser?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", currentUser?.uid), {
        username: currentUser?.displayName,
      });
    }
  };

  return (
    <div
      className="flex items-center space-x-1 group"
      onClick={(e) => {
        e.stopPropagation();
        likePost();
        setShowLike(true);
      }}
    >
      <Tooltip title="Like" className="icon group-hover:bg-pink-600/10">
        <button>
          {liked ? (
            <>
              <HiHeart className="h-5 text-red-500" />
              {showLike && (
                <Player
                  autoplay={true}
                  keepLastFrame
                  loop={false}
                  src="https://assets2.lottiefiles.com/datafiles/hvAaKBDVLhuV5Wl/data.json"
                  style={{ height: "50px", width: "50px" }}
                ></Player>
              )}
            </>
          ) : (
            <HiOutlineHeart className="h-5 group-hover:text-pink-600" />
          )}
        </button>
      </Tooltip>
      {likes.length > 0 && (
        <span
          className={`group-hover:text-pink-600 text-sm ${
            liked && "text-pink-600"
          }`}
        >
          {likes.length}
        </span>
      )}
    </div>
  );
}

export default React.memo(Like);

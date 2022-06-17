import { Tooltip } from "@mui/material";
import { updateDoc, doc, arrayRemove, arrayUnion } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BsBookmarkCheckFill, BsBookmark } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase/config";
import { allAlert } from "../../store/AlertSlice";
import { Player } from "@lottiefiles/react-lottie-player";

function Bookmark({ post, id }: any) {
  const [bookmarks, setBookmarks] = useState(false);
  const [showBookmark, setShowBookmark] = useState(false);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    setBookmarks(post?.bookmarkedBy.includes(currentUser?.uid));
  }, [currentUser?.uid, post?.bookmarkedBy]);

  const deleteBookmarks = async () => {
    await updateDoc(doc(db, "posts", id), {
      bookmarkedBy: arrayRemove(currentUser?.uid),
    });

    dispatch(
      allAlert({
        alertState: true,
        alertSeverity: "success",
        alertMessage: "Tweet removed from your Bookmarks",
      })
    );
  };

  const addToBookmarks = async () => {
    await updateDoc(doc(db, "posts", id), {
      bookmarkedBy: arrayUnion(currentUser?.uid),
    });

    dispatch(
      allAlert({
        alertState: true,
        alertSeverity: "success",
        alertMessage: "Tweet added to your Bookmarks",
      })
    );
  };
  return (
    <>
      <Tooltip
        title="Bookmark"
        className="icon group"
        onClick={(e) => {
          e.stopPropagation();
          setShowBookmark(true);
        }}
      >
        <button>
          {bookmarks ? (
            <>
              <BsBookmarkCheckFill
                className="text-[#6edcda] opacity-80"
                onClick={() => {
                  deleteBookmarks();
                }}
                size={20}
              />
              {showBookmark && (
                <div onClick={() => deleteBookmarks()}>
                  <Player
                    autoplay={true}
                    keepLastFrame
                    loop={false}
                    src="https://assets10.lottiefiles.com/datafiles/SkdS7QDyJTKTdwA/data.json"
                    style={{ height: "44px", width: "44px" }}
                  ></Player>
                </div>
              )}
            </>
          ) : (
            <BsBookmark
              onClick={() => {
                addToBookmarks();
              }}
              size={20}
            />
          )}
        </button>
      </Tooltip>
    </>
  );
}

export default React.memo(Bookmark);

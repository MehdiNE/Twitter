import { Tooltip } from "@mui/material";
import { updateDoc, doc, arrayRemove, arrayUnion } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BsBookmarkCheckFill, BsBookmark } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase/config";
import { openAlert, severityAlert, messageAlert } from "../../store/AlertSlice";

function Bookmark({ post, id }: any) {
  const [bookmarks, setBookmarks] = useState(false);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    setBookmarks(post?.bookmarkedBy.includes(currentUser?.uid));
  }, [currentUser?.uid, post?.bookmarkedBy]);

  const deleteBookmarks = async () => {
    await updateDoc(doc(db, "posts", id), {
      bookmarkedBy: arrayRemove(currentUser?.uid),
    });
    dispatch(openAlert());
    dispatch(severityAlert("success"));
    dispatch(messageAlert("Tweet removed from your Bookmarks"));
  };

  const addToBookmarks = async () => {
    await updateDoc(doc(db, "posts", id), {
      bookmarkedBy: arrayUnion(currentUser?.uid),
    });
    dispatch(openAlert());
    dispatch(severityAlert("success"));
    dispatch(messageAlert("Tweet added to your Bookmarks"));
  };
  return (
    <div>
      <Tooltip
        title="Bookmark"
        className="icon group"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button>
          {bookmarks ? (
            <BsBookmarkCheckFill
              onClick={() => {
                deleteBookmarks();
              }}
              size={20}
            />
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
    </div>
  );
}

export default Bookmark;

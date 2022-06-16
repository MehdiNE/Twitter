import { Tooltip } from "@mui/material";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { HiOutlineChat } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { db } from "../../firebase/config";
import { openModal } from "../../store/modalSlice";
import { postState } from "../../store/postSlice";

interface Props {
  id: string;
}

function Reply({ id }: Props) {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot: any) => setComments(snapshot.docs)
    );
  }, [id]);

  return (
    <div
      className="flex items-center space-x-1 group"
      onClick={(e) => {
        e.stopPropagation();
        // setPostId(id);
        dispatch(postState(id));
        dispatch(openModal());
      }}
    >
      <Tooltip
        title="Reply"
        className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10"
      >
        <button>
          <HiOutlineChat className="h-5 group-hover:text-[#1d9bf0]" />
        </button>
      </Tooltip>
      {comments.length > 0 && (
        <span className="group-hover:text-[#1d9bf0] text-sm">
          {comments.length}
        </span>
      )}
    </div>
  );
}

export default React.memo(Reply);

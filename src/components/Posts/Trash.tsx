import { Tooltip } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { FaRetweet } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase/config";
import { allAlert } from "../../store/AlertSlice";

interface Props {
  post: string;
  id: string;
}

function Trash({ post, id }: Props) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    deleteDoc(doc(db, "posts", id));
    navigate("/");

    dispatch(
      allAlert({
        alertState: true,
        alertSeverity: "error",
        alertMessage: "Tweet removed from database",
      })
    );
  };

  return (
    <>
      {currentUser?.uid === post ? (
        <div
          className="flex items-center space-x-1 group"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          <div className="icon group-hover:bg-red-600/10">
            <Tooltip title="Delete">
              <button>
                <HiOutlineTrash className="h-5 group-hover:text-red-600" />
              </button>
            </Tooltip>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center space-x-1 group"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Tooltip title="Retweet" className="icon group-hover:bg-green-500/10">
            <button
              onClick={() =>
                dispatch(
                  allAlert({
                    alertState: true,
                    alertSeverity: "error",
                    alertMessage: "Retweet functionality is not ready yet!",
                  })
                )
              }
            >
              <FaRetweet className="h-5 group-hover:text-green-500" />
            </button>
          </Tooltip>
        </div>
      )}
    </>
  );
}

export default React.memo(Trash);

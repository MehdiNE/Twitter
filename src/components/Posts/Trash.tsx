import { Tooltip } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { FaRetweet } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase/config";

interface Props {
  post: string;
  id: string;
}

function Trash({ post, id }: Props) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      {currentUser?.uid === post ? (
        <div
          className="flex items-center space-x-1 group"
          onClick={(e) => {
            e.stopPropagation();
            deleteDoc(doc(db, "posts", id));
            navigate("/");
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
            <button>
              <FaRetweet className="h-5 group-hover:text-green-500" />
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
}

export default Trash;

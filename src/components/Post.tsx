import { useEffect, useState } from "react";
import {
  HiDotsHorizontal,
  HiHeart,
  HiOutlineChartBar,
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineShare,
  HiOutlineTrash,
} from "react-icons/hi";
import { FaRetweet } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Post({ post, id, postPage }: any) {
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

  const { currentUser } = useAuth();

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot: any) => setComments(snapshot.docs)
      ),
    [id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot: any) =>
        setLikes(snapshot?.docs)
      ),
    [id]
  );

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
    <>
      <div
        className="p-3 flex cursor-pointer border-b dark:border-gray-700 border-gray-200"
        onClick={() => navigate(`/${id}`)}
      >
        {!postPage && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${post?.id}`);
            }}
          >
            <Avatar
              src={post?.userImg}
              alt=""
              className="mr-4"
              sx={{ width: 50, height: 50 }}
            />
          </div>
        )}
        <div className="flex flex-col space-y-2 w-full">
          <div className={`flex ${!postPage && "justify-between"}`}>
            {postPage && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/profile/${post?.id}`);
                }}
              >
                <Avatar src={post?.userImg} alt="avatar" className="mr-4" />
              </div>
            )}
            <div className="text-[#6e767d]">
              <div className="inline-block group">
                <h4
                  className={`font-bold text-[15px] sm:text-base dark:text-[#d9d9d9] text-black group-hover:underline ${
                    !postPage && "inline-block"
                  }`}
                >
                  {post?.username}
                </h4>
                <span
                  className={`text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}
                >
                  @{post?.tag}
                </span>
              </div>
              &nbsp; .&nbsp;
              <span className="hover:underline text-sm sm:text-[15px]">
                <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
              </span>
              {!postPage && (
                <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
                  {post?.text}
                </p>
              )}
            </div>
            <div className="icon group flex-shrink-0 ml-auto">
              <HiDotsHorizontal className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
            </div>
          </div>
          {postPage && (
            <p className="text-[#d9d9d9] mt-0.5 text-xl">{post?.text}</p>
          )}
          <img
            src={post?.image}
            alt=""
            className="rounded-2xl max-h-[700px] object-cover mr-2"
          />
          <img
            src={post?.gif}
            alt=""
            className="rounded-2xl max-h-[500px] object-cover mr-2"
          />
          <div
            className={`text-[#6e767d] flex justify-between w-10/12 ${
              postPage && "mx-auto"
            }`}
          >
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                setPostId(id);
                setIsOpen(true);
              }}
            >
              <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
                <HiOutlineChat className="h-5 group-hover:text-[#1d9bf0]" />
              </div>
              {comments.length > 0 && (
                <span className="group-hover:text-[#1d9bf0] text-sm">
                  {comments.length}
                </span>
              )}
            </div>

            {currentUser?.uid === post?.id ? (
              <div
                className="flex items-center space-x-1 group"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteDoc(doc(db, "posts", id));
                  navigate("/");
                }}
              >
                <div className="icon group-hover:bg-red-600/10">
                  <HiOutlineTrash className="h-5 group-hover:text-red-600" />
                </div>
              </div>
            ) : (
              <div
                className="flex items-center space-x-1 group"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="icon group-hover:bg-green-500/10">
                  <FaRetweet className="h-5 group-hover:text-green-500" />
                </div>
              </div>
            )}

            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                likePost();
              }}
            >
              <div className="icon group-hover:bg-pink-600/10">
                {liked ? (
                  <HiHeart className="h-5 text-pink-600" />
                ) : (
                  // <Lottie animationData={likeAnimation} />
                  <HiOutlineHeart className="h-5 group-hover:text-pink-600" />
                )}
              </div>
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

            <div
              className="icon group"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <HiOutlineShare className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            <div
              className="icon group"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <HiOutlineChartBar className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;

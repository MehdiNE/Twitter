import React, { useEffect, useState } from "react";
import {
  HiDotsHorizontal,
  HiHeart,
  HiOutlineChat,
  HiOutlineHeart,
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
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShareTweet from "./ShareTweet";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

//redux
import { useDispatch } from "react-redux";
import { openModal } from "../store/modalSlice";
import { postState } from "../store/postSlice";

const Post = React.memo(({ post, id, postPage, lightTheme }: any) => {
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);

  const [bookmarked, setBookmarked] = useState(false);

  const timestampNumber = post.timestamp.seconds;
  const timesTampId = timestampNumber.toString();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { currentUser } = useAuth();

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot: any) => setComments(snapshot.docs)
    );
  }, [id]);

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

  const addToBookmarks = async () => {
    if (!bookmarked) {
      await setDoc(
        doc(db, "users", currentUser?.uid, "bookmarks", timesTampId),
        {
          id: post.id,
          tag: post.tag,
          text: post.text,
          timestamp: post.timestamp,
          userImg: post.userImg,
          username: post.username,
          image: post.image,
          gif: post.gif,
        }
      );
    } else {
      await deleteDoc(
        doc(db, "users", currentUser?.uid, "bookmarks", timesTampId)
      );
    }
  };

  return (
    <>
      <div
        className={`p-3 flex cursor-pointer border-b ${
          lightTheme ? "border-gray-200" : "border-gray-700"
        }`}
        onClick={() => navigate(`/${id}`)}
      >
        {!postPage && (
          <div onClick={(e) => {}}>
            <Avatar
              src={post?.userImg}
              alt=""
              className="mr-4"
              sx={{ width: 50, height: 50 }}
              onClick={(e) => {
                navigate(`/profile/${post?.id}`);
                e.stopPropagation();
              }}
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
            <div className="text-[#7c8186]">
              <div className="inline-block group">
                <h4
                  className={`font-bold text-[15px] sm:text-base group-hover:underline ${
                    !postPage && "inline-block"
                  } ${lightTheme ? "text-black" : "text-[#d9d9d9]"}`}
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
            className="rounded-2xl max-h-[500px] object-cover mr-2"
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
                // setPostId(id);
                dispatch(postState(id));
                dispatch(openModal());
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
              <ShareTweet id={id} />
            </div>
            <div
              className="icon group"
              onClick={(e) => {
                e.stopPropagation();
                addToBookmarks();
              }}
            >
              {!bookmarked && (
                <BsBookmark
                  className="h-5"
                  onClick={() => {
                    setBookmarked(true);
                  }}
                />
              )}
              {bookmarked && (
                <BsBookmarkFill
                  className="h-5 "
                  onClick={() => {
                    setBookmarked(false);
                  }}
                />
              )}
              {/* {bookmarked ? (
                <BsBookmark className="h-5 text-pink-600" />
              ) : (
                <BsBookmarkFill className="h-5 group-hover:text-pink-600" />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Post;

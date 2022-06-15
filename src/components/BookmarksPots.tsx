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

const Post = React.memo(
  ({ bookmarks, post, id, postPage, lightTheme }: any) => {
    console.log(
      "🚀 ~ file: BookmarksPots.tsx ~ line 34 ~ bookmarks",
      bookmarks
    );
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { currentUser } = useAuth();

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
                src={bookmarks?.userImg}
                alt=""
                className="mr-4"
                sx={{ width: 50, height: 50 }}
                onClick={(e) => {
                  navigate(`/profile/${bookmarks?.id}`);
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
                    navigate(`/profile/${bookmarks?.id}`);
                  }}
                >
                  <Avatar
                    src={bookmarks?.userImg}
                    alt="avatar"
                    className="mr-4"
                  />
                </div>
              )}
              <div className="text-[#7c8186]">
                <div className="inline-block group">
                  <h4
                    className={`font-bold text-[15px] sm:text-base group-hover:underline ${
                      !postPage && "inline-block"
                    } ${lightTheme ? "text-black" : "text-[#d9d9d9]"}`}
                  >
                    {bookmarks?.username}
                  </h4>
                  <span
                    className={`text-sm sm:text-[15px] ${
                      !postPage && "ml-1.5"
                    }`}
                  >
                    @{bookmarks?.tag}
                  </span>
                </div>
                &nbsp; .&nbsp;
                <span className="hover:underline text-sm sm:text-[15px]">
                  <Moment fromNow>{bookmarks?.timestamp?.toDate()}</Moment>
                </span>
                {!postPage && (
                  <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
                    {bookmarks?.text}
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
              src={bookmarks?.image}
              alt=""
              className="rounded-2xl max-h-[500px] object-cover mr-2"
            />
            <img
              src={bookmarks?.gif}
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
              </div>

              {currentUser?.uid === bookmarks?.id ? (
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
                }}
              >
                <div className="icon group-hover:bg-pink-600/10">
                  <HiHeart className="h-5 text-pink-600" />
                </div>

                <div
                  className="icon group"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <ShareTweet id={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default Post;

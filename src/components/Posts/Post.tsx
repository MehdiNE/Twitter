import React, { Suspense } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import Moment from "react-moment";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Bookmark = React.lazy(() => import("./Bookmark"));
const ShareTweet = React.lazy(() => import("./ShareTweet"));
const Like = React.lazy(() => import("./Like"));
const Trash = React.lazy(() => import("./Trash"));
const Reply = React.lazy(() => import("./Reply"));

const Post = React.memo(({ post, id, postPage, lightTheme }: any) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`p-3 flex cursor-pointer border-b ${
          lightTheme ? "border-gray-200" : "border-gray-700"
        }`}
        onClick={() => navigate(`/${id}`)}
      >
        {!postPage && (
          <div>
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
                  } ${lightTheme ? "text-gray-900" : "text-[#d9d9d9]"}`}
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
                <p
                  className={`${
                    lightTheme ? "text-gray-900" : "text-[#d9d9d9]"
                  } text-[15px] sm:text-base mt-0.5`}
                >
                  {post?.text}
                </p>
              )}
            </div>
            <div className="icon group flex-shrink-0 ml-auto">
              <HiDotsHorizontal className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
            </div>
          </div>
          {postPage && (
            <p
              className={`${
                lightTheme ? "text-gray-900" : "text-[#d9d9d9]"
              } mt-0.5 text-xl `}
            >
              {post?.text}
            </p>
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
            className={`text-[#6e767d] flex justify-between w-full ${
              postPage && "mx-auto"
            }`}
          >
            <Reply id={id} />

            <Trash post={post?.id} id={id} />

            <Like id={id} />

            <Bookmark post={post} id={id} />

            <ShareTweet id={id} />
          </div>
        </div>
      </div>
    </>
  );
});

export default Post;

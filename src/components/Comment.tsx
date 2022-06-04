import { Avatar } from "@mui/material";
import {
  HiDotsHorizontal,
  HiOutlineChartBar,
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineShare,
} from "react-icons/hi";
import Moment from "react-moment";

function Comment({ comment, id }: any) {
  return (
    <div className="p-3 flex cursor-pointer border-b border-gray-700">
      <Avatar src={comment?.userImg} alt="" className="mr-4" />
      <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between">
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4 className="font-bold text-[#d9d9d9] text-[15px] sm:text-base inline-block group-hover:underline">
                {comment?.username}
              </h4>
              <span className="ml-1.5 text-sm sm:text-[15px]">
                @{comment?.tag}{" "}
              </span>
            </div>{" "}
            ·{" "}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
            <p className="text-[#d9d9d9] mt-0.5 max-w-lg text-[15px] sm:text-base">
              {comment?.comment}
            </p>
          </div>
          <div className="icon group flex-shrink-0">
            <HiDotsHorizontal className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>

        <img
          src={comment?.gif}
          alt="gif"
          className="rounded-2xl max-h-[700px] object-cover mr-2"
        />
        <img
          src={comment?.image}
          alt="gif"
          className="rounded-2xl max-h-[700px] object-cover mr-2"
        />
        <div className="text-[#6e767d] flex justify-between w-10/12">
          <div className="icon group">
            <HiOutlineChat className="h-5 group-hover:text-[#1d9bf0]" />
          </div>

          <div className="flex items-center space-x-1 group">
            <div className="icon group-hover:bg-pink-600/10">
              <HiOutlineHeart className="h-5 group-hover:text-pink-600" />
            </div>
            <span className="group-hover:text-pink-600 text-sm"></span>
          </div>

          <div className="icon group">
            <HiOutlineShare className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <HiOutlineChartBar className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;

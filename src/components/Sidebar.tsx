import React, { useState } from "react";
import SidebarList from "./SidebarList";
import {
  HiHome,
  HiHashtag,
  HiOutlineBell,
  HiOutlineInbox,
  HiOutlineClipboardList,
  HiOutlineBookmark,
  HiOutlineUser,
  HiDotsHorizontal,
} from "react-icons/hi";
import { Avatar } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTag } from "../hooks/useTag";
import { BsThreeDots, BsTwitter } from "react-icons/bs";
import useLogout from "../hooks/useLogout";
import { ClipLoader } from "react-spinners";
import { useGetUser } from "../hooks/useGetUser";
import { useAuth } from "../contexts/AuthContext";
import ThemeSelector from "./ThemeSelector";

function Sidebar() {
  const { logout, error, isLoading } = useLogout();
  const { GetUser, isLoadingUser, userData } = useGetUser();
  const { userTag } = useTag(userData[0]?.displayName);

  const { currentUser } = useAuth();
  GetUser(currentUser?.uid);

  //menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <BsTwitter className="dark:text-[#d9d9d9] text-[#1d9bf0]" size={40} />
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <SidebarList text="Home" Icon={HiHome} link="/" />
        <SidebarList text="Explore" Icon={HiHashtag} />
        {/* <SidebarList text="Notifications" Icon={HiOutlineBell} /> */}
        <SidebarList text="Messages" Icon={HiOutlineInbox} />
        <SidebarList text="Bookmarks" Icon={HiOutlineBookmark} />
        <SidebarList text="Lists" Icon={HiOutlineClipboardList} />
        <SidebarList
          text="Profile"
          Icon={HiOutlineUser}
          link={`/profile/${userData[0]?.id}`}
        />
        <ThemeSelector />
        <SidebarList text="More" Icon={HiDotsHorizontal} />
      </div>
      <button className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
        Tweet
      </button>
      <div className="text-[#d9d9d9] flex items-center justify-center mt-auto py-2 hoverAnimation xl:ml-auto xl:-mr-5">
        {isLoadingUser && (
          <div className="text-center">
            <ClipLoader color="#1DA1F2" size={30} />
          </div>
        )}
        {!isLoadingUser && (
          <>
            <Avatar
              sx={{ width: 50, height: 50 }}
              src={userData[0]?.avatar}
              alt={userData[0]?.displayName}
              className="xl:mr-2.5"
            />
            <div className="hidden xl:inline leading-5">
              <h4 className="font-bold xl:ml-2 dark:text-[#d9d9d9] text-black">
                {userData[0]?.displayName}
              </h4>
              <p className="text-[#6e767d] xl:ml-1.5">@{userTag}</p>
            </div>
            <button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <BsThreeDots className="h-5 hidden xl:inline ml-10 dark:text-[#d9d9d9] text-black" />
            </button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              PaperProps={{
                style: {
                  backgroundColor: "black",
                  color: "white",
                  boxShadow: "0px 0px 7px 2px #7f7e7ec5",
                },
              }}
            >
              {!isLoading && <MenuItem onClick={logout}>Logout</MenuItem>}
              {isLoading && <MenuItem>Loding...</MenuItem>}
            </Menu>
          </>
        )}

        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Sidebar;

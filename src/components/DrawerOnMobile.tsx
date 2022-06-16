import { Drawer, Box, Avatar, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer, TweetOpenModal } from "../store/modalSlice";
import { HiOutlineHome, HiOutlineUser, HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useTag } from "../hooks/useTag";
import { useAuth } from "../contexts/AuthContext";
import ThemeSelector from "./ThemeSelector";
import { useState } from "react";
import { MdLogout } from "react-icons/md";
import useLogout from "../hooks/useLogout";
import { BsBookmark } from "react-icons/bs";

interface Props {
  lightTheme: boolean;
}

const DrawerOnMobile = ({ lightTheme }: Props) => {
  const open = useSelector((state: any) => state.modal.isDrawerOpen);
  const { currentUser } = useAuth();

  const { userTag } = useTag(currentUser?.displayName);

  const { logout } = useLogout();

  const dispatch = useDispatch();
  const handleOpen = () => dispatch(TweetOpenModal());

  //menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Drawer anchor="left" open={open} onClose={() => dispatch(closeDrawer())}>
        <Box
          p={2}
          width="250px"
          textAlign="center"
          role="presentation"
          sx={{
            height: "100%",
            color: "whitesmoke",
            border: "1px solid #15202b",
          }}
          className={`${lightTheme ? "bg-white" : "bg-[#15202b]"}`}
        >
          <div
            className={`${
              lightTheme ? "bg-white text-black" : "text-white bg-[#15202b]"
            }`}
          >
            <div className="flex justify-between items-center mb-7">
              <h3>Account info</h3>
              <HiX onClick={() => dispatch(closeDrawer())} />
            </div>
            <div className="flex justify-between mb-7 leading-tight">
              <div className="text-left">
                <Avatar
                  src={currentUser?.photoURL}
                  alt={currentUser?.displayName}
                  sx={{ width: 40, height: 40 }}
                  className="mb-3"
                />
                <p className="font-bold text-lg">{currentUser?.displayName}</p>
                <p className="text-gray-400">@{userTag}</p>
              </div>
              <div>
                <button
                  id="basic-button"
                  aria-controls={openMenu ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MdLogout size={20} className="inline mt-2" />
                </button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
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
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </div>
            </div>
            <div className="flex text-sm space-y-7 flex-col">
              <NavLink to="./">
                <div className="flex space-x-3">
                  <HiOutlineHome size={20} />
                  <span className="inline">Home</span>
                </div>
              </NavLink>
              <NavLink to={`/profile/${currentUser?.uid}`}>
                <div className="flex space-x-3">
                  <HiOutlineUser size={20} />
                  <span className="inline">Profile</span>
                </div>
              </NavLink>
              <NavLink to="/bookmarks">
                <div className="flex space-x-3">
                  <BsBookmark size={18} />
                  <span className="inline">Bookmarks</span>
                </div>
              </NavLink>
              <ThemeSelector />
            </div>

            <button
              className="bg-[#1d9bf0] block absolute bottom-7 text-white rounded-full w-[90%] h-[38px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]"
              onClick={() => handleOpen()}
            >
              Tweet
            </button>
          </div>
        </Box>
      </Drawer>
    </>
  );
};

export default DrawerOnMobile;

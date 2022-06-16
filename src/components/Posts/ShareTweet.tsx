import { Menu, MenuItem, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { BsClipboard } from "react-icons/bs";
import { HiOutlineShare } from "react-icons/hi";
import { useClipboard } from "use-clipboard-copy";
import { RWebShare } from "react-web-share";
import { useDispatch } from "react-redux";
import { openAlert, severityAlert, messageAlert } from "../../store/AlertSlice";

function ShareTweet({ id }: any) {
  const clipboard = useClipboard();
  const dispatch = useDispatch();

  const handleCopy = React.useCallback(() => {
    const url = `http://localhost:3000/${id}`;
    clipboard.copy(url);
    dispatch(openAlert());
    dispatch(severityAlert("success"));
    dispatch(messageAlert("Copied to clipboard"));
  }, [clipboard, dispatch, id]);

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
    <>
      <div
        className="icon group"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Tooltip title="Share" className="icon group-hover:bg-pink-600/10">
          <button onClick={handleClick}>
            <HiOutlineShare className="h-5 group-hover:text-[#1d9bf0]" />
          </button>
        </Tooltip>
      </div>

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
        <MenuItem
          onClick={(e) => {
            handleCopy();
            e.stopPropagation();
            handleClose();
          }}
        >
          <div className="flex space-x-4 items-center text-gray-200">
            <BsClipboard size={18} className="text-gray-500" />
            <span>Copy link to Tweet</span>
          </div>
        </MenuItem>
        <MenuItem>
          <div className="flex space-x-4 items-center text-gray-200">
            <RWebShare
              data={{
                text: "Like humans, flamingos make friends for life",
                url: `https://on.natgeo.com/2zHaNup`,
                title: "Share this article on Flamingos",
              }}
            >
              <button className="flex space-x-4 items-center text-gray-200">
                <HiOutlineShare size={18} className="text-gray-500" />
                <span>Share via...</span>
              </button>
            </RWebShare>
          </div>
        </MenuItem>
      </Menu>
    </>
  );
}

export default React.memo(ShareTweet);

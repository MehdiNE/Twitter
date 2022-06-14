import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { BsClipboard } from "react-icons/bs";
import { HiOutlineShare } from "react-icons/hi";
import { useClipboard } from "use-clipboard-copy";
import { RWebShare } from "react-web-share";

function ShareTweet({ id }: any) {
  const clipboard = useClipboard();

  const handleCopy = React.useCallback(() => {
    const url = `http://localhost:3000/${id}`;
    clipboard.copy(url); // programmatically copying a value
  }, [clipboard, id]);

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
    <div>
      <button onClick={handleClick}>
        <HiOutlineShare className="h-5 group-hover:text-[#1d9bf0]" />
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
        <MenuItem onClick={handleCopy}>
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
              onClick={() => console.info("share successful!")}
            >
              <button className="flex space-x-4 items-center text-gray-200">
                <HiOutlineShare size={18} className="text-gray-500" />
                <span>Share via...</span>
              </button>
            </RWebShare>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ShareTweet;

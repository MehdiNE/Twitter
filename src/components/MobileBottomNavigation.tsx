import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { HiOutlineHome, HiOutlineMail } from "react-icons/hi";
import { BsBookmark, BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useRecoilState } from "recoil";
import { lightModeState, dimModeState } from "../atoms/modalAtom";

export default function MobileBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const [lightTheme, setLightTheme] = useRecoilState(lightModeState);
  const [dimTheme, setDimTheme] = useRecoilState(dimModeState);

  const navigate = useNavigate();

  const { currentUser } = useAuth();

  return (
    <Box>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          className={`dark:bg-black ${dimTheme ? "bg-black" : ""} ${
            lightTheme ? "bg-slate-100 text-black" : "text-white"
          }`}
          sx={{
            boxShadow: "0px 0px 7px 1px #7f7e7ec5",
            "& .MuiBottomNavigationAction-root, .Mui-selected, svg": {
              color: "inherit",
            },

            "& .Mui-selected, .Mui-selected > svg": {
              color: "inherit",
              fontWeight: "bold",
            },
          }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            color="white"
            icon={<HiOutlineHome size={22} />}
            onClick={() => navigate("/")}
          />
          <BottomNavigationAction
            label="Profile"
            icon={<BsPerson size={24} />}
            onClick={() => navigate(`/profile/${currentUser?.uid}`)}
          />
          <BottomNavigationAction
            label="Bookmarks"
            icon={<BsBookmark size={22} />}
            onClick={() => navigate("/bookmarks")}
          />
          <BottomNavigationAction
            label="Messages"
            icon={<HiOutlineMail size={24} />}
            onClick={() => navigate("/Messages")}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

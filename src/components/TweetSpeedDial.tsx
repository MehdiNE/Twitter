import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { FaFeatherAlt } from "react-icons/fa";
import { BsPenFill } from "react-icons/bs";
import { TweetOpenModal } from "../store/modalSlice";
import { useDispatch } from "react-redux";

const actions = [{ icon: <FaFeatherAlt />, name: "Copy" }];

export default function OpenIconSpeedDial() {
  const dispatch = useDispatch();

  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={
          <SpeedDialIcon
            openIcon={<BsPenFill className="text-center" size={24} />}
          />
        }
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => dispatch(TweetOpenModal())}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

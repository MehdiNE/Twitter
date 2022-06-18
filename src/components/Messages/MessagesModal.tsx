import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import CloseIcon from '@mui/icons-material/Close';
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { HiOutlineInbox, HiX } from "react-icons/hi";
import MessagesModalContent from "./MessagesModalContent";
import { BsMailbox } from "react-icons/bs";
import { useSelector } from "react-redux";
import { MdOutlineEmail } from "react-icons/md";
import { Box } from "@mui/system";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MessagesModal() {
  const [open, setOpen] = React.useState(false);
  const lightTheme = useSelector((state: any) => state.theme.lightModeState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        onClick={handleClickOpen}
        className={`${
          lightTheme ? "text-black" : "text-[#d9d9d9]"
        } flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation `}
      >
        <div className="flex space-x-3">
          <MdOutlineEmail className="h-7 w-7" />
          <span className="hidden xl:inline">Messages</span>
        </div>
      </div>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        className="MuiDialogContent-root"
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <HiX />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Choose who you want to chat
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <Box sx={{ bgcolor: "#15202b", minHeight: "100%" }}>
          <MessagesModalContent />
        </Box>
      </Dialog>
    </div>
  );
}

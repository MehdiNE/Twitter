import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { TweetCloseModal } from "../store/modalSlice";
import Input from "./Input";
import { HiX } from "react-icons/hi";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#1e2732",
  borderRadius: 4,
  boxShadow: 24,
  p: 2,
  border: "none",
  outline: "none",
  "@media (max-width:780px)": {
    width: "100%",
    height: "100%",
    borderRadius: "0",
  },
};

export default function TweetModal() {
  const open = useSelector((state: any) => state.modal.TweetShowModal);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(TweetCloseModal());
  //   const handleOpen = () => dispatch(TweetOpenModal());
  //   const [open, setOpen] = React.useState(false);
  {
    /* <Button onClick={handleOpen}>Open modal</Button> */
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center px-1.5">
            <div
              className="hoverAnimation flex items-center justify-center xl:px-0"
              onClick={() => handleClose()}
            >
              <HiX className="text-white" />
            </div>
          </div>
          <Input />
        </Box>
      </Modal>
    </div>
  );
}

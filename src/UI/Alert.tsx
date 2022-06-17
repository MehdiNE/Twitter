import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { allAlert } from "../store/AlertSlice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AlertComponent() {
  const open = useSelector((state: any) => state.alert.showAlert);
  const severity = useSelector((state: any) => state.alert.showSeverityAlert);
  const message = useSelector((state: any) => state.alert.showMessageAlert);
  const dispatch = useDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(
      allAlert({
        alertState: false,
      })
    );
  };
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%" }}
        className="mb-10 sm:mb-0"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AlertComponent;

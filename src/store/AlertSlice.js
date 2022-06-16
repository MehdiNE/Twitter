import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAlert: false,
  showSeverityAlert: "",
  showMessageAlert: "",
};

export const alertSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openAlert: (state) => {
      state.showAlert = true;
    },
    closeAlert: (state) => {
      state.showAlert = false;
    },
    severityAlert: (state, actions) => {
      state.showSeverityAlert = actions.payload;
    },
    messageAlert: (state, actions) => {
      state.showMessageAlert = actions.payload;
    },
  },
});
export const { openAlert, closeAlert, severityAlert, messageAlert } =
  alertSlice.actions;

export default alertSlice.reducer;

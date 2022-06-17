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
    allAlert: (state, actions) => {
      state.showAlert = actions.payload.alertState;
      state.showSeverityAlert = actions.payload.alertSeverity;
      state.showMessageAlert = actions.payload.alertMessage;
    },
  },
});
export const { allAlert } = alertSlice.actions;

export default alertSlice.reducer;

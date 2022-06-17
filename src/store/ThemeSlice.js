import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkModeState: true,
  lightModeState: false,
  dimModeState: false,
};

export const themeSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openAlert: (state) => {
      state.showAlert = true;
    },
    themeState: (state, actions) => {
      state.darkModeState = actions.payload.dark;
      state.lightModeState = actions.payload.light;
      state.dimModeState = actions.payload.dim;
    },
  },
});
export const { themeState } = themeSlice.actions;

export default themeSlice.reducer;

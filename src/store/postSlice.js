import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postIdState: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postState: (state, actions) => {
      state.postIdState = actions.payload;
    },
  },
});
export const { postState } = postSlice.actions;

export default postSlice.reducer;

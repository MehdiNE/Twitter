import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmarkState: {
    id: "",
    tag: "",
    text: "",
    timestamp: "",
    userImg: "",
    username: "",
    image: "",
    gif: "",
  },
};

export const bookmarksSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    bookmarkState: (state, actions) => {
      state.push(actions.payload);
    },
  },
});
export const { bookmarkState } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;

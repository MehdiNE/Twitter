import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import postReducer from "./postSlice";
import bookmarkReducer from "./BookmarksSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    post: postReducer,
    bookmark: bookmarkReducer,
  },
});

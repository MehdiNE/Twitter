import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import postReducer from "./postSlice";
import alertReducer from "./AlertSlice";
import themeReducer from "./ThemeSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    post: postReducer,
    alert: alertReducer,
    theme: themeReducer,
  },
});

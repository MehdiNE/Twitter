import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  profileShowModal: false,
  TweetShowModal: false,
  isDrawerOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.showModal = true;
    },
    closeModal: (state) => {
      state.showModal = false;
    },
    profileOpenModal: (state) => {
      state.profileShowModal = true;
    },
    profileCloseModal: (state) => {
      state.profileShowModal = false;
    },
    TweetOpenModal: (state) => {
      state.TweetShowModal = true;
    },
    TweetCloseModal: (state) => {
      state.TweetShowModal = false;
    },
    OpenDrawer: (state) => {
      state.isDrawerOpen = true;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
  },
});
export const {
  openModal,
  closeModal,
  profileOpenModal,
  profileCloseModal,
  TweetOpenModal,
  TweetCloseModal,
  OpenDrawer,
  closeDrawer,
} = modalSlice.actions;

export default modalSlice.reducer;

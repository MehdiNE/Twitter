import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const postIdState = atom({
  key: "postIdState",
  default: "",
});

export const profileModalState = atom({
  key: "profileModalState",
  default: false,
});

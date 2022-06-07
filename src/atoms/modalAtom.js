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

export const themeDialogState = atom({
  key: "themeDialogState",
  default: false,
});

export const darkModeState = atom({
  key: "darkModeState",
  default: true,
});
export const lightModeState = atom({
  key: "lightModeState",
  default: false,
});
export const dimModeState = atom({
  key: "dimModeState",
  default: false,
});

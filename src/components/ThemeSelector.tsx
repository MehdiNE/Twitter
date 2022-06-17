import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IoColorPaletteSharp } from "react-icons/io5";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import MediaQuery from "react-responsive";
import { BsBrush } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { themeState } from "../store/ThemeSlice";

export default function ThemeSelector() {
  const [open, setOpen] = useState(false);
  const lightTheme = useSelector((state: any) => state.theme.lightModeState);

  const dispatch = useDispatch();

  const [value, setValue] = useState("Lights out");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MediaQuery maxWidth={700}>
        <div className={`${lightTheme ? "text-black" : "text-white"} `}>
          <div className="flex space-x-3" onClick={handleClickOpen}>
            <BsBrush size={20} />
            <span className="inline">Display</span>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery minWidth={701}>
        <div
          className={`${
            lightTheme ? "text-black" : "text-[#d9d9d9]"
          } flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation `}
        >
          <div className="flex space-x-3" onClick={handleClickOpen}>
            <IoColorPaletteSharp className="h-7 w-7" />
            <span className="hidden xl:inline">Display</span>
          </div>
        </div>
      </MediaQuery>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ bgcolor: "#15202b", color: "white" }}>
          theme
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#15202b" }}>
          <DialogContentText sx={{ color: "gray", paddingTop: "10px" }}>
            Customize your view Manage your font size, color, and background.
            These settings affect all the Twitter accounts on this browser.
          </DialogContentText>
          <div className="flex justify-center items-center my-4">
            <FormControl>
              <FormLabel
                sx={{ color: "gray", paddingTop: "10px" }}
                id="demo-controlled-radio-buttons-group"
              >
                Background
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <DialogActions>
                  <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 space-y-4 sm:space-y-0 p-3 rounded-2xl text-white bg-[#1e2732]">
                    <div className="bg-black rounded-md p-2 w-36 h-14">
                      <FormControlLabel
                        value="Lights out"
                        control={
                          <Radio
                            sx={{ color: "gray" }}
                            onClick={() => {
                              dispatch(
                                themeState({
                                  dark: true,
                                  light: false,
                                  dim: false,
                                })
                              );
                            }}
                          />
                        }
                        label="Lights out"
                      />
                    </div>
                    <div className="bg-[#15202b] rounded-md p-2 w-36 h-14 border border-gray-700">
                      <FormControlLabel
                        value="Dim"
                        control={
                          <Radio
                            onClick={() => {
                              dispatch(
                                themeState({
                                  dark: false,
                                  light: false,
                                  dim: true,
                                })
                              );
                            }}
                          />
                        }
                        label="Dim"
                      />
                    </div>
                    <div className="bg-white rounded-md p-2 w-36 h-14 text-black">
                      <FormControlLabel
                        value="Default"
                        control={
                          <Radio
                            onClick={() => {
                              dispatch(
                                themeState({
                                  dark: false,
                                  light: true,
                                  dim: false,
                                })
                              );
                            }}
                          />
                        }
                        label="Default"
                      />
                    </div>
                  </div>
                </DialogActions>
              </RadioGroup>
            </FormControl>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

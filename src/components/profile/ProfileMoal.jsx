import React, { useMemo, useState, useRef } from "react";
import { Box, Fade, Modal, Backdrop, Avatar } from "@mui/material";
import countryList from "react-select-country-list";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { profileModalState } from "../../atoms/modalAtom";
import { useAuth } from "../../contexts/AuthContext";
import Select from "react-select";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { auth, db, storage } from "../../firebase/config";
import { updateProfile } from "firebase/auth";

function ProfileMoal({ userData }) {
  const { currentUser } = useAuth();
  const [name, setName] = useState(currentUser?.displayName);
  const [bio, setBio] = useState(userData[0]?.bio);
  const [website, setWebsite] = useState(userData[0]?.website);
  const [age, setAge] = useState(userData[0]?.age);
  const [loading, setLoading] = useState(false);

  // location
  const [value, setValue] = useState("");
  let options = useMemo(() => countryList().getData(), []);
  const changeHandler = (value) => {
    setValue(value);
  };

  //change avatar image
  const [avatar, setAvatar] = useState();
  const avatarFilePickerRef = useRef();

  const addAvatar = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setAvatar(readerEvent.target.result);
    };
  };

  //change header image
  const [header, setHeader] = useState();
  const headerFilePickerRef = useRef();

  const addHeader = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setHeader(readerEvent.target.result);
    };
  };

  //onSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const docRef = doc(db, "users", auth?.currentUser?.uid);
    const stringAge = age.toString();

    try {
      await updateDoc(docRef, {
        bio: bio,
        website: website,
        age: stringAge,
        location: value,
      });
      await updateProfile(currentUser, {
        displayName: name,
      });
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
    setIsOpen(false);
  };

  //modal
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useRecoilState(profileModalState);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setIsOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    "@media (max-width:780px)": {
      width: "100%",
      height: "100%",
      borderRadius: "0",
    },
    bgcolor: "#050527",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "20px",
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <div className="text-white flex justify-between p-3">
                <div className="space-x-10 flex">
                  <BsPlusLg
                    className="rotate-45 cursor-pointer mt-1.5"
                    onClick={handleClose}
                  />
                  <h3 className="text-xl">Edit profile</h3>
                </div>
                {loading && (
                  <button
                    type="submit"
                    disabled
                    className="bg-white text-black rounded-full px-4 py-1 font-bold shadow-md hover:bg-[#e1dfdf] disabled:opacity-50 disabled:cursor-default"
                  >
                    loading...
                  </button>
                )}
                {!loading && (
                  <button
                    type="submit"
                    className="bg-white text-black rounded-full px-4 py-1 font-bold shadow-md hover:bg-[#e1dfdf]"
                  >
                    Save
                  </button>
                )}
              </div>

              <div className="w-full h-44 relative">
                {header ? (
                  <img
                    src={header}
                    alt="banner"
                    className="w-full h-full object-cover brightness-90 block"
                  />
                ) : (
                  <img
                    src={userData[0]?.headerPic}
                    alt="banner"
                    className="w-full h-full object-cover brightness-90 block"
                  />
                )}

                <div
                  className="cursor-pointer absolute top-1/3 left-2/4 p-2 -ml-5 bg-[#4c4e4f] hover:bg-opacity-60 bg-opacity-80 rounded-full"
                  onClick={() => headerFilePickerRef.current.click()}
                >
                  <MdOutlineAddAPhoto color="white" size={24} />
                </div>
                <input
                  type="file"
                  ref={headerFilePickerRef}
                  hidden
                  onChange={addHeader}
                  multiple={false}
                />
              </div>

              {/* avatar */}
              <div className="relative w-[140px]">
                {avatar ? (
                  <Avatar
                    alt="Avatar"
                    src={avatar}
                    sx={{
                      width: "140px",
                      height: "140px",
                      border: "4px solid black",
                    }}
                    className="-mt-20 ml-4 brightness-75 block"
                  />
                ) : (
                  <Avatar
                    src={currentUser?.photoURL}
                    sx={{
                      width: "140px",
                      height: "140px",
                      border: "4px solid black",
                    }}
                    alt={currentUser?.displayName}
                    className="-mt-20 ml-4 brightness-75 block"
                  />
                )}

                <div
                  className="cursor-pointer absolute top-1/3 left-2/4 p-2 -ml-1 bg-[#4c4e4f] hover:bg-opacity-60 bg-opacity-80 rounded-full"
                  onClick={() => avatarFilePickerRef.current.click()}
                >
                  <MdOutlineAddAPhoto color="white" size={24} />
                </div>
                <input
                  type="file"
                  ref={avatarFilePickerRef}
                  hidden
                  onChange={addAvatar}
                  multiple={false}
                />
              </div>

              <div className="w-full flex justify-center items-center flex-col space-y-4 pb-7">
                <div className="w-[90%]">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    User Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="base-input"
                    className="w-full bg-[#050527] border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div className="w-[90%]">
                  <label
                    htmlFor="large-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    bio
                  </label>
                  <input
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    type="text"
                    id="large-input"
                    className="w-full bg-[#050527] border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div className="w-[90%] ">
                  <div className="w-full flex space-x-7">
                    <div className="w-1/2">
                      <label
                        htmlFor="base-input"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Age
                      </label>
                      <input
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        type="number"
                        id="base-input"
                        min={10}
                        max={100}
                        className="w-full bg-[#050527] border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <div className="w-1/2">
                      <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        location
                      </span>
                      <Select
                        options={options}
                        value={value}
                        onChange={changeHandler}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-[90%]">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Website
                  </label>
                  <input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    type="text"
                    id="base-input"
                    placeholder="Example: https://www.youtube.com"
                    className="w-full bg-[#050527] border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ProfileMoal;

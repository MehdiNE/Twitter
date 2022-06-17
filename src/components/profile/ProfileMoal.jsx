import { useMemo, useState, useRef } from "react";
import { Box, Fade, Modal, Backdrop, Avatar } from "@mui/material";
import countryList from "react-select-country-list";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { BsClipboard, BsPlusLg } from "react-icons/bs";
import { useAuth } from "../../contexts/AuthContext";
import Select from "react-select";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase/config";
import { updateProfile } from "firebase/auth";
import Compressor from "compressorjs";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { allAlert } from "../../store/AlertSlice";

//redux
import { useSelector, useDispatch } from "react-redux";
import { profileCloseModal } from "../../store/modalSlice";

function ProfileMoal({ userData }) {
  const { currentUser } = useAuth();
  const [name, setName] = useState(currentUser?.displayName);
  const [bio, setBio] = useState(userData[0]?.bio);
  const [website, setWebsite] = useState(userData[0]?.website);
  const [age, setAge] = useState(userData[0]?.age);
  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState(null);
  const [headerSrc, setHeaderSrc] = useState("");

  //redux
  const modal = useSelector((state) => state.modal.profileShowModal);
  const dispatch = useDispatch();

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
  function showPreview(event) {
    const file = event.target.files[0];

    if (file) {
      setHeader(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setHeaderSrc(reader.result);
      };
    }
  }

  //onSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const docRef = doc(db, "users", auth?.currentUser?.uid);
    const stringAge = age.toString();

    if (avatar) {
      const avatarRef = ref(storage, `avatars/${currentUser?.uid}/image`);
      await uploadString(avatarRef, avatar, "data_url");
      const avatarDownloadURL = await getDownloadURL(avatarRef);
      updateDoc(docRef, {
        avatar: avatarDownloadURL,
      });
      await updateProfile(currentUser, {
        displayName: name,
        photoURL: avatarDownloadURL,
      });
    }

    if (header) {
      new Compressor(header, {
        quality: 0.7,
        async success(result) {
          setHeaderSrc("");
          setHeader(null);
          const headerRef = ref(storage, `headers/${userData[0]?.id}/image`);
          uploadBytesResumable(headerRef, result).then(() => {
            getDownloadURL(headerRef).then((downloadURL) => {
              updateDoc(docRef, {
                headerPic: downloadURL,
              });
            });
          });
        },
      });
    }

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
    } catch (err) {}

    setLoading(false);
    dispatch(profileCloseModal());

    dispatch(
      allAlert({
        alertState: true,
        alertSeverity: "success",
        alertMessage: "changes are successfully applied",
      })
    );

    // window.location.reload(true);
  };

  //modal
  const handleClose = () => dispatch(profileCloseModal());

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
        keepMounted
        open={modal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modal}>
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <div className="text-[#d9d9d9] flex justify-between p-3">
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
                    src={headerSrc}
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

                <div className="cursor-pointer absolute top-1/3 left-2/4 p-2 -ml-5 bg-[#4c4e4f] hover:bg-opacity-60 bg-opacity-80 rounded-full">
                  <label
                    style={{ cursor: "pointer", height: 24 }}
                    htmlFor="image"
                  >
                    <MdOutlineAddAPhoto color="white" size={24} />
                  </label>
                </div>
                <input
                  id="image"
                  style={{ display: "none" }}
                  accept="image/*"
                  type="file"
                  multiple={false}
                  onChange={showPreview}
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
                  accept="image/*"
                  onChange={addAvatar}
                  multiple={false}
                />
              </div>

              <div className="w-full flex justify-center items-center flex-col space-y-4 pb-7 text-[#d9d9d9]">
                <div className="w-[90%]">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium"
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
                    className="block mb-2 text-sm font-medium"
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
                        className="block mb-2 text-sm font-medium"
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
                      <span className="block mb-2 text-sm font-medium">
                        location
                      </span>
                      <Select
                        className="text-black"
                        options={options}
                        defaultInputValue={userData[0]?.location?.label}
                        value={value}
                        onChange={changeHandler}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-[90%]">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium"
                  >
                    Website
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                      <button
                        type="button"
                        className="p-1"
                        onClick={() => {
                          setWebsite("https://www.youtube.com");
                        }}
                      >
                        <BsClipboard color="white" />
                      </button>
                    </span>
                    <input
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      type="url"
                      pattern="https://.*"
                      id="base-input"
                      placeholder="Example: https://www.youtube.com"
                      className="w-full py-2 pl-10 bg-[#050527] border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
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
// const [header, setHeader] = useState();
// const headerFilePickerRef = useRef();

// const addHeader = (e) => {
//   const reader = new FileReader();
//   if (e.target.files[0]) {
//     reader.readAsDataURL(e.target.files[0]);
//   }

//   reader.onload = (readerEvent) => {
//     setHeader(readerEvent.target.result);
//   };
// };

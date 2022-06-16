import React, { useRef, useState } from "react";
import {
  HiOutlineCalendar,
  HiOutlineChartSquareBar,
  HiOutlineEmojiHappy,
  HiOutlinePhotograph,
  HiX,
} from "react-icons/hi";
import { AiOutlineFileGif } from "react-icons/ai";

import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useAuth } from "../contexts/AuthContext";
import { Avatar } from "@mui/material";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useTag } from "../hooks/useTag";
import { useDispatch } from "react-redux";
import { TweetCloseModal } from "../store/modalSlice";
const ReactGiphySearchbox = require("react-giphy-searchbox").default;

interface Props {
  lightTheme?: boolean;
}

const Input = React.memo(({ lightTheme }: Props) => {
  const [input, setInput] = useState("");
  const [emojis, setEmojis] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [gifUrl, setGifUrl] = useState("");

  //Tweet modal
  const dispatch = useDispatch();
  const handleClose = () => dispatch(TweetCloseModal());

  const { currentUser } = useAuth();

  // Gif
  const handleGif = (item: any) => {
    setShowGif(false);
    setGifUrl(item?.images?.original?.url);
  };

  const { userTag } = useTag(currentUser?.displayName);

  // image
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef<any>(null);

  const addImage = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent: any) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  // tweet
  const tweet = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      id: currentUser?.uid,
      username: currentUser?.displayName,
      userImg: currentUser?.photoURL,
      tag: userTag,
      text: input,
      timestamp: serverTimestamp(),
      gif: "",
      image: "",
      bookmarkedBy: [],
    });

    const imgRef = ref(storage, `posts/${docRef.id}/image`);

    if (gifUrl) {
      await updateDoc(doc(db, "posts", docRef.id), {
        gif: gifUrl,
      });
    }

    if (selectedFile) {
      await uploadString(imgRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imgRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    handleClose();
    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setEmojis(false);
    setShowGif(false);
    setGifUrl("");
  };

  const addEmoji = (e: any) => {
    let sym = e.unified.split("-");
    let codesArray: any = [];
    sym.forEach((el: any) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  return (
    <div
      className={`border-b-2 p-3 flex space-x-3 ${
        lightTheme
          ? "border-gray-200 text-black"
          : "border-gray-700 text-[#d9d9d9]"
      } ${loading && "opacity-60"}`}
    >
      <Avatar
        src={currentUser?.photoURL}
        alt={currentUser?.displayName}
        sx={{ width: 50, height: 50 }}
      />
      <div className="w-full">
        <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's happening?"
            maxLength={300}
            className="bg-transparent outline-none text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px] max-h-36"
          />

          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <HiX className="text-white h-5" />
              </div>
              <img
                src={selectedFile}
                alt="selected file"
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}

          {gifUrl && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setGifUrl("")}
              >
                <HiX className="text-white h-5" />
              </div>
              <img
                src={gifUrl}
                alt="gif url"
                className="rounded-2xl max-h-52 object-contain w-full"
              />
            </div>
          )}
        </div>
        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              {!gifUrl ? (
                <div
                  className="icon"
                  onClick={() => filePickerRef.current.click()}
                >
                  <HiOutlinePhotograph className="text-[#1d9bf0] h-[22px]" />
                  <input
                    type="file"
                    ref={filePickerRef}
                    hidden
                    onChange={addImage}
                    accept="image/*"
                  />
                </div>
              ) : (
                <div className="icon">
                  <HiOutlinePhotograph className="text-[#1d9bf0] h-[22px] opacity-50" />
                </div>
              )}

              <div className="icon rotate-90">
                <HiOutlineChartSquareBar className="text-[#1d9bf0] h-[22px]" />
              </div>

              <div className="icon">
                <HiOutlineEmojiHappy
                  className="text-[#1d9bf0] h-[22px]"
                  onClick={() => {
                    setEmojis(!emojis);
                  }}
                />
              </div>
              {!selectedFile ? (
                <div className="icon z-10">
                  <AiOutlineFileGif
                    className="text-[#1d9bf0] h-[22px]"
                    onClick={() => setShowGif(!showGif)}
                  />
                </div>
              ) : (
                <div className="icon z-10">
                  <AiOutlineFileGif className="text-[#1d9bf0] h-[22px] opacity-50" />
                </div>
              )}

              <div className="icon">
                <HiOutlineCalendar className="text-[#1d9bf0] h-[22px]" />
              </div>
            </div>

            {showGif && (
              <div className="absolute max-w-[350px] mt-[420px] bg-slate-900">
                <ReactGiphySearchbox
                  apiKey="zYxWVMtHZEx8nqPaHVffEXO63nRqgaJi"
                  onSelect={handleGif}
                />
              </div>
            )}

            {emojis && (
              <Picker
                onSelect={addEmoji}
                style={{
                  position: "absolute",
                  marginTop: "465px",
                  marginLeft: -40,
                  maxWidth: "320px",
                  borderRadius: "20px",
                  zIndex: 10,
                }}
                theme="dark"
              />
            )}

            <button
              className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
              disabled={!input.trim() && !selectedFile && !gifUrl}
              onClick={tweet}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default Input;

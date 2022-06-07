import { useEffect, useRef, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useAuth } from "../contexts/AuthContext";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import {
  onSnapshot,
  doc,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { db, storage } from "../firebase/config";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineChartSquareBar,
  HiOutlineEmojiHappy,
  HiOutlinePhotograph,
  HiX,
} from "react-icons/hi";
import { Avatar } from "@mui/material";
import { AiOutlineFileGif } from "react-icons/ai";
import { Picker } from "emoji-mart";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useTag } from "../hooks/useTag";
const ReactGiphySearchbox = require("react-giphy-searchbox").default;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  border: "none",
  outline: "none",
};

export default function TransitionsModal() {
  const [showGif, setShowGif] = useState(false);
  const [gifUrl, setGifUrl] = useState("");
  const [emojis, setEmojis] = useState(false);
  const [post, setPost] = useState<any>();
  const [comment, setComment] = useState("");

  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  const handleClose = () => setIsOpen(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

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

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", postId), (snapshot: any) => {
        setPost(snapshot.data());
      }),
    [postId]
  );

  const handleGif = (item: any) => {
    setShowGif(false);
    setGifUrl(item?.images?.original?.url);
  };

  const { userTag } = useTag(currentUser?.displayName);

  const sendComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const res = await addDoc(collection(db, "posts", postId, "comments"), {
      id: currentUser?.uid,
      comment: comment,
      username: currentUser?.displayName,
      userImg: currentUser?.photoURL,
      tag: userTag,
      gif: gifUrl,
      timestamp: serverTimestamp(),
    });

    const imgRef = ref(storage, `posts/comments/${res.id}/image`);

    if (selectedFile) {
      await uploadString(imgRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imgRef);
        await updateDoc(doc(db, "posts", postId, "comments", res.id), {
          image: downloadURL,
        });
      });
    }

    setIsOpen(false);
    setComment("");
    setSelectedFile(null);
    setEmojis(false);
    setShowGif(false);
    setGifUrl("");

    navigate(`/${postId}`);
  };

  const addEmoji = (e: any) => {
    let sym = e.unified.split("-");
    let codesArray: any = [];
    sym.forEach((el: any) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setComment(comment + emoji);
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
        sx={{
          backdropFilter: "blur(1px)",
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <div className="inline-block align-bottom bg-slate-900 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              <div className="flex items-center px-1.5 py-2">
                <div
                  className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                  onClick={() => setIsOpen(false)}
                >
                  <HiX className="h-[22px] text-white" />
                </div>
              </div>
              <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                <div className="w-full">
                  <div className="text-[#6e767d] flex gap-x-3 relative">
                    <span className="w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-600" />
                    <Avatar
                      src={post?.userImg}
                      alt={post?.displayName}
                      className="h-11 w-11"
                    />
                    <div>
                      <div className="inline-block group">
                        <h4 className="font-bold text-[#d9d9d9] inline-block text-[15px] sm:text-base">
                          {post?.username}
                        </h4>
                        <span className="ml-1.5 text-sm sm:text-[15px]">
                          @{post?.tag}{" "}
                        </span>
                      </div>{" "}
                      ·{" "}
                      <span className="hover:underline text-sm sm:text-[15px]">
                        <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                      </span>
                      <p className="text-[#d9d9d9] text-[15px] sm:text-base">
                        {post?.text}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 flex space-x-3 w-full">
                    <Avatar
                      src={currentUser?.photoURL}
                      alt={currentUser?.displayName}
                      className="h-11 w-11"
                    />
                    <div className="flex-grow mt-2">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tweet your reply"
                        rows={2}
                        className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[80px] max-h-[120px]"
                        maxLength={180}
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

                          {showGif && (
                            <div className="absolute top-0 right-0 max-w-[350px] bg-slate-900">
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
                                position: "relative",
                                // marginTop: "465px",
                                // marginLeft: -40,
                                maxWidth: "320px",
                                borderRadius: "20px",
                                zIndex: 10,
                              }}
                              theme="dark"
                            />
                          )}
                        </div>
                        <button
                          className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                          type="submit"
                          onClick={sendComment}
                          disabled={!comment.trim() && !selectedFile && !gifUrl}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

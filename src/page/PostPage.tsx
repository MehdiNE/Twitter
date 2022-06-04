import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import TransitionsModal from "../components/ModalPage";
import { useAuth } from "../contexts/AuthContext";
import Comment from "../components/Comment";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useParams, useNavigate } from "react-router-dom";
import Post from "../components/Post";
import { BsArrow90DegLeft, BsArrowLeft } from "react-icons/bs";

function PostPage() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const { currentUser } = useAuth();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  let { id }: any = useParams();
  console.log(id);

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", id), (snapshot: any) => {
        setPost(snapshot.data());
      }),
    [db]
  );

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot: any) => setComments(snapshot.docs)
      ),
    [id]
  );

  return (
    <div>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
          <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
            <div
              className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
              onClick={() => navigate("/")}
            >
              <BsArrowLeft size={18} className="h-5 text-white" />
            </div>
            Tweet
          </div>

          <Post id={id} post={post} postPage />
          {comments.length > 0 && (
            <div className="pb-72">
              {comments.map((comment: any) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  comment={comment.data()}
                />
              ))}
            </div>
          )}
        </div>
        {/* <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        /> */}

        {isOpen && <TransitionsModal />}
      </main>
    </div>
  );
}

export default PostPage;

// // import React, { useEffect } from "react";
// // import Feed from "../components/Feed";
// // import Sidebar from "../components/Sidebar";
// // // import Modal from "../components/Modal";
// // import { modalState } from "../atoms/modalAtom";
// // import { useRecoilState } from "recoil";
// // import TransitionsModal from "../components/Modal";

// // function Home() {
// //   const [isOpen, setIsOpen] = useRecoilState(modalState);

// //   useEffect(() => {
// //     document.title = "Home | Twitter By Mahdi";
// //   }, []);

// //   return (
// //     <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
// //       <Sidebar />
// //       <Feed />
// //       {isOpen && <TransitionsModal />}
// //     </main>
// //   );
// // }

// // export default Home;

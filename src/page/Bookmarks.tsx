import {
  onSnapshot,
  collection,
  orderBy,
  query,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  bookmarkState,
  dimModeState,
  lightModeState,
} from "../atoms/modalAtom";
import Post from "../components/Post";
import RightSidebar from "../components/right sidebar/RightSidebar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase/config";
import BookmarksPost from "../components/BookmarksPots";

function Bookmarks() {
  const [dimTheme, setDimTheme] = useRecoilState(dimModeState);
  const [lightTheme, setLightTheme] = useRecoilState(lightModeState);
  const [bookmarks, setBookmarks] = useState([]);
  console.log(
    "🚀 ~ file: Bookmarks.tsx ~ line 25 ~ Bookmarks ~ bookmarks",
    bookmarks
  );

  const { currentUser } = useAuth();
  const [bookmarkId, setBookmarkId] = useRecoilState(bookmarkState);

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     query(collection(db, "posts"), orderBy("timestamp", "desc")),
  //     (snapshot) => {
  //       setPosts(snapshot?.docs);
  //     }
  //   );

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    const ref = collection(db, "posts", bookmarkId, "bookmarks");

    getDocs(ref).then((snapshot) => {
      let result: any = [];
      snapshot.docs.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      setBookmarks(result);
    });
  }, [bookmarkId]);

  // useEffect(() => {
  //   onSnapshot(
  //     collection(db, "posts", bookmarkId, "bookmarks"),
  //     (snapshot: any) => setBookmarks(snapshot?.docs)
  //   );
  // }, [bookmarkId]);

  // useEffect(() => {
  //   onSnapshot(
  //     collection(db, "posts", bookmarkId, "bookmarks"),
  //     (snapshot: any) => {
  //       setBookmarks(snapshot?.docs);
  //     }
  //   );
  // }, [bookmarkId, currentUser?.uid]);
  return (
    <main
      className={`dark:bg-black min-w-full min-h-screen flex max-w-[1500px] mx-auto ${
        lightTheme && "bg-white"
      } ${dimTheme && "bg-[#15202b]"}`}
    >
      <Sidebar />
      <div
        className={`flex-grow border-l border-r max-w-2xl sm:ml-[73px] xl:ml-[370px] ${
          lightTheme ? "border-gray-200" : "border-gray-700"
        }`}
      >
        <div
          className={`flex items-center border-b sm:justify-between py-2 px-3 sticky top-0 z-50 backdrop-blur-md dark:bg-black/80 ${
            lightTheme
              ? "text-black bg-slate-50/80 border-gray-200"
              : "border-gray-700 text-[#d9d9d9]"
          } ${dimTheme && "bg-[#15202b] bg-opacity-80"}`}
        >
          <div className="text-xl font-bold leading-tight">
            <h3>Bookmarks</h3>
            <p className="inline-block ml-1 align-text-bottom text-sm text-gray-500">
              @{currentUser?.displayName}
            </p>
          </div>
        </div>
        <BookmarksPost bookmarks={bookmarks[0]} />
        {/* {bookmarks.map((post: any) => (
          <BookmarksPost post={post.data()} key={post.id} id={post.id} />
        ))} */}
        {/* <div className="pb-72">
          {bookmarks.map((post: any) => (
            <Post post={post.data()} key={post.id} id={post.id} />
          ))}
        </div> */}
      </div>
      <RightSidebar />
    </main>
  );
}

export default Bookmarks;

import Feed from "../components/Feed";
import { dimModeState, lightModeState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import useTitle from "../hooks/useTitle";
// import MessagesDrawer from "../components/Messages/MessagesDrawer";
import { useSelector } from "react-redux";
import MediaQuery from "react-responsive";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";

import TweetSpeedDial from "../components/TweetSpeedDial";
import DrawerOnMobile from "../components/DrawerOnMobile";
import TransitionsModal from "../components/ModalPage";
import RightSidebar from "../components/right sidebar/RightSidebar";
import Sidebar from "../components/sidebar/Sidebar";

function Home() {
  const modal = useSelector((state: any) => state.modal.showModal);

  const [posts, setPosts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const [lightTheme, setLightTheme] = useRecoilState(lightModeState);
  const [dimTheme, setDimTheme] = useRecoilState(dimModeState);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot?.docs);
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        console.log(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useTitle("Home | Twitter By Mahdi");

  return (
    <main
      className={`dark:bg-black min-w-full min-h-screen flex max-w-[1500px] mx-auto ${
        lightTheme && "bg-white"
      } ${dimTheme && "bg-[#15202b]"}`}
    >
      <Sidebar />
      <Feed
        lightTheme={lightTheme}
        dimTheme={dimTheme}
        posts={posts}
        isLoading={isLoading}
        error={error}
      />
      <RightSidebar />

      {modal && <TransitionsModal />}

      <div className="fixed right-0 bottom-0">
        <MediaQuery maxWidth={700}>
          <TweetSpeedDial />
        </MediaQuery>
      </div>
      <DrawerOnMobile lightTheme={lightTheme} />
    </main>
  );
}

export default Home;

// const TweetSpeedDial = React.lazy(() => import("../components/TweetSpeedDial"));
// const DrawerOnMobile = React.lazy(() => import("../components/DrawerOnMobile"));
// const TransitionsModal = React.lazy(() => import("../components/ModalPage"));
// const RightSidebar = React.lazy(
//   () => import("../components/right sidebar/RightSidebar")
// );
// const Sidebar = React.lazy(() => import("../components/sidebar/Sidebar"));

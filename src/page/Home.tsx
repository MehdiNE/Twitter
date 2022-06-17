import useTitle from "../hooks/useTitle";
import { useSelector } from "react-redux";
import MediaQuery from "react-responsive";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import React, { Suspense, useEffect, useState } from "react";
import { db } from "../firebase/config";
import Sidebar from "../components/sidebar/Sidebar";

const Feed = React.lazy(() => import("../components/Feed"));
const DrawerOnMobile = React.lazy(() => import("../components/DrawerOnMobile"));
const TransitionsModal = React.lazy(() => import("../components/ModalPage"));
const TweetSpeedDial = React.lazy(() => import("../components/TweetSpeedDial"));
const RightSidebar = React.lazy(
  () => import("../components/right sidebar/RightSidebar")
);

function Home() {
  const [posts, setPosts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const modal = useSelector((state: any) => state.modal.showModal);
  const lightTheme = useSelector((state: any) => state.theme.lightModeState);
  const dimTheme = useSelector((state: any) => state.theme.dimModeState);

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
      <Suspense fallback={<p>Loading...</p>}>
        <Feed
          lightTheme={lightTheme}
          dimTheme={dimTheme}
          posts={posts}
          isLoading={isLoading}
          error={error}
        />
      </Suspense>

      <Suspense fallback={<p>Loading...</p>}>
        <RightSidebar />
      </Suspense>

      {modal && (
        <Suspense fallback={<p>Loading...</p>}>
          <TransitionsModal />
        </Suspense>
      )}

      <div className="fixed right-0 bottom-0">
        <MediaQuery maxWidth={700}>
          <Suspense fallback={<p>Loading...</p>}>
            <TweetSpeedDial />
          </Suspense>
        </MediaQuery>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <DrawerOnMobile lightTheme={lightTheme} />
      </Suspense>
    </main>
  );
}

export default Home;

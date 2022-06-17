import React, { Suspense, useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Sidebar from "../components/sidebar/Sidebar";
import { db } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileMoal from "../components/profile/ProfileMoal";

const RightSidebar = React.lazy(
  () => import("../components/right sidebar/RightSidebar")
);
const ProfileFeed = React.lazy(
  () => import("../components/profile/ProfileFeed")
);

function Profile() {
  const [posts, setPosts] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const modal = useSelector((state: any) => state.modal.profileShowModal);
  const lightTheme = useSelector((state: any) => state.theme.lightModeState);
  const dimTheme = useSelector((state: any) => state.theme.dimModeState);

  let { id }: any = useParams();

  const userData = users.map((data: any) => data.data());

  //get current user posts
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        orderBy("timestamp", "desc"),
        where("id", "==", id)
      ),
      (snapshot) => {
        setPosts(snapshot?.docs);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [currentUser.uid, id]);

  //get current user data
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      query(collection(db, "users"), where("id", "==", id)),
      (snapshot) => {
        setUsers(snapshot?.docs);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [id]);

  return (
    <main
      className={`dark:bg-black  min-w-full min-h-screen flex max-w-[1500px] mx-auto ${
        dimTheme && "bg-[#15202b]"
      } ${lightTheme && "bg-white text-black"}`}
    >
      <Sidebar />

      <Suspense fallback={<></>}>
        <ProfileFeed
          userData={userData}
          posts={posts}
          loading={loading}
          currentUser={currentUser}
          dimTheme={dimTheme}
          lightTheme={lightTheme}
        />
      </Suspense>

      <Suspense fallback={<></>}>
        <RightSidebar />
      </Suspense>

      {modal && <ProfileMoal userData={userData} />}
    </main>
  );
}

export default React.memo(Profile);

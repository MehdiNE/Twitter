import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { dimModeState, lightModeState } from "../atoms/modalAtom";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import ProfileFeed from "../components/profile/ProfileFeed";
import ProfileMoal from "../components/profile/ProfileMoal";
import Sidebar from "../components/sidebar/Sidebar";
import { db } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import RightSidebar from "../components/right sidebar/RightSidebar";
import { useSelector } from "react-redux";

function Profile() {
  const [posts, setPosts] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const modal = useSelector((state: any) => state.modal.profileShowModal);
  const { currentUser } = useAuth();
  const [dimTheme, setDimTheme] = useRecoilState(dimModeState);
  const [lightTheme, setLightTheme] = useRecoilState(lightModeState);
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
  }, [currentUser.uid, id]);

  return (
    <main
      className={`dark:bg-black  min-w-full min-h-screen flex max-w-[1500px] mx-auto ${
        dimTheme && "bg-[#15202b]"
      } ${lightTheme && "bg-white text-black"}`}
    >
      <Sidebar />
      <ProfileFeed
        userData={userData}
        posts={posts}
        loading={loading}
        currentUser={currentUser}
        dimTheme={dimTheme}
        lightTheme={lightTheme}
      />
      <RightSidebar />

      {modal && <ProfileMoal userData={userData} />}
    </main>
  );
}

export default Profile;

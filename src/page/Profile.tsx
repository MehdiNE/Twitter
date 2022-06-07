import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { profileModalState } from "../atoms/modalAtom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import ProfileFeed from "../components/profile/ProfileFeed";
import ProfileMoal from "../components/profile/ProfileMoal";
import Sidebar from "../components/Sidebar";
import { db } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import RightSidebar from "../components/right sidebar/RightSidebar";

function Profile() {
  const [posts, setPosts] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen] = useRecoilState(profileModalState);
  const { currentUser } = useAuth();
  let { id }: any = useParams();

  const userData = users.map((data: any) => data.data());

  //get current user posts
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), where("id", "==", id)),
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
    <main className="dark:bg-black bg-white min-w-full min-h-screen flex max-w-[1500px] mx-auto">
      <Sidebar />
      <ProfileFeed
        userData={userData}
        posts={posts}
        loading={loading}
        currentUser={currentUser}
      />
      <RightSidebar />

      {isOpen && <ProfileMoal userData={userData} />}
    </main>
  );
}

export default Profile;

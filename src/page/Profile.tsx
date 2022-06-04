import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { profileModalState } from "../atoms/modalAtom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import ProfileFeed from "../components/profile/ProfileFeed";
import ProfileMoal from "../components/profile/ProfileMoal";
import Sidebar from "../components/Sidebar";
import { db } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";

function Profile() {
  const [posts, setPosts] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useRecoilState(profileModalState);
  const { currentUser } = useAuth();

  const userData = users.map((data: any) => data.data());

  //get current user posts
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), where("id", "==", currentUser.uid)),
      (snapshot) => {
        setPosts(snapshot?.docs);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [currentUser.uid]);

  //get current user data
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      query(collection(db, "users"), where("id", "==", currentUser?.uid)),
      (snapshot) => {
        setUsers(snapshot?.docs);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [currentUser?.uid]);

  return (
    <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
      <Sidebar />

      <ProfileFeed
        userData={userData}
        posts={posts}
        loading={loading}
        currentUser={currentUser}
      />

      {isOpen && <ProfileMoal userData={userData} />}
    </main>
  );
}

export default Profile;

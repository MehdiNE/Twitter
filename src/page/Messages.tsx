import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MessagesFeed from "../components/Messages/MessagesFeed";
import Sidebar from "../components/sidebar/Sidebar";
import { db } from "../firebase/config";

function Messages() {
  const [users, setUsers] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const lightTheme = useSelector((state: any) => state.theme.lightModeState);
  const dimTheme = useSelector((state: any) => state.theme.dimModeState);

  useEffect(() => {
    setIsLoading(true);
    let ref = collection(db, "users");

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      let results: any = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setUsers(results);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div
      className={`dark:bg-black  min-w-full min-h-screen flex max-w-[1500px] mx-auto ${
        dimTheme && "bg-[#15202b]"
      } ${lightTheme && "bg-white"}`}
    >
      <Sidebar />
      <MessagesFeed users={users} lightTheme={lightTheme} dimTheme={dimTheme} />
    </div>
  );
}

export default Messages;

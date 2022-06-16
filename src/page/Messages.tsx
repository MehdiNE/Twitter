import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { dimModeState, lightModeState } from "../atoms/modalAtom";
import MessagesFeed from "../components/Messages/MessagesFeed";
import Sidebar from "../components/sidebar/Sidebar";
import { db } from "../firebase/config";

function Messages() {
  const [users, setUsers] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [dimTheme, setDimTheme] = useRecoilState(dimModeState);
  const [lightTheme, setLightTheme] = useRecoilState(lightModeState);

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

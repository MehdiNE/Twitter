import { Avatar } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase/config";

function MessagesModalContent() {
  const [users, setUsers] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

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
    <div>
      {users?.map((result: any, index: any) => (
        <div
          className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-4 cursor-pointer transition duration-200 ease-out flex items-center"
          key={index}
          onClick={() => {
            navigate(`/messages/${currentUser?.uid}-${result?.id}`);
          }}
        >
          <Avatar src={result.avatar} alt={result.displayName} />
          <div className="ml-4 leading-5 group">
            <h4 className="font-bold group-hover:underline text-white">
              {result.displayName}
            </h4>
            <h5 className="text-gray-400 text-[15px]">
              @{result?.displayName?.split(" ")?.join("")?.toLocaleLowerCase()}
            </h5>
          </div>
          <button className="ml-auto rounded-full font-bold text-sm py-1.5 px-3.5 bg-white text-black">
            message
          </button>
        </div>
      ))}
    </div>
  );
}

export default MessagesModalContent;

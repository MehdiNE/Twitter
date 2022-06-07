import { onSnapshot, query, collection, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useGetUser = () => {
  const [users, setUsers] = useState<any>([]);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const userData = users.map((data: any) => data.data());

  const GetUser = async (x: any) => {
    useEffect(() => {
      setIsLoadingUser(true);
      const unsubscribe = onSnapshot(
        query(collection(db, "users"), where("id", "==", x)),
        (snapshot) => {
          setUsers(snapshot?.docs);
          setIsLoadingUser(false);
        }
      );

      return () => {
        unsubscribe();
      };
    }, [x]);

    useEffect(() => {
      document.title = "Home | Twitter By Mahdi";
    }, []);
  };

  return { GetUser, isLoadingUser, userData };
};

import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (email, password, displayName, avatar) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      const imgRef = await ref(storage, `avatars/${res?.user?.uid}/image`);

      await uploadString(imgRef, avatar, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imgRef);
        await updateProfile(res?.user, {
          displayName: displayName,
          photoURL: downloadURL,
        });
      });

      const data = {
        id: res?.user?.uid,
        displayName,
        headerPic:
          "https://i.ibb.co/G0kgYMd/Brown-Aesthetic-Quotes-Twitter-Header-1.png",
        bio: "this user has not created bio yet",
        age: "not selected",
        location: "not selected",
        website: "not selected",
        verified: false,
      };
      await setDoc(doc(db, "users", res?.user?.uid), data);

      navigate("/");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return { signup, error, isLoading };
};

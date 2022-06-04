import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/config";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setError(null);
    setIsLoading(true);

    try {
      // sign the user out
      await signOut(auth);
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return { logout, error, isLoading };
};

export default useLogout;

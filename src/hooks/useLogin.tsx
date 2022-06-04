import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

interface Props {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async ({ email, password }: Props) => {
    setError(null);
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (!isCancelled) {
        setIsLoading(false);
        setError(null);
      }
      navigate("/");
    } catch (err: any) {
      if (!isCancelled) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, isLoading, error };
};

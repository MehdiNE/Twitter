import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useState, useEffect } from "react";
import Splash from "../components/Splash";
import { auth } from "../firebase/config";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return <Splash />;

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// function signup(email, password) {
//   return createUserWithEmailAndPassword(auth, email, password);
// }

// function login(email, password) {
//   return signInWithEmailAndPassword(auth, email, password);
// }

// function logout() {
//   return signOut(auth);
// }

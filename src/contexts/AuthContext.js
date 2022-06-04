import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
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

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

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
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
// import { createContext, useReducer, useEffect } from "react";
// import { projectAuth } from "../firebase/config";

// export const AuthContext = createContext();

// export const authReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       return { ...state, user: action.payload };
//     case "LOGOUT":
//       return { ...state, user: null };
//     case "AUTH_IS_READY":
//       return { user: action.payload, authIsReady: true };
//     default:
//       return state;
//   }
// };

// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     user: null,
//     authIsReady: false,
//   });

//   useEffect(() => {
//     const unsub = projectAuth.onAuthStateChanged((user) => {
//       dispatch({ type: "AUTH_IS_READY", payload: user });
//       unsub();
//     });
//   }, []);

//   console.log("AuthContext state:", state);

//   return (
//     <AuthContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

//   function resetPassword(email) {
//     return auth.sendPasswordResetEmail(email);
//   }

//   function updateEmail(email) {
//     return currentUser.updateEmail(email);
//   }

//   function updatePassword(password) {
//     return currentUser.updatePassword(password);
//   }

// resetPassword,
// updateEmail,
// updatePassword,

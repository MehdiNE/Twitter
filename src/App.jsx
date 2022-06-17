import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import "./styles/global.css";
import ForgetPassword from "./page/ForgetPassword";
import { Offline, Online } from "react-detect-offline";
import { useSelector } from "react-redux";
import AlertComponent from "./UI/Alert";
import MediaQuery from "react-responsive";
import Signup from "./page/Signup";
import Login from "./page/Login";

import Bookmarks from "./page/Bookmarks";
import Messages from "./page/Messages";
import PostPage from "./page/PostPage";

const Home = React.lazy(() => import("./page/Home"));
const Profile = React.lazy(() => import("./page/Profile"));
const MobileBottomNavigation = React.lazy(() =>
  import("./components/MobileBottomNavigation")
);
const TransitionsModal = React.lazy(() => import("./components/ModalPage"));

//implemant pwa
//custom hooks

function App() {
  const { currentUser } = useAuth();

  const darkTheme = useSelector((state) => state.theme.darkModeState);
  const modal = useSelector((state) => state.modal.showModal);

  return (
    <div className={darkTheme ? "dark" : ""}>
      <Offline className="min-w-screen h-screen bg-black text-white flex justify-center items-center">
        <div className="w-screen h-screen text-white flex justify-center items-center flex-col text-2xl">
          <h1>You are offline!</h1>
          <img
            alt="logo"
            src="/assets/Error Naughty Dog.png"
            className="w-80 h-80"
          />
          <p>
            it seems there is a problem with your connection. Please check your
            network status
          </p>
        </div>
      </Offline>
      <Online>
        <Routes>
          <Route
            path="/login"
            element={!currentUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!currentUser ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/:id"
            element={currentUser ? <PostPage /> : <Navigate to="/login" />}
          />

          <Route path="/resetpassword" element={<ForgetPassword />} />

          <Route
            path="/profile/:id"
            element={
              currentUser ? (
                <Suspense fallback={<></>}>
                  <Profile />
                </Suspense>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/resetpassword" element={<ForgetPassword />} />
          <Route path="/messages/:id" element={<Messages />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route
            path="*"
            element={
              currentUser ? (
                <Suspense fallback={<p>Loading...</p>}>
                  <Home />
                </Suspense>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Online>

      <MediaQuery maxWidth={700}>
        <Suspense fallback={<></>}>
          <MobileBottomNavigation />
        </Suspense>
      </MediaQuery>

      <AlertComponent />
      {modal && (
        <Suspense fallback={<></>}>
          <TransitionsModal />
        </Suspense>
      )}
    </div>
  );
}

export default App;

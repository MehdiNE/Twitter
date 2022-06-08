import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Signup from "./page/Signup";
import { useAuth } from "./contexts/AuthContext";
import "./styles/global.css";
import ForgetPassword from "./page/ForgetPassword";
import Profile from "./page/Profile";
import { Offline, Online } from "react-detect-offline";
import { useRecoilState } from "recoil";
import { darkModeState } from "./atoms/modalAtom";

const Home = React.lazy(() => import("./page/Home"));
const PostPage = React.lazy(() => import("./page/PostPage"));
const Login = React.lazy(() => import("./page/Login"));

//use redux toolkit
//add copy to clipboard functionality
//add share functionality

function App() {
  const { currentUser } = useAuth();
  const [darkTheme, setDarkTheme] = useRecoilState(darkModeState);

  return (
    <div className={darkTheme ? "dark" : ""}>
      <Offline className="min-w-screen h-screen bg-black text-white flex justify-center items-center">
        <div className="w-screen h-screen text-white flex justify-center items-center flex-col text-2xl">
          <h1>You are offline!</h1>
          <img
            alt="logo"
            src="/assets/Error Naughty Dog.svg"
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
            element={
              <Suspense
                fallback={
                  <div className="flex justify-center items-center">
                    <ClipLoader color="#1DA1F2" />
                  </div>
                }
              >
                {!currentUser ? <Login /> : <Navigate to="/" />}
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={!currentUser ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/:id"
            element={
              <Suspense
                fallback={
                  <div className="flex justify-center items-center">
                    <ClipLoader color="#1DA1F2" />
                  </div>
                }
              >
                {currentUser ? <PostPage /> : <Navigate to="/login" />}
              </Suspense>
            }
          />
          <Route path="/resetpassword" element={<ForgetPassword />} />
          <Route
            path="/profile/:id"
            element={
              <Suspense
                fallback={
                  <div className="flex justify-center items-center">
                    <ClipLoader color="#1DA1F2" />
                  </div>
                }
              >
                {currentUser ? <Profile /> : <Navigate to="/login" />}
              </Suspense>
            }
          />
          <Route path="/resetpassword" element={<ForgetPassword />} />

          <Route
            path="*"
            element={
              <Suspense
                fallback={
                  <div className="flex justify-center items-center">
                    <ClipLoader color="#1DA1F2" />
                  </div>
                }
              >
                {currentUser ? <Home /> : <Navigate to="/login" />}
              </Suspense>
            }
          />
        </Routes>
      </Online>
    </div>
  );
}

export default App;
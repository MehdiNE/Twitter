import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { RecoilRoot } from "recoil";

import { store } from "./store/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

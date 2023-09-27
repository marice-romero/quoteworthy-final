import React from "react";
import ReactDOM from "react-dom/client";
import AppContainer from "./AppContainer";
import { ToastContainer } from "react-toastify";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContainer />
    <ToastContainer
      position="bottom-right"
      theme="dark"
      hideProgressBar="true"
    />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Accept from "./pages/Accept";
import "./index.css";

const path = window.location.pathname;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {path.startsWith("/accept") ? <Accept /> : <App />}
  </React.StrictMode>
);


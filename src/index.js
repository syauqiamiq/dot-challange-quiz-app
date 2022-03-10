import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppProvider } from "./context/AppContext";
import "./assets/css/style.css";
import { LoginProvider } from "./context/LoginContext";

ReactDOM.render(
  <React.StrictMode>
    <LoginProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </LoginProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

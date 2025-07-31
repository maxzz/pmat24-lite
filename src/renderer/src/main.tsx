import "./utils/x-devtool-install-msg-block";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/0-all-app";
import "./assets/css/index.css";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

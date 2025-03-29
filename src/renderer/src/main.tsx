import "./utils/x-devtool-install-block";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './assets/css/index.css';
import { initializeSettings } from "./store";

// await initializeSettings();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

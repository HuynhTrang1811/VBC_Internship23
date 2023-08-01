import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { useContext } from "react";
import reportWebVitals from "./reportWebVitals";
import { GlobalProvider } from '../src/store/GlobalContext'
import './index.css'
import { LoadingContextProvider } from "./pages/loading";
const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(
    <GlobalProvider>
        <LoadingContextProvider>
            <App />
        </LoadingContextProvider>
    </GlobalProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

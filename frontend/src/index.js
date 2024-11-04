import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/store/store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </Provider>
);

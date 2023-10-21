import { ConfigProvider } from "antd";

import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#31B465",
            colorBgContainer: "#f6ffed",
            colorLink: "#31B465"
          }
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);

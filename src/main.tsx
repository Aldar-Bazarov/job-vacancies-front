import { ConfigProvider } from "antd";
import ReactDOM from "react-dom/client";

import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#39CD7D",
            colorLink: "#31B465",
            colorBgBase: "#212121",
            colorText: "#C9C9C9",
            fontFamily: "Montserrat, Inter, system-ui, Helvetica, sans-serif",
            borderRadiusSM: 10,
            colorIcon: "#C9C9C9",
            colorSplit: "rgba(126, 126, 126, 0.4)",
            colorPrimaryHover: "white"
          },
          components: {
            Input: {
              lineWidth: 1,
              colorBorder: "rgba(255, 255, 255, 0.14)",
              colorBgContainer: "#252525",
              hoverBg: "#252525",
              activeBg: "#252525",
              colorTextPlaceholder: "#C9C9C9"
            },
            Button: {
              primaryShadow: "none",
              primaryColor: "#FFF"
            },
            Select: {
              colorBorder: "rgba(255, 255, 255, 0.14)",
              selectorBg: "#252525",
              optionSelectedBg: "#252525"
            },
            Pagination: {
              colorPrimaryBorder: "rgba(255, 255, 255, 0.14)",
              itemActiveBg: "#39CD7D",
              colorPrimary: "white"
            }
          }
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);

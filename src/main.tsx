import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import App from "./App";
import Auth0ProviderWithNavigate from "./components/providers/Auth0ProviderWithNavigate";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0ProviderWithNavigate>
      <App />
    </Auth0ProviderWithNavigate>
  </React.StrictMode>,
);

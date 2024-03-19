import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import Auth0ProviderWithNavigate from "@/components/providers/Auth0ProviderWithNavigate";
import QueryClientProvider from "@/components/providers/QueryClientProvider";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider>
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </QueryClientProvider>
  </React.StrictMode>,
);

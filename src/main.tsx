import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import QueryClientProvider from "@/components/providers/QueryClientProvider";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);

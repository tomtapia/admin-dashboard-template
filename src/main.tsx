import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@/app/app";
import { AppProviders } from "@/app/providers";
import "@/styles.css";

const enableMocking = async () => {
  if (import.meta.env.DEV || import.meta.env.MODE === "test") {
    const { worker } = await import("@/mocks/browser");
    await worker.start({
      onUnhandledRequest: "bypass",
    });
  }
};

void enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
  );
});

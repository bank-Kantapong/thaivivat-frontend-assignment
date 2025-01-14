import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import GlobalStyles from "../GlobalStyles.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyles />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

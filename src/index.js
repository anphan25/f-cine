import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import ThemeProvider from "./theme/theme";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ThemeProvider>
    <CssBaseline />
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
);

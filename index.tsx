// src/Index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { MainLayout } from "./src/layouts/MainLayout";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./src/store/index";

const rootNode = document.getElementById("root");

if (rootNode) {
  createRoot(rootNode).render(
    <BrowserRouter>
      <Provider store={store}>
        <MainLayout />
      </Provider>
    </BrowserRouter>
  );
}

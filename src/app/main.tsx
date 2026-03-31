import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "@shared/config";

import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@app/providers/QueryClientProvider";
import { router } from "./router";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);

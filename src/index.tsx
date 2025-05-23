import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GreetingCardEditor } from "./screens/Frame";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <GreetingCardEditor />
  </StrictMode>,
);

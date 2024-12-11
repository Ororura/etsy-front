import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./ui/app/App.tsx";

createRoot(document.getElementById("root")!).render(<App />);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { UserInformationContextProvider } from "./Context/UserInforContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <UserInformationContextProvider>
        <App />
      </UserInformationContextProvider>
    </AuthContextProvider>
  </StrictMode>
);

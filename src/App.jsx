import { useState } from "react";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import AuthPage from "./pages/AuthPage";
import TodoPage from "./pages/TodoPage";
import "./App.css";

function AppContent() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      {user
        ? <TodoPage darkMode={darkMode} setDarkMode={setDarkMode} />
        : <AuthPage />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthenticationContext";
import AppLayout from "./pages/AppLayout";
import NewsList from "./components/NewsList";
import UserPreferences from "./pages/UserPreferences";
import AuthGuard from "./components/AuthGuard";
import Favourties from "./components/Favourties";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<AuthGuard />}>
            <Route path="/app" element={<AppLayout />}>
              <Route
                index
                element={<Navigate replace to="updatePreferences" />}
              />
              <Route path="news" element={<NewsList />} />
              <Route path="updatePreferences" element={<UserPreferences />} />
              <Route path="favourite" element={<Favourties />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

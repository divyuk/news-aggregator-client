import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthenticationContext";

function AuthGuard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }
  return <Outlet />;
}

export default AuthGuard;

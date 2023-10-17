import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthenticationContext";

function AuthGuard({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }
  return <Outlet />;
}

export default AuthGuard;

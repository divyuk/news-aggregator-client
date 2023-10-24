import { useEffect } from "react";
import { useAuth } from "../contexts/AuthenticationContext";

function LogOut() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return <div></div>;
}

export default LogOut;

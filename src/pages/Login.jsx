import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Login() {
  const { login, isAuthenticated } = useAuth();
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (emailID && password) login(emailID, password);
  }
  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);
  return (
    <main>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={emailID}
          onChange={(e) => setEmailID(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default Login;

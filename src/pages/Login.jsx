import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styles from "./Login.module.css";

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
    if (isAuthenticated) navigate("/app/news", { replace: true });
  }, [isAuthenticated, navigate]);
  return (
    <main className={styles["login-page"]}>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles["login-form"]}>
        <h2 className={styles["login-title"]}>Login</h2>
        <label htmlFor="email" className={styles["login-label"]}>
          Email
        </label>
        <input
          id="email"
          type="email"
          value={emailID}
          onChange={(e) => setEmailID(e.target.value)}
          className={styles["login-input"]}
        />

        <label htmlFor="password" className={styles["login-label"]}>
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles["login-input"]}
        />
        <button type="submit" className={styles["login-button"]}>
          Submit
        </button>
      </form>
    </main>
  );
}

export default Login;

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthenticationContext";
import { NavLink, useNavigate } from "react-router-dom";
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
        <h2 className={styles["login-title"]}>One News</h2>
        <input
          id="email"
          type="email"
          value={emailID}
          onChange={(e) => setEmailID(e.target.value)}
          className={styles["login-input"]}
          placeholder="Email"
        />
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles["login-input"]}
          placeholder="Password"
        />
        <button type="submit" className={styles["login-button"]}>
          Submit
        </button>
        {/* Section for No Account */}
        <section className={styles["register"]}>
          <p className={styles["account"]}>
            Don&apos;t have an account?{" "}
            <NavLink to="/register" className={styles.navlink}>
              Register
            </NavLink>
          </p>
        </section>
      </form>
    </main>
  );
}

export default Login;

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styles from "./Register.module.css";

function Register() {
  const { register, isAuthenticated } = useAuth();
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    const inputValue = e.target.value;
    if (/^[A-Za-z0-9._]*$/.test(inputValue)) {
      setUsername(inputValue);
    }
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (emailID && password && name && username)
      register(emailID, password, name, username);
  }

  useEffect(() => {
    if (isAuthenticated) {
      // Navigate to the homepage
      navigate("/app");
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles["register-page"]}>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles["register-form"]}>
        <h2 className={styles["register-title"]}>One News</h2>
        <p className={styles["tag-line"]}>
          Regiter to see what&apos;s happeing around the world
        </p>
        <input
          id="email"
          type="email"
          value={emailID}
          onChange={(e) => setEmailID(e.target.value)}
          className={styles["register-input"]}
          placeholder="Email"
        />
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles["register-input"]}
          placeholder="Full Name"
        />
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          className={styles["register-input"]}
          placeholder="Username"
        />
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles["register-input"]}
          placeholder="Password"
        />
        <button type="submit" className={styles["register-button"]}>
          Submit
        </button>
      </form>
    </main>
  );
}

export default Register;

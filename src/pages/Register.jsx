import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Register() {
  const { register, isAuthenticated } = useAuth();
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (emailID && password) register(emailID, password);
  }

  // useEffect(() => {
  //   if (isAuthenticated) navigate("/", { replace: true });
  // }, [isAuthenticated, navigate]);

  // Performing a hard reload also
  useEffect(() => {
    if (isAuthenticated) {
      // Navigate to the homepage
      navigate("/app");

      // // Perform a hard reload of the homepage
      // window.location.reload(true);
    }
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

export default Register;

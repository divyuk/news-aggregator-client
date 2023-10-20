import { useNavigate } from "react-router-dom";
import { logo } from "./Logo.module.css";

function Logo() {
  const navigate = useNavigate(); // Get the navigate function
  const handleHome = () => {
    // Navigate to the "news" route when the logo is clicked
    navigate("/app/news");
  };
  return (
    <img
      src="/logo1.svg"
      alt="Gossiping World"
      className={logo}
      onClick={handleHome}
    />
  );
}

export default Logo;

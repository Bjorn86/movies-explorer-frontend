// IMPORT PACKAGES
import { Link } from "react-router-dom";

// IMPORT STYLES
import "./Logo.css";

// LOGO COMPONENT
function Logo({ place }) {
  return (
    <Link
      to="/"
      className={`logo ${
        place === "auth" ? "logo_place_auth" : ""
      } hover-button`}
      aria-label="Главная"
    >
      <div className="logo__img"></div>
    </Link>
  );
}

export default Logo;

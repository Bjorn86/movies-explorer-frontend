// IMPORT PACKAGES
import { Link } from "react-router-dom";

// IMPORT STYLES
import "./AccountLink.css";

// ACCOUNT LINK COMPONENT
function AccountLink({ isSideMenu }) {
  return (
    <Link
      to="/profile"
      className={`account-link ${
        isSideMenu ? "account-link_place_side-menu" : "account-link_hidden"
      } hover-button`}
    >
      Аккаунт
    </Link>
  );
}

export default AccountLink;
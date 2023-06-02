// IMPORT PACKAGES
import { Link } from "react-router-dom";

// ACCOUNT LINK COMPONENT
function AccountLink({ isSideMenu }) {
  return (
    <Link
      to="/profile"
      className={`account-link ${
        isSideMenu ? "account-link_place_side-menu" : "account-link_hidden"
      } typo-main-font typo-header-link_size_l hover-button`}
    >
      Аккаунт
    </Link>
  );
}

export default AccountLink;

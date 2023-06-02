// IMPORT PACKAGES
import { Link } from "react-router-dom";

// NAVIGATION COMPONENT
function Navigation({ isSideMenu }) {
  return (
    <nav className={`navigation ${isSideMenu ? "" : "navigation_hidden"}`}>
      <ul
        className={`navigation__menu-wrapper ${
          isSideMenu ? "navigation__menu-wrapper_direction_column" : ""
        }`}
      >
        <li
          className={`navigation__menu-item ${
            isSideMenu ? "" : "navigation__menu-item_hidden"
          }`}
        >
          <Link
            to="/"
            className={`navigation__link typo-main-font ${
              isSideMenu
                ? "navigation__link_place_side-menu typo-side-menu-link"
                : "typo-header-link"
            } hover-link`}
          >
            Главная
          </Link>
        </li>
        <li className="navigation__menu-item">
          <Link
            to="/movies"
            className={`navigation__link typo-main-font ${
              isSideMenu
                ? "navigation__link_place_side-menu typo-side-menu-link"
                : "typo-header-link"
            } hover-link`}
          >
            Фильмы
          </Link>
        </li>
        <li className="navigation__menu-item">
          <Link
            to="/saved-movies"
            className={`navigation__link typo-main-font ${
              isSideMenu
                ? "navigation__link_place_side-menu typo-side-menu-link"
                : "typo-header-link"
            } hover-link`}
          >
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;

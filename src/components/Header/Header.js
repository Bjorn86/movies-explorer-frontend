// IMPORT PACKAGES
import { Link, Route, Routes } from "react-router-dom";

// IMPORT STYLES
import "./Header.css";

// IMPORT COMPONENTS
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import AccountLink from "../AccountLink/AccountLink";

// HEADER COMPONENT
function Header({ onHamburgerClick }) {
  return (
    <header className="header">
      <Routes>
        <Route
          path="/"
          element={
            <div className="header__wrapper header__wrapper_bg-color_hero">
              <Logo />
              <nav className="header__menu">
                <ul className="header__menu-wrapper">
                  <li className="header__menu-item">
                    <Link to="/signup" className="header__link hover-link">
                      Регистрация
                    </Link>
                  </li>
                  <li className="header__menu-item">
                    <Link
                      to="/signin"
                      className="header__link header__link_type_login hover-button"
                    >
                      Войти
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          }
        />
        <Route
          path="/movies"
          element={
            <div className="header__wrapper">
              <Logo />
              <Navigation />
              <AccountLink />
              <button
                className="header__btn-hamburger hover-button"
                type="button"
                aria-label="Меню навигации"
                onClick={onHamburgerClick}
              ></button>
            </div>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <div className="header__wrapper">
              <Logo />
              <Navigation />
              <AccountLink />
              <button
                className="header__btn-hamburger hover-button"
                type="button"
                aria-label="Меню навигации"
                onClick={onHamburgerClick}
              ></button>
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <div className="header__wrapper">
              <Logo />
              <Navigation />
              <AccountLink />
              <button
                className="header__btn-hamburger hover-button"
                type="button"
                aria-label="Меню навигации"
                onClick={onHamburgerClick}
              ></button>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;

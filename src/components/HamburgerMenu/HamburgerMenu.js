// IMPORT COMPONENTS
import AccountLink from "../AccountLink/AccountLink";
import Navigation from "../Navigation/Navigation";

// IMPORT COMPONENTS
import Overlay from "../Overlay/Overlay";

// HAMBURGER MENU COMPONENT
function HamburgerMenu({ isSideMenuOpen, onCloseClick }) {
  return (
    <Overlay isActive={isSideMenuOpen} onCloseClick={onCloseClick}>
      <div
        className={`hamburger-menu ${
          isSideMenuOpen ? "hamburger-menu_active" : ""
        }`}
      >
        <button
          className="hamburger-menu__btn-close hover-button"
          type="button"
          aria-label="Закрыть меню"
          onClick={onCloseClick}
        ></button>
        <Navigation isSideMenu={true} />
        <AccountLink isSideMenu={true} />
      </div>
    </Overlay>
  );
}

export default HamburgerMenu;

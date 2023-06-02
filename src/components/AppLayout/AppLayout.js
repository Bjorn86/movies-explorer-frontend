// IMPORT PACKAGES
import { Outlet } from "react-router-dom";

// IMPORT COMPONENTS
import Header from "../Header/Header";

// APP LAYOUT COMPONENT
function AppLayout({ onHamburgerClick }) {
  return (
    <>
      <Header onHamburgerClick={onHamburgerClick} />
      <Outlet />
    </>
  );
}

export default AppLayout;

// IMPORT PACKAGES
import { Outlet } from "react-router-dom";

// IMPORT COMPONENTS
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// APP LAYOUT COMPONENT
function AppLayout({ onHamburgerClick }) {
  return (
    <>
      <Header onHamburgerClick={onHamburgerClick} />
      <Outlet />
      <Footer />
    </>
  );
}

export default AppLayout;

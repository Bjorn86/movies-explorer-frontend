// IMPORT PACKAGES
import { Outlet, useLocation } from "react-router-dom";

// IMPORT COMPONENTS
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// APP LAYOUT COMPONENT
function AppLayout({ onHamburgerClick }) {
  // HOOKS
  const location = useLocation();

  return (
    <>
      <Header onHamburgerClick={onHamburgerClick} />
      <Outlet />
      {location.pathname !== "/profile" && <Footer />}
    </>
  );
}

export default AppLayout;

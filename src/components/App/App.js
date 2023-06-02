// IMPORT PACKAGES
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

// IMPORT COMPONENTS
import AppLayout from "../AppLayout/AppLayout";
import Main from "../Main/Main";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

// APP COMPONENT
function App() {
  // STATE VARIABLES
  const [isSideMenuOpen, setSideMenuClass] = useState(false);

  // HANDLER TOGGLE SIDE MENU
  const handleToggleSideMenu = () => {
    setSideMenuClass(!isSideMenuOpen);
  };

  return (
    <div className="app__content">
      <Routes>
        <Route
          path="/"
          element={<AppLayout onHamburgerClick={handleToggleSideMenu} />}
        >
          <Route index element={<Main />} />
          <Route path="/movies" element={<h1>Супер Рыба</h1>} />
        </Route>
      </Routes>
      <HamburgerMenu
        isSideMenuOpen={isSideMenuOpen}
        onCloseClick={handleToggleSideMenu}
      />
    </div>
  );
}

export default App;

/* TODO Подумать как лучше реализовать показ активной страницы в навигации */

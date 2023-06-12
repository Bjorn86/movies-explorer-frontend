// IMPORT PACKAGES
import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";

// IMPORT STYLES
import "./App.css";

// IMPORT COMPONENTS
import AppLayout from "../AppLayout/AppLayout";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Registr from "../Register/Register";
import NotFound from "../NotFound/NotFound";

// IMPORT CONTEXT
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// !TEMP: IMPORT TEMP FILES
import moviesCards from "../../temp/data.json";
import moviesSavedCards from "../../temp/savedData.json";
import userData from "../../temp/userData.json";

// APP COMPONENT
function App() {
  // HOOKS
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isLiked, setLike] = useState(false); // !TEMP: Временный вариант
  const [isSideMenuOpen, setSideMenuStatus] = useState(false);
  const [isFilterOn, setFilter] = useState(false);
  const aboutOnClickRef = useRef(null);

  // HANDLER OPEN SIDE MENU
  function handleOpenSideMenu() {
    setSideMenuStatus(!isSideMenuOpen);
  }

  // HANDLER CLOSE SIDE MENU
  function handleCloseSideMenu() {
    setSideMenuStatus(false);
  }

  // HANDLER FILTER CHANGE
  function handleFilterChange(evt) {
    setFilter(evt);
  }

  // !TEMP: HANDLER CARD LIKE
  function handleCardLike() {
    setLike(!isLiked);
  }

  // HANDLER SMOOTH SCROLL EFFECT
  function handleScrollEffect(targetRef) {
    targetRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  // !TEMP: SET DATA
  useEffect(() => {
    setCards(moviesCards);
    setSavedCards(moviesSavedCards);
  }, []);

  return (
    <div className="app__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={<AppLayout onHamburgerClick={handleOpenSideMenu} />}
          >
            <Route
              index
              element={
                <Main
                  onAnchorClick={handleScrollEffect}
                  aboutRef={aboutOnClickRef}
                />
              }
            />
            <Route
              path="/movies"
              element={
                <Movies
                  cards={cards}
                  onFilterChange={handleFilterChange}
                  isFilterOn={isFilterOn}
                  isLiked={isLiked}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <SavedMovies
                  cards={savedCards}
                  onFilterChange={handleFilterChange}
                  isFilterOn={isFilterOn}
                />
              }
            />
            <Route path="/profile" element={<Profile user={userData} />} />
          </Route>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Registr />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <HamburgerMenu
          isSideMenuOpen={isSideMenuOpen}
          onClose={handleCloseSideMenu}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

// IMPORT PACKAGES
import { useEffect, useState } from "react";
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

// !TEMP: IMPORT TEMP FILES
import moviesCards from "../../temp/data.json";
import moviesSavedCards from "../../temp/savedData.json";
import userData from "../../temp/userData.json";

// APP COMPONENT
function App() {
  // STATE VARIABLES
  const [isSideMenuOpen, setSideMenuClass] = useState(false);
  const [isFilterOn, setFilter] = useState(false);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isLiked, setLike] = useState(false); // !TEMP: Временный вариант

  // HANDLER TOGGLE SIDE MENU
  function handleToggleSideMenu() {
    setSideMenuClass(!isSideMenuOpen);
  }

  // HANDLER FILTER CHANGE
  function handleFilterChange(evt) {
    setFilter(evt);
  }

  // !TEMP: HANDLER CARD LIKE
  function handleCardLike() {
    setLike(!isLiked);
  }

  // !TEMP: SET DATA
  useEffect(() => {
    setCards(moviesCards);
    setSavedCards(moviesSavedCards);
  }, []);

  return (
    <div className="app__content">
      <Routes>
        <Route
          path="/"
          element={<AppLayout onHamburgerClick={handleToggleSideMenu} />}
        >
          <Route index element={<Main />} />
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
      </Routes>
      <HamburgerMenu
        isSideMenuOpen={isSideMenuOpen}
        onCloseClick={handleToggleSideMenu}
      />
    </div>
  );
}

export default App;

/* TODO Подумать над плавной прокруткой для якоря */
/* TODO Есть переполнение <li> там где внутрь тега помещена ссылка стилизованная под кнопку */
/* TODO Есть откровенные ошибки в макете. Пока делаю так как должно быть по идеи. Определиться в каком виде отправлять */
/* TODO Провести ревизию CSS переменных */

// IMPORT PACKAGES
import { useCallback, useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

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
import Preloader from "../Preloader/Preloader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// IMPORT CONTEXT
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// IMPORT API'S
import * as mainApi from "../../utils/mainApi";

// !TEMP: IMPORT TEMP FILES
import moviesCards from "../../temp/data.json";
import moviesSavedCards from "../../temp/savedData.json";

// APP COMPONENT
function App() {
  // HOOKS
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isLiked, setLike] = useState(false); // !TEMP: Временный вариант
  const [isSideMenuOpen, setSideMenuStatus] = useState(false);
  const [isFilterOn, setFilter] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isPreloaderActive, setPreloaderClass] = useState(true);
  const [serverErrorText, setServerErrorText] = useState("");
  const aboutOnClickRef = useRef(null);
  const navigate = useNavigate();

  // HANDLER USER UPDATE
  async function handleUserUpdate({ email, name }) {
    setLoading(true);
    try {
      const userData = await mainApi.updateUserInfo({ email, name });
      if (userData) {
        setCurrentUser(userData);
      }
    } catch (err) {
      setServerErrorText(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // HANDLER USER REGISTRATION
  async function handleUserRegistration({ password, email, name }) {
    setLoading(true);
    try {
      const userData = await mainApi.register({ password, email, name });
      if (userData) {
        handleUserAuthorization({ email, password });
        navigate("/movies", { replace: true });
      }
    } catch (err) {
      setServerErrorText(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // HANDLER USER AUTHORIZATION
  async function handleUserAuthorization({ email, password }) {
    setLoading(true);
    try {
      const userData = await mainApi.authorize({ email, password });
      if (userData) {
        setLoggedIn(true);
        navigate("/movies", { replace: true });
      }
    } catch (err) {
      setServerErrorText(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // HANDLE USER LOGOUT
  async function handleUserLogOut() {
    try {
      const data = await mainApi.logout();
      if (data) {
        setLoggedIn(false);
        setCurrentUser({});
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  }

  // USER LOGIN CHECK
  const userLoginCheck = useCallback(async () => {
    try {
      const userData = await mainApi.getUserInfo();
      if (!userData) {
        throw new Error("Необходима авторизация"); // TODO Подумать как использовать такой же (401) ответ от сервера
      }
      setLoggedIn(true);
      setCurrentUser(userData);
    } catch (err) {
      console.error(err);
    } finally {
      setPreloaderClass(false);
    }
  }, []);

  // CHECK USER LOGGED IN
  useEffect(() => {
    // TODO Не совсем нравится как происходит этот процесс, но по другому либо вечный прелоадер, либо выкидывает с защищённых роутов
    userLoginCheck();
  }, [loggedIn, userLoginCheck]);

  // !TEMP: SET DATA
  useEffect(() => {
    if (loggedIn) {
      setCards(moviesCards);
      setSavedCards(moviesSavedCards);
    }
  }, [loggedIn]);

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

  /* if (isPreloaderActive) return <Preloader />; */ // TODO Поменять фоновый цвет

  return isPreloaderActive ? (
    <Preloader />
  ) : (
    <div className="app__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout
                onHamburgerClick={handleOpenSideMenu}
                loggedIn={loggedIn}
              />
            }
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
                <ProtectedRoute
                  element={Movies}
                  cards={cards}
                  onFilterChange={handleFilterChange}
                  isFilterOn={isFilterOn}
                  isLiked={isLiked}
                  onCardLike={handleCardLike}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  cards={savedCards}
                  onFilterChange={handleFilterChange}
                  isFilterOn={isFilterOn}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={Profile}
                  onUpdateUser={handleUserUpdate}
                  onLogout={handleUserLogOut}
                  onLoading={isLoading}
                  serverErrorText={serverErrorText}
                  setServerErrorText={setServerErrorText}
                  loggedIn={loggedIn}
                />
              }
            />
          </Route>
          <Route
            path="/signin"
            element={
              <Login
                onLogin={handleUserAuthorization}
                onLoading={isLoading}
                serverErrorText={serverErrorText}
                setServerErrorText={setServerErrorText}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Registr
                onRegistr={handleUserRegistration}
                onLoading={isLoading}
                serverErrorText={serverErrorText}
                setServerErrorText={setServerErrorText}
                loggedIn={loggedIn}
              />
            }
          />
          <Route path="/*" element={<NotFound />} />{" "}
          {/* TODO Защищать или нет ProtectedRoute? */}
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

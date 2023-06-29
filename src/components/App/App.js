// IMPORT PACKAGES
import { useCallback, useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import useNotification from "../../hooks/useNotification";

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
import * as moviesApi from "../../utils/moviesApi";

// IMPORT VARIABLES
import { MOVIES_API_URL } from "../../utils/constants";

// APP COMPONENT
function App() {
  // HOOKS
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [isSideMenuOpen, setSideMenuStatus] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isPreloaderActive, setPreloaderClass] = useState(true);
  const aboutOnClickRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useNotification();

  // HANDLER USER UPDATE
  async function handleUserUpdate({ email, name }) {
    setLoading(true);
    try {
      const userData = await mainApi.updateUserInfo({ email, name });
      if (userData) {
        setCurrentUser(userData);
        dispatch({
          type: "SUCCESS",
          title: "Выполнено",
          message: "Профиль успешно обновлён",
        });
      }
    } catch (err) {
      dispatch({
        type: "ERROR",
        title: "Ошибка",
        message: `${err}`,
      });
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
      dispatch({
        type: "ERROR",
        title: "Ошибка",
        message: `${err}`,
      });
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
      dispatch({
        type: "ERROR",
        title: "Ошибка",
        message: `${err}`,
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // HANDLER USER LOGOUT
  async function handleUserLogOut() {
    try {
      const data = await mainApi.logout();
      if (data) {
        setLoggedIn(false);
        setCurrentUser({});
        setSavedCards([]);
        localStorage.clear();
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  }

  // HANDLER USER LOGIN CHECK
  const handleUserLoginCheck = useCallback(async () => {
    try {
      const userData = await mainApi.getUserInfo();
      if (userData) {
        setLoggedIn(true);
        setCurrentUser(userData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPreloaderClass(false);
    }
  }, []);

  // HANDLER FOR GET ALL MOVIES
  async function handleGetAllMovies() {
    setLoading(true);
    try {
      const moviesData = await moviesApi.getCards();
      if (moviesData) {
        return moviesData;
      }
    } catch (err) {
      dispatch({
        type: "ERROR",
        title: "Ошибка",
        message: `Во время запроса произошла ошибка. Возможно, 
        проблема с соединением или сервер недоступен. Подождите 
        немного и попробуйте ещё раз`,
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // HANDLER GET USER MOVIES CARDS
  const handleGetUserMoviesCards = useCallback(async () => {
    try {
      const moviesData = await mainApi.getCardsByOwner();
      if (moviesData) {
        setSavedCards(moviesData);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // HANDLER SAVE MOVIE
  async function handleSaveMovie(movie) {
    try {
      const movieData = await mainApi.createMovieCard({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${MOVIES_API_URL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${MOVIES_API_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      });
      if (movieData) {
        setSavedCards([movieData, ...savedCards]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // HANDLER DELETE MOVIES
  async function handleDeleteMovie(movie) {
    const savedMovie = savedCards.find(
      (card) => card.movieId === movie.id || card.movieId === movie.movieId
    );
    try {
      const data = await mainApi.deleteCard(savedMovie._id);
      if (data) {
        setSavedCards((state) =>
          state.filter((card) => card._id !== savedMovie._id)
        );
      }
    } catch (err) {
      dispatch({
        type: "ERROR",
        title: "Ошибка",
        message: `${err}`,
      });
      console.error(err);
    }
  }

  // CHECK USER LOGGED IN
  useEffect(() => {
    handleUserLoginCheck();
  }, [loggedIn, handleUserLoginCheck]);

  // SET USER SAVED MOVIES CARDS
  useEffect(() => {
    if (loggedIn) {
      handleGetUserMoviesCards();
    }
  }, [loggedIn, handleGetUserMoviesCards]);

  // HANDLER OPEN SIDE MENU
  function handleOpenSideMenu() {
    setSideMenuStatus(!isSideMenuOpen);
  }

  // HANDLER CLOSE SIDE MENU
  function handleCloseSideMenu() {
    setSideMenuStatus(false);
  }

  return (
    <div className="app__content">
      {isPreloaderActive ? (
        <Preloader />
      ) : (
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
              <Route index element={<Main aboutRef={aboutOnClickRef} />} />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    element={Movies}
                    savedCards={savedCards}
                    onSearch={handleGetAllMovies}
                    onCardSave={handleSaveMovie}
                    onCardDelete={handleDeleteMovie}
                    isLoading={isLoading}
                    loggedIn={loggedIn}
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    savedCards={savedCards}
                    onCardDelete={handleDeleteMovie}
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
                  loggedIn={loggedIn}
                />
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <HamburgerMenu
            isSideMenuOpen={isSideMenuOpen}
            onClose={handleCloseSideMenu}
          />
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}

export default App;

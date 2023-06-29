// IMPORT PACKAGES
import { useCallback, useState, useEffect } from "react";
import useResizeScreen from "../../hooks/useResizeScreen";

// IMPORT STYLES
import "./Movies.css";

// IMPORT COMPONENTS
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

// IMPORT UTILS
import { handleMovieFiltering, handleMovieSearch } from "../../utils/utils";

// IMPORT CONFIGS
import { CARDS_PARAMS_RENDER } from "../../utils/config";

//MOVIES COMPONENT
function Movies({ savedCards, onSearch, onCardSave, onCardDelete, isLoading }) {
  // HOOKS
  const [initialCards, setInitialCards] = useState([]);
  const [cardsForRender, setCardsForRender] = useState([]);
  const [foundCards, setFoundCards] = useState([]);
  const [isFilterOn, setFilter] = useState(false);
  const [isCardsNotFound, setCardsNotFound] = useState(false);
  const [cardsRenderParams, setCardsRenderParams] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const screenWidth = useResizeScreen();

  // HANDLER SEARCH AND FILTERING MOVIES
  const handleSearchAndFiltering = useCallback(
    (cards, searchQuery) => {
      const found = handleMovieSearch(cards, searchQuery, false);
      setFoundCards(found);
      if (!found.length) {
        setCardsNotFound(true);
        setIsSearching(false);
        setCardsForRender(found);
      } else {
        const filtered = handleMovieFiltering(found, isFilterOn, false);
        setIsSearching(false);
        setCardsForRender(filtered);
        if (!filtered.length) {
          setIsSearching(false);
          setCardsNotFound(true);
        }
      }
    },
    [isFilterOn]
  );

  // HANDLER ON SEARCH SUBMIT
  const handleOnSearchSubmit = useCallback(
    async (searchQuery) => {
      setCardsNotFound(false);
      setIsSearching(true);
      if (!initialCards.length) {
        const moviesData = await onSearch();
        if (moviesData) {
          setInitialCards(moviesData);
          handleSearchAndFiltering(moviesData, searchQuery);
        }
      } else {
        handleSearchAndFiltering(initialCards, searchQuery);
      }
    },
    [handleSearchAndFiltering, initialCards, onSearch]
  );

  // HANDLER FILTER MOVIES
  const handleOnFilterClick = useCallback(
    (isChecked) => {
      setFilter(isChecked);
      setCardsNotFound(false);
      const filtered = handleMovieFiltering(foundCards, isChecked, false);
      setCardsForRender(filtered);
      if (!filtered.length) {
        setCardsNotFound(true);
      }
    },
    [foundCards]
  );

  // SET THE CARD RENDER PARAMETERS DEPENDING ON THE SCREEN WIDTH
  useEffect(() => {
    if (screenWidth >= CARDS_PARAMS_RENDER.base.width) {
      setCardsRenderParams(CARDS_PARAMS_RENDER.base.cards);
    } else if (
      screenWidth < CARDS_PARAMS_RENDER.base.width &&
      screenWidth >= CARDS_PARAMS_RENDER.desktop.width
    ) {
      setCardsRenderParams(CARDS_PARAMS_RENDER.desktop.cards);
    } else if (
      screenWidth < CARDS_PARAMS_RENDER.desktop.width &&
      screenWidth >= CARDS_PARAMS_RENDER.tablet.width
    ) {
      setCardsRenderParams(CARDS_PARAMS_RENDER.tablet.cards);
    } else {
      setCardsRenderParams(CARDS_PARAMS_RENDER.mobile.cards);
    }
  }, [screenWidth]);

  // DEPENDENCIES ON THE RENDERING OF MOVIE CARDS
  useEffect(() => {
    if (
      localStorage.getItem("foundMovies") &&
      localStorage.getItem("isMoviesFilterOn")
    ) {
      const filter = JSON.parse(localStorage.getItem("isMoviesFilterOn"));
      setFilter(filter);
      const foundMovies = JSON.parse(localStorage.getItem("foundMovies"));
      setFoundCards(foundMovies);
      if (!foundMovies.length) {
        setCardsNotFound(true);
        setCardsForRender(foundMovies);
      } else {
        const filtered = handleMovieFiltering(foundMovies, filter, false);
        setCardsForRender(filtered);
        if (!filtered.length) {
          setCardsNotFound(true);
        }
      }
    }
  }, []);

  return (
    <main className="movies">
      <SearchForm
        onSearch={handleOnSearchSubmit}
        onFilterChange={handleOnFilterClick}
        isFilterOn={isFilterOn}
        isSearching={isSearching}
      />
      <MoviesCardList
        cards={cardsForRender}
        savedCards={savedCards}
        cardsRenderParams={cardsRenderParams}
        isCardsNotFound={isCardsNotFound}
        onCardSave={onCardSave}
        onCardDelete={onCardDelete}
        isLoading={isLoading}
      />
    </main>
  );
}

export default Movies;

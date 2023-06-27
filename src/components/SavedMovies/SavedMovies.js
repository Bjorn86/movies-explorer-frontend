// IMPORT PACKAGES
import { useState, useCallback, useEffect } from "react";

// IMPORT STYLES
import "./SavedMovies.css";

// IMPORT COMPONENTS
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

// IMPORT UTILS
import { handleMovieFiltering, handleMovieSearch } from "../../utils/utils";

// SAVED MOVIES COMPONENT
function SavedMovies({ savedCards, onCardDelete }) {
  // HOOKS
  const [cardsForRender, setCardsForRender] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [isFilterOn, setFilter] = useState(false);
  const [isCardsNotFound, setCardsNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // HANDLER ON SEARCH SUBMIT
  const handleOnSearchSubmit = useCallback(
    (searchQuery) => {
      setCardsNotFound(false);
      setIsSearching(true);
      if (savedCards.length) {
        const found = handleMovieSearch(savedCards, searchQuery, true);
        setFilteredCards(found);
        if (!found.length) {
          setCardsNotFound(true);
          setIsSearching(false);
          setCardsForRender(found);
        } else {
          const filtered = handleMovieFiltering(found, isFilterOn, true);
          setIsSearching(false);
          setCardsForRender(filtered);
          if (!filtered.length) {
            setIsSearching(false);
            setCardsNotFound(true);
          }
        }
      } else {
        setIsSearching(false);
        setCardsNotFound(true);
      }
    },
    [savedCards, isFilterOn]
  );

  // HANDLER FILTER SAVED MOVIES
  const handleOnFilterClick = useCallback(
    (isChecked) => {
      setFilter(isChecked);
      setCardsNotFound(false);
      const filtered = handleMovieFiltering(filteredCards, isChecked, true);
      setCardsForRender(filtered);
      if (!filtered.length) {
        setCardsNotFound(true);
      }
    },
    [filteredCards]
  );

  // DEPENDENCIES ON THE RENDERING OF SAVED CARDS
  useEffect(() => {
    setCardsNotFound(false);
    if (
      localStorage.getItem("savedMoviesSearchQuery") &&
      localStorage.getItem("isSavedMoviesFilterOn")
    ) {
      const filter = JSON.parse(localStorage.getItem("isSavedMoviesFilterOn"));
      setFilter(filter);
      const searchQuery = localStorage.getItem("savedMoviesSearchQuery");
      const found = handleMovieSearch(savedCards, searchQuery, true);
      setFilteredCards(found);
      if (!found.length) {
        setCardsNotFound(true);
        setCardsForRender(found);
      } else {
        const filtered = handleMovieFiltering(found, filter, true);
        setCardsForRender(filtered);
        if (!filtered.length) {
          setCardsNotFound(true);
        }
      }
    } else if (
      !localStorage.getItem("savedMoviesSearchQuery") &&
      localStorage.getItem("isSavedMoviesFilterOn")
    ) {
      setFilteredCards(savedCards);
      const filter = JSON.parse(localStorage.getItem("isSavedMoviesFilterOn"));
      setFilter(filter);
      const filtered = handleMovieFiltering(savedCards, filter, true);
      setCardsForRender(filtered);
      if (!filtered.length) {
        setCardsNotFound(true);
      }
    } else {
      setCardsForRender(savedCards);
      setFilteredCards(savedCards);
    }
  }, [savedCards]);

  return (
    <main className="saved-movies">
      <SearchForm
        onSearch={handleOnSearchSubmit}
        onFilterChange={handleOnFilterClick}
        isFilterOn={isFilterOn}
        isSearching={isSearching}
      />
      <MoviesCardList
        cards={cardsForRender}
        savedCards={savedCards}
        isCardsNotFound={isCardsNotFound}
        onCardDelete={onCardDelete}
      />
    </main>
  );
}

export default SavedMovies;

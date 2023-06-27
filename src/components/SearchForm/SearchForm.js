//IMPORT PACKAGES
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// IMPORT STYLES
import "./SearchForm.css";

// IMPORT COMPONENTS
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

// SEARCH FORM COMPONENT
function SearchForm({ onSearch, onFilterChange, isFilterOn, isSearching }) {
  // HOOKS
  const [searchQuery, setSearchQuery] = useState("");
  const [queryError, setQueryError] = useState("");
  const location = useLocation();

  // SUBSTITUTING A SEARCH QUERY FROM THE LOCAL STORAGE
  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("moviesSearchQuery")
    ) {
      const savedSearchQuery = localStorage.getItem("moviesSearchQuery");
      setSearchQuery(savedSearchQuery);
    } else if (
      location.pathname === "/saved-movies" &&
      localStorage.getItem("savedMoviesSearchQuery")
    ) {
      const savedSearchQuery = localStorage.getItem("savedMoviesSearchQuery");
      setSearchQuery(savedSearchQuery);
    }
  }, [location.pathname]);

  // RESET AN EMPTY REQUEST ERROR
  useEffect(() => {
    setQueryError("");
  }, [searchQuery]);

  // HANDLER SUBMIT
  function handleSubmit(e) {
    e.preventDefault();
    if (location.pathname === "/movies") {
      searchQuery
        ? onSearch(searchQuery)
        : setQueryError("Нужно ввести ключевое слово");
    } else {
      onSearch(searchQuery);
    }
  }

  return (
    <section
      className="search-form"
      aria-label="Секция с поиском и фильтрацией"
    >
      <form
        className="search-form__form"
        id="search-and-filter"
        action="#"
        name="search-and-filter"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          className="search-form__search"
          form="search-and-filter"
          name="search"
          placeholder="Фильм"
          type="search"
          autoComplete="off"
          autoCapitalize="off"
          disabled={isSearching ? true : false}
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery || ""}
        />
        <FilterCheckbox
          onFilterChange={onFilterChange}
          isFilterOn={isFilterOn}
          isSearching={isSearching}
        />
        <button
          className="search-form__btn-submit hover-button"
          type="submit"
          form="search-and-filter"
        >
          Найти
        </button>
      </form>
      <span className="search-form__error">{queryError}</span>
    </section>
  );
}

export default SearchForm;

// IMPORT STYLES
import "./SavedMovies.css";

// IMPORT COMPONENTS
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

// SAVED MOVIES COMPONENT
function SavedMovies({ cards, onFilterChange, isFilterOn }) {
  return (
    <main className="saved-movies">
      <SearchForm onFilterChange={onFilterChange} isFilterOn={isFilterOn} />
      <MoviesCardList cards={cards} />
    </main>
  );
}

export default SavedMovies;

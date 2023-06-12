// IMPORT STYLES
import "./Movies.css";

// IMPORT COMPONENTS
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

//MOVIES COMPONENT
function Movies({ cards, onFilterChange, isFilterOn, isLiked, onCardLike }) {
  return (
    <main className="movies">
      <SearchForm onFilterChange={onFilterChange} isFilterOn={isFilterOn} />
      <MoviesCardList cards={cards} isLiked={isLiked} onCardLike={onCardLike} />
    </main>
  );
}

export default Movies;

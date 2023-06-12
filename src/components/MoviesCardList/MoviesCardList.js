// IMPORT STYLES
import "./MoviesCardList.css";

// IMPORT COMPONENTS
import MoviesCard from "../MoviesCard/MoviesCard";

// MOVIES CARD LIST COMPONENT
function MoviesCardList({ cards, isLiked, onCardLike }) {
  return (
    <section
      className="movies-card-list"
      aria-label="Секция с карточками фильмов"
    >
      {cards.length === 0 ? (
        <p className="movies-card-list__not-found">
          Поиск не&nbsp;дал результатов. Попробуйте изменить условия поиска
          и&nbsp;попробуйте снова.
        </p>
      ) : (
        <>
          <ul
            className={`movies-card-list__list ${
              cards.length > 3 ? "movies-card-list__list_space-evenly" : ""
            }`}
          >
            {cards.map((card) => (
              <MoviesCard
                card={card}
                key={card.id}
                isLiked={isLiked}
                onCardLike={onCardLike}
              />
            ))}
          </ul>
          <button
            className="movies-card-list__btn-more hover-button"
            type="button"
          >
            Ещё
          </button>
        </>
      )}
    </section>
  );
}

export default MoviesCardList;

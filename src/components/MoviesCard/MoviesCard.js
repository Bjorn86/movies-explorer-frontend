// IMPORT STYLES
import "./MoviesCard.css";

// MOVIES CARD COMPONENT
function MoviesCard({ card, isLiked, onCardLike }) {
  // HANDLER CONVERT DURATION
  function handleConvertDuration(duration) {
    const minutes = duration % 60;
    const hours = (duration - minutes) / 60;
    if (hours < 1) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }

  return (
    <li className="movies-card">
      <img
        className="movies-card__img"
        src={`https://api.nomoreparties.co${card.image.url}`} // !TEMP: Временный вариант
        alt={`Постер фильма ${card.nameRU}`}
      />
      <div className="movies-card__caption">
        <p className="movies-card__name">{card.nameRU}</p>
        <button
          className="movies-card__btn-like hover-button"
          type="button"
          aria-label="Добавить в сохранённые фильмы"
          onClick={onCardLike}
        >
          <svg
            className={`movies-card__btn-like-img ${
              isLiked ? "movies-card__btn-like-img_active" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#fff"
              d="M7.273 0C6.273 0 5.545.523 5 1.09 4.455.567 3.727 0 2.727 0 1.137 0 0 1.264 0 2.833c0 .785.318 1.482.91 1.962L5 8.5l4.09-3.705c.546-.523.91-1.177.91-1.962C10 1.264 8.864 0 7.273 0Z"
            />
          </svg>
        </button>
      </div>
      <p className="movies-card__duration">
        {handleConvertDuration(card.duration)}
      </p>
    </li>
  );
}

export default MoviesCard;

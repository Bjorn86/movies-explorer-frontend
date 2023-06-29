// IMPORT PACKAGES
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// IMPORT STYLES
import "./MoviesCardList.css";

// IMPORT COMPONENTS
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

// IMPORT UTILS
import { handleSavedStatus } from "../../utils/utils";

// MOVIES CARD LIST COMPONENT
function MoviesCardList({
  cards,
  savedCards,
  cardsRenderParams,
  isCardsNotFound,
  onCardSave,
  onCardDelete,
  isLoading,
}) {
  // HOOKS
  const [cardsForRender, setCardsForRender] = useState([]);
  const location = useLocation();

  // RENDER CARDS DEPENDING ON THE SCREEN WIDTH
  useEffect(() => {
    if (location.pathname === "/movies" && cards.length) {
      const result = cards.filter((card, index) => {
        return index < cardsRenderParams.total;
      });
      setCardsForRender(result);
    }
  }, [location.pathname, cards, cardsRenderParams]);

  // DEPENDENCIES ON THE RENDERING OF SAVED CARDS
  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setCardsForRender(cards);
    }
  }, [location.pathname, cards]);

  // HANDLER CLICK ON BUTTON MORE
  function handleClickOnButtonMore() {
    const start = cardsForRender.length;
    const end = start + cardsRenderParams.more;
    const count = cards.length - start;
    if (count > 0) {
      const additionalCards = cards.slice(start, end);
      setCardsForRender([...cardsForRender, ...additionalCards]);
    }
  }

  return (
    <section
      className="movies-card-list"
      aria-label="Секция с карточками фильмов"
    >
      {!localStorage.getItem("searchQuery") && cards.length === 0 && null}
      {isLoading && cards.length === 0 && <Preloader />}
      {isCardsNotFound && (
        <p className="movies-card-list__info">Ничего не&nbsp;найдено</p>
      )}
      {cards.length !== 0 && !isCardsNotFound && (
        <>
          <ul
            className={`movies-card-list__list ${
              cardsForRender.length > 3
                ? "movies-card-list__list_space-evenly"
                : ""
            }`}
          >
            {cardsForRender.map((card) => (
              <MoviesCard
                card={card}
                key={card.id || card._id}
                isSaved={handleSavedStatus(savedCards, card)}
                onCardSave={onCardSave}
                onCardDelete={onCardDelete}
              />
            ))}
          </ul>
          {cardsForRender.length >= 5 &&
            cardsForRender.length < cards.length && (
              <button
                className="movies-card-list__btn-more hover-button"
                type="button"
                onClick={handleClickOnButtonMore}
              >
                Ещё
              </button>
            )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;

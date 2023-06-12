// IMPORT STYLES
import "./Promo.css";

// IMPORT IMAGES
import hero from "../../images/hero-logo.svg";

// PROMO COMPONENT
function Promo({ onAnchorClick, aboutRef }) {
  return (
    <section className="promo">
      <div className="promo__text-wrapper">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <p className="promo__text">
          Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его
          создателя.
        </p>
        <button
          className="promo__btn-anchor hover-button"
          type="button"
          onClick={() => onAnchorClick(aboutRef)}
        >
          Узнать больше
        </button>
      </div>
      <img className="promo__img" src={hero} alt="Изображение земного шара" />
    </section>
  );
}

export default Promo;

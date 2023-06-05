// IMPORT STYLES
import "./Promo.css";

// IMPORT IMAGES
import hero from "../../images/hero-logo.svg";

// PROMO COMPONENT
function Promo() {
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
        <a className="promo__link hover-button" href="#about">
          Узнать больше
        </a>
      </div>
      <img className="promo__img" src={hero} alt="Изображение земного шара" />
    </section>
  );
}

export default Promo;

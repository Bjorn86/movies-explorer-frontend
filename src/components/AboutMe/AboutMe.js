// IMPORT STYLES
import "./AboutMe.css";

// IMPORT IMAGES
import author from "../../images/author-foto.jpg";

// IMPORT COMPONENTS
import SectionTitle from "../SectionTitle/SectionTitle";
import Portfolio from "../Portfolio/Portfolio";

// ABOUT ME COMPONENT
function AboutMe() {
  // CALCULATE AGE
  function calculateAge() {
    const birthDate = new Date(1986, 10, 27);
    const todayDate = new Date();
    const addOne =
      todayDate.getMonth() - birthDate.getMonth() >= 0 &&
      todayDate.getDate() - birthDate.getDate() >= 0;
    const diff = todayDate.getFullYear() - birthDate.getFullYear();
    return diff - 1 + (addOne ? 1 : 0);
  }

  return (
    <section className="about-me">
      <SectionTitle title="Студент" />
      <article className="about-me__bio">
        <h3 className="about-me__name">Данила</h3>
        <p className="about-me__profession">
          Фронтенд-разработчик, {calculateAge()} лет
        </p>
        <p className="about-me__text">
          Я&nbsp;родился и&nbsp;долгое время прожил в&nbsp;Норильске,
          там&nbsp;же закончил филиал КИЭП по&nbsp;направлению юриспруденция.
          Долгое время работал в&nbsp;сфере корпоративных закупок в&nbsp;крупной
          строительной компании являющейся &laquo;дочкой&raquo; Норникеля. Потом
          в&nbsp;моей жизни был переезд в&nbsp;город Сосновоборск, где
          я&nbsp;живу и&nbsp;сейчас, и&nbsp;работа в&nbsp;качестве
          предпринимателя. В&nbsp;период предпринимательства я увлёкся
          веб&#8209;разработкой, и&nbsp;понял что хочу заниматься этим всерьёз.
          Так я&nbsp;и&nbsp;оказался на&nbsp;курсе
          &laquo;Веб&#8209;разработчик&raquo; от&nbsp;Яндекс Практикум.
        </p>
        <a
          className="about-me__link hover-link"
          href="https://github.com/Bjorn86"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <img
          className="about-me__img"
          src={author}
          alt="Фотография разработчика"
        />
      </article>
      <Portfolio />
    </section>
  );
}

export default AboutMe;

// IMPORT STYLES
import "./AboutProject.css";

// IMPORT COMPONENTS
import SectionTitle from "../SectionTitle/SectionTitle";

// ABOUT PROJECT COMPONENT
function AboutProject({ aboutRef }) {
  return (
    <section className="about-project" ref={aboutRef}>
      <SectionTitle title="О проекте" />
      <div className="about-project__two-columns">
        <div className="about-project__column">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5&nbsp;этапов
          </h3>
          <p className="about-project__column-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </p>
        </div>
        <div className="about-project__column">
          <h3 className="about-project__subtitle">
            На&nbsp;выполнение диплома ушло 5&nbsp;недель
          </h3>
          <p className="about-project__column-text">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timeline">
        <div className="about-project__stage about-project__stage_type_first">
          <p className="about-project__stage-text">1 неделя</p>
          <p className="about-project__stage-caption">Back-end</p>
        </div>
        <div className="about-project__stage about-project__stage_type_second">
          <p className="about-project__stage-text about-project__stage-text_type_second">
            4 недели
          </p>
          <p className="about-project__stage-caption">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;

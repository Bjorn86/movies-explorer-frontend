// IMPORT STYLES
import "./Main.css";

// IMPORT COMPONENTS
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";

// MAIN COMPONENT
function Main({ aboutRef }) {
  return (
    <main className="main">
      <Promo aboutRef={aboutRef} />
      <AboutProject aboutRef={aboutRef} />
      <Techs />
      <AboutMe />
    </main>
  );
}

export default Main;

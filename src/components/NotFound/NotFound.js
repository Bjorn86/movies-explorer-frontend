// IMPORT PACKAGES
import { useNavigate } from "react-router-dom";

// IMPORT STYLES
import "./NotFound.css";

// NOT FOUND COMPONENT
function NotFound() {
  // HOOKS
  const navigate = useNavigate();

  // HANDLE BUTTON BACK CLICK
  function handleBtnBackClick() {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  }

  return (
    <main className="not-found">
      <section className="not-found__wrapper">
        <p className="not-found__title">404</p>
        <h1 className="not-found__text">Страница не найдена</h1>
        <button
          className="not-found__btn-back hover-link"
          type="button"
          onClick={handleBtnBackClick}
        >
          Назад
        </button>
      </section>
    </main>
  );
}

export default NotFound;

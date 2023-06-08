// IMPORT STYLES
import "./SearchForm.css";

// IMPORT COMPONENTS
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

// SEARCH FORM COMPONENT
function SearchForm({ onFilterChange, isFilterOn }) {
  return (
    <section
      className="search-form"
      aria-label="Секция с поиском и фильтрацией"
    >
      <form className="search-form__form" id="search-and-filter">
        <input
          className="search-form__search"
          form="search-and-filter"
          name="search"
          placeholder="Фильм"
          type="search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FilterCheckbox
          onFilterChange={onFilterChange}
          isFilterOn={isFilterOn}
        />
        <button className="search-form__btn-submit hover-button" type="submit">
          Найти
        </button>
      </form>
    </section>
  );
}

export default SearchForm;

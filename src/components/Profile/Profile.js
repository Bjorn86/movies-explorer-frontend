//IMPORT PACKAGES
import { useEffect, useState } from "react";
import useValidation from "../../hooks/useValidation";

// IMPORT STYLES
import "./Profile.css";

// IMPORT COMPONENTS
import Form from "../Form/Form";

// PROFILE COMPONENT
function Profile({ user, onSubmit }) {
  // STATE VARIABLES
  const [isEditingBegun, setEditingStatus] = useState(false);

  // VALIDATION CUSTOM HOOK
  const { values, errors, isFormValid, onChange, resetValidation } =
    useValidation();

  // HANDLER EDIT CLICK
  function handleEditClick() {
    setEditingStatus(!isEditingBegun);
  }

  // SET USER DATA TO INPUTS FROM PROFILE
  useEffect(() => {
    resetValidation(true, user);
  }, [resetValidation, user]);

  return (
    <main className="profile">
      <section className="profile__wrapper">
        <h1 className="profile__title">{`Привет, ${user.name}!`}</h1>
        <Form
          name="edit-profile"
          onSubmit={onSubmit}
          isFormValid={isFormValid}
          buttonText="Сохранить"
          isEditingBegun={isEditingBegun}
        >
          <label className="form__input-wrapper form__input-wrapper_place_edit-profile">
            Имя
            <input
              className="form__input form__input_place_edit-profile"
              type="text"
              name="name"
              form="edit-profile"
              required
              minLength="2"
              maxLength="30"
              id="name-input"
              disabled={isEditingBegun ? false : true}
              onChange={onChange}
              value={values.name || ""}
            />
          </label>
          <label className="form__input-wrapper form__input-wrapper_place_edit-profile">
            E-mail
            <input
              className="form__input form__input_place_edit-profile"
              type="email"
              name="email"
              form="edit-profile"
              required
              id="email-input"
              disabled={isEditingBegun ? false : true}
              onChange={onChange}
              value={values.email || ""}
            />
          </label>
          <div
            className={`form__errors-wrapper ${
              errors.name || errors.email ? "form__errors-wrapper_active" : ""
            }`}
          >
            <div className="form__error-wrapper">
              <p
                className={`form__error-name ${
                  errors.name ? "form__error-name_active" : ""
                }`}
              >
                Имя:
              </p>
              <span
                className={`form__input-error ${
                  errors.name ? "form__input-error_active" : ""
                }`}
              >
                {errors.name || ""}
              </span>
            </div>
            <div className="form__error-wrapper">
              <p
                className={`form__error-name ${
                  errors.email ? "form__error-name_active" : ""
                }`}
              >
                E-mail:
              </p>
              <span
                className={`form__input-error ${
                  errors.email ? "form__input-error_active" : ""
                }`}
              >
                {errors.email || ""}
              </span>
            </div>
          </div>
        </Form>
        <div
          className={`profile__actions-wrapper ${
            isEditingBegun ? "profile__actions-wrapper_hidden" : ""
          }`}
        >
          <button
            className="profile__btn-action profile__btn-action_type_edit hover-link"
            type="button"
            onClick={handleEditClick}
          >
            Редактировать
          </button>
          <button
            className="profile__btn-action profile__btn-action_type_exit hover-link"
            type="button"
          >
            Выйти из аккаунта
          </button>
        </div>
      </section>
    </main>
  );
}

export default Profile;

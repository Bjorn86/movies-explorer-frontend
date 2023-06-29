// IMPORT PACKAGES
import { Navigate } from "react-router-dom";
import useFormWithValidation from "../../hooks/useFormWithValidation";

// IMPORT STYLES
import "./Register.css";

// IMPORT COMPONENTS
import AuthScreen from "../AuthScreen/AuthScreen";

// IMPORT VARIABLES
import { USER_NAME_REG_EXP } from "../../utils/constants";

// LOGIN COMPONENT
function Registr({ onRegistr, onLoading, loggedIn }) {
  // HOOKS
  const { values, errors, isFormValid, onChange } = useFormWithValidation();

  // HANDLER SUBMIT
  function handleSubmit(e) {
    e.preventDefault();
    onRegistr(values);
  }

  return loggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <main className="registr">
      <AuthScreen
        title="Добро пожаловать!"
        name="registr"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
        buttonText={onLoading ? "Регистрация..." : "Зарегистрироваться"}
      >
        <label className="form__input-wrapper">
          Имя
          <input
            className={`form__input ${
              errors.name && "form__input_style_error"
            }`}
            type="text"
            name="name"
            form="registr"
            required
            minLength="2"
            maxLength="30"
            pattern={USER_NAME_REG_EXP}
            disabled={onLoading ? true : false}
            id="name-input"
            onChange={onChange}
            value={values.name || ""}
          />
          <span
            className={`form__input-error ${
              errors.name ? "form__input-error_active" : ""
            }`}
          >
            {errors.name || ""}
          </span>
        </label>
        <label className="form__input-wrapper">
          E-mail
          <input
            className={`form__input ${
              errors.email ? "form__input_style_error" : ""
            }`}
            type="text"
            name="email"
            form="registr"
            required
            disabled={onLoading ? true : false}
            id="email-input"
            onChange={onChange}
            value={values.email || ""}
          />
          <span
            className={`form__input-error ${
              errors.email ? "form__input-error_active" : ""
            }`}
          >
            {errors.email || ""}
          </span>
        </label>
        <label className="form__input-wrapper">
          Пароль
          <input
            className={`form__input ${
              errors.password ? "form__input_style_error" : ""
            }`}
            type="password"
            name="password"
            form="registr"
            required
            minLength="6"
            maxLength="30"
            disabled={onLoading ? true : false}
            id="password-input"
            onChange={onChange}
            value={values.password || ""}
          />
          <span
            className={`form__input-error ${
              errors.password ? "form__input-error_active" : ""
            }`}
          >
            {errors.password || ""}
          </span>
        </label>
      </AuthScreen>
    </main>
  );
}

export default Registr;

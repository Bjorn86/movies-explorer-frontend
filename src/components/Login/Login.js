// IMPORT PACKAGES
import { Navigate } from "react-router-dom";
import useFormWithValidation from "../../hooks/useFormWithValidation";

// IMPORT STYLES
import "./Login.css";

// IMPORT COMPONENTS
import AuthScreen from "../AuthScreen/AuthScreen";

// LOGIN COMPONENT
function Login({ onLogin, onLoading, loggedIn }) {
  // HOOKS
  const { values, errors, isFormValid, onChange } = useFormWithValidation();

  // HANDLER SUBMIT
  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  return loggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <main className="login">
      <AuthScreen
        title="Рады видеть!"
        name="login"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
        buttonText={onLoading ? "Вход..." : "Войти"}
      >
        <label className="form__input-wrapper">
          E-mail
          <input
            className={`form__input ${
              errors.email ? "form__input_style_error" : ""
            }`}
            type="text"
            name="email"
            form="login"
            required
            id="email-input"
            disabled={onLoading ? true : false}
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
            form="login"
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

export default Login;

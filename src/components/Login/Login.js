// IMPORT PACKAGES
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useValidation from "../../hooks/useValidation";

// IMPORT STYLES
import "./Login.css";

// IMPORT COMPONENTS
import AuthScreen from "../AuthScreen/AuthScreen";

// LOGIN COMPONENT
function Login({
  onLogin,
  onLoading,
  serverErrorText,
  setServerErrorText,
  loggedIn,
}) {
  // HOOKS
  const { values, errors, isFormValid, onChange } = useValidation();

  // RESET SERVER ERRORS
  useEffect(() => {
    setServerErrorText("");
  }, [setServerErrorText]);

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
        serverErrorText={serverErrorText}
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

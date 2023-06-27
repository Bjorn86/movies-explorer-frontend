// IMPORT PACKAGES
import { useCallback, useState } from "react";
import isEmail from "validator/es/lib/isEmail";

// USE FORM WITH VALIDATION HOOK
function useFormWithValidation() {
  // HOOKS
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setFormValid] = useState(false);

  // HANDLER INPUTS CHANGE
  function onChange(e) {
    const target = e.target;
    const { value, name } = target;
    if (name === "name" && target.validity.patternMismatch) {
      target.setCustomValidity(
        "Имя должно содержать только кириллицу, латиницу, пробел или дефис."
      );
    } else if (name === "email" && !isEmail(value)) {
      target.setCustomValidity(
        "Необходимо указать e-mail в формате name@domain.zone"
      );
    } else {
      target.setCustomValidity("");
    }
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setFormValid(target.closest("form").checkValidity());
  }

  // HANDLER RESET VALIDATION ERRORS
  const resetValidation = useCallback(
    (isFormValid = false, values = {}, errors = {}) => {
      setFormValid(isFormValid);
      setValues(values);
      setErrors(errors);
    },
    [setFormValid, setValues, setErrors]
  );

  return {
    values,
    errors,
    isFormValid,
    onChange,
    resetValidation,
  };
}

export default useFormWithValidation;

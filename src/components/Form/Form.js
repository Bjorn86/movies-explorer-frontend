// IMPORT STYLES
import "./Form.css";

// IMPORT COMPONENTS
import ServerErrors from "../ServerErrors/ServerErrors";

// FORM COMPONENT
function Form({
  name,
  onSubmit,
  isFormValid,
  isCurrentUser,
  buttonText,
  serverErrorText,
  isEditingBegun,
  ...props
}) {
  // HANDLER BUTTON DISABLE
  function handleButtonDisable() {
    if (name === "edit-profile") {
      return isFormValid && !isCurrentUser ? false : true;
    } else {
      return isFormValid ? false : true;
    }
  }

  return (
    <form
      action="#"
      name={`${name}`}
      id={`${name}`}
      className={`form form_type_${name}`}
      noValidate
      onSubmit={onSubmit}
    >
      {props.children}
      <ServerErrors
        isEditingBegun={isEditingBegun}
        place={name}
        serverErrorText={serverErrorText}
      />
      <button
        type="submit"
        form={`${name}`}
        className={`form__btn-submit ${
          name === "edit-profile" && !isEditingBegun
            ? "form__btn-submit_hidden"
            : ""
        } hover-button`}
        disabled={handleButtonDisable()}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default Form;

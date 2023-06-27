// IMPORT STYLES
import "./ServerErrors.css";

// SERVER ERRORS COMPONENT
function ServerErrors({ place, serverErrorText }) {
  return (
    <p
      className={`server-errors server-errors_place_${place} ${
        serverErrorText ? "server-errors_active" : ""
      }`}
    >
      {serverErrorText}
    </p>
  );
}

export default ServerErrors;

// IMPORT STYLES
import "./ServerErrors.css";

// SERVER ERRORS COMPONENT
function ServerErrors({ isEditingBegun, place }) {
  return (
    <p
      className={`server-errors server-errors_place_${place} ${
        isEditingBegun ? "server-errors_active" : ""
      }`}
    >
      {/* !TEMP: В отсутствии возможности взаимодействия с API самый длинный текст ошибки захардкоден */}
      При авторизации произошла ошибка. Токен не&nbsp;передан или передан
      не&nbsp;в&nbsp;том формате.
    </p>
  );
}

export default ServerErrors;

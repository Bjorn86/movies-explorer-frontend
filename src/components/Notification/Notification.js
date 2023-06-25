// IMPORT PACKAGES
import { useCallback, useEffect, useState } from "react";

// IMPORT STYLES
import "./Notification.css";

// NOTIFICATIONS COMPONENT
function Notification({ dispatch, noteId, type, message }) {
  // HOOKS
  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  // HANDLER START TIMER
  function handleStartTimer() {
    const id = setInterval(() => {
      setWidth((prevState) => {
        if (prevState < 100) {
          return prevState + 0.5;
        }
        clearInterval(id);
        return prevState;
      });
    }, 20);
    setIntervalId(id);
  }

  // HANDLER PAUSE TIMER
  const handlePauseTimer = useCallback(() => {
    clearInterval(intervalId);
  }, [intervalId]);

  // HANDLER CLOSE NOTIFICATIONS
  const handleCloseNotification = useCallback(() => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      dispatch({
        id: noteId,
        type: "REMOVE_NOTIFICATION",
      });
    }, 400);
  }, [handlePauseTimer, dispatch, noteId]);

  // CLOSING THE NOTIFICATION WHEN THE TIMER EXPIRES
  useEffect(() => {
    if (width === 100) {
      handleCloseNotification();
    }
  }, [width, handleCloseNotification]);

  // TIMER START
  // !FOR REVIEW INFO: Из-за строгого режима в режиме разработки, эффект применяется дважды, из-за чего
  // ! невозможно остановить таймер наведением не него курсора. Чтобы посмотреть реальное поведение
  // !  следует отключить строгий режим. После сборки проекта, на проде, такого поведения нет.
  useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      className={`notification ${exit ? "notification_action_exit" : ""}`}
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
    >
      <p className="notification__text">{message}</p>
      <div
        className={`notification__timer ${
          type === "SUCCESS"
            ? "notification__timer_type_success"
            : "notification__timer_type_error"
        }`}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}

export default Notification;

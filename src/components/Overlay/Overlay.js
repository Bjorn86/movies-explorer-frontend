// IMPORT PACKAGES
import { useEffect } from "react";

// IMPORT VARIABLES
import { ESC_KEY } from "../../utils/constants";

// OVERLAY COMPONENT
function Overlay({ isActive, onCloseClick, ...props }) {
  // HANDLER CLOSE BY ESC BUTTON
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === ESC_KEY) {
        onCloseClick();
      }
    }
    if (isActive) {
      document.addEventListener("keydown", handleEscClose);
      return () => document.removeEventListener("keydown", handleEscClose);
    }
  }, [isActive, onCloseClick]);

  // HANDLER CLOSE BY CLICK ON OVERLAY
  const closeByClickOnOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      onCloseClick();
    }
  };

  return (
    <div
      className={`overlay ${isActive ? "overlay_active" : ""}`}
      onMouseDown={closeByClickOnOverlay}
    >
      {props.children}
    </div>
  );
}

export default Overlay;

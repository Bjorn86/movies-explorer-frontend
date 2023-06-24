// IMPORT PACKAGES
import { useEffect, useCallback, useState } from "react";

// USE RESIZE SCREEN HOOK
function useResizeScreen() {
  // HOOKS
  const getScreenWidth = useCallback(() => window.innerWidth, []);
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());

  // SET AND REMOVE EVENT LISTENERS
  useEffect(() => {
    // VARIABLES
    let timer;

    // HANDLER SCREEN RESIZE
    function handleScreenResize() {
      setScreenWidth(getScreenWidth());
    }

    // HANDLER SET TIMEOUT
    function handleSetTimeout() {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          handleScreenResize();
        }, 1000);
      }
    }

    window.addEventListener("resize", handleSetTimeout);
    return () => window.removeEventListener("resize", handleSetTimeout);
  }, [getScreenWidth]);

  return screenWidth;
}

export default useResizeScreen;

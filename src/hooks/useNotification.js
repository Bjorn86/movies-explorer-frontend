// IMPORT PACKAGES
import { useContext } from "react";

// IMPORT CONTEXT
import { NotificationContext } from "../contexts/NotificationContext";

// IMPORT UTILS
import { generateKey } from "../utils/utils";

// USE NOTIFICATION HOOK
function useNotification() {
  const dispatch = useContext(NotificationContext);
  return (props) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: generateKey("note"),
        ...props,
      },
    });
  };
}

export default useNotification;

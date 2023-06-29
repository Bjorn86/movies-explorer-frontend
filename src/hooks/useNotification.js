// IMPORT PACKAGES
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

// IMPORT CONTEXT
import { NotificationContext } from "../contexts/NotificationContext";

// USE NOTIFICATION HOOK
function useNotification() {
  const dispatch = useContext(NotificationContext);
  return (props) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: uuidv4(),
        ...props,
      },
    });
  };
}

export default useNotification;

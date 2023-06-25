// IMPORT PACKAGES
import { useReducer } from "react";

// IMPORT STYLES
import "./NotificationsProvider.css";

// IMPORT COMPONENTS
import Notification from "../Notification/Notification";

// IMPORT CONTEXT
import { NotificationContext } from "../../contexts/NotificationContext";

// NOTIFICATIONS PROVIDER COMPONENT
function NotificationsProvider({ ...props }) {
  // HOOKS
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_NOTIFICATION":
        return [...state, { ...action.payload }];
      case "REMOVE_NOTIFICATION":
        return state.filter((item) => item.id !== action.id);
      default:
        return state;
    }
  }, []);

  return (
    <NotificationContext.Provider value={dispatch}>
      <div className="notifications-provider">
        {state.map((note) => {
          return (
            <Notification
              key={note.id}
              dispatch={dispatch}
              noteId={note.id}
              type={note.type}
              message={note.message}
            />
          );
        })}
      </div>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationsProvider;

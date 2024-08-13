import { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext();

// Reducer function
export const UserReducer = (state, action) => {
  switch (action.type) {
    case "Login":
      const loggedInState = {
        status: true,
        user: action.payload,
      };
      // Save the login state to localStorage
      localStorage.setItem("userState", JSON.stringify(loggedInState));
      return loggedInState;

    case "Logout":
      const loggedOutState = {
        status: false,
        user: null,
      };
      // Clear the state from localStorage
      localStorage.removeItem("userState");
      return loggedOutState;

    default:
      return state;
  }
};

// Context Provider
export const UserContextProvider = ({ children }) => {
  // Retrieve initial state from localStorage or use defaults
  const initialState = JSON.parse(localStorage.getItem("userState")) || {
    status: false,
    user: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  // Update localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem("userState", JSON.stringify(state));
  }, [state]);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

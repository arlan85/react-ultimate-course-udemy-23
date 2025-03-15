import PropTypes from "prop-types";
import { createContext, useContext, useReducer } from "react";

const Authcontext = createContext();

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "error":
      return { ...state, isLoading: false, error: action.payload };
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return initialState;
    default:
      throw new Error("Unknown action type");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};


function AuthProvider({ children }) {
  const [{ isAuthenticated, user }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      // perform login logic here
      dispatch({ type: "login", payload: { user: FAKE_USER } });
    } else {
      dispatch({ type: "error", payload: "Invalid email or password" });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return <Authcontext.Provider data={{
    isAuthenticated,
    user,
    login,
    logout
  }}>{children}</Authcontext.Provider>;
}
AuthProvider.propTypes = {
  children: PropTypes.node,
};

function useAuth() {
  const context = useContext(Authcontext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of AuthProvider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };

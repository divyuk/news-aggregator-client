import { createContext, useContext, useReducer } from "react";
import {
  getNews,
  loginUser,
  postFavourite,
  registerUser,
} from "../utility/userService";
import { toast } from "react-toastify";

//  Create the setting for Authentication Context.
const AuthContext = createContext();

// Initial State for the reducer
const initialState = {
  user: null,
  isAuthenticated: false,
};

//Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "register":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    default:
      throw new Error("Unknown action");
  }
}

// Use Custom Provider to tell Provider what data to be shared
function AuthProvider({ children }) {
  // It has value which needs to be shared with the rest of applications.
  // We are using useReducer to manage the global state.
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function register(email, password) {
    try {
      await registerUser(email, password);
      // If the registration is successful, update the user state
      dispatch({ type: "register", payload: { email, password } });
    } catch (err) {
      console.log("Error : ", err.message);
    }
  }

  async function login(email, password) {
    try {
      const token = await loginUser(email, password);
      dispatch({ type: "login", payload: { email, password, token } });
    } catch (err) {
      console.log("Error : ", err.message);
    }
  }

  async function fetchNews() {
    try {
      const response = await getNews(user.token);
      return response.data.results;
    } catch (error) {
      console.log("Error :", error);
    }
  }

  async function sendFavourite(id, news) {
    try {
      await postFavourite(user.token, id, news);
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  async function deleteNews(id, type) {
    try {
      await deleteNews(user.token, id, type);
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        register,
        login,
        fetchNews,
        sendFavourite,
        deleteNews,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Auth Context was outside Auth Provider");
  return context;
}

export { AuthProvider, useAuth };

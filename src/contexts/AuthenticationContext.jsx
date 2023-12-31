import { createContext, useContext, useReducer } from "react";
import {
  deleteNewsAPI,
  getFavourites,
  getNews,
  getPreferences,
  getRead,
  loginUser,
  postFavourite,
  postRead,
  registerUser,
  userNewsPreferences,
  logOutUser,
} from "../utility/userService";

import { categoryMapper } from "../utility/categoryMapper";
//  Create the setting for Authentication Context.
const AuthContext = createContext();

// Initial State for the reducer
// user = { email: , password: , token: ,  category:   }
const initialState = {
  user: null,
  categories: [],
  languages: [],
  countries: [],
  isAuthenticated: false,
};

//Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "register":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return {
        ...state,
        user: { ...state.user, token: undefined },
        isAuthenticated: false,
      };
    case "updateCategory":
      return { ...state, categories: action.payload };
    case "updateLanguage":
      return { ...state, languages: action.payload };
    case "updateCountry":
      return { ...state, countries: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

// Use Custom Provider to tell Provider what data to be shared
function AuthProvider({ children }) {
  // It has value which needs to be shared with the rest of applications.
  // We are using useReducer to manage the global state.
  const [
    { user, categories, languages, countries, isAuthenticated },
    dispatch,
  ] = useReducer(reducer, initialState);

  async function register(email, password, name, username) {
    try {
      const token = await registerUser(email, password, name, username);
      // If the registration is successful, update the user state
      dispatch({ type: "register", payload: { email, password, token } });
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

  async function fetchNews(page) {
    try {
      const response = await getNews(user.token, page);
      return response.data;
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
  async function sendRead(id, news) {
    try {
      await postRead(user.token, id, news);
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  async function deleteNews(id, type) {
    try {
      await deleteNewsAPI(user.token, id, type);
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  function updateCategory(newCategory) {
    dispatch({ type: "updateCategory", payload: newCategory });
  }

  function updateLanguage(newLanguage) {
    dispatch({ type: "updateLanguage", payload: newLanguage });
  }

  function updateCountry(newCountry) {
    dispatch({ type: "updateCountry", payload: newCountry });
  }

  async function updatePreferences() {
    try {
      const { categoriesLowercase, languageCodes, countryCodes } =
        categoryMapper(categories, languages, countries);
      await userNewsPreferences(
        user.token,
        categoriesLowercase,
        languageCodes,
        countryCodes
      );
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async function getMyPreferences() {
    try {
      const response = await getPreferences(user.token);
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async function getMyFavourites() {
    try {
      const response = await getFavourites(user.token);
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  async function getMyRead() {
    try {
      const response = await getRead(user.token);
      return response.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async function logout() {
    try {
      await logOutUser(user.token);
      dispatch({
        type: "logout",
        payload: { token: undefined },
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        dispatch,
        register,
        login,
        fetchNews,
        sendFavourite,
        deleteNews,
        updateCategory,
        updateLanguage,
        updateCountry,
        categories,
        languages,
        countries,
        updatePreferences,
        getMyFavourites,
        sendRead,
        getMyRead,
        getMyPreferences,
        logout,
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

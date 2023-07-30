import React, { createContext, useReducer, useContext } from 'react';

// Define your initial state here
const initialState = {
  update_main: false,
  update_user: false,
};

// Define your action types
const SET_UPDATE_MAIN = 'SET_UPDATE_MAIN';
const SET_UPDATE_USER = 'SET_UPDATE_USER';

// Define your reducer function here
const globalReducer = (state, action) => {
  switch (action.type) {
    case SET_UPDATE_MAIN:
      return { ...state, update_main: action.payload };
    case SET_UPDATE_USER:
      return { ...state, update_user: action.payload };
    default:
      return state;
  }
};

// Create the global context
const GlobalContext = createContext();

// Create the context provider using the reducer
const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to access the global context
const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext, SET_UPDATE_MAIN, SET_UPDATE_USER };

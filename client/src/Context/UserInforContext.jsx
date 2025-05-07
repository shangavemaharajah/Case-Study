import { createContext, useReducer } from "react";

export const UserInformation = createContext();

// Reducer function
export const userInformationReducer = (state, action) => {
  switch (action.type) {
    case "SET_INFOR":
      return {
        ...state,
        UserInformation: action.payload,
      };

    case "INFOR_CREATE":
      return {
        ...state,
        UserInformation: [
          action.payload,
          ...(state.UserInformation || []), // ✅ Corrected spread
        ],
      };

    case "INFOR_DELETE":
      return {
        ...state,
        UserInformation: state.UserInformation.filter((w) => w._id !== action.payload._id),
      };

    default:
      return state;
  }
};

// Context Provider
export const UserInformationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userInformationReducer, {
    UserInformation: null, 
  });

  return (
    <UserInformation.Provider value={{ ...state, dispatch }}>
      {children}
    </UserInformation.Provider>
  );
};

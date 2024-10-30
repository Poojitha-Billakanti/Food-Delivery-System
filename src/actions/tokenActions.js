// tokenActions.js

// Action types
export const SET_TOKEN = "SET_TOKEN";
export const SET_USER_ID = "SET_USER_ID";

// Action creators
export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

export const setUserId = (userId) => {
  return {
    type: SET_USER_ID,
    payload: userId,
  };
};

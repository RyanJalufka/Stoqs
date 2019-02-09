import { SET_CURRENT_USER, USER_LOADING, SET_USER_ACCOUNT } from "../Actions/types";
const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  account: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_USER_ACCOUNT:
      return {
        ...state,
        account: action.payload
      }
    default:
      return state;
  }
}

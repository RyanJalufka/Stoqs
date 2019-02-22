import { SET_CURRENT_STOCK, LOGOUT_USER } from '../Actions/types';

const initialState = {}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENT_STOCK:
      let newState = action.payload;
      return newState;
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
}
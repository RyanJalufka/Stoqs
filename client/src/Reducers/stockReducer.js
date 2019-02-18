import { SET_CURRENT_STOCK } from '../Actions/types';

const initialState = {}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENT_STOCK:
      let newState = action.payload;
      return newState;
    default:
      return state;
  }
}
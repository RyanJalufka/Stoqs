import { GET_NEWS, LOGOUT_USER } from '../Actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_NEWS: 
      let newState = action.payload;
      return newState;
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
}
import { GET_NEWS } from '../Actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_NEWS: 
      let newState = action.payload;
      console.log(newState);
      return newState;
    default:
      return state;
  }
}
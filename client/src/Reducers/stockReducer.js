import { SET_CURRENT_STOCK_START, SET_CURRENT_FAILURE, SET_CURRENT_SUCCESS, LOGOUT_USER } from '../Actions/types';

const initialState = {loading: false}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENT_STOCK_START:
    console.log('LOADING...');
    
    return {
      ...state,
      loading: true
    }
    case SET_CURRENT_SUCCESS:
      console.log(action.payload, "PAYLOAD FROM STOCK REDUCER: ", action.payload)
      let newState = action.payload;
      return newState;
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
}
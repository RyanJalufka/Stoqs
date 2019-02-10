import {SET_USER_ACCOUNT, SET_USER_STOCKLIST} from '../Actions/types';

const initialState = {
  balance: 0,
  stockList: [],
  name: '',
  email:''
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_USER_ACCOUNT:
      return {
        ...state,
        balance: action.payload.balance,
        name: action.payload.name,
        email: action.payload.email
      }
    case SET_USER_STOCKLIST:
    console.log('inside user stocklist reducer');
      return {
        ...state,
        stockList: action.payload
      }
    default:
      return state;
  }
}




//export as account:
// - balance
// - stockList
// - name
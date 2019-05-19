import {SET_USER_ACCOUNT, SET_USER_STOCKLIST, SET_CURRENT_PRICES, LOGOUT_USER, SUBTRACT_FUNDS} from '../Actions/types';

const initialState = {
  balance: 0,
  stockList: [],
  currentPrices: [],
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

      return {
        ...state,
        stockList: action.payload
      }
    case SET_CURRENT_PRICES:
        return {
          ...state,
          currentPrices: action.payload
        }
    case LOGOUT_USER: 
        return initialState;
    case SUBTRACT_FUNDS: 
        let balance = state.balance;
        return {
          ...state,
          balance: balance - action.payload
        }
    default:
      return state;
  }
}




//export as account:
// - balance
// - stockList
// - name
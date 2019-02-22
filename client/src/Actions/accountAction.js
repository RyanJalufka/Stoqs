import { SUBTRACT_FUNDS, ADD_FUNDS } from './types'
import axios from 'axios';
import { setUserStocklist } from "./authAction";

export const subtractFunds = () => dispatch => {

  // dispatch({ type: SUBTRACT_FUNDS, payload: payload })
  
}

export const buyNewStock = (stock) => dispatch => {

  axios.post('/stocks/', {
    symbol: stock.symbol,
    shares: stock.shares,
    price: stock.price,
    cost: stock.cost,
    owner: stock.owner
  })
  .then(response => response.data)
  .then(data => {
    console.log(data);
    dispatch(setUserStocklist(stock.owner));
  })

}
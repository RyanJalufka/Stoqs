import { SUBTRACT_FUNDS, ADD_FUNDS } from './types'
import axios from 'axios';
import { setUserStocklist } from "./authAction";

export const buyNewStock = (stock, balance) => dispatch => {

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
    dispatch(subtractFunds(stock.cost, balance, stock.owner));
  })
}

export const subtractFunds = (cost, balance, owner) => dispatch => {
  
  let newBalance = balance - cost;
    axios.put(`/users/${owner}`, {
      balance: newBalance
    })
    .then(response => console.log(response))



     dispatch({ type: SUBTRACT_FUNDS, payload: cost })
    
  }
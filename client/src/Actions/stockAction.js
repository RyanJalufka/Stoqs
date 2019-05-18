import { SET_CURRENT_STOCK } from './types';
import axios from 'axios';

export const setCurrentStock = (symbol, shares, dispatch) => {
  return (dispatch) => {
    axios.post('/api/quote', {
      symbol: symbol
    })
    .then(response => response.data)
    .then(data => {
      console.log(data.companyName)
      let payload = {...data, ...shares};
      dispatch({ type: SET_CURRENT_STOCK, payload: payload }) //payload: data, shares
    })
    .catch((error => {
      console.log(error);
    }))
  }
}
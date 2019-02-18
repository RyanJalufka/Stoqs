import { SET_CURRENT_STOCK } from './types';
import axios from 'axios';

export const setCurrentStock = (symbol, dispatch) => {
  return (dispatch) => {
    axios.post('/api/quote', {
      symbol: symbol
    })
    .then(response => response.data)
    .then(data => {
      console.log(data.companyName)
      dispatch({ type: SET_CURRENT_STOCK, payload: data })
    })
    .catch((error => {
      console.log(error);
    }))
  }
}
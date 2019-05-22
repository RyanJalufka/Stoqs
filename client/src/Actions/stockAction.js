import { SET_CURRENT_STOCK_START, SET_CURRENT_FAILURE, SET_CURRENT_SUCCESS} from './types';
import axios from 'axios';

export const setCurrentStock = (symbol, shares, dispatch) => {
  return (dispatch) => {

    dispatch({ type: SET_CURRENT_STOCK_START }) //payload: data, shares

    axios.post('/api/quotechart', {
      symbol: symbol
    })
    .then(response => response.data)
    .then(data => {
      console.log(data.quote.chart)
      let payload = {...data, ...shares};
      dispatch({ type: SET_CURRENT_SUCCESS, payload: payload }) //payload: data, shares
    })
    .catch((error => {
      console.log(error);
    }))
  }
}
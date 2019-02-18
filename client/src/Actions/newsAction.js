import { GET_NEWS } from './types';
import axios from 'axios';

export const getNews = (stockList, dispatch) => {

  const data = stockList.map(value => value.symbol);
  const symbols = data.toString();

  return(dispatch) => {
    axios.post('/news', {
      symbols: symbols
    })
    .then(response => response.data)
    .then(data => {
      dispatch({ type: GET_NEWS, payload: data})
    })
    .catch((error => {
      console.log(error);
    }))
  }
}
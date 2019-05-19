import { GET_NEWS } from './types';
import axios from 'axios';

export const getNews = (stockList, dispatch) => {
    // const data = stockList.map(value => value);

    let symbols;
    if(stockList.length < 1) { 
      symbols = ['msft', 'aapl'] 
    } else {
      symbols = stockList.toString();
    }

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
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import accountReducer from './accountReducer';
import newsReducer from './newsReducer'
import stockReducer from './stockReducer'

export default combineReducers({
  auth: authReducer,
  account: accountReducer,
  errors: errorReducer,
  news: newsReducer,
  currentStock: stockReducer
});
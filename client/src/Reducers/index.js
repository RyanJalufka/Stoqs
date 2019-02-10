import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import accountReducer from './accountReducer';

export default combineReducers({
  auth: authReducer,
  account: accountReducer,
  errors: errorReducer
});
import axios from 'axios';
import setAuthToken from '../Utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  SET_USER_ACCOUNT
} from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
  .post('/users/register', userData)
  .then(res => history.push('/login')) // redirects to login on valid register
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

// Login and get user token
export const loginUser = userData => dispatch => {
  axios
    .post('/users/login', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      console.log('decoded: ', decoded.id)
      dispatch(setCurrentUser(decoded));
      dispatch(setUserAccount(decoded.id));
    })
    .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: 'error'
    })
  );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//
export const setUserAccount = id => {
  return (dispatch) => {
    return axios.get('/users', {
      params: { id: id}
    })

    .then(response => response.data)
    .then(data => {
      let index = data.findIndex(x => x._id === id)

       console.log("RESPONSE IS: ", data[index]);
       dispatch({ type: SET_USER_ACCOUNT, payload: data[index]});
    })
  }
}


// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
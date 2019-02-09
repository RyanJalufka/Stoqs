import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // APPLY AUTHORIZATION token to requests when logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // DELETE auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;

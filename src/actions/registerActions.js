import axios from 'axios';
import URL from './url';

axios.defaults.withCredentials = true;
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const register = (username, password) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  const errors = {};
  const regex = /^[a-zA-Z0-9]+$/i;
  if (!username) {
    errors.username = 'Cannot be blank';
  } else if (!regex.test(username)) {
    errors.username = 'Invalid format, only letters and numbers allowed';
  }
  if (!password) {
    errors.password = 'Cannot be blank';
  } else if (password.length < 5) {
    errors.password = 'Password must be more than 5 characters';
  }
  if (errors.username || errors.password) {
    console.log(errors);
    dispatch({ type: REGISTER_FAILURE, errors });
  } else {
    return axios
      .post(`${URL}/api/user/register`, {
        username,
        password,
      })
      .then((payload) => {
        console.log(payload);
        dispatch({ type: REGISTER_SUCCESS, payload });
      })
      .catch((err) => {
        console.log(err);
        if (err.response) errors.message = err.response.data;
        dispatch({ type: REGISTER_FAILURE, errors });
      });
  }
};

export const registerChild = (name, username, password, userID, accessLevel) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  return axios
    .post(`${URL}/api/user/register`, {
      name,
      username,
      password,
      userID,
      accessLevel,
    })
    .then(({ data }) => {
      console.log(data);
      dispatch({ type: REGISTER_SUCCESS, data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: REGISTER_FAILURE });
    });
};

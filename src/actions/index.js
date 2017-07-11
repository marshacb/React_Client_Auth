import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';
// programmatic navigation

// axios will need the jwt when we make ajax requests
// server will confirm whether user is still authenticated
const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  // redux thunk allows us to dispatch our own actions at any point we want
  // allows us to return a function from an action creator instead of just an action
  // we can dispatch as many actions as we want and handle custom logic

  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token); // localStorage is a method available on window scope
        // - redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'))
      });
  }
}


export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
// remove JWT token
  localStorage.removeItem('token');

  // Return UNAUTH_USER to update state
  return { type: UNAUTH_USER }
}

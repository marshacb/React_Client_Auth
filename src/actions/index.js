import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
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

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
    .then(response => {
      console.log("success", response);
      dispatch({type: AUTH_USER});
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/feature');
    })
    .catch(response => dispatch(authError(response.data.error)));
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

// redux thunk version to allow control with dispatch, gives a lot of power
export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      console.log(response);
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      })
    })
  }
}

//redux promise version, may be easier to read, more clear
// export function fetchMessage() {
//   const request = axios.get(ROOT_URL, {
//     headers: { authorization: localStorage.getItem('token') }
//   });
//
//   return {
//     type: FETCH_MESSAGE,
//     payload: request
//   }
// }

import superagent from 'superagent';
import * as routes from '../lib/routes';

// These are sync actions
export const setToken = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

// we don't need a payload here because all we're doing is taking the token that is already set as a cookie in our browser and removing it
export const removeToken = () => ({
  type: 'TOKEN_REMOVE',
});

// These are async actions

// ES5 version of this function:
/*
  export const userSignup = function(user) {
    return function(store) {
      // superagent logic here
    }
  }

*/

export const userSignup = user => (store) => {
  return superagent.post(`${API_URL}${routes.SIGNUP_ROUTE}`)
    .send(user)
    .withCredentials() // The .withCredentials() method enables the ability to send cookies from the origin
    .then((response) => {
      return store.dispatch(setToken(response.body.token)); // this backend API attaches the token on a "text" property of the response object rather than the body through an individual design choice
    });
};

export const userLogin = user => (store) => {
  return superagent.get(`${API_URL}${routes.LOGIN_ROUTE}`)
    .auth(user.username, user.password)
    .withCredentials()
    .then((response) => {
      return store.dispatch(setToken(response.body.token));
    });
};

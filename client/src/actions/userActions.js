import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import { SET_CURRENT_USER } from './actionTypes';
import setAuthToken from '../utils/setAuthToken';
import Alert from '../utils/Alert';


export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});


export const signupRequest = userData =>
  async (dispatch) => {
    const response = await fetch('/api/v1/users/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const jsonResponse = await response.json().then(jsonRes => jsonRes);

    if (response.status >= 400) {
      const errorMessages = jsonResponse.message;
      (typeof errorMessages === 'object') ? errorMessages.map((message) => { // eslint-disable-line
        Alert(message, 3000, 'red');
      }) : Alert(errorMessages, 3000, 'red');
    }
    const { token } = jsonResponse;
    setAuthToken(jwtDecode(token));
    dispatch(setCurrentUser(token));
    localStorage.setItem('jwtToken', token);
    browserHistory.push('/dashboard');
  };

export const signinRequest = userData =>
  async (dispatch) => {
    const response = await fetch('/api/v1/users/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const jsonResponse = await response.json().then(jsonRes => jsonRes);
    if (response.status >= 400) {
      const errorMessages = jsonResponse.message;
    (typeof errorMessages === 'object') ? errorMessages.map((message) => { // eslint-disable-line
        Alert(message, 3000, 'red');
      }) : Alert(errorMessages, 3000, 'red');
    }
    const { token } = jsonResponse;
    setAuthToken(jwtDecode(token));
    dispatch(setCurrentUser(token));
    localStorage.setItem('jwtToken', token);
    browserHistory.push('/dashboard');
  };

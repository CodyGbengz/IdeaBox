import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import {
  SET_CURRENT_USER,
  FETCH_USER_DETAILS_FAILURE,
  FETCH_USER_DETAILS_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_SUCCESS
} from './actionTypes';
import setAuthToken from '../utils/setAuthToken';
import Alert from '../utils/Alert';


export const setCurrentUser = (token, user) => ({
  type: SET_CURRENT_USER,
  token,
  user
});

export const fetchUserDetailsSuccess = user => ({
  type: FETCH_USER_DETAILS_SUCCESS,
  user
});

export const fetchUserDetailsFailure = message => ({
  type: FETCH_USER_DETAILS_FAILURE,
  message
});

export const updateUserProfileSuccess = user => ({
  type: UPDATE_USER_PROFILE_SUCCESS,
  user
});

export const updateUserProfileFailure = message => ({
  type: UPDATE_USER_PROFILE_FAILURE,
  message
});


export const fetchUserDetails = () =>
  async (dispatch) => {
    const response = await fetch('/api/v1/user', {
      method: 'GET',
      headers: {
        ...setAuthToken(),
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    });
    const jsonResponse = await response.json().then(jsonRes => jsonRes);

    if (response.status >= 400) {
      const errorMessage = jsonResponse.message;
      dispatch(fetchUserDetailsFailure(errorMessage));
      Alert(errorMessage, 3000, 'red');
    } else {
      dispatch(fetchUserDetailsSuccess(jsonResponse.user));
    }
  };

export const updateUserProfile = userData =>
  async (dispatch) => {
    const response = await fetch('/api/v1/user', {
      method: 'PUT',
      headers: {
        ...setAuthToken(),
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const jsonResponse = await response.json().then(jsonRes => jsonRes);

    if (response.status >= 400) {
      const errorMessages = jsonResponse.message;
      dispatch(updateUserProfileFailure(jsonResponse.message));
      (typeof errorMessages === 'object') ? errorMessages.map((message) => { // eslint-disable-line
        Alert(message, 3000, 'red');
      }) : Alert(errorMessages, 3000, 'red');
    }
    dispatch(updateUserProfileSuccess(jsonResponse.updatedUser));
    Alert(jsonResponse.message, 3000, 'green');
  };

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
    const { token, user } = jsonResponse;
    setAuthToken(jwtDecode(token));
    dispatch(setCurrentUser(token, user));
    localStorage.setItem('jwtToken', token);
    browserHistory.push('/dashboard');
  };

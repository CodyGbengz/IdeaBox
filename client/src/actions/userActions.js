import axios from 'axios';
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
  dispatch => axios.post('/api/v1/users/signup', userData)
    .then((res) => {
      const { token } = res.data;
      setAuthToken(jwtDecode(token));
      dispatch(setCurrentUser(token));
      localStorage.setItem('jwtToken', token);
      browserHistory.push('/dashboard');
    }).catch((error) => {
      const errorMessages = error.response.data.message;

      (typeof errorMessages === 'object') ? errorMessages.map((message) => { // eslint-disable-line
        Alert(message, 3000, 'red');
      }) : Alert(errorMessages, 3000, 'red');
    });


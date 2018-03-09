import { browserHistory } from 'react-router';
import {
  SEARCH_IDEAS_FAILURE,
  SEARCH_IDEAS_SUCCESS
} from './actionTypes';
import Alert from '../utils/Alert';
import setAuthToken from '../utils/setAuthToken';

export const searchIdeasSuccess = ideas => ({
  type: SEARCH_IDEAS_SUCCESS,
  ideas
});

export const searchIdeasFailure = message => ({
  type: SEARCH_IDEAS_FAILURE,
  message
});

export const searchIdeas = searchTerm =>
  async (dispatch) => {
    const response = await fetch(`/api/v1/ideas?search=${searchTerm}`, {
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
      dispatch(searchIdeasFailure(errorMessage));
      browserHistory.push('/searchresults');
      Alert(errorMessage, 3000, 'red');
    }
    dispatch(searchIdeasSuccess(jsonResponse.ideas));
    browserHistory.push('/searchresults');
  };

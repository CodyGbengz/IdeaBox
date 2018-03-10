import { browserHistory } from 'react-router';
import {
  FILTER_CATEGORY_FAILURE,
  FILTER_CATEGORY_SUCCESS
} from './actionTypes';
import Alert from '../utils/Alert';
import setAuthToken from '../utils/setAuthToken';

export const filterIdeasSuccess = ideas => ({
  type: FILTER_CATEGORY_SUCCESS,
  ideas
});

export const filterIdeasFailure = message => ({
  type: FILTER_CATEGORY_FAILURE,
  message
});

export const filterIdeas = category =>
  async (dispatch) => {
    const response = await fetch(`/api/v1/ideas?category=${category}`, {
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
      dispatch(filterIdeasFailure(errorMessage));
      Alert(errorMessage, 3000, 'red');
    }
    dispatch(filterIdeasSuccess(jsonResponse.ideas));
    browserHistory.push('/filtered');
  };

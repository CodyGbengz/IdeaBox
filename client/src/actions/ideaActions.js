import {
  FETCH_PUBLIC_IDEAS_FAILURE,
  FETCH_PUBLIC_IDEAS_SUCCESS,
  FETCH_USER_IDEAS_FAILURE,
  FETCH_USER_IDEAS_SUCCESS,
  CREATE_IDEA_FAILURE,
  CREATE_IDEA_SUCCESS
} from '../actions/actionTypes';
import Alert from '../utils/Alert';
import setAuthToken from '../utils/setAuthToken';

export const fetchAllPublicIdeasSuccess = ideas => ({
  type: FETCH_PUBLIC_IDEAS_SUCCESS,
  ideas
});

export const fetchAllPublicIdeasFailure = message => ({
  type: FETCH_PUBLIC_IDEAS_FAILURE,
  message
});

export const fetchUserIdeasSuccess = ideas => ({
  type: FETCH_USER_IDEAS_SUCCESS,
  ideas
});

export const fetchUserIdeasFailure = message => ({
  type: FETCH_USER_IDEAS_FAILURE,
  message
});

export const createIdeaSuccess = newIdea => ({
  type: CREATE_IDEA_SUCCESS,
  newIdea
});

export const createIdeaFailure = message => ({
  type: CREATE_IDEA_FAILURE,
  message
});

export const createIdeas = newIdea =>
  async (dispatch) => {
    const response = await fetch('/api/v1/idea', {
      method: 'POST',
      headers: {
        ...setAuthToken(),
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newIdea)
    });
    const jsonResponse = await response.json().then(jsonRes => jsonRes);

    if (response.status >= 400) {
      const errorMessage = jsonResponse.message;
      dispatch(createIdeaFailure(errorMessage));
      Alert(errorMessage, 3000, 'red');
    }
    dispatch(createIdeaSuccess(jsonResponse.newIdea));
  };

export const fetchUserIdeas = () =>
  async (dispatch) => {
    const response = await fetch('/api/v1/user/ideas', {
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
      dispatch(fetchUserIdeasFailure(errorMessage));
      Alert(errorMessage, 3000, 'red');
    }
    dispatch(fetchUserIdeasSuccess(jsonResponse.ideas));
  };

export const fetchAllPublicIdeas = () =>
  async (dispatch) => {
    const response = await fetch('/api/v1/ideas', {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    });
    const jsonResponse = await response.json().then(jsonRes => jsonRes);

    if (response.status >= 400) {
      const errorMessage = jsonResponse.message;
      dispatch(fetchAllPublicIdeasFailure(errorMessage));
      Alert(errorMessage, 3000, 'red');
    }
    dispatch(fetchAllPublicIdeasSuccess(jsonResponse.ideas));
  };

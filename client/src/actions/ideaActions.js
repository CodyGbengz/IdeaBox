import { browserHistory } from 'react-router';
import {
  FETCH_PUBLIC_IDEAS_FAILURE,
  FETCH_PUBLIC_IDEAS_SUCCESS,
  FETCH_USER_IDEAS_FAILURE,
  FETCH_USER_IDEAS_SUCCESS,
  CREATE_IDEA_FAILURE,
  CREATE_IDEA_SUCCESS,
  EDIT_IDEA_FAILURE,
  EDIT_IDEA_SUCCESS,
  DELETE_SINGLE_IDEA_FAILURE,
  DELETE_SINGLE_IDEA_SUCCESS,
  FETCH_SINGLE_IDEA_FAILURE,
  FETCH_SINGLE_IDEA_SUCCESS
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

export const editIdeaSuccess = newIdea => ({
  type: EDIT_IDEA_SUCCESS,
  newIdea
});

export const editIdeaFailure = message => ({
  type: EDIT_IDEA_FAILURE,
  message
});

export const deleteIdeaSuccess = id => ({
  type: DELETE_SINGLE_IDEA_SUCCESS,
  id
});

export const deleteIdeaFailure = message => ({
  type: DELETE_SINGLE_IDEA_FAILURE,
  message
});

export const fetchSingleIdeaSuccess = idea => ({
  type: FETCH_SINGLE_IDEA_SUCCESS,
  idea
});

export const fetchSingleIdeaFailure = message => ({
  type: FETCH_SINGLE_IDEA_FAILURE,
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
      const errorMessages = jsonResponse.message;
       (typeof errorMessages === 'object') ? errorMessages.map((message) => { // eslint-disable-line
        Alert(message, 3000, 'red');
      }) : Alert(errorMessages, 3000, 'red');
      return dispatch(createIdeaFailure(errorMessages));
    }
    dispatch(createIdeaSuccess(jsonResponse.newidea));
    const successMessage = jsonResponse.message;
    Alert(successMessage, 3000, 'green');
    browserHistory.push('/dashboard');
  };


export const editIdeas = (newIdea, id) =>
  async (dispatch) => {
    const response = await fetch(`/api/v1/idea/${id}`, {
      method: 'PUT',
      headers: {
        ...setAuthToken(),
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newIdea)
    });
    const jsonResponse = await response.json().then(jsonRes => jsonRes);

    if (response.status >= 400) {
      const errorMessages = jsonResponse.message;
      (typeof errorMessages === 'object') ? errorMessages.map((message) => { // eslint-disable-line
        Alert(message, 3000, 'red');
      }) : Alert(errorMessages, 3000, 'red');
      return dispatch(editIdeaFailure(errorMessages));
    }
    const successMessage = jsonResponse.message;
    dispatch(editIdeaSuccess(jsonResponse.modifiedIdea));
    browserHistory.push('/myideas');
    Alert(successMessage, 3000, 'green');
  };

export const deleteIdea = id =>
  async (dispatch) => {
    const response = await fetch(`/api/v1/idea/${id}`, {
      method: 'DELETE',
      headers: {
        ...setAuthToken(),
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    });

    const jsonResponse = await response.json().then(jsonRes => jsonRes);
    if (response.status >= 400) {
      const errorMessage = jsonResponse.message;
      Alert(errorMessage, 3000, 'red');
      browserHistory.push('/myideas');
      return dispatch(deleteIdeaFailure(errorMessage));
    }
    dispatch(deleteIdeaSuccess(jsonResponse.id));
    browserHistory.push('/myideas');
    Alert(jsonResponse.message, 3000, 'green');
  };


export const fetchSingleIdea = id =>
  async (dispatch) => {
    const response = await fetch(`/api/v1/idea/${id}`, {
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
      Alert(errorMessage, 3000, 'red');
      return dispatch(fetchSingleIdeaFailure(errorMessage));
    }
    dispatch(fetchSingleIdeaSuccess(jsonResponse.idea));
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
      Alert(errorMessage, 3000, 'red');
      return dispatch(fetchUserIdeasFailure(errorMessage));
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
      Alert(errorMessage, 3000, 'red');
      return dispatch(fetchAllPublicIdeasFailure(errorMessage));
    }
    dispatch(fetchAllPublicIdeasSuccess(jsonResponse.ideas));
  };


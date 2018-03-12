import { browserHistory } from 'react-router';
import {
  FETCH_PUBLIC_IDEAS_FAILURE,
  FETCH_PUBLIC_IDEAS_SUCCESS,
  FETCH_USER_IDEAS_FAILURE,
  FETCH_USER_IDEAS_SUCCESS,
<<<<<<< HEAD
  CREATE_IDEA_FAILURE,
  CREATE_IDEA_SUCCESS,
  EDIT_IDEA_FAILURE,
  EDIT_IDEA_SUCCESS
=======
  DELETE_SINGLE_IDEA_FAILURE,
  DELETE_SINGLE_IDEA_SUCCESS
>>>>>>> feat(delete-idea): implement delete single idea feature
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

<<<<<<< HEAD
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

export const createIdeas = newIdea =>
  async (dispatch) => {
    const response = await fetch('/api/v1/idea', {
      method: 'POST',
=======
export const deleteIdeaSuccess = id => ({
  type: DELETE_SINGLE_IDEA_SUCCESS,
  id
});

export const deleteIdeaFailure = message => ({
  type: DELETE_SINGLE_IDEA_FAILURE,
  message
});

export const deleteIdea = id =>
  async (dispatch) => {
    const response = await fetch(`/api/v1/idea/${id}`, {
      method: 'DELETE',
>>>>>>> feat(delete-idea): implement delete single idea feature
      headers: {
        ...setAuthToken(),
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
<<<<<<< HEAD
      },
      body: JSON.stringify(newIdea)
    });
    const jsonResponse = await response.json().then(jsonRes => jsonRes);

    if (response.status >= 400) {
      const errorMessage = jsonResponse.message;
      dispatch(createIdeaFailure(errorMessage));
      Alert(errorMessage, 3000, 'red');
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
      dispatch(editIdeaFailure(errorMessages));
      (typeof errorMessages === 'object') ? errorMessages.map((message) => { // eslint-disable-line
        Alert(message, 3000, 'red');
      }) : Alert(errorMessages, 3000, 'red');
    }
    const successMessage = jsonResponse.message;
    dispatch(editIdeaSuccess(jsonResponse.modifiedIdea));
    browserHistory.push('/myideas');
    Alert(successMessage, 3000, 'green');
=======
      }
    });

    const jsonResponse = await response.json().then(jsonRes => jsonRes);
    if (response.status >= 400) {
      const errorMessage = jsonResponse.message;
      dispatch(deleteIdeaFailure(errorMessage));
      Alert(errorMessage, 3000, 'red');
      browserHistory.push('/myideas');
    }
    dispatch(deleteIdeaSuccess(jsonResponse.id));
    browserHistory.push('/myideas');
>>>>>>> feat(delete-idea): implement delete single idea feature
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

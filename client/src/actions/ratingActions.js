import {
  FETCH_IDEA_RATINGS_FAILURE,
  FETCH_IDEA_RATINGS_SUCCESS,
  POST_IDEA_RATINGS_FAILURE,
  POST_IDEA_RATINGS_SUCCESS
} from '../actions/actionTypes';
import Alert from '../utils/Alert';
import setAuthToken from '../utils/setAuthToken';

export const fetchIdeaRatingsSuccess = ratings => ({
  type: FETCH_IDEA_RATINGS_SUCCESS,
  ratings
});

export const fetchIdeaRatingsFailure = message => ({
  type: FETCH_IDEA_RATINGS_FAILURE,
  message
});

export const postIdeaRatingsSuccess = rating => ({
  type: POST_IDEA_RATINGS_SUCCESS,
  rating
});

export const postIdeaRatingsFailure = message => ({
  type: POST_IDEA_RATINGS_FAILURE,
  message
});

export const postRating = (id, stars) =>
  async (dispatch) => {
    const response = await fetch(`/api/v1/idea/${id}/rate`, {
      method: 'PUT',
      headers: {
        ...setAuthToken(),
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ stars })
    });
    const jsonResponse = await response.json().then(jsonRes => jsonRes);
    if (response.status >= 400) {
      const errorMessage = jsonResponse.message;
      dispatch(postIdeaRatingsFailure(errorMessage));
      Alert(errorMessage, 3000, 'red');
    }
    dispatch(postIdeaRatingsSuccess(jsonResponse.rating));
    Alert(jsonResponse.message, 3000, 'green');
  };

export const fetchIdeaRatings = id =>
  async (dispatch) => {
    const response = await fetch(`/api/v1/idea/${id}/rate`, {
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
      dispatch(fetchIdeaRatingsFailure(errorMessage));
      Alert(errorMessage, 3000, 'red');
    }
    dispatch(fetchIdeaRatingsSuccess(jsonResponse.ratings));
  };

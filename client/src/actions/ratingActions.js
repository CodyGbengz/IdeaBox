import {
  FETCH_IDEA_RATINGS_FAILURE,
  FETCH_IDEA_RATINGS_SUCCESS,
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

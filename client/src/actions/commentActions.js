import {
  FETCH_IDEA_COMMENTS_FAILURE,
  FETCH_IDEA_COMMENTS_SUCCESS
} from '../actions/actionTypes';
import Alert from '../utils/Alert';
import setAuthToken from '../utils/setAuthToken';

export const fetchIdeaCommentsSuccess = comments => ({
  type: FETCH_IDEA_COMMENTS_SUCCESS,
  comments
});

export const fetchIdeaCommentsFailure = message => ({
  type: FETCH_IDEA_COMMENTS_FAILURE,
  message
});

export const fetchIdeaComments = id =>
  async (dispatch) => {
    const response = await fetch(`/api/v1/idea/${id}/comments`, {
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
      dispatch(fetchIdeaCommentsFailure(errorMessage));
      Alert(errorMessage, 3000, 'red');
    }
    dispatch(fetchIdeaCommentsSuccess(jsonResponse.comments));
  };

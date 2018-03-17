import {
  FETCH_IDEA_COMMENTS_FAILURE,
  FETCH_IDEA_COMMENTS_SUCCESS,
  POST_COMMENT_FAILURE,
  POST_COMMENT_SUCCESS
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

export const postCommentSuccess = comment => ({
  type: POST_COMMENT_SUCCESS,
  comment
});

export const postConmmentFailure = message => ({
  type: POST_COMMENT_FAILURE,
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
    }
    dispatch(fetchIdeaCommentsSuccess(jsonResponse.comments));
  };

export const postComment = (id, content) =>
  async (dispatch) => {
    const response = await fetch(`/api/v1/idea/${id}/comment`, {
      method: 'POST',
      headers: {
        ...setAuthToken(),
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content)
    });
    const jsonResponse = await response.json().then(jsonRes => jsonRes);
    if (response.status >= 400) {
      const errorMessage = jsonResponse.message;
      Alert(errorMessage, 3000, 'red');
      return dispatch(postConmmentFailure(errorMessage));
    }
    dispatch(postCommentSuccess(jsonResponse.newcomment));
  };

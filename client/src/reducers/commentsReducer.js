import {
  FETCH_IDEA_COMMENTS_FAILURE,
  FETCH_IDEA_COMMENTS_SUCCESS,
  POST_COMMENT_FAILURE,
  POST_COMMENT_SUCCESS
}
  from '../actions/actionTypes';

const commentsReducer = (initialState = [], action = {}) => {
  const { type, comments, comment } = action;
  switch (type) {
    case FETCH_IDEA_COMMENTS_SUCCESS:
      return comments;
    case FETCH_IDEA_COMMENTS_FAILURE:
      return initialState;
    case POST_COMMENT_FAILURE:
      return initialState;
    case POST_COMMENT_SUCCESS:
      return [
        comment,
        ...initialState
      ];
    default:
      return initialState;
  }
};

export default commentsReducer;

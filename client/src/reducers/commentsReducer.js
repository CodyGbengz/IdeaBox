import {
  FETCH_IDEA_COMMENTS_FAILURE,
  FETCH_IDEA_COMMENTS_SUCCESS
}
  from '../actions/actionTypes';

const commentsReducer = (initialState = [], action = {}) => {
  const { type, comments } = action;
  switch (type) {
    case FETCH_IDEA_COMMENTS_SUCCESS:
      return comments;
    case FETCH_IDEA_COMMENTS_FAILURE:
      return initialState;
    default:
      return initialState;
  }
};

export default commentsReducer;

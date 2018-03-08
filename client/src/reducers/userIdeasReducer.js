import {
  FETCH_USER_IDEAS_SUCCESS,
  FETCH_USER_IDEAS_FAILURE
}
  from '../actions/actionTypes';

const userIdeasReducer = (initialState = [], action = {}) => {
  const { type, ideas } = action;
  switch (type) {
    case FETCH_USER_IDEAS_SUCCESS:
      return ideas;
    case FETCH_USER_IDEAS_FAILURE:
      return initialState;
    default:
      return initialState;
  }
};

export default userIdeasReducer;


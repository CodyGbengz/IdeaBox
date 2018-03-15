import {
  FETCH_IDEA_RATINGS_FAILURE,
  FETCH_IDEA_RATINGS_SUCCESS,
}
  from '../actions/actionTypes';

const ratingsReducer = (initialState = [], action = {}) => {
  const { type, ratings } = action;
  switch (type) {
    case FETCH_IDEA_RATINGS_SUCCESS:
      return ratings;
    case FETCH_IDEA_RATINGS_FAILURE:
      return [];
    default:
      return initialState;
  }
};

export default ratingsReducer;


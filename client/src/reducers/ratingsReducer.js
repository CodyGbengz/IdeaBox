import {
  FETCH_IDEA_RATINGS_FAILURE,
  FETCH_IDEA_RATINGS_SUCCESS,
  POST_IDEA_RATINGS_FAILURE,
  POST_IDEA_RATINGS_SUCCESS
}
  from '../actions/actionTypes';

const ratingsReducer = (initialState = [], action = {}) => {
  const { type, ratings, rating } = action;
  switch (type) {
    case FETCH_IDEA_RATINGS_SUCCESS:
      return ratings;
    case FETCH_IDEA_RATINGS_FAILURE:
      return [];
    case POST_IDEA_RATINGS_FAILURE:
      return initialState;
    case POST_IDEA_RATINGS_SUCCESS:
      initialState = initialState.filter(item => item.author !== rating.author);
      return [
        rating,
        ...initialState
      ];
    default:
      return initialState;
  }
};

export default ratingsReducer;


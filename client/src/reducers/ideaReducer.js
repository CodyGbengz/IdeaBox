import { FETCH_PUBLIC_IDEAS_SUCCESS, FETCH_PUBLIC_IDEAS_FAILURE }
  from '../actions/actionTypes';

const ideaReducer = (initialState = [], action = {}) => {
  const { type, ideas } = action;
  switch (type) {
    case FETCH_PUBLIC_IDEAS_SUCCESS:
      return ideas;
    case FETCH_PUBLIC_IDEAS_FAILURE:
      return initialState;
    default:
      return initialState;
  }
};

export default ideaReducer;


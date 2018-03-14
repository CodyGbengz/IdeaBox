import {
  FETCH_PUBLIC_IDEAS_SUCCESS,
  FETCH_PUBLIC_IDEAS_FAILURE,
  CREATE_IDEA_FAILURE,
  CREATE_IDEA_SUCCESS
}
  from '../actions/actionTypes';

const ideaReducer = (initialState = [], action = {}) => {
  const { type, ideas, newIdea } = action;
  switch (type) {
    case FETCH_PUBLIC_IDEAS_SUCCESS:
      return ideas;
    case FETCH_PUBLIC_IDEAS_FAILURE:
      return initialState;
    case CREATE_IDEA_SUCCESS:
      return [
        newIdea,
        ...initialState
      ];
    case CREATE_IDEA_FAILURE:
      return initialState;
    default:
      return initialState;
  }
};

export default ideaReducer;


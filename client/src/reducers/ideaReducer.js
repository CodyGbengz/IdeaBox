import {
  FETCH_PUBLIC_IDEAS_SUCCESS,
  FETCH_PUBLIC_IDEAS_FAILURE,
  CREATE_IDEA_FAILURE,
  CREATE_IDEA_SUCCESS,
  FETCH_SINGLE_IDEA_FAILURE,
  FETCH_SINGLE_IDEA_SUCCESS
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

const singleIdeaReducer = (initialState = {}, action = {}) => {
  const { type, idea } = action;
  switch (type) {
    case FETCH_SINGLE_IDEA_FAILURE:
      return initialState;
    case FETCH_SINGLE_IDEA_SUCCESS:
      return {
        ...initialState,
        ...idea
      };
    default:
      return initialState;
  }
};

const singleIdeaReducer = (initialState = {}, action = {}) => {
  const { type, idea } = action;
  switch (type) {
    case FETCH_SINGLE_IDEA_FAILURE:
      return initialState;
    case FETCH_SINGLE_IDEA_SUCCESS:
      return {
        ...initialState,
        ...idea
      };
    default:
      return initialState;
  }
};

export { ideaReducer, singleIdeaReducer };


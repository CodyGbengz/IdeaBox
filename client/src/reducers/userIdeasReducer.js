import {
  FETCH_USER_IDEAS_SUCCESS,
  FETCH_USER_IDEAS_FAILURE,
  EDIT_IDEA_FAILURE,
  EDIT_IDEA_SUCCESS
}
  from '../actions/actionTypes';

const userIdeasReducer = (initialState = [], action = {}) => {
  const { type, ideas, newIdea } = action;

  switch (type) {
    case FETCH_USER_IDEAS_SUCCESS:
      return ideas;
    case FETCH_USER_IDEAS_FAILURE:
      return initialState;
    case EDIT_IDEA_SUCCESS:
      const updatedItems = initialState.map((idea) => {
        if (idea === newIdea) {
          return [...initialState, ...newIdea];
        }
        return idea;
      });
      return updatedItems;
    case EDIT_IDEA_FAILURE:
      return initialState;
    default:
      return initialState;
  }
};

export default userIdeasReducer;


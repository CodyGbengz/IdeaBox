import { SET_CURRENT_USER } from '../actions/actionTypes';

export default (state = { isAuthenticated: false, user: {} }, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: true,
        user: action.user
      };
    default: return state;
  }
};

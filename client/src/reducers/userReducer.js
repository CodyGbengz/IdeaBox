import {
  SET_CURRENT_USER,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAILURE,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_SUCCESS
} from '../actions/actionTypes';

export default
(state = { isAuthenticated: false, token: '', user: {} }, action) => {
  const {
    type,
    user,
    token,
  } = action;

  switch (type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: true,
        token,
        user
      };
    case FETCH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        user
      };
    case FETCH_USER_DETAILS_FAILURE:
      return state;
    case UPDATE_USER_PROFILE_FAILURE:
      return state;
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        user
      };
    default:
      return state;
  }
};

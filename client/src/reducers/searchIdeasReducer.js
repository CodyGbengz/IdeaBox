import {
  SEARCH_IDEAS_FAILURE,
  SEARCH_IDEAS_SUCCESS
} from '../actions/actionTypes';

const searchResult = (state = [], action) => {
  const { type, ideas, message } = action;
  switch (type) {
    case SEARCH_IDEAS_SUCCESS:
      return ideas;
    case SEARCH_IDEAS_FAILURE:
      return message;
    default:
      return state;
  }
};

export default searchResult;


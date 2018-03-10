import {
  FILTER_CATEGORY_SUCCESS,
  FILTER_CATEGORY_FAILURE
} from '../actions/actionTypes';

const filterIdeas = (state = [], action) => {
  const { type, ideas, message } = action;
  switch (type) {
    case FILTER_CATEGORY_SUCCESS:
      return ideas;
    case FILTER_CATEGORY_FAILURE:
      return message;
    default:
      return state;
  }
};

export default filterIdeas;

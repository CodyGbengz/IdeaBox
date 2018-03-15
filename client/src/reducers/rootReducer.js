import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { ideaReducer, singleIdeaReducer } from './ideaReducer';
import userIdeasReducer from './userIdeasReducer';
import filterIdeasReducer from './filterIdeasReducer';
import searchResult from './searchIdeasReducer';
import commentsReducer from './commentsReducer';
import ratingsReducer from './ratingsReducer';

export default combineReducers({
  userReducer,
  ideaReducer,
  userIdeasReducer,
  filterIdeasReducer,
  searchResult,
  singleIdeaReducer,
  commentsReducer,
  ratingsReducer
});

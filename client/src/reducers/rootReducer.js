import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { ideaReducer, singleIdeaReducer } from './ideaReducer';
import userIdeasReducer from './userIdeasReducer';
import filterIdeasReducer from './filterIdeasReducer';
import searchResult from './searchIdeasReducer';
import commentsReducer from './commentsReducer';

export default combineReducers({
  userReducer,
  ideaReducer,
  userIdeasReducer,
  filterIdeasReducer,
  searchResult,
  singleIdeaReducer,
  commentsReducer
});

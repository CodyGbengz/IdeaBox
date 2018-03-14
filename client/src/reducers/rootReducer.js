import { combineReducers } from 'redux';
import auth from './auth';
import ideaReducer from './ideaReducer';
import userIdeasReducer from './userIdeasReducer';
import filterIdeas from './filterIdeasReducer';
import searchResult from './searchIdeasReducer';

export default combineReducers({
  auth,
  ideaReducer,
  userIdeasReducer,
  filterIdeas,
  searchResult
});

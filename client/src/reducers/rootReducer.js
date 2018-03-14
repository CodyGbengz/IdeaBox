import { combineReducers } from 'redux';
import userReducer from './userReducer';
import ideaReducer from './ideaReducer';
import userIdeasReducer from './userIdeasReducer';
import filterIdeasReducer from './filterIdeasReducer';
import searchResult from './searchIdeasReducer';

export default combineReducers({
  userReducer,
  ideaReducer,
  userIdeasReducer,
  filterIdeasReducer,
  searchResult
});

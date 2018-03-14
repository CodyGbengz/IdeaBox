import { combineReducers } from 'redux';
import auth from './auth';
import ideaReducer from './ideaReducer';
import userIdeasReducer from './userIdeasReducer';
import filterIdeasReducer from './filterIdeasReducer';

export default combineReducers({
  auth,
  ideaReducer,
  userIdeasReducer,
  filterIdeasReducer
});

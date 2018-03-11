import { combineReducers } from 'redux';
import userReducer from './userReducer';
import ideaReducer from './ideaReducer';
import userIdeasReducer from './userIdeasReducer';

export default combineReducers({
  userReducer,
  ideaReducer,
  userIdeasReducer
});

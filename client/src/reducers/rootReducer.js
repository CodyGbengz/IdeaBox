import { combineReducers } from 'redux';
import auth from './auth';
import { ideaReducer, singleIdeaReducer } from './ideaReducer';
import userIdeasReducer from './userIdeasReducer';

export default combineReducers({
  auth,
  ideaReducer,
  userIdeasReducer,
  singleIdeaReducer
});

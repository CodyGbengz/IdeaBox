import { combineReducers } from 'redux';
import auth from './auth';
import { ideaReducer, singleIdeaReducer } from './ideaReducer';
import userIdeasReducer from './userIdeasReducer';
import commentsReducer from './commentsReducer';

export default combineReducers({
  auth,
  ideaReducer,
  userIdeasReducer,
  singleIdeaReducer,
  commentsReducer
});

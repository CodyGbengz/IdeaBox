import { combineReducers } from 'redux';
import auth from './auth';
import ideaReducer from './ideaReducer';

export default combineReducers({
  auth,
  ideaReducer
});

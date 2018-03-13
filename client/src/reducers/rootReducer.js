import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { ideaReducer, singleIdeaReducer } from './ideaReducer';
import userIdeasReducer from './userIdeasReducer';
<<<<<<< HEAD
import filterIdeasReducer from './filterIdeasReducer';
import searchResult from './searchIdeasReducer';
=======
import commentsReducer from './commentsReducer';
>>>>>>> feat(get-comments): implement fetch idea comments feature

export default combineReducers({
  userReducer,
  ideaReducer,
  userIdeasReducer,
<<<<<<< HEAD
  filterIdeasReducer,
  searchResult,
  singleIdeaReducer
=======
  singleIdeaReducer,
  commentsReducer
>>>>>>> feat(get-comments): implement fetch idea comments feature
});

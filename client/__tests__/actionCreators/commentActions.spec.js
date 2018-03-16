import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';
import {
  FETCH_IDEA_COMMENTS_FAILURE,
  FETCH_IDEA_COMMENTS_SUCCESS,
  POST_COMMENT_FAILURE,
  POST_COMMENT_SUCCESS
} from '../../src/actions/actionTypes';

import {
  fetchIdeaComments,
  fetchIdeaCommentsFailure,
  fetchIdeaCommentsSuccess,
  postComment,
  postCommentSuccess,
  postConmentfailure
} from '../../src/actions/commentActions';

import mockItems from '../__mocks__/mockItems';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

window.localStorage = mockLocalStorage;
const token = jwt.sign({ id: 1, user: 'Gbenga' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { comments } = mockItems;
const response = {
  status: 200,
  message: 'Comments fetched successfully',
  comments
};

describe('fetch comments Action', () => {
  it('should create fetch comments action response ', () => {
    const expectedAction = {
      type: FETCH_IDEA_COMMENTS_SUCCESS,
      comments
    };
    expect(fetchIdeaCommentsSuccess(comments)).toEqual(expectedAction);
  });

  it('should create an action to receive fetchPublicIdeas error', () => {
    const expectedAction = {
      type: FETCH_IDEA_COMMENTS_FAILURE,
      message: 'kd'
    };
    expect(fetchIdeaCommentsFailure('kd')).toEqual(expectedAction);
  });

  // it('should return an array of ideas if the request is successful', () => {
  //   fetchMock.get('/api/v1/ideas',
  //     JSON.stringify(response));

  //   const initialState = {};
  //   const store = mockStore(initialState);
  //   const actions = store.getActions();
  //   const expectedActions = [
  //     {
  //       type: FETCH__SUCCESS,
  //       ideas: response.ideas
  //     },
  //   ];
  //   return store.dispatch(fetchAllPublicIdeas())
  //     .then(() => {
  //       expect(actions).toEqual(expectedActions);
  //       store.clearActions();
  //       fetchMock.reset();
  //     })
  //     .catch();
});

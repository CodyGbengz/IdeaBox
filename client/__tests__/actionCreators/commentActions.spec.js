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
  postConmmentFailure
} from '../../src/actions/commentActions';

import mockItems from '../__mocks__/mockItems';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

window.localStorage = mockLocalStorage;
const token = jwt.sign({ id: 1, user: 'Gbenga' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { comments, comment } = mockItems;

describe('fetch comments Action', () => {
  const response = {
    status: 200,
    message: 'Comments fetched successfully',
    comments
  };

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
      message: 'no comments posted for this idea yet'
    };
    expect(fetchIdeaCommentsFailure('no comments posted for this idea yet'))
      .toEqual(expectedAction);
  });

  it('should return an array of ideas if the request is successful', () => {
    const id = 'ajdfnioponalkflnflk903';
    fetchMock.get(
      `/api/v1/idea/${id}/comments`,
      JSON.stringify(response)
    );

    const initialState = [];
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: FETCH_IDEA_COMMENTS_SUCCESS,
        comments: response.comments
      },
    ];
    return store.dispatch(fetchIdeaComments(id))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});

describe('post comments Action', () => {
  const response = {
    status: 201,
    message: 'Comments fetched successfully',
    comment
  };

  it('should create post comment action response ', () => {
    const expectedAction = {
      type: POST_COMMENT_SUCCESS,
      comment
    };
    expect(postCommentSuccess(comment)).toEqual(expectedAction);
  });

  it('should create an action to receive fetchPublicIdeas error', () => {
    const expectedAction = {
      type: POST_COMMENT_FAILURE,
      message: 'no comments posted for this idea yet'
    };
    expect(postConmmentFailure('no comments posted for this idea yet'))
      .toEqual(expectedAction);
  });

  it('should return an array of ideas if the request is successful', () => {
    const id = 'ajdfnioponalkflnflk903';
    fetchMock.post(
      `/api/v1/idea/${id}/comment`,
      { status: 201, body: response }
    );
    const initialState = [];
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: POST_COMMENT_SUCCESS,
        comment
      },
    ];
    return store.dispatch(postComment(id, comment))
      .then(() => {
        expect(actions.type).toEqual(expectedActions.type);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});

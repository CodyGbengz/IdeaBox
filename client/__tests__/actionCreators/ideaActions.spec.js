import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';
import {
  FETCH_PUBLIC_IDEAS_FAILURE,
  FETCH_PUBLIC_IDEAS_SUCCESS,
  FETCH_USER_IDEAS_SUCCESS,
  FETCH_USER_IDEAS_FAILURE,
  FETCH_SINGLE_IDEA_FAILURE,
  FETCH_SINGLE_IDEA_SUCCESS,
  DELETE_SINGLE_IDEA_FAILURE,
  DELETE_SINGLE_IDEA_SUCCESS
} from '../../src/actions/actionTypes';

import {
  fetchAllPublicIdeas,
  fetchAllPublicIdeasFailure,
  fetchAllPublicIdeasSuccess,
  fetchUserIdeas,
  fetchUserIdeasFailure,
  fetchUserIdeasSuccess,
  fetchSingleIdea,
  fetchSingleIdeaFailure,
  fetchSingleIdeaSuccess,
  deleteIdea,
  deleteIdeaFailure,
  deleteIdeaSuccess
} from '../../src/actions/ideaActions';

import mockItems from '../__mocks__/mockItems';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

window.localStorage = mockLocalStorage;
const token = jwt.sign({ id: 1, user: 'Gbenga'}, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { ideas, idea } = mockItems;
const response = {
  status: 200,
  message: 'Ideas fetched successfully',
  ideas
};

describe('Fetch idea Action', () => {
  it('should create fetchIdeasSuccess action response', () => {
    const expectedAction = {
      type: FETCH_PUBLIC_IDEAS_SUCCESS,
      ideas
    };
    expect(fetchAllPublicIdeasSuccess(ideas)).toEqual(expectedAction);
  });

  it('should create an action to receive fetchPublicIdeas error', () => {
    const expectedAction = {
      type: FETCH_PUBLIC_IDEAS_FAILURE,
      message: 'kd'
    };
    expect(fetchAllPublicIdeasFailure('kd')).toEqual(expectedAction);
  });

  it('should return an array of ideas if the request is successful', () => {
    fetchMock.get('/api/v1/ideas',
      JSON.stringify(response));

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: FETCH_PUBLIC_IDEAS_SUCCESS,
        ideas: response.ideas
      },
    ];
    return store.dispatch(fetchAllPublicIdeas())
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});

describe('Fetch user ideas Action', () => {
  it('should create fetchUserIdeasSuccess action response', () => {
    const expectedAction = {
      type: FETCH_USER_IDEAS_SUCCESS,
      ideas
    };
    expect(fetchUserIdeasSuccess(ideas)).toEqual(expectedAction);
  });

  it('should create an action to receive fetchPublicIdeas error', () => {
    const expectedAction = {
      type: FETCH_USER_IDEAS_FAILURE,
      message: 'an error occured'
    };
    expect(fetchUserIdeasFailure('an error occured')).toEqual(expectedAction);
  });

  it('should return an array of ideas if the request is successful', () => {
    fetchMock.get('/api/v1/user/ideas',
      JSON.stringify(response));

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: FETCH_USER_IDEAS_SUCCESS,
        ideas: response.ideas
      },
    ];
    return store.dispatch(fetchUserIdeas())
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});

describe('Fetch single idea Action', () => {
  const id = 'dljdljfdkkldflkdjfio9049u4';

  it('should create fetchSingleIdeaSuccess action response', () => {
    const expectedAction = {
      type: FETCH_SINGLE_IDEA_SUCCESS,
      idea
    };
    expect(fetchSingleIdeaSuccess(idea)).toEqual(expectedAction);
  });

  it('should create an action to receive fetchSingleIdea error', () => {
    const expectedAction = {
      type: FETCH_SINGLE_IDEA_FAILURE,
      message: 'an error occured'
    };
    expect(fetchSingleIdeaFailure('an error occured')).toEqual(expectedAction);
  });

  it('should return an array of ideas if the request is successful', () => {
    fetchMock.get(`/api/v1/idea/${id}`,
      JSON.stringify(response));

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: FETCH_SINGLE_IDEA_SUCCESS,
      },
    ];
    return store.dispatch(fetchSingleIdea(id))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});

describe('Delete idea Action', () => {
  const id = 'dljdljfdkkldflkdjfio9049u4';

  it('should create deleteIdeaSuccess action response', () => {
    const expectedAction = {
      type: DELETE_SINGLE_IDEA_SUCCESS
    };
    expect(deleteIdeaSuccess()).toEqual(expectedAction);
  });

  it('should create an action to dispatch fetchSingleIdea error', () => {
    const expectedAction = {
      type: DELETE_SINGLE_IDEA_FAILURE
    };
    expect(deleteIdeaFailure()).toEqual(expectedAction);
  });

  it('should return an array of ideas if the request is successful', () => {
    fetchMock.deleteOnce(`/api/v1/idea/${id}`,
      JSON.stringify(response));

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: DELETE_SINGLE_IDEA_SUCCESS,
      },
    ];
    return store.dispatch(deleteIdea(id))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});

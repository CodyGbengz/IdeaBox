import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';
import {
  SEARCH_IDEAS_SUCCESS,
  SEARCH_IDEAS_FAILURE,
} from '../../src/actions/actionTypes';

import {
  searchIdeasFailure,
  searchIdeasSuccess,
  searchIdeas
} from '../../src/actions/searchActions';

import mockItems from '../__mocks__/mockItems';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

window.localStorage = mockLocalStorage;
const token = jwt.sign({ id: 1, user: 'Gbenga' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { ideas } = mockItems;
const response = {
  status: 200,
  message: 'ideas fetched successfully',
  ideas
};

describe('search ideas', () => {
  const searchTerm = 'title';
  it('should create search ideas action response ', () => {
    const expectedAction = {
      type: SEARCH_IDEAS_SUCCESS,
      ideas
    };
    expect(searchIdeasSuccess(ideas)).toEqual(expectedAction);
  });

  it('should create an action to receive fetchPublicIdeas error', () => {
    const expectedAction = {
      type: SEARCH_IDEAS_FAILURE,
      message: 'no ideas found matching your searchterm'
    };
    expect(searchIdeasFailure('no ideas found matching your searchterm'))
      .toEqual(expectedAction);
  });

  it('should return an array of ideas if the request is successful', () => {
    fetchMock.get(
      '/api/v1/ideas?search=title',
      JSON.stringify(response)
    );

    const initialState = {};
    const store = mockStore(initialState);
    const actions = store.getActions();
    const expectedActions = [
      {
        type: SEARCH_IDEAS_SUCCESS,
        ideas: response.ideas
      },
    ];
    return store.dispatch(searchIdeas(searchTerm))
      .then(() => {
        expect(actions).toEqual(expectedActions);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});

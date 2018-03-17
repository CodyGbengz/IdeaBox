import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  FILTER_CATEGORY_FAILURE,
  FILTER_CATEGORY_SUCCESS
} from '../../src/actions/actionTypes';

import {
  filterIdeas,
  filterIdeasFailure,
  filterIdeasSuccess
} from '../../src/actions/filterActions';

import mockItems from '../__mocks__/mockItems';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

jest.mock('react-router');


window.localStorage = mockLocalStorage;
const token = jwt.sign({ id: 1, user: 'Gbenga' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { ideas, idea } = mockItems;


describe('filter idea ', () => {
  it('should call filterIdeaSuccess action response', () => {
    const expectedAction = {
      type: FILTER_CATEGORY_SUCCESS,
      ideas: idea
    };
    expect(filterIdeasSuccess(idea)).toEqual(expectedAction);
  });

  it('should not filter ideas', () => {
    const expectedAction = {
      type: FILTER_CATEGORY_FAILURE,
      message: 'an error occured while processing your request'
    };
    expect(filterIdeasFailure('an error occured while processing your request'))
      .toEqual(expectedAction);
  });

  it(
    'should dispatch a sucessful action when an idea is filtered succesfully',
    () => {
      const category = 'music';
      const response = {
        ideas
      };
      fetchMock.get(
        `/api/v1/ideas?category=${category}`,
        { status: 200, body: response }
      );

      const initialState = {};
      const store = mockStore(initialState);
      const actions = store.getActions();
      const expectedActions = [
        {
          type: FILTER_CATEGORY_SUCCESS,
          ideas: response.ideas
        },
      ];
      return store.dispatch(filterIdeas(category))
        .then(() => {
          expect(actions).toEqual(expectedActions);
          store.clearActions();
          fetchMock.reset();
        })
        .catch();
    }
  );
});

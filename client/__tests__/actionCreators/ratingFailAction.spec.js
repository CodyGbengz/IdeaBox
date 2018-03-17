import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  FETCH_IDEA_RATINGS_FAILURE,
  POST_IDEA_RATINGS_FAILURE
} from '../../src/actions/actionTypes';

import {
  postRating,
  fetchIdeaRatings,
} from '../../src/actions/ratingActions';

import mockLocalStorage from '../__mocks__/mockLocalStorage';

jest.mock('react-router');


window.localStorage = mockLocalStorage;
const token = jwt.sign({ id: 1, user: 'Gbenga' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('Rating Action test ', () => {
  it(
    'should dispatch a successful action when an idea rating is fetched succesfully',
    () => {
      const id = 2;
      const response = {
        message: 'Bad request'
      };
      fetchMock.get(
        `/api/v1/idea/${id}/rate`,
        { status: 400, body: response }
      );

      const initialState = {};
      const store = mockStore(initialState);
      const actions = store.getActions();
      const expectedActions = [
        {
          type: FETCH_IDEA_RATINGS_FAILURE,
          message: response.message
        },
      ];
      return store.dispatch(fetchIdeaRatings(id))
        .then(() => {
          expect(actions).toEqual(expectedActions);
          store.clearActions();
          fetchMock.reset();
        })
        .catch();
    }
  );

  it(
    'should dispatch a successful action when an idea rating created succesfully',
    () => {
      const id = '-Lxgcfhvbnjhr';
      const response = {
        message: 'Bad Request'
      };
      fetchMock.putOnce(
        `/api/v1/idea/${id}/rate`,
        { status: 400, body: response }
      );

      const initialState = {};
      const store = mockStore(initialState);
      const actions = store.getActions();
      const expectedActions = [
        {
          type: POST_IDEA_RATINGS_FAILURE,
          message: response.message
        },
      ];
      return store.dispatch(postRating(id))
        .then(() => {
          expect(actions).toEqual(expectedActions);
          store.clearActions();
          fetchMock.reset();
        })
        .catch();
    }
  );
});

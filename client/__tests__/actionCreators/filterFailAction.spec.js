import jwt from 'jsonwebtoken';
import expect from 'expect';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import { FILTER_CATEGORY_FAILURE } from '../../src/actions/actionTypes';
import { filterIdeas } from '../../src/actions/filterActions';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

jest.mock('react-router');


window.localStorage = mockLocalStorage;
const token = jwt.sign({ id: 1, user: 'Gbenga' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('filter idea ', () => {
  it(
    'should dispatch a failed action when an idea is not filtered succesfully',
    () => {
      const category = 'music';
      const response = {
        message: 'Bad request'
      };
      fetchMock.get(
        `/api/v1/ideas?category=${category}`,
        { status: 400, body: response }
      );

      const initialState = {};
      const store = mockStore(initialState);
      const actions = store.getActions();
      const expectedActions = [
        {
          type: FILTER_CATEGORY_FAILURE,
          message: response.message
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

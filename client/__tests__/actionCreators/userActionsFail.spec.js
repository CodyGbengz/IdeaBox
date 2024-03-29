import expect from 'expect';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwtDecode from 'jwt-decode';
import configureMockStore from 'redux-mock-store';
import mockLocalStorage from '../__mocks__/mockLocalStorage';
import mockItems from '../__mocks__/mockItems';
import {
  setCurrentUser,
  signupRequest,
  signinRequest
} from '../../src/actions/userActions';
import { SET_CURRENT_USER } from '../../src/actions/actionTypes';

window.localStorage = mockLocalStorage;
let store;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

jest.mock('../../src/utils/Alert');
jest.mock('../../src/utils/setAuthToken');
jest.mock('jwt-decode');
jest.mock('react-router');


const mockToken = 'dsfghjhg45678908y7t';
const response = {
  message: 'username already exist'
};
describe('>>>A C T I O N --- userActions', () => {
  beforeEach(() => {
    store = mockStore({});
  });
  // Sign up User Action
  it('should not create a SIGN_UP action type due to an error response', () => {
    fetchMock.postOnce('/api/v1/users/signup', { status: 409, body: response });
    const actions = store.getActions();
    const expectedAction = [{ type: 'SET_CURRENT_USER', user: undefined }];
    return store.dispatch(signupRequest(mockItems.user))
      .then(() => {
        expect(actions).toEqual(expectedAction);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });

  it('should not create a SIGN_UP action type due to an error response', () => {
    response.message = ['username already exist'];
    fetchMock.postOnce('/api/v1/users/signup', { status: 409, body: response });
    const actions = store.getActions();
    const expectedAction = [{ type: 'SET_CURRENT_USER', user: undefined }];
    return store.dispatch(signupRequest(mockItems.user))
      .then(() => {
        expect(actions).toEqual(expectedAction);
        store.clearActions();
        fetchMock.reset();
      })
      .catch();
  });
});

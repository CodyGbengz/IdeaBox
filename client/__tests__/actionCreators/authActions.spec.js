import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';
import configureMockStore from 'redux-mock-store';
import mockLocalStorage from '../__mocks__/mockLocalStorage';
import mockItems from '../__mocks__/mockItems';
import {
  setCurrentUser,
  signupRequest,
} from '../../src/actions/userActions';
import { SET_CURRENT_USER } from '../../src/actions/actionTypes';

let store;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

jest.mock('../../src/utils/Alert');
jest.mock('../../src/utils/setAuthToken');
jest.mock('jwt-decode');


describe('>>>A C T I O N --- userActions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });
  afterEach(() => moxios.uninstall());
  // Sign up User Action
  describe('User sign up action', () => {
    it('should not create a SIGN_UP action type due to an error response', async (done) => {
      moxios.stubRequest('/api/v1/users/signup', {
        status: 400,
        response: {
          response: {
            data: {
              token: 'gu8sy8gs8s'
            }
          }
        }
      });
      await store.dispatch(signupRequest(mockItems.user))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual([]);
          expect(actions.type).toEqual(undefined);
          done();
        });
    });

    it('should create a SIGN_UP action type', async (done) => {
      moxios.stubRequest('/api/v1/users/signup', {
        status: 201,
        response: {
          status: 'success',
          token: 'gu8sy8gs8s'
        }
      });
      await store.dispatch(signupRequest(mockItems.user))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(SET_CURRENT_USER);
          done();
        });
    });
    it('should dispatch SET_CURRENT_USER action type', () => {
      const payload = {
        status: 'success',
        message: 'User authenticated successfully'
      };
      const expectedAction = {
        type: SET_CURRENT_USER,
        payload
      };
      expect(setCurrentUser(payload).type).toEqual(expectedAction.type);
    });
  });
});

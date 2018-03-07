import expect from 'expect';
import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER } from '../../src/actions/actionTypes';
import reducer from '../../src/reducers/auth';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthenticated: false,
      user: {},
    });
  });

  it('should update current user state', () => {
    expect(reducer(undefined, {
      type: SET_CURRENT_USER,
      isAuthenticated: true,
      user: {
        id: 'userId',
        username: 'tester'
      }
    })).toEqual({
      isAuthenticated: true,
      user: {
        username: 'tester',
        id: 'userId'
      }
    });
  });

  // it('should return  signup successful state', () => {
  //   expect(reducer(undefined, {
  //     type: SIGNUP_SUCCESS,
  //     response: 'Registration successful'
  //   })).toEqual([

  //     {
  //       isRegistered: !isEmpty('Registration successful'),
  //       response: 'Registration successful',
  //       data: {},
  //       error: '',
  //       isFetching: false,
  //     },
  //     {
  //       isRegistered: false,
  //       data: {},
  //       error: '',
  //       isFetching: false,
  //       response: {}
  //     }
  //   ]);
  // });

  // it('should return  signup failed state', () => {
  //   expect(reducer(undefined, {
  //     type: SIGNUP_FAILURE,
  //     error: 'Bad request'
  //   })).toEqual([

  //     {
  //       isRegistered: isEmpty('Bad request'),
  //       error: 'Bad request',
  //       data: {},
  //       isFetching: false,
  //       response: {}

  //     },
  //     {
  //       isRegistered: false,
  //       data: {},
  //       error: '',
  //       isFetching: false,
  //       response: {}
  //     }
  //   ]);
  // });
});

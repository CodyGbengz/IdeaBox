import expect from 'expect';
import {
  SET_CURRENT_USER,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAILURE,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_SUCCESS
} from '../../src/actions/actionTypes';
import reducer from '../../src/reducers/userReducer';
import mockItems from '../__mocks__/mockItems';

const { user, updateUser } = mockItems;

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthenticated: false,
      user: {},
      token: ''
    });
  });

  it('should set current user state', () => {
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

  it('should return fetch user fail state', () => {
    expect(reducer(undefined, {
      type: FETCH_USER_DETAILS_FAILURE,
      message: 'an error occured while processing your request'
    })).toEqual({
      isAuthenticated: false,
      token: '',
      user: {}
    });
  });

  it('should return update user fail state', () => {
    expect(reducer(undefined, {
      type: UPDATE_USER_PROFILE_FAILURE,
      message: 'an error occured while processing your request'
    })).toEqual({
      isAuthenticated: false,
      token: '',
      user: {}
    });
  });

  it('should return fetch user details success state', () => {
    expect(reducer({}, {
      type: FETCH_USER_DETAILS_SUCCESS,
      user
    })).toEqual({ user });
  });

  it('should return update user profile success state', () => {
    expect(reducer({}, {
      type: UPDATE_USER_PROFILE_SUCCESS,
      user: updateUser
    })).toEqual({
      user: {
        email: 'gbenga@gmail.com',
        id: 'dkljadhfojfnodfjddkljn',
        username: 'Gbengz'
      }
    });
  });
});

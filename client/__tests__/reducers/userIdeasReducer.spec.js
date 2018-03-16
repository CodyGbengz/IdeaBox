import expect from 'expect';
import {
  FETCH_USER_IDEAS_SUCCESS,
  FETCH_USER_IDEAS_FAILURE,
  EDIT_IDEA_FAILURE,
  EDIT_IDEA_SUCCESS,
  DELETE_SINGLE_IDEA_FAILURE,
  DELETE_SINGLE_IDEA_SUCCESS
} from '../../src/actions/actionTypes';
import reducer from '../../src/reducers/userIdeasReducer';
import mockItems from '../../__tests__/__mocks__/mockItems';

const { ideas } = mockItems;
describe('user ideas reducer', () => {
  it('should return the initial state', () => {
    expect(reducer([], [])).toEqual([]);
  });

  it('should return  fetchUsersIdeas success state', () => {
    expect(reducer([], {
      type: FETCH_USER_IDEAS_SUCCESS,
      ideas
    })).toEqual([{
      _id: 'dljdljfdkkldflkdjfio9049u4',
      category: 'science',
      description: 'description',
      dueby: '10/10/2010',
      status: 'public',
      title: 'title'
    }]);
  });

  it('should return fetchUserIdeas failure state', () => {
    expect(reducer([], {
      type: FETCH_USER_IDEAS_FAILURE,
      message: 'your list of ideas is empty'
    })).toEqual([]);
  });

  it('should return editUserIdeas failure state', () => {
    expect(reducer([], {
      type: EDIT_IDEA_FAILURE,
      message: 'your list of ideas is empty'
    })).toEqual([]);
  });

  it('should return deleteIdea failure state', () => {
    expect(reducer([], {
      type: DELETE_SINGLE_IDEA_FAILURE
    })).toEqual([]);
  });

  it('should return deleteIdea success state', () => {
    expect(reducer([], {
      type: DELETE_SINGLE_IDEA_SUCCESS
    })).toEqual([]);
  });
});

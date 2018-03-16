import expect from 'expect';
import {
  FETCH_IDEA_RATINGS_FAILURE,
  FETCH_IDEA_RATINGS_SUCCESS,
  POST_IDEA_RATINGS_FAILURE,
  POST_IDEA_RATINGS_SUCCESS
} from '../../src/actions/actionTypes';
import reducer from '../../src/reducers/ratingsReducer';

describe('ratings reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, [])).toEqual([]);
  });

  it('should return fetch comments fail state', () => {
    expect(reducer([], {
      type: FETCH_IDEA_RATINGS_FAILURE,
      message: 'no ratings posted yet'
    })).toEqual([]);
  });

  it('should return fetch comments fail state', () => {
    expect(reducer([], {
      type: POST_IDEA_RATINGS_FAILURE,
      message: 'an error occured while processing your request'
    })).toEqual([]);
  });

  
});

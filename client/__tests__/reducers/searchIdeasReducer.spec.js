import expect from 'expect';
import {
 SEARCH_IDEAS_FAILURE,
 SEARCH_IDEAS_SUCCESS
} from '../../src/actions/actionTypes';
import reducer from '../../src/reducers/searchIdeasReducer';
import mockItems from '../../__tests__/__mocks__/mockItems';

const { ideas } = mockItems;

describe('search reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, [])).toEqual([]);
  });

  it('should return search ideas fail state', () => {
    expect(reducer([], {
      type: SEARCH_IDEAS_FAILURE,
      message: 'no ideas found matching your search term'
    })).toEqual('no ideas found matching your search term');
  });

  it('should return search ideas success state', () => {
    expect(reducer([], {
      type: SEARCH_IDEAS_SUCCESS,
      ideas
    })).toEqual(ideas);
  });
});

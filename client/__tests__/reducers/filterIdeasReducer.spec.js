import expect from 'expect';
import {
  FILTER_CATEGORY_SUCCESS,
  FILTER_CATEGORY_FAILURE
} from '../../src/actions/actionTypes';
import reducer from '../../src/reducers/filterIdeasReducer';
import mockItems from '../__mocks__/mockItems';

const { ideas } = mockItems;

describe('filter reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, [])).toEqual([]);
  });

  it('should return filter by category fail state', () => {
    expect(reducer([], {
      type: FILTER_CATEGORY_FAILURE,
      message: 'no ideas under this category yet'
    })).toEqual('no ideas under this category yet');
  });

  it('should return filter by category success state', () => {
    expect(reducer([], {
      type: FILTER_CATEGORY_SUCCESS,
      ideas
    })).toEqual([
      {
        _id: 'dljdljfdkkldflkdjfio9049u4',
        title: 'title',
        description: 'description',
        dueby: '10/10/2010',
        category: 'science',
        status: 'public'
      }
    ]);
  });
});

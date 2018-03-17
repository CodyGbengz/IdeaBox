import expect from 'expect';
import {
  FETCH_IDEA_COMMENTS_SUCCESS,
  FETCH_IDEA_COMMENTS_FAILURE,
  POST_COMMENT_FAILURE,
  POST_COMMENT_SUCCESS
} from '../../src/actions/actionTypes';
import reducer from '../../src/reducers/commentsReducer';
import mockItems from '../__mocks__/mockItems';

const { comments } = mockItems;
describe('comments reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, [])).toEqual([]);
  });

  it('should return fetch comments fail state', () => {
    expect(reducer([], {
      type: FETCH_IDEA_COMMENTS_FAILURE,
      message: 'no comments posted yet'
    })).toEqual([]);
  });

  it('should return fetch comments success state', () => {
    expect(reducer([], {
      type: FETCH_IDEA_COMMENTS_SUCCESS,
      comments
    })).toEqual([{
      _id: 'kdhdj3u900940049uj9fh9hbdd',
      author: {
        username: 'username',
      },
      content: 'comment content',
      createdAt: '10/10/2020',
    }]);
  });

  it('should return post comment fail state', () => {
    expect(reducer([], {
      type: POST_COMMENT_FAILURE,
      comment: {
        content: 'content',
      }
    })).toEqual([]);
  });

  it('should return post comment success state', () => {
    expect(reducer([], {
      type: POST_COMMENT_SUCCESS,
      comment: {
        content: 'content',
      }
    })).toEqual([{
      content: 'content'
    }]);
  });
});

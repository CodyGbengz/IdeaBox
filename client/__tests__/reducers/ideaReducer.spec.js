import expect from 'expect';
import { ideaReducer, singleIdeaReducer } from '../../src/reducers/ideaReducer';
import {
  FETCH_PUBLIC_IDEAS_SUCCESS,
  FETCH_PUBLIC_IDEAS_FAILURE,
  CREATE_IDEA_FAILURE,
  CREATE_IDEA_SUCCESS,
  FETCH_SINGLE_IDEA_FAILURE,
  FETCH_SINGLE_IDEA_SUCCESS
} from '../../src/actions/actionTypes';

import mockItems from '../__mocks__/mockItems';

const { ideas, idea } = mockItems;


let initialState;
describe('ideaReducer', () => {
  beforeEach(() => {
    initialState = [];
  });

  it('should return the initial state', () => {
    expect(ideaReducer(undefined, {})).toEqual(initialState);
  });

  it('should return a list of ideas when called with action type CREATE_IDEA_SUCCESS', () => {
    expect(ideaReducer(initialState, {
      type: CREATE_IDEA_SUCCESS,
      ideas
    }))
  });

  it('should return previous state when called with action type CREATE_IDEA_FAILURE', () => {
    expect(ideaReducer(initialState, {
      type: CREATE_IDEA_FAILURE,
      message: 'an error occured while processing your request'
    })).toEqual(initialState);
  });
  
  it('should return a list of ideas when called with action type FETCH_PUBLIC_IDEAS_SUCCESS', () => {
    expect(ideaReducer({}, {
      type: FETCH_PUBLIC_IDEAS_SUCCESS,
      ideas
    })).toEqual(ideas);
  });

  it('should return the previous state when called with action type FETCH_PUBLIC_IDEAS_FAILURE', () => {
    expect(ideaReducer(initialState, {
      type: FETCH_PUBLIC_IDEAS_FAILURE,
      message: 'no ideas created yet'
    })).toEqual([]);
  });
});

describe('singleIdeaReducer', () => {
  beforeEach(() => {
    initialState = {};
  });

  it('should return the initial state', () => {
    expect(singleIdeaReducer(undefined, {})).toEqual(initialState);
  });

  it('should return a list of ideas when called with action type FETCH_SINGLE_IDEA_SUCCESS', () => {
    expect(singleIdeaReducer({}, {
      type: FETCH_SINGLE_IDEA_SUCCESS,
      idea
    })).toEqual(idea);
  });

  it('should return a list of ideas when called with action type FETCH_SINGLE_IDEA_SUCCESS', () => {
    expect(singleIdeaReducer({}, {
      type: FETCH_SINGLE_IDEA_FAILURE,
      message: 'idea not found'
    })).toEqual({});
  });

});

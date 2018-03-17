import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import jwt from 'jsonwebtoken';


import {
  FETCH_IDEA_RATINGS_FAILURE,
  FETCH_IDEA_RATINGS_SUCCESS,
  POST_IDEA_RATINGS_SUCCESS,
  POST_IDEA_RATINGS_FAILURE
} from '../../src/actions/actionTypes';

import {
  postRating,
  fetchIdeaRatings,
  postIdeaRatingsFailure,
  fetchIdeaRatingsSuccess,
  fetchIdeaRatingsFailure,
  postIdeaRatingsSuccess
} from '../../src/actions/ratingActions';


import mockLocalStorage from '../__mocks__/mockLocalStorage';

jest.mock('react-router');


window.localStorage = mockLocalStorage;
const token = jwt.sign({ id: 1, user: 'Gbenga' }, 'encoded');

window.localStorage.setItem('jwtToken', token);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('Rating Action test ', () => {
  it('should call postIdeaRatingsSuccess action response', () => {
    const expectedAction = {
      type: POST_IDEA_RATINGS_SUCCESS,
      rating: 2
    };
    expect(postIdeaRatingsSuccess(2)).toEqual(expectedAction);
  });

  it('should call postIdeaRatingsFailure action response', () => {
    const expectedAction = {
      type: POST_IDEA_RATINGS_FAILURE,
      message: 'an error occured while processing your request'
    };
    expect(postIdeaRatingsFailure('an error occured while processing your request'))
      .toEqual(expectedAction);
  });

  it('should call fetchIdeaRatingsFailure action response', () => {
    const expectedAction = {
      type: FETCH_IDEA_RATINGS_FAILURE,
      message: 'an error occured while processing your request'
    };
    expect(fetchIdeaRatingsFailure('an error occured while processing your request'))
      .toEqual(expectedAction);
  });

  it('should call fetchIdeaRatingsSuccess action response', () => {
    const expectedAction = {
      type: FETCH_IDEA_RATINGS_SUCCESS,
      ratings: 2
    };
    expect(fetchIdeaRatingsSuccess(2))
      .toEqual(expectedAction);
  });

  it(
    'should dispatch a successful action when an idea rating is fetched succesfully',
    () => {
      const id = 2;
      const response = {
        ratings: 2
      };
      fetchMock.get(
        `/api/v1/idea/${id}/rate`,
        { status: 200, body: response }
      );

      const initialState = {};
      const store = mockStore(initialState);
      const actions = store.getActions();
      const expectedActions = [
        {
          type: FETCH_IDEA_RATINGS_SUCCESS,
          ratings: response.ratings
        },
      ];
      return store.dispatch(fetchIdeaRatings(id))
        .then(() => {
          expect(actions).toEqual(expectedActions);
          store.clearActions();
          fetchMock.reset();
        })
        .catch();
    }
  );

  it(
    'should dispatch a successful action when an idea rating created succesfully',
    () => {
      const id = '-Lxgcfhvbnjhr';
      const response = {
        rating: 2
      };
      fetchMock.putOnce(
        `/api/v1/idea/${id}/rate`,
        { status: 200, body: response }
      );

      const initialState = {};
      const store = mockStore(initialState);
      const actions = store.getActions();
      const expectedActions = [
        {
          type: POST_IDEA_RATINGS_SUCCESS,
          rating: response.rating
        },
      ];
      return store.dispatch(postRating(id))
        .then(() => {
          expect(actions).toEqual(expectedActions);
          store.clearActions();
          fetchMock.reset();
        })
        .catch();
    }
  );
});


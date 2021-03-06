import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addPics, toggleLike, addComment, sortMostCommented, sortMostLiked,
} from '../index';
import {
  ADD_PICS, TOGGLE_LIKE, ADD_COMMENT, MOST_COMMENTED, MOST_LIKED,
} from '../actionTypes';
import { apiTestData } from '../../__mocks__/testAPIData';

const mockStore = configureMockStore([thunk]);

describe('Images actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      imagesReducer: {
        pics: [],
      },
    });
  });
  it('should create an action ADD_PICS when addPics is called', async () => {
    const expectedActions = [{ type: ADD_PICS, payload: apiTestData }];
    await store.dispatch(addPics(apiTestData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create an action TOGGLE_LIKE when toggleLike is called', async () => {
    const id = 3;
    const expectedActions = [{ type: TOGGLE_LIKE, payload: id }];
    await store.dispatch(toggleLike(id));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create an action ADD_COMMENT when addComment is called', async () => {
    const id = 2;
    const comment = 'test comment';
    const expectedActions = [{ type: ADD_COMMENT, payload: { id, comment } }];
    await store.dispatch(addComment(id, comment));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create an action MOST_LIKED when sortMostLiked is called', async () => {
    const expectedActions = [{ type: MOST_LIKED }];
    await store.dispatch(sortMostLiked());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create an action MOST_COMMENTED when sortMostCommented is called', async () => {
    const expectedActions = [{ type: MOST_COMMENTED }];
    await store.dispatch(sortMostCommented());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

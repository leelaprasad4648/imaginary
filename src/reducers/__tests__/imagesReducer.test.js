import imagesReducer from '../imagesReducer';
import {
  ADD_PICS, TOGGLE_LIKE, ADD_COMMENT, MOST_LIKED,
  MOST_COMMENTED,
} from '../../actions/actionTypes';
import { apiTestData } from '../../__mocks__/testAPIData';

describe('imagesReducer', () => {
  const initialState = {
    pics: [],
  };

  const apiMockData = apiTestData;

  const stateWithData = {
    pics: apiMockData,
  };

  it('should return initial state on invalid action', () => {
    expect(imagesReducer(undefined, {})).toEqual(initialState);
  });

  it('should return correct pics data state on ADD_PICS action', () => {
    expect(imagesReducer(initialState, {
      type: ADD_PICS,
      payload: apiMockData,
    })).toEqual({
      ...initialState,
      pics: apiMockData,
    });
  });

  it('should return data with updated comment state on ADD_COMMENT action', () => {
    const testComment = 'Test Comment';
    const addCommentPayload = { id: 1, comment: testComment };
    const stateWithAddedComment = imagesReducer(stateWithData, {
      type: ADD_COMMENT,
      payload: addCommentPayload,
    });
    const objWithAddedComment = stateWithAddedComment.pics.filter(
      (pic) => pic.id === addCommentPayload.id,
    )[0];
    expect(objWithAddedComment.comments[0]).toEqual(addCommentPayload.comment);
    expect(objWithAddedComment.comments.length).toEqual(1);
  });

  it('should return sorted mosted liked pics state on MOST_LIKED action', () => {
    // const sortedAPIData = apiMockData.sort((a, b) => ((a.likes > b.likes) ? 1
    //   : ((b.likes > a.likes) ? -1 : 0))).reverse();
    const sortedAPIData = apiMockData.sort((a, b) => ((a.likes > b.likes) ? 1
      : -1)).reverse();
    expect(imagesReducer(stateWithData, { type: MOST_LIKED })).toEqual({ pics: sortedAPIData });
  });

  it('should return sorted mosted commented pics state on MOST_COMMENTED action', () => {
    const sortedAPIData = apiMockData.sort((a, b) => ((a.comments.length > b.comments.length) ? 1
      : -1)).reverse();
    expect(imagesReducer(stateWithData, { type: MOST_COMMENTED })).toEqual({ pics: sortedAPIData });
  });

  it('should return pic with toggled like state on TOGGLE_LIKE action', () => {
    const objId = 2;
    const stateWithToggledLike = imagesReducer(stateWithData, {
      type: TOGGLE_LIKE,
      payload: objId,
    });
    const objWithToggledComment = stateWithToggledLike.pics.filter((pic) => pic.id === objId)[0];
    const initialObject = apiMockData.filter((pic) => pic.id === objId)[0];
    expect(objWithToggledComment.isLiked).toEqual(!initialObject.isLiked);
  });
});

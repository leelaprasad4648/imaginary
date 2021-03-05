import {
  ADD_PICS, TOGGLE_LIKE, ADD_COMMENT, MOST_LIKED,
  MOST_COMMENTED,
} from './actionTypes';

export const addPics = (pics) => ({
  type: ADD_PICS,
  payload: pics,
});

export const toggleLike = (id) => ({
  type: TOGGLE_LIKE,
  payload: id,
});

export const addComment = (id, comment) => ({
  type: ADD_COMMENT,
  payload: {
    id, comment,
  },
});

export const sortMostLiked = () => ({
  type: MOST_LIKED,
});

export const sortMostCommented = () => ({
  type: MOST_COMMENTED,
});

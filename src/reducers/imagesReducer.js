import {
  ADD_PICS, TOGGLE_LIKE, ADD_COMMENT, MOST_LIKED,
  MOST_COMMENTED,
} from '../actions/actionTypes';

const initialState = {
  pics: [],
};

export default function imagesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT: {
      const { id, comment } = action.payload;
      return {
        ...state,
        pics: state.pics.map((picture) => ((picture.id === id)
          ? { ...picture, comments: picture.comments.concat(comment) }
          : picture)),
      };
    }
    case ADD_PICS: {
      return {
        ...state,
        pics: state.pics.concat(action.payload),
      };
    }
    case MOST_LIKED: {
      return {
        ...state,
        // pics: state.pics.slice().sort((a, b) => ((a.likes > b.likes)
        //   ? 1 : ((b.likes > a.likes) ? -1 : 0))).reverse(),
        pics: state.pics.slice().sort((a, b) => ((a.likes > b.likes)
          ? 1 : -1)).reverse(),
      };
    }
    case MOST_COMMENTED: {
      return {
        ...state,
        pics: state.pics.slice().sort((a, b) => ((a.comments.length > b.comments.length)
          ? 1 : -1)).reverse(),
      };
    }
    case TOGGLE_LIKE: {
      return {
        ...state,
        pics: state.pics.map((picture) => ((picture.id === action.payload)
          ? {
            ...picture,
            likes: picture.isLiked ? picture.likes - 1 : picture.likes + 1,
            isLiked: !picture.isLiked,
          }
          : picture)),
      };
    }
    default:
      return state;
  }
}

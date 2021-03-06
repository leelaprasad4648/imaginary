import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addComment, toggleLike } from '../actions';
import imagePropTypes from './imagePropTypes';

const ImageCard = (props) => {
  const {
    imageDetails: {
      likes, comments, url, category, isLiked, id,
    }, dispatch,
  } = props;
  const [comment, setComment] = useState('');

  const onAddComment = () => {
    if (comment) {
      dispatch(addComment(id, comment));
      setComment('');
    }
  };

  const onToggleLike = () => {
    dispatch(toggleLike(id));
  };

  return (
    <div className="image-card-container">
      <div className="image-card">
        <img className="image-card-image" src={url} alt={`${category} related`} />
        <div className="image-details-container">
          <div>
            <span className="image-card-like-count">{likes}</span>
            <span className="image-card-like-hyperlink" onClick={() => onToggleLike()}>{isLiked ? 'Unlike' : 'Like'}</span>
          </div>
          <div className="image-card-category">{category}</div>
        </div>
        <div className="image-card-comment-container">
          <input
            type="text"
            name="comment"
            value={comment}
            className="image-card-input"
            placeholder="Type your comment here..."
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="image-button" type="button" onClick={() => onAddComment()}>Post</button>
        </div>
        <div className="image-card-comments-container">
          {comments.map((postComment, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`${id}-comment-${index}`} className="image-card-comment">
              {postComment}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ImageCard.propTypes = {
  imageDetails: imagePropTypes.isRequired,
  dispatch: PropTypes.func.isRequired,
};
export { ImageCard };

export default connect()(ImageCard);

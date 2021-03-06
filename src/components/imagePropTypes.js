import PropTypes from 'prop-types';

const imagePropTypes = PropTypes.shape({
  likes: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(PropTypes.string).isRequired,
  category: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
});

export default imagePropTypes;

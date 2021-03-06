import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { addPics, sortMostLiked, sortMostCommented } from '../actions';
import ImageCard from './ImageCard';
import imagePropTypes from './imagePropTypes';
import './index.scss';

const App = (props) => {
  const { pics, dispatch } = props;
  const [category, setCategory] = useState('');
  const [picsLoading, setPicsLoading] = useState(false);

  useEffect(() => {
    setPicsLoading(true);
    axios.get('https://raw.githubusercontent.com/Lokenath/MyRepo/master/Test/package.json')
      .then((response) => {
        const picsResponse = response?.data?.pics || [];
        const picsResponseWithIsLiked = picsResponse.map((pic) => ({ ...pic, isLiked: false }));
        setPicsLoading(false);
        dispatch(addPics(picsResponseWithIsLiked));
      });
  }, [dispatch]);

  function handleMostLiked() {
    dispatch(sortMostLiked());
  }

  function handleMostCommented() {
    dispatch(sortMostCommented());
  }

  function onCategoryChange(categoryType) {
    setCategory(categoryType);
  }

  const getPictures = () => (category
    ? pics.filter((picture) => picture.category.includes(category)) : pics);

  return (
    <div>
      <div className="app-heading">Imaginary</div>
      <div className="app-filters-container">
        <div className="app-filter">
          <span className="most-liked" onClick={() => handleMostLiked()}>Most Liked</span>
          <span className="most-commented" onClick={() => handleMostCommented()}>Most commented</span>
        </div>
        <div className="app-filter app-filter-search">
          <input
            type="text"
            name="search"
            value={category}
            placeholder="Search images"
            onChange={(e) => onCategoryChange(e.target.value)}
          />
        </div>
        <div />
      </div>
      <div className="images-container">
        {getPictures().map((pic) => (
          <ImageCard
            className="image-cards"
            key={pic.id}
            imageDetails={pic}
          />
        ))}
        {(!picsLoading && getPictures().length === 0) && (<div className="no-matches">No matches found</div>)}
        {picsLoading && (<div className="loading">Loading...</div>)}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { imagesReducer: { pics } } = state;
  return ({
    pics,
  });
};

App.propTypes = {
  pics: PropTypes.arrayOf(imagePropTypes).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export { App };

export default connect(mapStateToProps, null)(App);

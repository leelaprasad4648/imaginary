import React from 'react';
import { shallow } from 'enzyme';
import { apiTestData } from '../../__mocks__/testAPIData';
import { ImageCard } from '../ImageCard';
import { toggleLike } from '../../actions/index';

const defaultProps = {
  imageDetails: apiTestData[0],
  dispatch: jest.fn(),
};

// eslint-disable-next-line react/jsx-props-no-spreading
const getWrapper = (props) => shallow(<ImageCard {...props} />);

describe('ImageCard', () => {
  it('should render without error', () => {
    const wrapper = getWrapper(defaultProps);
    expect(wrapper).toHaveLength(1);
  });

  it('should receive correct image', () => {
    const wrapper = getWrapper(defaultProps);
    const image = wrapper.find('.image-card-image');
    expect(image).toHaveLength(1);
    expect(image.prop('src')).toEqual(defaultProps.imageDetails.url);
    expect(image.prop('alt')).toEqual(`${defaultProps.imageDetails.category} related`);
  });

  it('should render correct like count', () => {
    const wrapper = getWrapper(defaultProps);
    const likes = wrapper.find('.image-card-like-count');
    expect(likes).toHaveLength(1);
    expect(likes.text()).toEqual(defaultProps.imageDetails.likes.toString());
  });

  it('should render Like button when image is not liked', () => {
    const wrapper = getWrapper(defaultProps);
    const likeButtonComp = wrapper.find('.image-card-like-hyperlink');
    expect(likeButtonComp).toHaveLength(1);
    expect(likeButtonComp.text()).toEqual('Like');
  });

  it('should dispatch action on Like button click', () => {
    const wrapper = getWrapper(defaultProps);
    const likeButtonComp = wrapper.find('.image-card-like-hyperlink');
    likeButtonComp.prop('onClick')(defaultProps.imageDetails.id);
    expect(defaultProps.dispatch).toBeCalledWith(toggleLike(defaultProps.imageDetails.id));
  });

  it('should render Unlike button when image is liked', () => {
    const props = {
      imageDetails: apiTestData[0],
      dispatch: jest.fn(),
    };
    props.imageDetails.isLiked = true;
    const wrapper1 = getWrapper(props);
    const likeButtonComp = wrapper1.find('.image-card-like-hyperlink');
    expect(likeButtonComp).toHaveLength(1);
    expect(likeButtonComp.text()).toEqual('Unlike');
  });

  it('should render correct category', () => {
    const wrapper = getWrapper(defaultProps);
    const categoryComp = wrapper.find('.image-card-category');
    expect(categoryComp).toHaveLength(1);
    expect(categoryComp.text()).toEqual(defaultProps.imageDetails.category);
  });

  it('should render comment input component', () => {
    const wrapper = getWrapper(defaultProps);
    const inputComp = wrapper.find('input');
    expect(inputComp).toHaveLength(1);
    expect(inputComp.prop('value')).toEqual('');
  });

  it('should render post button component', () => {
    const wrapper = getWrapper(defaultProps);
    const buttonComp = wrapper.find('button');
    expect(buttonComp).toHaveLength(1);
    expect(buttonComp.text()).toEqual('Post');
    buttonComp.prop('onClick')();
    expect(defaultProps.dispatch).toBeCalled();
  });

  it('should render comments component', () => {
    const wrapper = getWrapper(defaultProps);
    expect(wrapper.find('div.image-card-comment')).toHaveLength(defaultProps.imageDetails.comments.length);
  });
});

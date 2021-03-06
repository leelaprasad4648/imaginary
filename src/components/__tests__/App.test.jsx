import React from 'react';
import { shallow } from 'enzyme';
import { apiTestData } from '../../__mocks__/testAPIData';
import { App } from '../App';
import { sortMostLiked, sortMostCommented } from '../../actions/index';

const defaultProps = {
  pics: apiTestData,
  dispatch: jest.fn(),
};

// eslint-disable-next-line react/jsx-props-no-spreading
const getWrapper = (props) => shallow(<App {...props} />);

describe('App', () => {
  it('should render without error', () => {
    const wrapper = getWrapper(defaultProps);
    expect(wrapper).toHaveLength(1);
  });
  it('should render app heading', () => {
    const wrapper = getWrapper(defaultProps);
    expect(wrapper.find('.app-heading').text()).toEqual('Imaginary');
  });

  it('should render most liked button', () => {
    const wrapper = getWrapper(defaultProps);
    const mostLikedBtn = wrapper.find('.most-liked');
    expect(mostLikedBtn).toHaveLength(1);
    mostLikedBtn.prop('onClick')();
    expect(defaultProps.dispatch).toBeCalledWith(sortMostLiked());
  });

  it('should render most commented button', () => {
    const wrapper = getWrapper(defaultProps);
    const mostCommentedBtn = wrapper.find('.most-commented');
    expect(mostCommentedBtn).toHaveLength(1);
    mostCommentedBtn.prop('onClick')();
    expect(defaultProps.dispatch).toBeCalledWith(sortMostCommented());
  });

  it('should render search by category input', () => {
    const wrapper = getWrapper(defaultProps);
    const searchByCatInput = wrapper.find('input');
    expect(searchByCatInput).toHaveLength(1);
    expect(searchByCatInput.prop('value')).toEqual('');
    searchByCatInput.prop('onChange')({ target: { value: 'Flo' } });
    wrapper.update();
    expect(searchByCatInput.prop('value')).toEqual('');
  });

  it('should render image cards component', () => {
    const wrapper = getWrapper(defaultProps);
    expect(wrapper.find('Connect(ImageCard).image-cards')).toHaveLength(defaultProps.pics.length);
  });

  it('should render no matches found when empty array is passed', () => {
    const wrapper = getWrapper({ dispatch: jest.fn(), pics: [] });
    expect(wrapper.find('.no-matches').text()).toEqual('No matches found');
  });
});

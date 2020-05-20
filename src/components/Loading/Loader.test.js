import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Loader from './Loader';

Enzyme.configure({ adapter: new Adapter() });

describe('Component --- Loader', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Loader />);
  });

  it('render the wrappers', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});

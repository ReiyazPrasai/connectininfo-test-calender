import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Loading from './index';
import Loader from './Loader';

Enzyme.configure({ adapter: new Adapter() });

describe('Component --- Loading', () => {
  it('should render error message', () => {
    const props = { error: 'this is test' };
    const wrapper = shallow(<Loading {...props} />);
    expect(wrapper.html()).toEqual(
      '<div class="loader-container">Error! Please refresh the page</div>'
    );
  });

  it('should render the Loader component', () => {
    const props = { pastDelay: 'test' };
    const wrapper = shallow(<Loading {...props} />);
    expect(wrapper.containsAllMatchingElements([Loader])).toEqual(true);
  });

  it('should render the null', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper.html()).toEqual(null);
  });
});

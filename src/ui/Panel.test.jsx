import React from 'react';
import { shallow } from 'enzyme';

import Panel from './Panel';

describe('Panel', () => {
  it('format a little bit', () => {
    const props = {
      temperature: 1.244,
      humidity: 2.220,
      light: 3.2,
      radiation: 4.2
    };

    const wrapper = shallow(<Panel {...props} />);

    expect(wrapper.find('.Temperature').text()).toContain('1.24');
    expect(wrapper.find('.Humidity').text()).toContain('2.22');
    expect(wrapper.find('.Light').text()).toContain('3.20');
    expect(wrapper.find('.Radiation').text()).toContain('4.20');
  });


  it('error handling', () => {
    const props = {
      temperature: NaN,
    };

    const wrapper = shallow(<Panel {...props} />);

    expect(wrapper.find('.Temperature').text()).toContain('-');
  });
});
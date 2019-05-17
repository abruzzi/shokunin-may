import React from 'react';
import { shallow } from 'enzyme';

import Panel from './Panel';

describe('Panel', () => {
  it('basic render', () => {
    const props = {};

    const wrapper = shallow(<Panel {...props} />);

    expect(wrapper.find('Container').exists()).toBe(true);
  });

  it('format a little bit', () => {
    const props = {
      temperature: 1.244,
      humidity: 2.220,
      light: 3.2,
      radiation: 4.2
    };

    const wrapper = shallow(<Panel {...props} />);

    expect(wrapper.find('.temperature').text()).toEqual('Temperature: 1.24');
    expect(wrapper.find('.humidity').text()).toEqual('Humidity: 2.22');
    expect(wrapper.find('.light').text()).toEqual('Light: 3.20');
    expect(wrapper.find('.radiation').text()).toContain('Radiation: 4.20');
  });


  it('error handling', () => {
    const props = {
      temperature: NaN,
    };

    const wrapper = shallow(<Panel {...props} />);

    expect(wrapper.find('.temperature').text()).toEqual('Temperature: -');
  })
});
import React from 'react';
import { shallow } from 'enzyme';

import Panel from './Panel';

describe('Panel', () => {
  it('basic render', () => {
    const props = {
      temperature: 1.2,
      humidity: 2.2,
      light: 3.2,
      radiation: 4.2
    };

    const wrapper = shallow(<Panel {...props} />);

    expect(wrapper.find('.temperature').text()).toContain(props.temperature);
    expect(wrapper.find('.humidity').text()).toContain(props.humidity);
    expect(wrapper.find('.light').text()).toContain(props.light);
    expect(wrapper.find('.radiation').text()).toContain(props.radiation);
  });
});
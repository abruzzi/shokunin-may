import React from 'react';
import {shallow} from "enzyme/build";

import Sidebar from "./Sidebar";

describe('Sidebar', () => {
  it('renders nothing when no sensor information found', () => {
    const props = {
      groups: {}
    }

    const wrapper = shallow(<Sidebar {...props} />);

    expect(wrapper.find('ChartSection').exists()).toEqual(false);
  });

  it('renders panels for groups', () => {
    const sensorReadings = {
      temperature: 1,
      humidity: 2,
      light: 3,
      radiation: 4
    };

    const props = {
      groups: {
        'G0': {
          data: {
            location: {
              latitude: -12.23,
              longitude: 130.45
            },
            displayName: 'CBD Melbourne VIC 3000'
          },
          name: 'G0',
          rra: {
            average: jest.fn().mockImplementation(() => sensorReadings)
          }
        }
      }
    };

    const wrapper = shallow(<Sidebar {...props} />);

    expect(wrapper.find('ChartSection').exists()).toEqual(true);
    expect(wrapper.find('ChartSection').prop('group')).toEqual('G0');

    expect(wrapper.find('ChartSection').props()).toEqual(
      expect.objectContaining(sensorReadings));
  });
});
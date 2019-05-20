import React from 'react';
import AppContainer from "./AppContainer";
import {shallow} from "enzyme";

describe('AppContainer', () => {
  it('wire up', () => {
    const props = {
      initPubNub: jest.fn().mockImplementation(() => ({
        subscribe: jest.fn(),
        getMessage: () => [{
          message: {
            ambient_temperature: "23.22",
            humidity: "76.9735",
            photosensor: "766.49",
            radiation_level: "197",
            sensor_uuid: "probe-c7625902",
            timestamp: 1557999820
          }
        }]
      }))
    };

    const wrapper = shallow(<AppContainer {...props} />);
    expect(wrapper.find('Button').exists()).toBe(true);
    expect(wrapper.find('BackgroundMap').exists()).toBe(true);
    expect(wrapper.find('Sidebar').exists()).toBe(true);
  });

  it('using parsed data for sub component for rendering', () => {
    const props = {
      initPubNub: jest.fn().mockImplementation(() => ({
        subscribe: jest.fn(),
        getMessage: () => [{
          message: {
            ambient_temperature: "23.22",
            humidity: "76.9735",
            photosensor: "766.49",
            radiation_level: "197",
            sensor_uuid: "probe-c7625902",
            timestamp: 1557999820
          }
        }]
      }))
    };

    const wrapper = shallow(<AppContainer {...props} />);
    const groups = wrapper.find('BackgroundMap').prop('groups');
    expect(groups['group_10'].data.readings).toEqual({
      temperature: 23.22,
      humidity: 76.9735,
      light: 766.49,
      radiation: 197
    });
  })
});
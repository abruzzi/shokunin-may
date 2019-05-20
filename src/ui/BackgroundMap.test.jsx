import React from 'react';
import BackgroundMap from "./BackgroundMap";
import {Map, CircleMarker, TileLayer} from "react-leaflet";
import {shallow} from "enzyme";

describe('background map', () => {
  it('renders background layer', () => {
    const props = {
      groups: {}
    };

    const wrapper = shallow(<BackgroundMap {...props}/>);
    expect(wrapper.find(Map).exists()).toBe(true);
    expect(wrapper.find(TileLayer).exists()).toBe(true);
    expect(wrapper.find(CircleMarker).exists()).toBe(false);
  });

  describe('popup', () => {
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
          averager: {
            average: jest.fn().mockImplementation(() => sensorReadings)
          }
        }
      }
    };

    it('renders circle marker', () => {
      const wrapper = shallow(<BackgroundMap {...props}/>);

      expect(wrapper.find(CircleMarker).exists()).toEqual(true);
      expect(wrapper.find(CircleMarker).prop('center')).toEqual([-12.23, 130.45]);
    });

    it('renders popup with panel', () => {
      const wrapper = shallow(<BackgroundMap {...props}/>);

      expect(wrapper.find('ChartSection').exists()).toEqual(true);
      expect(wrapper.find('ChartSection').prop('group')).toEqual('m-G0');

      expect(wrapper.find('ChartSection').props()).toEqual(
        expect.objectContaining(sensorReadings));
    })
  })

})
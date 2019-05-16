import {parse} from './parser';

describe('parser', () => {
  it('group dat by sensor-id', () => {
    const data = {
      ambient_temperature: "23.22",
      humidity: "76.9735",
      photosensor: "766.49",
      radiation_level: "197",
      sensor_uuid: "probe-c7625902",
      timestamp: 1557999820
    }

    const parsed = parse(data);
    expect(parsed.groupName).toEqual('group_10');
  });

  it('reshape the data', () => {
    const data = {
      ambient_temperature: "23.22",
      humidity: "76.9735",
      photosensor: "766.49",
      radiation_level: "197",
      sensor_uuid: "probe-c7625902",
      timestamp: 1557999820
    }

    const parsed = parse(data);
    expect(parsed).toEqual(expect.objectContaining({
      groupName: expect.stringContaining('group_10'),
      timestamp: 1557999820,
      location: {
        latitude: -31.95866,
        longitude: 115.858317,
      },
      readings: {
        temperature: 23.22,
        humidity: 76.9735,
        light: 766.49,
        radiation: 197
      }
    }))
  });
})
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
    expect(parsed.group_name).toEqual('group_10');
  })
})
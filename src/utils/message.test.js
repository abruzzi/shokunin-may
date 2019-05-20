import {convertRawDataForRendering} from "./message";
import {ROLLING_WINDOW_SIZE} from "../constants";

describe('convert data', () => {
  const raw = [{
    message: {
      ambient_temperature: "23.22",
      humidity: "76.9735",
      photosensor: "766.49",
      radiation_level: "197",
      sensor_uuid: "probe-c7625902",
      timestamp: 1557999820
    }
  }];

  it('populate all groups for rendering', () => {
    const groups = convertRawDataForRendering(raw);
    expect(Object.keys(groups).length).toEqual(12);

    [...Array(10).keys()].forEach((x) => {
      expect(groups[`group_${x}`].data.readings).toEqual(undefined);
      expect(groups[`group_${x}`].averager).toEqual({data: [], size: ROLLING_WINDOW_SIZE});
    });

    expect(groups['group_10'].data.readings).toEqual({
      temperature: 23.22,
      humidity: 76.9735,
      light: 766.49,
      radiation: 197
    });

    expect(groups['group_10'].averager).toEqual({
      data: [
        {
          temperature: 23.22,
          humidity: 76.9735,
          light: 766.49,
          radiation: 197
        }
      ],
      size: ROLLING_WINDOW_SIZE
    });

    expect(groups['group_total'].data.readings).toEqual({
      temperature: 23.22,
      humidity: 76.9735,
      light: 766.49,
      radiation: 197
    });
  });
});
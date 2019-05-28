import { parse, convertRawDataForRendering } from "./parser";
import { ROLLING_WINDOW_SIZE } from "../constants";

describe("parser", () => {
  describe('parsing', () => {
    it("group dat by sensor-id", () => {
      const data = {
        ambient_temperature: "23.22",
        humidity: "76.9735",
        photosensor: "766.49",
        radiation_level: "197",
        sensor_uuid: "probe-c7625902",
        timestamp: 1557999820
      };

      const parsed = parse(data);
      expect(parsed.groupName).toEqual("group_10");
    });

    it("reshape the data", () => {
      const data = {
        ambient_temperature: "23.22",
        humidity: "76.9735",
        photosensor: "766.49",
        radiation_level: "197",
        sensor_uuid: "probe-c7625902",
        timestamp: 1557999820
      };

      const parsed = parse(data);
      expect(parsed).toEqual(
        expect.objectContaining({
          groupName: expect.stringContaining("group_10"),
          displayName: expect.stringContaining("Barrack"),
          timestamp: 1557999820,
          location: {
            latitude: -31.95866,
            longitude: 115.858317
          },
          readings: {
            temperature: 23.22,
            humidity: 76.9735,
            light: 766.49,
            radiation: 197
          }
        })
      );
    });
  })

  describe("convert data", () => {
    const raw = [
      {
        message: {
          ambient_temperature: "23.22",
          humidity: "76.9735",
          photosensor: "766.49",
          radiation_level: "197",
          sensor_uuid: "probe-c7625902",
          timestamp: 1557999820
        }
      }
    ];

    it("populate all groups for rendering", () => {
      const groups = convertRawDataForRendering(raw);
      expect(Object.keys(groups).length).toEqual(12);

      [...Array(10).keys()].forEach(x => {
        expect(groups[`group_${x}`].data.readings).toEqual(undefined);
        expect(groups[`group_${x}`].rra).toEqual({
          data: [],
          size: ROLLING_WINDOW_SIZE
        });
      });

      expect(groups["group_10"].data.readings).toEqual({
        temperature: 23.22,
        humidity: 76.9735,
        light: 766.49,
        radiation: 197
      });

      expect(groups["group_10"].rra).toEqual({
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

      expect(groups["group_total"].data.readings).toEqual({
        temperature: 23.22,
        humidity: 76.9735,
        light: 766.49,
        radiation: 197
      });
    });
  });
});

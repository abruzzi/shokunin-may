import React from "react";
import { shallow } from "enzyme";

import SummaryPanel from "./SummaryPanel";

describe("SummaryPanel", () => {
  it("renders summary", () => {
    const sensorReadings = {
      temperature: 1,
      humidity: 2,
      light: 3,
      radiation: 4
    };

    const props = {
      summary: {
        data: {
          location: {
            latitude: -12.23,
            longitude: 130.45
          },
          displayName: "CBD Melbourne VIC 3000"
        },
        name: "G0",
        rra: {
          average: jest.fn().mockImplementation(() => sensorReadings)
        }
      }
    };

    const wrapper = shallow(<SummaryPanel {...props} />);
    expect(wrapper.find("ChartSection").exists()).toBe(true);
  });
});

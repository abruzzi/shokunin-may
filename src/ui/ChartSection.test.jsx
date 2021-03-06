import React from "react";
import { shallow } from "enzyme";

import ChartSection from "./ChartSection";

describe("ChartSection", () => {
  it("format a little bit", () => {
    const props = {
      temperature: 1.244,
      humidity: 2.22,
      light: 3.2,
      radiation: 4.2,
      group: "G8",
      createChart: jest.fn().mockImplementation(() => {})
    };

    const wrapper = shallow(<ChartSection {...props} />);

    expect(wrapper.find(".Temperature").text()).toContain("1.24");
    expect(wrapper.find(".Humidity").text()).toContain("2.22");
    expect(wrapper.find(".Light").text()).toContain("3.20");
    expect(wrapper.find(".Radiation").text()).toContain("4.20");
    expect(props.createChart).toHaveBeenCalledWith(props.group);
  });

  it("error handling", () => {
    const props = {
      temperature: NaN,
      group: "G8",
      createChart: jest.fn().mockImplementation(() => {})
    };

    const wrapper = shallow(<ChartSection {...props} />);

    expect(wrapper.find(".Temperature").text()).toContain("-");
  });
});

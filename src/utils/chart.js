import d3 from "d3";
import Rickshaw from "rickshaw";

import { COLORS } from "./constants";

const updateInterval = 500;

const createRealTimeChart = id => {
  const logScale = d3.scale
    .log()
    .domain([1, 900])
    .range([0, 600])
    .clamp(true)
    .nice();
  const lines = Object.keys(COLORS).map(type => ({
    name: type,
    color: COLORS[type],
    strokeWidth: 3,
    scale: logScale
  }));

  const chart = new Rickshaw.Graph({
    element: document.querySelector(`#${id}`),
    width: 240,
    height: 120,
    renderer: "line",
    min: 1,
    max: 900,
    series: new Rickshaw.Series.FixedDuration(lines, undefined, {
      timeInterval: updateInterval,
      maxDataPoints: 100
    })
  });

  new Rickshaw.Graph.HoverDetail({
    graph: chart
  });

  chart.render();

  return chart;
};

export { createRealTimeChart };

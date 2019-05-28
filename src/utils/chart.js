import d3 from "d3";
import Rickshaw from "rickshaw";

import {
  CHART_HEIGHT,
  CHART_MAX,
  CHART_MIN,
  CHART_RENDERER,
  CHART_STROKE_WIDTH,
  CHART_WIDTH,
  COLORS,
  MAX_DATA_POINTS,
  UPDATE_INTERVAL
} from "./constants";

const createRealTimeChart = id => {
  const logScale = d3.scale
    .log()
    .domain([CHART_MIN, CHART_MAX])
    .range([0, 600])
    .clamp(true)
    .nice();

  const lines = Object.keys(COLORS).map(type => ({
    name: type,
    color: COLORS[type],
    strokeWidth: CHART_STROKE_WIDTH,
    scale: logScale
  }));

  const chart = new Rickshaw.Graph({
    element: document.querySelector(`#${id}`),
    width: CHART_WIDTH,
    height: CHART_HEIGHT,
    renderer: CHART_RENDERER,
    min: CHART_MIN,
    max: CHART_MAX,
    series: new Rickshaw.Series.FixedDuration(lines, undefined, {
      timeInterval: UPDATE_INTERVAL,
      maxDataPoints: MAX_DATA_POINTS
    })
  });

  new Rickshaw.Graph.HoverDetail({
    graph: chart
  });

  chart.render();

  return chart;
};

export { createRealTimeChart };

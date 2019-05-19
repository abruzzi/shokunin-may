import Rickshaw from "rickshaw";
import {COLORS} from "../constants";

const updateInterval = 500;

const createRealTimeChart = (id) => {
  const lines = Object.keys(COLORS).map(type => ({name: type, color: COLORS[type]}))

  const chart = new Rickshaw.Graph({
    element: document.querySelector(`#${id}`),
    width: "240",
    height: "120",
    renderer: "line",
    min: "0",
    max: "1000",
    series: new Rickshaw.Series.FixedDuration(
      lines,
      undefined,
      {
        timeInterval: updateInterval,
        maxDataPoints: 100
      }
    )
  });

  new Rickshaw.Graph.HoverDetail({
    graph: chart
  });

  chart.render();

  return chart;
};


export {createRealTimeChart};
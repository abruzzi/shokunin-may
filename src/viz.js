/* Rickshaw real-time data visualization (UNOPTIMIZED)*/

import {parse} from './utils/parser';
import Averager from './utils/averager';

import Rickshaw from 'rickshaw';
import 'rickshaw/rickshaw.min.css'

const pubnub = new PubNub({
  subscribeKey: 'sub-c-5f1b7c8e-fbee-11e3-aa40-02ee2ddab7fe'
});

pubnub.subscribe({
  channels: ["pubnub-sensor-network"]
});

const THE_MAP = [...Array(11).keys()].reduce((previous, current) => ({
  ...previous,
  [`group_${current}`]: new Averager(10)
}), {});


var updateInterval = 1000;

/* Rickshaw.js initialization */
var chart = new Rickshaw.Graph({
  element: document.querySelector("#chart"),
  width: "300",
  height: "150",
  renderer: "line",
  min: "0",
  max: "300",
  series: new Rickshaw.Series.FixedDuration(
    [
      {
        name: "temperature",
        color: "#EC644B"
      },
      {
        name: "humidity",
        color: "rgba(48, 197, 255, 1)"
      },
      {
        name: 'radiation',
        color: 'rgba(248, 51, 60, 1)'
      }
    ],
    undefined,
    {
      timeInterval: updateInterval,
      maxDataPoints: 100
    }
  )
});

new Rickshaw.Graph.Axis.Y({
  graph: chart,
  orientation: "left",
  tickFormat: function(y) {
    return y.toFixed(2);
  },
  ticks: 5,
  element: document.getElementById("y_axis")
});

pubnub.addListener({
  message: function(data) {
    const parsed = parse(data.message);
    THE_MAP[parsed.groupName].put(parsed.readings);

    // chart.series.addData({temperature: THE_MAP[parsed.groupName].average().temperature});
    chart.series.addData({
      temperature: THE_MAP[parsed.groupName].average().temperature,
      humidity: THE_MAP[parsed.groupName].average().humidity,
      radiation: THE_MAP[parsed.groupName].average().radiation
    });

    chart.render();

    console.log({
      group: parsed.groupName,
      timestamp: parsed.timestamp,
      average: THE_MAP[parsed.groupName].average()
    });
  }
});

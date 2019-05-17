/* Rickshaw real-time data visualization (UNOPTIMIZED)*/

import {parse} from './utils/parser';
import Averager from './utils/averager';

import d3 from 'd3';
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

const THE_TOTAL = {
  'group_total': new Averager(10)
};

import {Colors} from "./constants";


const min = 0;
const max = 1000;

const logScale = d3.scale.log().domain([min, max]);
console.log(logScale);


const lines = Object.keys(Colors).map(type => ({name: type, color: Colors[type]}))

const updateInterval = 500;

/* Rickshaw.js initialization */
const chart = new Rickshaw.Graph({
  element: document.querySelector("#chart"),
  width: "300",
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

new Rickshaw.Graph.Axis.Y({
  graph: chart,
  orientation: "left",
  ticks: 5,
  element: document.getElementById("y_axis"),
  scale: logScale
});

pubnub.addListener({
  message: function(data) {
    const parsed = parse(data.message);
    THE_MAP[parsed.groupName].put(parsed.readings);

    chart.series.addData({
      Temperature: THE_MAP[parsed.groupName].average().temperature,
      Humidity: THE_MAP[parsed.groupName].average().humidity,
      Light: THE_MAP[parsed.groupName].average().light,
      Radiation: THE_MAP[parsed.groupName].average().radiation
    });

    chart.render();
  }
});

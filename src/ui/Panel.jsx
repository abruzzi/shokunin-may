import React from 'react';
import { Col, Row, Icon } from 'antd';

import {COLORS, SENSORS_ICON_MAP} from "../constants";
import Rickshaw from "rickshaw";

const format = (figure) => isNaN(Number(figure)) ? '-' : Number(figure).toFixed(2);

const figure = (type, value) => {
  return (
    <div
      key={type}
      className={`figure ${type}`}
      style={{textAlign: 'center'}}
      title={type}
    >
      <div>{SENSORS_ICON_MAP[type]}</div>
      <div>{format(value)}</div>
    </div>)
};

const updateInterval = 500;

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.chart = null;
  }

  componentDidMount() {
    const {group} = this.props;

    const lines = Object.keys(COLORS).map(type => ({name: type, color: COLORS[type]}))

    this.chart = new Rickshaw.Graph({
      element: document.querySelector(`#${group}`),
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
      graph: this.chart
    });

    this.chart.render();
  }

  render() {
    const props = this.props;

    if(this.chart) {
      this.chart.series.addData({
        Temperature: props.temperature,
        Humidity: props.humidity,
        Light: props.light,
        Radiation: props.radiation
      });

      this.chart.render();
    }

    return (<div>
      <Row>
        {Object.keys(SENSORS_ICON_MAP).map(label => {
          return (<Col span={6} key={label}>
            {figure(label, props[label.toLowerCase()])}
          </Col>)
        })}
      </Row>
      <Row>
        <div id={props.group} style={{ overflow: 'hidden' }} />
      </Row>
    </div>)
  }
}

export default Panel;
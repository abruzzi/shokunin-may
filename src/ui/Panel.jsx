import React from 'react';
import { Col, Row, Icon } from 'antd';

import {Colors, Sensors} from "../constants";
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
      <div>{Sensors[type]}</div>
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

    const min = 0;
    const max = 1000;

    const lines = Object.keys(Colors).map(type => ({name: type, color: Colors[type]}))

    this.chart = new Rickshaw.Graph({
      element: document.querySelector(`#${group}`),
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
        {Object.keys(Sensors).map(label => {
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
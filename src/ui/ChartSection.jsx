import React from "react";
import { Col, Row } from "antd";

import { SENSORS_ICON_MAP } from "./constants";

import "./ChartSection.css";

const format = figure =>
  isNaN(Number(figure)) ? "-" : Number(figure).toFixed(2);

const figure = (type, value) => (
  <div key={type} className={`figure ${type}`} title={type}>
    <div>{SENSORS_ICON_MAP[type]}</div>
    <div>{format(value)}</div>
  </div>
);

class ChartSection extends React.Component {
  constructor(props) {
    super(props);
    this.chart = null;
  }

  componentDidMount() {
    const { group } = this.props;
    this.chart = this.props.createRealTimeChart(group);
  }

  render() {
    const props = this.props;

    if (this.chart) {
      this.chart.series.addData({
        Temperature: props.temperature,
        Humidity: props.humidity,
        Light: props.light,
        Radiation: props.radiation
      });

      this.chart.render();
    }

    return (
      <div>
        <Row>
          {Object.keys(SENSORS_ICON_MAP).map(label => {
            return (
              <Col span={6} key={label}>
                {figure(label, props[label.toLowerCase()])}
              </Col>
            );
          })}
        </Row>
        <Row>
          <div id={props.group} className="chart-container" />
        </Row>
      </div>
    );
  }
}

export default ChartSection;

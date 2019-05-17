import React from 'react';
import { Col, Row, Icon } from 'antd';
const format = (figure) => isNaN(Number(figure)) ? '-' : Number(figure).toFixed(2);

const ICONS = {
  Temperature: <Icon type="dashboard" />,
  Humidity: <Icon type="cloud" />,
  Light: <Icon type="bulb" />,
  Radiation: <Icon type="alert" />
}

const figure = (type, value) => {
  return (
    <div
      key={type}
      className={`figure ${type}`}
      style={{textAlign: 'center'}}
      title={type}
    >
      <div>{ICONS[type]}</div>
      <div>{format(value)}</div>
    </div>)
}

const Labels = [
  'Temperature',
  'Humidity',
  'Light',
  'Radiation'
];

const Panel = (props) => (
  <div>
    <Row>
      {Labels.map(label => {
        return (<Col span={6} key={label}>
          {figure(label, props[label.toLowerCase()])}
        </Col>)
      })}
    </Row>
  </div>);

export default Panel;
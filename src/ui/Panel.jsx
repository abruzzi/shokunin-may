import React from 'react';
import { Col, Row, Icon } from 'antd';
const format = (figure) => isNaN(Number(figure)) ? '-' : Number(figure).toFixed(2);

const Sensors = {
  Temperature: <Icon type="dashboard" style={{color: 'rgba(48, 197, 255, 1)'}}/>,
  Humidity: <Icon type="cloud" />,
  Light: <Icon type="bulb" style={{color: 'rgba(0, 167, 225, 1)'}} />,
  Radiation: <Icon type="alert" style={{color: 'rgba(248, 51, 60, 1)'}}/>
}

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

const Panel = (props) => (
  <div>
    <Row>
      {Object.keys(Sensors).map(label => {
        return (<Col span={6} key={label}>
          {figure(label, props[label.toLowerCase()])}
        </Col>)
      })}
    </Row>
  </div>);

export default Panel;
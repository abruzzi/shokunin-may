import React from 'react';
import { Col, Row, Icon } from 'antd';

import {Sensors} from "../constants";

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

const Panel = (props) => (
  <Row>
    {Object.keys(Sensors).map(label => {
      return (<Col span={6} key={label}>
        {figure(label, props[label.toLowerCase()])}
      </Col>)
    })}
  </Row>);

export default Panel;
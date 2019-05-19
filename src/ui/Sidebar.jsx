import React from 'react';
import {Card, Col, Row} from "antd";
import Panel from "./Panel";

const Sidebar = ({groupMap}) => (
  <Row gutter={16}>

    {Object.values(groupMap).filter(g => g.data.location).map(value => {
      return (<Col span={24} key={value.name} style={{padding: '8px'}}>
        <Card title={value.data.displayName} bordered>
          <Panel group={value.name} {...value.averager.average()} />
        </Card>
      </Col>);
    })}

  </Row>
);

export default Sidebar;
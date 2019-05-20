import React from 'react';
import {Card, Col, Row} from "antd";
import Panel from "./Panel";
import {createRealTimeChart} from "../utils/chart";

const Sidebar = ({groups = {}}) => (
  <Row gutter={16}>

    {Object.values(groups).filter(g => g.data.location).map(value => {
      return (<Col span={24} key={value.name} style={{padding: '8px'}}>
        <Card title={value.data.displayName} bordered>
          <Panel createRealTimeChart={createRealTimeChart} group={value.name} {...value.averager.average()} />
        </Card>
      </Col>);
    })}

  </Row>
);

export default Sidebar;
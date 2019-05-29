import React from "react";
import { Card, Col, Row } from "antd";
import ChartSection from "./ChartSection";
import { createRealTimeChart } from "../utils/chart";

import "./Sidebar.css";

const Sidebar = ({ groups = {} }) => (
  <div className="container">
    <div className="wrapper">
      <Row gutter={16}>
        {Object.values(groups)
          .filter(g => g.data.location)
          .map(value => {
            return (
              <Col span={24} key={value.name} className="column">
                <Card title={value.data.displayName} bordered={false}>
                  <ChartSection
                    createChart={createRealTimeChart}
                    group={value.name}
                    {...value.rra.average()}
                  />
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  </div>
);

export default Sidebar;

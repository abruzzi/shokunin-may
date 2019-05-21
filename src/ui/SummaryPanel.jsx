import React from 'react';
import {createRealTimeChart} from "../utils/chart";
import ChartSection from "./ChartSection";
import {Card} from "antd";

const SummaryPanel = ({summary}) => (
  <div>
    <Card title={summary.data.displayName} bordered>
      <ChartSection createRealTimeChart={createRealTimeChart} group={summary.name} {...summary.rra.average()} />
    </Card>
  </div>);

export default SummaryPanel;
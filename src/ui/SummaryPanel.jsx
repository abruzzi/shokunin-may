import React from "react";
import ChartSection from "./ChartSection";
import { createRealTimeChart } from "../utils/chart";

import "./SummaryPanel.css";

const SummaryPanel = ({ summary }) => (
  <div className="summary-panel">
    <div className="card">
      <ChartSection
        createChart={createRealTimeChart}
        group={`total-${summary.name}`}
        {...summary.rra.average()}
      />
    </div>
  </div>
);

export default SummaryPanel;

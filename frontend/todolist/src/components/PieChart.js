import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "./PieChart.css";

const COLORS = {
  Missed: "#FF0000",
  Completed: "#008000",
  Ongoing: "#ffd300",
};

const ORDER = ["Missed", "Completed", "Ongoing"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const CustomPieChart = ({ data }) => {
  // Sort data based on the fixed order
  const sortedData = data.sort(
    (a, b) => ORDER.indexOf(a._id) - ORDER.indexOf(b._id)
  );

  return (
    <div className="chart-container">
      <PieChart width={300} height={300}>
        <Pie
          data={sortedData}
          cx="50%"
          cy="50%"
          outerRadius={90}
          fill="#8884d8"
          dataKey="count"
          nameKey="_id"
        >
          {sortedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry._id]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>

      <div className="labels-container">
        {sortedData.map((entry, index) => (
          <div key={`label-${index}`} className="label">
            <span
              className="color-indicator"
              style={{ backgroundColor: COLORS[entry._id] }}
            ></span>
            {entry._id}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPieChart;

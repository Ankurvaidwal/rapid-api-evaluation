import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarchartComponent = ({ data, xAxisKey, barDataKey, barFillColor, xAxisLabel, yAxisLabel, tooltipLabel }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} label={{ position: 'insideBottomRight', offset: 0 }} />
        <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
        <Tooltip
          formatter={(value) => [`${value}`, tooltipLabel]}
        />
        <Legend />
        <Bar dataKey={barDataKey} fill={barFillColor} name={xAxisLabel} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarchartComponent;

import React from 'react'
import withDataFetching from './hocDataFetching';
import BarchartComponent from './barChartComponent';

const chartConfig = {
  xAxisKey: 'date',
  barDataKey: 'new_customers',
  barFillColor: '#8884d8',
  xAxisLabel: 'Date',
  yAxisLabel: 'Total Price',
  tooltipLabel: 'No. of customers',
  intervalMap: [
    { value: 'yearly', id: 'year' },
    { value: 'quarterly', id: 'quarter' },
    { value: 'monthly', id: 'month' },
    // { value: 'daily', id: 'daily' },
  ]
};

const apiUrl = 'https://rapid-api-evaluation.onrender.com/customers/track';

const headingText = 'New Customers Added Over Time: Track'

const CustomerOverTime = withDataFetching(BarchartComponent, apiUrl, chartConfig, headingText);

export default CustomerOverTime
import React from 'react'
import BarchartComponent from './barChartComponent';
import withDataFetching from './hocDataFetching';


const chartConfig = {
  xAxisKey: 'customer_name',
  barDataKey: 'purchase_count',
  barFillColor: '#8884d8',
  xAxisLabel: 'customer name',
  yAxisLabel: 'Purchase',
  tooltipLabel: 'No. of orders',
  intervalMap: [
    { value: 'yearly', id: 'year' },
    { value: 'quarterly', id: 'quarter' },
    { value: 'monthly', id: 'month' },
  ]
};

const apiUrl = 'https://rapid-api-evaluation.onrender.com/orders/repeatorders';

const headingText = 'Number of Repeat Customers:'

const RepeatCustomers = withDataFetching(BarchartComponent, apiUrl, chartConfig, headingText);

export default RepeatCustomers
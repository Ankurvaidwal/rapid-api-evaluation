import BarchartComponent from './barChartComponent';
import withDataFetching from './hocDataFetching';

const chartConfig = {
  xAxisKey: 'date',
  barDataKey: 'total_price',
  barFillColor: '#8884d8',
  xAxisLabel: 'Date',
  yAxisLabel: 'Total Price',
  tooltipLabel: 'Total Spent',
  intervalMap: [
    { value: 'yearly', id: 'year' },
    { value: 'quarterly', id: 'quarter' },
    { value: 'monthly', id: 'month' },
    { value: 'daily', id: 'daily' },
  ]
};

const apiUrl = 'http://localhost:3000/orders/totalpriceset';
const headingText = 'Total Sales Over Time:'

const TotalSales = withDataFetching(BarchartComponent, apiUrl, chartConfig, headingText);
export default TotalSales
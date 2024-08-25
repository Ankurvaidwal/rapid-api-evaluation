import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BarchartComponent from './barChartComponent';

const LifetimeValue = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/customers/cohortsvalue');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, [])

  return (
    <div className='flex flex-col justify-between items-center w-auto h-full gap-5"'>

      <h1 className='mb-20 text-center text-4xl'>
        Customer Lifetime Value by Cohorts:
      </h1>

      <BarchartComponent
        data={data}
        xAxisKey={"first_purchase"}
        barDataKey={"total_spent"}
        barFillColor={"#8884d8"}
        xAxisLabel={'First purchase date'}
        yAxisLabel={'Amount Spent'}
        tooltipLabel={'Life time value'}
      />

    </div>
  )
}

export default LifetimeValue
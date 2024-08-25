import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BarchartComponent from './barChartComponent';
import Loader from './loader';

const LifetimeValue = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://rapid-api-evaluation.onrender.com/customers/cohortsvalue');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false)
      }
    };

    fetchData();

  }, [])

  return (
    <div className='flex flex-col justify-between items-center w-auto h-full gap-5"'>

      <h1 className='mb-20 text-center text-4xl'>
        Customer Lifetime Value by Cohorts:
      </h1>

      {loading ? <Loader /> :
        <BarchartComponent
          data={data}
          xAxisKey={"first_purchase"}
          barDataKey={"total_spent"}
          barFillColor={"#8884d8"}
          xAxisLabel={'First purchase date'}
          yAxisLabel={'Amount Spent'}
          tooltipLabel={'Life time value'}
        />
      }

    </div>
  )
}

export default LifetimeValue
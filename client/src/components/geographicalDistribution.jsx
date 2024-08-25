import React, { useEffect, useState } from 'react'
import axios from "axios";
import MapComponent from './mapComponent';
import Loader from './loader';

const GeographicalDistribution = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get('https://rapid-api-evaluation.onrender.com/customerbycity');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {

    fetchData();

  }, [])


  return (
    <div className='flex flex-col justify-center items-center w-screen h-full gap-2'>
      <h1 className='text-2xl'>Geographical Distribution of Customers (10 customer)</h1>
      <MapComponent cities={data} />
      <button className='px-2 py-1 bg-purple-500 rounded-lg text-white text-lg' onClick={fetchData}>Random Customers</button>
      {loading && <Loader />}
    </div>
  )
}

export default GeographicalDistribution
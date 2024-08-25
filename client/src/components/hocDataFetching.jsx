import React, { useState, useEffect } from 'react';
import axios from 'axios';

const withDataFetching = (WrappedComponent, apiUrl, chartConfig, headingText) => {
    return function WithDataFetching(props) {
        const [data, setData] = useState([]);
        const [interval, setInterval] = useState('year');

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(apiUrl, {
                        params: { intervalType: interval }
                    });
                    setData(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }, [interval, apiUrl]);

        const handleChange = (event) => {
            setInterval(event.target.value);
        };

        return (
            <div className="flex flex-col justify-between items-center w-auto h-full gap-5">

                <h1 className='mb-20 text-center text-4xl'>
                    {headingText}
                </h1>
                <div className="flex w-auto gap-3 items-center">
                    <label htmlFor="interval">Choose interval: </label>
                    <select
                        className='border border-purple-400 px-2 py-1 rounded'
                        id="interval"
                        name="interval"
                        value={interval}
                        onChange={handleChange}
                    >
                        {chartConfig.intervalMap.map(intervals => (

                            <option value={intervals.id}>{intervals.value}</option>
                        ))}
                        {/* <option value="month">Monthly</option>
                        <option value="quarter">Quarterly</option>
                        <option value="daily">Daily</option> */}
                    </select>
                </div>
                <WrappedComponent
                    data={data}
                    xAxisKey={chartConfig.xAxisKey}
                    barDataKey={chartConfig.barDataKey}
                    barFillColor={chartConfig.barFillColor}
                    xAxisLabel={chartConfig.xAxisLabel}
                    yAxisLabel={chartConfig.yAxisLabel}
                    tooltipLabel={chartConfig.tooltipLabel}
                />
            </div>
        );
    };
};

export default withDataFetching;

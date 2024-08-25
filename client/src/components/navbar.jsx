import React from 'react'

const Navbar = ({ onComponentChange }) => {
    return (
        <nav className='flex  justify-between items-center px-6 py-4 '>
            <h1 className='text-2xl'>Rapid APi</h1>
            <ul className='flex justify-evenly gap-4  '>
                <li className='cursor-pointer hover:border-b-2 hover:border-purple-800 text-center text-purple-500 font-bold' onClick={() => onComponentChange("sales")}>Total Sales</li>
                <li className='cursor-pointer  hover:border-b-2 hover:border-purple-800 text-center text-purple-500 font-bold' onClick={() => onComponentChange("overtime")}>Customer Overtime</li>
                <li className='cursor-pointer  hover:border-b-2 hover:border-purple-800 text-center text-purple-500 font-bold' onClick={() => onComponentChange("repeat")}>Repeat Customers</li>
                <li className='cursor-pointer  hover:border-b-2 hover:border-purple-800 text-center text-purple-500 font-bold' onClick={() => onComponentChange("geographical")}>Geographical Distribution</li>
                <li className='cursor-pointer  hover:border-b-2 hover:border-purple-800 text-center text-purple-500 font-bold' onClick={() => onComponentChange("cohorts")}>Lifetime Value by Cohorts</li>
            </ul>
        </nav>
    )
}

export default Navbar
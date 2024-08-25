import { useState } from 'react'
import Navbar from './components/navbar'
import TotalSales from './components/totalSales';
import CustomerOverTime from './components/customerOverTime';
import RepeatCustomers from './components/repeatCustomers';
import GeographicalDistribution from './components/geographicalDistribution';
import LifetimeValue from './components/lifetimeValue';

function App() {

  const [component, setcomponent] = useState("sales");
  return (
    <>
      <Navbar onComponentChange={(args) => setcomponent(args)} />
      {component === 'sales' && <TotalSales />}
      {component === 'overtime' && <CustomerOverTime />}
      {component === 'repeat' && <RepeatCustomers />}
      {component === 'geographical' && <GeographicalDistribution />}
      {component === 'cohorts' && <LifetimeValue />}
    </>
  )
}

export default App

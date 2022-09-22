import React, { useEffect, useState } from 'react';
import StockChart from './Components/StockChart';
import axios from 'axios';
import './App.css';

const App = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async (symbol = 'AAPL') => {
    setIsLoading(true);
    const apiUrl = 'http://localhost:3001/api/v1';
    const res = await axios.get(`${apiUrl}/companies/stocks/${symbol}`);
    if (res.data && res.data?.stockChartData) {
      setData(res.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const path = window.location.pathname.split('/');
    const symbol = path[path.length - 1];
    fetchData(symbol);
  }, []);

  const formatCurrency = (val, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(val);
  }

  return (
    <>{!isLoading ? data && <div className='flex gap-6 p-4'>
      <div className='flex-1 mb-4'><StockChart state={data} /></div>
      <div className='w-96'>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <td>{data.companyInfo.name}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{data.companyInfo.description}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{data.companyInfo.country}</td>
            </tr>
            <tr>
              <th>Market Capitalization</th>
              <td>{formatCurrency(data.companyInfo.marketCapitalization)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> : <div className='flex items-center justify-center w-full h-full'><div className='loader'></div></div>}</>
  );
}

export default App;

import { Request, Response } from 'express';
import axios from 'axios';

interface IStock {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

interface ICompany {
  symbol: string;
  assetType: string;
  name: string;
  description: string;
  exchange: string;
  currency: string;
  country: string;
  sector: string;
  industry: string;
  address: string;
  marketCapitalization: number;
}

// Company Stocks info
export const stocksInfo = async (req: Request, res: Response) => {
  try {
    const symbol = req.params.company;
    const apiUrl = process.env.ALPHA_VANTAGE_API_URL;
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    let url = `${apiUrl}/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;
    const result = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'request'
      }
    });
    const companyInfo: ICompany = {
      symbol: result.data.Symbol,
      assetType: result.data.AssetType,
      name: result.data.Name,
      description: result.data.Description,
      exchange: result.data.Exchange,
      currency: result.data.Currency,
      country: result.data.Country,
      sector: result.data.Sector,
      industry: result.data.Industry,
      address: result.data.Address,
      marketCapitalization: Number(result.data.MarketCapitalization) / 100,
    };


    url = `${apiUrl}/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
    const { data } = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'request'
      }
    });
    const stockChartData: IStock[] = [];
    if (data) {
      Object.keys(data['Time Series (Daily)']).forEach((index: string) => {
        const record = data['Time Series (Daily)'][index];
        stockChartData.push({
          date: index,
          open: Number(record['1. open']),
          high: Number(record['2. high']),
          low: Number(record['3. low']),
          close: Number(record['4. close']),
          volume: Number(record['5. volume']),
        });
      });
    }

    res.status(200).json({
      companyInfo,
      stockChartData
    });
  } catch (err: any) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
      detail: err.message
    });
  }
}


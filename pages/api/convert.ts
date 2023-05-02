import type { NextApiRequest, NextApiResponse } from 'next';
import { CacheInfo, ConvertResponseAPI } from '@/interfaces';
import axios from 'axios';

type Data = 
  | { message: string }
  | ConvertResponseAPI

// response of the api to convert currencies
interface ResultAPI {
  // ...

  info : {
    rate: number;
    timestamp: number;
  };

  query: {
    amount: number;
    from:   string;
    to:     string;
  };

  result:     number;
  // ...
}

export default function handler(req:NextApiRequest, res:NextApiResponse<Data>) {
  switch( req.method ) {
    case 'GET':
      return convert(req, res);

    default:
      return res.status(400).json({ message: "Bad Request" });
  }
}

const convert = async (req:NextApiRequest, res:NextApiResponse<Data>) => {

  const { to: reqTo, from: reqFrom, amount: reqAmount } = req.query as {to: string, from: string, amount: string};

  if( !reqTo ) return res.status(400).json({ message: "The currency \"to\" not found." }) 
  if( !reqFrom ) return res.status(400).json({ message: "The currency \"from\" not found." }) 
  if( !reqAmount ) return res.status(400).json({ message: "The amount to convert not found." }) 
  if( !parseFloat(reqAmount.replaceAll(",", "")) ) return res.status(400).json({ message: "The amount must be greater than 0." }) 

  let appHost = process.env.HOST;
  const { data: pairCached } = await axios.get<CacheInfo>(`${appHost}/api/cache?from=${reqFrom}&to=${reqTo}`);

  if( pairCached ) {
    const amount = parseFloat(reqAmount.replaceAll(",", ""));
    const result = amount * pairCached.rate;

    return res.status(200).json({
      from: reqFrom, to: reqTo, 
      amount, result 
    })
  }

  try {
    const link = `https://api.apilayer.com/exchangerates_data/convert?to=${reqTo}&from=${reqFrom}&amount=${reqAmount}`;

    const { data: result } = await axios.get<ResultAPI>(link, {
      headers: { apikey: process.env.API_KEY || '' }
    })
    
    const { from, to, amount } = result.query;

    // save in cache
    const pair: CacheInfo = {
      to, from, rate: result.info.rate,
      timestamp: Date.now()
    }
    
    await axios.post(`${appHost}/api/cache`, pair);

    return res.status(200).json({
      from, to, amount,
      result: result.result
    });

  } catch ( { message }:any ) {
      return res.status(400).json({ message });
  }
}

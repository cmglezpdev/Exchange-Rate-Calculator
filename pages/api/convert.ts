import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CacheInfo, ConvertResponseAPI, ResultApiLAyerToConvert } from '@/interfaces';
import { CacheManager } from './cache'

type Data = 
  | { message: string }
  | ConvertResponseAPI


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

  // const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';
  // const { data: pairCached } = await axios.get<CacheInfo>(`${serverUrl}/api/cache?from=${reqFrom}&to=${reqTo}`);
  const cacheManager = CacheManager.getInstance();
  const pairCached = cacheManager.getCachePair(reqFrom, reqTo);

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

    const { data: result } = await axios.get<ResultApiLAyerToConvert>(link, {
      headers: { apikey: process.env.API_KEY || '' }
    })
    
    const { from, to, amount } = result.query;

    // save in cache
    const pair: CacheInfo = {
      to, from, rate: result.info.rate,
      timestamp: Date.now()
    }
    
    // await axios.post(`${serverUrl}/api/cache`, pair);
    cacheManager.setCachePair(from, to, result.info.rate);

    return res.status(200).json({
      from, to, amount,
      result: result.result
    });

  } catch ( { message }:any ) {
      return res.status(400).json({ message });
  }
}

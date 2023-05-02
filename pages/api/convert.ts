import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CacheInfo, ConvertResponseAPI, ResultApiLAyerToConvert } from '@/interfaces';
import { CacheRedis } from '@/redis';

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

  const pairCached = await CacheRedis.get(`${reqFrom}-${reqTo}`);
  
  if( pairCached ) {
    const amount = parseFloat(reqAmount.replaceAll(",", ""));
    const result = amount * (JSON.parse(pairCached) as CacheInfo).rate;
    return res.status(200).json({
      from: reqFrom, to: reqTo, 
      amount, result 
    })
  }

  try {
    const link = `https://api.apilayer.com/exchangerates_data/convert?to=${reqTo}&from=${reqFrom}&amount=${reqAmount}`;

    const apikey = process.env.API_KEY || '';
    const { data: result } = await axios.get<ResultApiLAyerToConvert>(link, {
      headers: { apikey }
    })
    
    const { from, to, amount } = result.query;

    // save in cache
    const pair: CacheInfo = {
      to, from, rate: result.info.rate,
    }

    const lifespan = parseInt(process.env.CACHE_TIME || '10');
    await CacheRedis.set(`${from}-${to}`, JSON.stringify(pair), 'PX', lifespan * 60 * 1000);

    return res.status(200).json({
      from, to, amount,
      result: result.result
    });

  } catch ( error:any ) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error. See server logs" });
  }
}

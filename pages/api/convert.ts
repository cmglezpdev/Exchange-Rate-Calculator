import type { NextApiRequest, NextApiResponse } from 'next';
import { CacheInfo, ConvertResponseAPI } from '@/interfaces';
// import { cache } from '@/helpers';


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

  // return the value chached if it exists
  const pairCached = getCacheElement(reqFrom, reqTo);
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

    const requestOptions = {
      method: 'GET',
      headers: {
          apiKey: process.env.API_KEY || '',
          'Content-Type': 'application/json' 
      }
    };

    const response: Response = await fetch(link, requestOptions);
    const result: ResultAPI = await response.json();
    const { from, to, amount } = result.query;

    // save in cache
    const pair: CacheInfo = {
      to, from, rate: result.info.rate,
      timestamp: Date.now()
    }
    setCacheElement(pair);


    return res.status(200).json({
      from, to, amount,
      result: result.result
    });

  } catch ( { message }:any ) {
      return res.status(400).json({ message });
  }
}





import fs from 'fs';
import path from 'path';
// import { CacheInfo } from '@/interfaces';

const getCache = (): CacheInfo[] => {
    const cacheFilePath = path.join(process.cwd(), '/data/cache.json');
    try {
      const cache: CacheInfo[] = JSON.parse(fs.readFileSync(cacheFilePath, 'utf-8'));
      return cache;      
    } catch (error) {
      fs.writeFileSync(cacheFilePath, "[]");     
      return [];
    }
}

export const getCacheElement = (from: string, to: string): CacheInfo | null => {
    removeExpirateData();
    const cache = getCache();
    const index = cache.findIndex(pair => (pair.from === from && pair.to === to));
    if( index == -1 ) return null;
    return cache[index];
}

export const setCacheElement = ( pair: CacheInfo ) => {
    removeExpirateData();
    let cache = getCache();

    const index = cache.findIndex(p => (p.from === pair.from && p.to === pair.to));
    if( index === -1 ) cache.push(pair);
    else cache[index] = pair;

    const cacheFilePath = path.join(process.cwd(), '/data/cache.json');
    fs.writeFileSync(cacheFilePath, JSON.stringify(cache));
}

const removeExpirateData = () => {
    let cache = getCache();
    const CACHE_TIME = parseInt(process.env.CACHE_TIME || "10");

    cache = cache.filter(cachePair => {
        console.log(Date.now() - cachePair.timestamp );
        if( Date.now() - cachePair.timestamp >= CACHE_TIME*60000 ) return false;
        return true;
    })

    const cacheFilePath = path.join(process.cwd(), '/data/cache.json');
    fs.writeFileSync(cacheFilePath, JSON.stringify(cache));
}
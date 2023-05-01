import type { NextApiRequest, NextApiResponse } from 'next';
import { ConvertResponseAPI } from '@/interfaces';

type Data = 
  | { message: string }
  | ConvertResponseAPI

// response of the api to convert currencies
interface ResultAPI {
  // ...
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

  const { to: reqTo, from: reqFrom, amount: reqAmount } = req.query;

  if( !reqTo ) return res.status(400).json({ message: "The currency \"to\" not found." }) 
  if( !reqFrom ) return res.status(400).json({ message: "The currency \"from\" not found." }) 
  if( !reqAmount ) return res.status(400).json({ message: "The amount to convert not found." }) 
  if( !parseFloat((reqAmount as string).replaceAll(",", "")) ) return res.status(400).json({ message: "The amount must be greater than 0." }) 

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

    return res.status(200).json({ 
      from, to, amount,
      result: result.result
    });

  } catch ( { message }:any ) {
      return res.status(400).json({ message });
  }
}
import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next'
import { CacheInfo } from '@/interfaces';

type Data = 
 | { message: string }
 | CacheInfo[]
 | CacheInfo | null
    

    
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch( req.method ) {
        case "GET":
            return getCache(req, res);
        case "POST":
            return setCache(req, res);
        default:
            res.status(200).json({ message: 'Bad Request' })
    }
}


const cacheFilePath = path.join(process.cwd(), '/data/cache.json');

const getCache = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { from, to } = req.query as {from: string, to: string};
    
    const cache = removeExpirateData();
    if( !from && !to ) return res.status(200).json(cache);
    if( !from || !to ) return res.status(400).json({message: "The currencies are required"});

    const index = cache.findIndex(pair => (pair.from === from && pair.to === to));
    const itemCached = ( index == -1 ) ? null : cache[index];
    return res.status(200).json(itemCached);
}

const setCache = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { from, to, rate } = req.body as CacheInfo;
    if( !from || !to || !rate ) return res.status(400).json({message: "The currencies and the rate are required"})

    const itemCatched: CacheInfo = {
        from, to, rate, timestamp: Date.now()
    }
    const cache = removeExpirateData();
    cache.push(itemCatched);
    fs.writeFileSync(cacheFilePath, JSON.stringify(cache));
    return res.status(200).json(cache);
}

const getAllCache = (): CacheInfo[] => {
    try {
      const cache: CacheInfo[] = JSON.parse(fs.readFileSync(cacheFilePath, 'utf-8'));
      return cache;      
    } catch (error) {
      fs.writeFileSync(cacheFilePath, "[]");     
      return [];
    }
}

const removeExpirateData = () => {
    let cache = getAllCache();
    const CACHE_TIME = parseInt(process.env.CACHE_TIME || "10");
    cache = cache.filter(cachePair => ( Date.now() - cachePair.timestamp < CACHE_TIME*60000 ));
    fs.writeFileSync(cacheFilePath, JSON.stringify(cache));
    return cache;
}

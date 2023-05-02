import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next'
import { CacheInfo } from '@/interfaces';

type Data = 
 | { message: string }
 | CacheInfo[]
 | CacheInfo | null
    
// This class is a singleton to manage the cache
export class CacheManager {
    private static _instance: CacheManager;
    static cacheFilePath = path.join(process.cwd(), '/data/cache.json');

    private constructor(){}

    public static getInstance(): CacheManager {
        if (!CacheManager._instance) {
            CacheManager._instance = new CacheManager();
        }
        return CacheManager._instance;
    }

    public getCache = (): CacheInfo[] => {
        try {
          const cache: CacheInfo[] = JSON.parse(fs.readFileSync(CacheManager.cacheFilePath, 'utf-8'));
          return cache;      
        } catch (error) {
          fs.writeFileSync(CacheManager.cacheFilePath, "[]");     
          return [];
        }
    }
    
    public removeExpirateData = () => {
        let cache = this.getCache();
        const CACHE_TIME = parseInt(process.env.CACHE_TIME || "10");
        cache = cache.filter(cachePair => ( Date.now() - cachePair.timestamp < CACHE_TIME*60000 ));
        fs.writeFileSync(CacheManager.cacheFilePath, JSON.stringify(cache));
        return cache;
    }
    
    public getCachePair = (from: string, to: string): CacheInfo | null => {
        const cache = this.removeExpirateData();
        const index = cache.findIndex(pair => (pair.from === from && pair.to === to));
        const itemCached = ( index == -1 ) ? null : cache[index];
        return itemCached;
    }
    
    public setCachePair = (from: string, to: string, rate: number) => {
        const itemCatched: CacheInfo = {
            from, to, rate, timestamp: Date.now()
        }
        const cache = this.removeExpirateData();
        cache.push(itemCatched);
        fs.writeFileSync(CacheManager.cacheFilePath, JSON.stringify(cache));
        return cache;
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch( req.method ) {
        case "GET":
            return getCacheApi(req, res);
        case "POST":
            return setCacheApi(req, res);
        default:
            res.status(200).json({ message: 'Bad Request' })
    }
}

const getCacheApi = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { from, to } = req.query as {from: string, to: string};
    
    const cache = CacheManager.getInstance().removeExpirateData();
    if( !from && !to ) return res.status(200).json(cache);
    if( !from || !to ) return res.status(400).json({message: "The currencies are required"});

    const index = cache.findIndex(pair => (pair.from === from && pair.to === to));
    const itemCached = ( index == -1 ) ? null : cache[index];
    return res.status(200).json(itemCached);
}

const setCacheApi = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { from, to, rate } = req.body as CacheInfo;
    if( !from || !to || !rate ) return res.status(400).json({message: "The currencies and the rate are required"})

    const itemCatched: CacheInfo = {
        from, to, rate, timestamp: Date.now()
    }
    const cache = CacheManager.getInstance().removeExpirateData();
    cache.push(itemCatched);
    fs.writeFileSync(CacheManager.cacheFilePath, JSON.stringify(cache));
    return res.status(200).json(cache);
}


# Exchange Rate Calculator
> Technical Test to apply to Fonoma LLC (Nextjs + Styled Components)

## Run App

In developer mode:

```bash
yarn dev # npm run dev
```

In Production:

```bash
yarn build # npm run build
yarn start # npn run start
```


## Tests

```bash
yarn test # npm run test
```


## Environment Variables

* `API_KEY`: Api key of [Exchange Rates Data API](https://apilayer.com/marketplace/exchangerates_data-api)

* `CACHE_TIME`: Lifespan of the date in the cache in minutes. The default value is _10_.

* `SERVER_URL`: URL of the server. The default value is _http://localhost:3000_

* `REDIS_URL`: URL of the redis service(UpStash, ...)
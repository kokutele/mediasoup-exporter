# mediasoup-exporter

## how to use

```
const exporter = require('mediasoup-exporter')


(async () => {
  // ...snip...
  // after starting Mediasoup server

  await exporter( { port: 4000 } )
})();
```

## REST

### prometheus

* GET /metrics
  - metrics in prometheus format

### casual api

* GET /workers
* GET /routers
* GET /producers
* GET /consumers




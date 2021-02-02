# mediasoup-exporter

## how to use

```js
npm install mediasoup-exporter
```

> we are assuming that library `mediasoup` is installed already.

### snipet

```js
const exporter = require('mediasoup-exporter')


(async () => {
  // ...snip...
  // before starting Mediasoup server

  await exporter( { port: 4000 } )

  // ...snip...
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




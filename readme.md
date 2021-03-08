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

for more detail, see [sample code](./test-server/server.js)

## REST

### prometheus

* GET /metrics
  - all metrics in prometheus format

### casual api

* GET /workers
  - metrics for active workers in JSON format
* GET /routers
  - metrics for routers in JSON format
* GET /producers
  - metrics for producers in JSON format
* GET /consumers
  - metrics for consumers in JSON format
* GET /usage
  - metrics of cpu usage in JSON format

### run test server

```
$ cd test-server
$ node server.js
```
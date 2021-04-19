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

### how to add custom data into label?

put any data into `appData` for [consumer](https://mediasoup.org/documentation/v3/mediasoup/api/#ConsumerOptions) and [producer](https://mediasoup.org/documentation/v3/mediasoup/api/#ProducerOptions)

Then you can see custom data in metrics as a label.

* snipet (in case of consumer)

```js
const consumer = await transport.consume({
  producerId      : producer.id,
  rtpCapabilities : consumerPeer.data.rtpCapabilities,
  paused          : true,
  appData         : { roomId: this._roomId } // add custom data
});
```

* sample metrics

```
# HELP mediasoup_consumers_byte_count mediasoup_consumers_byte_count
# TYPE mediasoup_consumers_byte_count gauge
mediasoup_consumers_byte_count{kind="video",mimeType="video/VP8",type="outbound-rtp",consumerId="39de65e6-6514-4cd3-b2e3-77894ee6e876",roomId="test-guitarsolo-w5f0Mc20gP-6jmtL8Km"} 272998
mediasoup_consumers_byte_count{kind="audio",mimeType="audio/opus",type="outbound-rtp",consumerId="a66cf2cf-251b-4d2d-9098-dec8ad88d4bf",roomId="test-guitarsolo-w5f0Mc20gP-6jmtL8Km"} 32917
```

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
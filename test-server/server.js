const mediasoup = require('mediasoup')
const os = require('os')
const exporter = require('../index')

const port = process.env.PORT || 4000
const numWorkers = Object.keys(os.cpus()).length

const settings = {
  logLevel : 'warn',
  logTags  : [ 
    'info', 'ice', 'dtls', 'rtp', 'srtp', 'rtcp', 'rtx', 'bwe', 'score', 'simulcast', 'svc', 'sctp' 
  ],
  rtcMinPort : 40000,
  rtcMaxPort : 49999
}

run()

async function run() {
  // You need to call `exporter()` before calling `mediasoup.createWorker()`
  await exporter({ port })

  // start workers of mediasoup
  const workers = []
  for( let i = 0; i < numWorkers; i++ ) {
    const worker = await mediasoup.createWorker( settings )

    worker.on('died', () => {
      console.error(`mediasoup worker died, exiting in 2 seconds... [pid:${worker.pid}]`)
      setTimeout( () => process.exit(1), 2000)
    })

    workers.push( worker )

    setInterval( async () => {
      const usage = await worker.getResourceUsage()

      console.info('mediasoup Worker resource usage [pid:%d]: %o', worker.pid, usage)
    }, 120000)
  }
  console.info(`running ${numWorkers} mediasoup Workers...`)
  console.info(`you can GET metrics via http://localhost:${port}/metrics in prometheus format`)
}
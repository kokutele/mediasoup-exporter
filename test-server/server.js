const mediasoup = require('mediasoup')
const os = require('os')
const exporter = require('../index')

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

  await exporter({ port: 4000 })
}
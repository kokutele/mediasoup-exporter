exports.getWorkersDump = async workers => {
  const dumps = []

  for( let worker of workers.values() ) {
    try {
      dumps.push(await worker.dump())
    } catch (err) {
      console.error(err)
    }
  }

  return dumps
}

exports.getRouterIds = (workersDump = []) => (
  workersDump.map( worker => worker.routerIds ).flat()
)

exports.getRoutersDump = async ( routers, routerIds ) => {
  const routersDump = []

  for( let routerId of routerIds.values() ) {
    const router = routers.get( routerId )
    const dump = await router.dump()
    routersDump.push( dump )
  }

  return routersDump
}

exports.getProducerIds = routersDump => {
  return routersDump.map( router => (
    Object.keys(router.mapProducerIdConsumerIds)
  )).flat()
}

exports.getProducersStats = async ( producerIds, producers ) => {
  const producersStats = []

  let producer, stats
  for( let producerId of producerIds.values() ) {
    producer = producers.get( producerId )
    stats = await producer.getStats()
    producersStats.push( Object.assign( {}, stats[0], { producerId }))
  }

  return producersStats
}

exports.getConsumerIds = routersDump => {
  return routersDump.map( router => (
    Object.keys(router.mapConsumerIdProducerId)
  )).flat()
}

exports.getConsumersStats = async ( consumerIds, consumers ) => {
  const consumersStats = []

  let consumer, stats
  for( let consumerId of consumerIds.values() ) {
    consumer = consumers.get( consumerId )
    stats = await consumer.getStats()
    consumersStats.push( Object.assign( {}, stats[0], { consumerId }))
  }

  return consumersStats
}

module.exports = {
  network: 'simnet',
  nodes: ['10.7.64.88','10.7.64.53','45.33.50.84','2600:3c01::f03c:91ff:fee7:2e94'],
  useWorkers: true,
  coinCache: 30000000,
  query: true,
  pruned: true,
  db: 'leveldb',
  logLevel: 'info',
  logFile: true,
  listen: true
};

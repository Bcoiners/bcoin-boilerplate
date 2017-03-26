module.exports = {
  network: 'simnet',
  walletauth: true,
  useWorkers: true,
  coinCache: 30000000,
  query: false,
  nodes: ['10.7.64.88','10.7.64.53','45.33.50.84','2600:3c01::f03c:91ff:fee7:2e94'],
  passphrase: 'testme',
  apiKey: 'testme',
  pruned: true,
  db: 'leveldb',
  logLevel: 'info',
  logFile: true,
};

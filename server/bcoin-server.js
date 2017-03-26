'use strict';

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

const config = require('../setup/setupUtils').getConfig();
const bcoin = require('bcoin');
const assert = require('assert');

const co = bcoin.utils.co;

// const util = bcoin.util;
const MTX = bcoin.mtx;
const Script = bcoin.script;
const Amount = bcoin.btc.Amount;
const FullNode = bcoin.fullnode;
const SPVNode = bcoin.spvnode;

console.log(config.network);
let node;
if (process.env.npm_config_bcoin_node === 'spv') {
  node = new SPVNode(config);
} else {
  node = new FullNode(config);
}

const walletdb = node.use(bcoin.walletplugin);
node.on('error', () => {});

var chain = node.chain;
var miner = node.miner;
miner.addAddress('SNKu2aBBUBknhuLR4NgNoTUFs7vDS1mXS6');

chain.on('block', () => {
  console.log('new block found. Chain State tx: ', chain.tip);
  console.log('Restarting miner');
  miner.close();
  miner.open().then(function() {
    return miner.createBlock();
  }).then(function(template) {
    console.log("Block template: ");
    console.log(template);

    return miner.cpu.createJob();
  }).then(function(job) {
    return job.mineAsync();
  }).then(function(block) {
    // Add the block to the chain
    console.log('Adding %s to the blockchain.', block.rhash);
    console.log(block);
    return chain.add(block);
  }).then(function() {
    console.log('Added block!');
  });
})

node.ensure()
.then(() => node.open())
.then(() => node.connect())
.then(() => node.startSync());

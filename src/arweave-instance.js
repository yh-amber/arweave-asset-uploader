const Arweave = require('arweave');

// initialize an arweave instance
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  // host: '127.0.0.1',
  // port: 1984,
  // protocol: 'http'
});

module.exports = arweave;

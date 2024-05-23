const fs = require('fs');
const path = require('path');

// load the JWK wallet key file from local
const KEY = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../.keys/-vKc6iavmguNO-pe8sOPZMfmihf1I-FtXbwKT-NkF6M.json')
).toString());

async function readAccount(arweave) {
  const address = await arweave.wallets.jwkToAddress(KEY);
  console.log("address", address);

  const balance = await arweave.wallets.getBalance(address);
  console.log("balance", balance);

  const txId = await arweave.wallets.getLastTransactionID(address);
  console.log("lastTransactionID", txId);
}

module.exports = {
  KEY,
  readAccount,
}

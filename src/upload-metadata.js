const fs = require('fs');
const path = require('path');
const arweave = require('./arweave-instance');
const { KEY } = require('./wallet');

function getMetadata() {
  const filePath = path.join(__dirname, './template/lore-metadata.json');
  return fs.readFileSync(filePath);
}

async function uploadMetadata() {
  try {
    const metadata = getMetadata();

    const transaction = await arweave.createTransaction({
      data: metadata
    }, KEY);
    console.log('>>>>>>transaction', transaction);
    transaction.addTag('Type', 'file');
    transaction.addTag('Content-Type', 'application/json');
    // transaction.addTag('Title', 'Chimpay Season 3 Top Banana Contributor-Third Place');

    await arweave.transactions.sign(transaction, KEY);

    const response = await arweave.transactions.post(transaction);
    console.log(
      '********metadataTransaction********\n', transaction,
      '\n********response********\n', response,
      '\n************************'
    );

    console.log(`https://arweave.net/${transaction.id}`);
  } catch (error) {
    console.log('error:::', error);
  }
}

uploadMetadata();
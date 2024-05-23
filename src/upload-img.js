const fs = require('fs');
const arweave = require('./arweave-instance');
const { KEY } = require('./wallet');

function getImageData() {
  // load the data from disk
  return fs.readFileSync('/Users/zyh/Downloads/gold.gif');
}

async function uploadImage() {
  try {
    const imgData = getImageData();

    // create a data transaction
    let tx = await arweave.createTransaction({
      data: imgData
    }, KEY);

    // add a custom tag that tells the gateway how to serve this data to a browser
    tx.addTag('Type', 'file');
    tx.addTag('Content-Type', 'image/gif');
    // tx.addTag('Title', 'Honorary Chimp #25');

    // you must sign the transaction with your key before posting
    await arweave.transactions.sign(tx, KEY);

    // create an uploader that will seed your data to the network
    let uploader = await arweave.transactions.getUploader(tx);
    console.log(
      '********transaction********\n', tx,
      '\n********uploader********\n', uploader,
      '\n************************'
    );

    // run the uploader until it completes the upload.
    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
    }

    console.log(`https://arweave.net/${tx.id}`);
  } catch (error) {
    console.log('error:::', error);
  }
}

uploadImage();

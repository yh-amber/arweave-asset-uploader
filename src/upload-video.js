const fs = require('fs');
const arweave = require('./arweave-instance');
const { KEY } = require('./wallet');

function getImageData() {
  // load the data from disk
  return fs.readFileSync(`/Users/zyh/Downloads/Scene_Compile_Till_Scroll_6.mp4`);
}

async function uploadImage() {
  try {
    const videoData = getImageData();

    // create a data transaction
    let transaction = await arweave.createTransaction({
      data: videoData
    }, KEY);

    // add a custom tag that tells the gateway how to serve this data to a browser
    transaction.addTag('Type', 'file');
    transaction.addTag('Content-Type', 'video/mp4');
    // transaction.addTag('Title', 'Lore NFT Video');

    // you must sign the transaction with your key before posting
    await arweave.transactions.sign(transaction, KEY);

    // create an uploader that will seed your data to the network
    let uploader = await arweave.transactions.getUploader(transaction);
    console.log(
      '********transaction********\n', transaction,
      '\n********uploader********\n', uploader,
      '\n************************'
    );

    // run the uploader until it completes the upload.
    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
    }

    console.log(`https://arweave.net/${transaction.id}`);
  } catch (error) {
    console.log('error:::', error);
  }
}

uploadImage();

const fs = require('fs');
const manifestModel = require('./../models/ManifestModel');
const clientService = require('./client-service');
let manifestTimer;

function sendManifest() {
  getManifest()
    .then(manifest => {
      manifestModel.data = manifest;
      clientService.sendMessage(manifestModel);
      console.log('Manifest has been successfully sent on', new Date());
    })
    .catch(error => {
      console.log(error.description);
      console.log(error.err);
    });
}

function startManifestStream() {
  manifestTimer = setInterval(sendManifest, 60000);
}

function stopManifestStream() {
  clearTimeout(manifestTimer);
}

function getManifest() {
  return new Promise((resolve, reject) => {
    fs.readFile('./assets/manifest.json', 'UTF8', (err, file) => {
      if (!err) {
        try {
          resolve(JSON.parse(file));
        } catch (e) {
          reject({
            description: 'Error in manifest file parsing sending',
            error: err
          });
        }
      } else {
        reject({
          description: 'Error in manifest file reading',
          error: err
        });
      }
    });
  });
}

module.exports = {startManifestStream, stopManifestStream, getManifest};

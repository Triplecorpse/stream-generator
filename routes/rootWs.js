const printService = require('../services/print-service');
const clientService = require('../services/client-service');
const manifestService = require('../services/manifest-service');
const personService = require('../services/person-service');
const receiptService = require('../services/receipt-service');
const stairService = require('../services/stair-service');
const rpc = require('./../services/rpc-service');

function sendStartPoint(id) {
  manifestService.getManifest()
    .then(manifest => {
      rpc.success(id, manifest);
    })
    .catch(error => {
      console.log(error.description);
      console.log(error.error);
    });
}

module.exports = app => {
  app.ws('/', function (ws) {
    printService.registerNewPrint(ws.upgradeReq.headers['sec-websocket-key'], ws);
    clientService.addClient(ws.upgradeReq.headers['sec-websocket-key'], ws);
    let startApplicationTimer;

    ws.on('message', function (msg) {
      const message = JSON.parse(msg);

      switch (message.method_name) {
        case 'request_manifest':
          sendStartPoint(message.message_id);

          manifestService.stopManifestStream();
          manifestService.startManifestStream();

          personService.stopPersonAliveStream();
          personService.startPersonAliveStream();

          break;
        case 'print':
          printService.send(message.message_id);
          receiptService.set(message.data.image);
          break;
        case 'highlight_stair':
          stairService.highlightStair(message.data.status, message.data.id);
          break;
      }
    });

    ws.on('close', () => {
      clearTimeout(startApplicationTimer);
      printService.removePrint(ws.upgradeReq.headers['sec-websocket-key']);
      clientService.removeClient(ws.upgradeReq.headers['sec-websocket-key']);
    });
  });
};

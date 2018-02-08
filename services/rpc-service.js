const rpc = require('./../models/RpcResponseModel');
const clientService = require('./client-service');

function success(id, data) {
  rpc.success = true;
  rpc.message_id = id;
  rpc.data = data;

  clientService.sendMessage(rpc);
  console.log('Some RPC response was sent successfully');
}

function fail(id, data) {
  rpc.success = false;
  rpc.message_id = id;
  rpc.data = data;

  clientService.sendMessage(rpc);
  console.log('Some RPC was response failed');
}

module.exports = {
  success, fail
};

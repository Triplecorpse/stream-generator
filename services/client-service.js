const clients = {};

function addClient(key, ws) {
  clients[key] = ws;
  console.log(`NEW CLIENT: registered ${key} at ${new Date()}`);
}

function removeClient(key) {
  delete clients[key];
  console.log(`REMOVED CLIENT: unregistered ${key} at ${new Date()}`);
}

function sendMessage(message) {
  if (typeof message === 'object') {
    message = JSON.stringify(message);
  } else if (typeof message !== 'string') {
    message = message.toString();
  }

  try {
    for (let key in clients) {
      if (clients.hasOwnProperty(key)) {
        clients[key].send(message);
      }
    }
    return true;
  } catch (e) {
    console.error('Couldn\'t send some messages', e);
    return false;
  }
}

module.exports = {addClient, removeClient, sendMessage};

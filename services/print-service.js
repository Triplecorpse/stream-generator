const print = require('./../models/PrintMessage');

const sockets = {};

function registerNewPrint(key, ws) {
    sockets[key] = ws;
}
function removePrint(key) {
    delete sockets[key];
}

module.exports = {
    send(id) {
        for (let key in sockets) {
            if (sockets.hasOwnProperty(key)) {
                print.message_id = id;
                sockets[key].send(JSON.stringify(print));
            }
        }
    },
    registerNewPrint, removePrint
};

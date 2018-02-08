const WebSocket = require('ws');
const uri = 'ws://172.22.62.154:8001';
const websocket = new WebSocket(uri);
const fs = require('fs');

websocket.onopen = function () {
    send_test_message();
};

function send_test_message() {
    fs.readFile('image-for-printer-test.png', function (err, data) {
        const base64data = new Buffer(data).toString('base64');

        const sendData = {
            'type': 'rpc',
            'message_id': 'abc-def-ghi',
            'method_name': 'print',
            'data': {
                'image': base64data
            }
        };

        websocket.send(JSON.stringify(sendData));
        websocket.close();
    });
}

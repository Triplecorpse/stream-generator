const WebSocket = require('ws');
const uri = 'ws://172.22.62.40:8001';
const websocket = new WebSocket(uri);

websocket.onopen = function () {
    console.log('Sending windows application events...');
    start_application();
};

websocket.onmessage = function (msg) {
    const message = JSON.parse(msg.data);

    if (message && message.message_id === 'abc-def-ghi') {
        end_application();
    }
};

function start_application() {
    console.log('start_application');
    const data = {
        type: 'rpc',
        message_id: 'abc-def-ghi',
        method_name: 'start_application',
        data: {
            id: '3f32c66a-af0c-4fb1-ae16-49cb2ecd20a1',
            name: 'Magic Game'
        }
    };
    websocket.send(JSON.stringify(data));
}

function end_application() {
    console.log('end_application');
    const data = {
        type: 'rpc',
        message_id: 'abc-def-ghi',
        method_name: 'end_application',
        data: {
            id: '3f32c66a-af0c-4fb1-ae16-49cb2ecd20a1',
            name: 'Magic Game'
        }
    };
    websocket.send(JSON.stringify(data));
    websocket.close();
}

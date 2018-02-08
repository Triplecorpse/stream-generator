const buzz = require('../services/buzzer-service');

module.exports = app => {
    app.get('/buzz', (req, res) => {
        buzz.send();
        res.sendStatus(200);
    });
};

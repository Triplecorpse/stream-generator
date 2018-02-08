const stairService = require('../services/stair-service');

module.exports = app => {
    app.get('/external/stair/:id/:event', (req, res) => {
        const id = +req.params.id;
        const event = req.params.event;

        if (id) {
            stairService.toggleStairEvent(id, event);
        }

        res.sendStatus(200);
    });
};

const receiptService = require('../services/receipt-service');

module.exports = app => {
    app.get('/receipt', (req, res) => {
        const receipt = receiptService.get();

        if (receipt) {
            res.send(receiptService.get());
            receiptService.clear();
        } else {
            res.sendStatus(200);
        }
    });
};

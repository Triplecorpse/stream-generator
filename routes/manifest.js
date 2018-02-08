const fs  = require('fs');

module.exports = app => {
    app.post('/manifest', (req, res) => {
        fs.writeFile('assets/manifest.json', req.body.manifest, err => {
            if (!err) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        });
    });
};

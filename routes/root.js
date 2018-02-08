const fs = require('fs');

module.exports = app => {
    app.get('/', function (req, res) {
        fs.readFile('public/dist/index.html', 'UTF8', (err, file) => {
            if (!err) {
                res.send(file)
            } else {
                res.status(500).send(err)
            }
        });
    });
};

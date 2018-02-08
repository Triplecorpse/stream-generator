const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const bodyParser = require('body-parser');

const routePerson = require('./routes/person');
const routeRoot = require('./routes/root');
const routeRootWs = require('./routes/rootWs');
const routeBuzz = require('./routes/buzz');
const routeManifest = require('./routes/manifest');
const routeReceipt = require('./routes/receipt');
const routeStair = require('./routes/stair-route');

app.use(express.static('public/dist'));
app.use(express.static('assets'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

routeRoot(app);
routeRootWs(app);
routePerson(app);
routeManifest(app);
routeBuzz(app);
routeReceipt(app);
routeStair(app);

app.listen(3333, function () {
  console.log('Example app listening on port 3333!');
});

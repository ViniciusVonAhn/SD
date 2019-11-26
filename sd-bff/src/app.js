'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(helmet.frameguard());
app.disable('x-powered-by');

// carrega as rotas
const stateRoutes = require('./routes/state.routes');
const cityRoutes = require('./routes/city.routes');
const countryRoutes = require('./routes/country.routes');
const hotelRoutes = require('./routes/hotel.routes');
const funcionarioRoutes = require('./routes/funcionario.routes.js');

//seta o endpoint da rotas
app.use('/', stateRoutes);
app.use('/', cityRoutes);
app.use('/', countryRoutes);
app.use('/', hotelRoutes);
app.use('/', funcionarioRoutes);

module.exports = app;
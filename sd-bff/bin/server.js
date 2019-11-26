'use strict';
const app = require('../src/app');

require('dotenv').config();

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), () => {
    try {
        console.log("Server on porta %s", app.get('port'));
    } catch (error) {
        console.log(error);
    }
});





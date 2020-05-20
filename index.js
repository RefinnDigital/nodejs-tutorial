'use strict'

const { app } = require('./app');
const { App } = require('./config');

app.listen(App.PORT, () => {
    console.log(`listening on port ${App.PORT}`);
});

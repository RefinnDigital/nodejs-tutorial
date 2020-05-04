'use strict'

const path = require('path');
const express = require('express');
const app = express();

app.use('/assets', express.static(path.resolve(__dirname, './assets')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'My Todo Application - Changed'
    });
});

app.get('/login', (reg, res) => {
    res.send('this is our login page');
})

app.listen(3000, () => {
    console.log('listening on port 3000');
});


const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { TodoRouter } = require('./routes/todo');
const { App } = require('./config');

const app = express();

app.use('/assets', express.static(path.resolve(__dirname, './assets')));

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', {
        title: App.NAME,
        baseUrl: App.BASE_URL
    });
});

app.get('/login', (reg, res) => {
    res.send('this is our login page');
})

app.use('/todo', TodoRouter);

module.exports = {
    app
}

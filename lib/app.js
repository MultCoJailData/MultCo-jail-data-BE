const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static(__dirname + '/../public'));

app.use('/api/v1/charges', require('./routes/charges'));
app.use('/api/v1/persons', require('./routes/persons'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

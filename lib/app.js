const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + '/../public'));

app.use('/api/v1/courtCases', require('./routes/courtCases'));
app.use('/api/v1/persons', require('./routes/persons'));
app.use('/api/v1/detentions', require('./routes/detentions'));
app.use('/api/v1/bookingStates', require('./routes/bookingStates'));
app.use('/api/v1/dailyCounts', require('./routes/dailyCounts'));
// app.use('/api/v1/MCDCdataTesting', require('./routes/MCDCdataTesting'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

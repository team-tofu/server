const express = require('express');
const app = express();

const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');

app.use(require('./middleware/cors'));
app.use(express.json());
app.use('/', connection, require('./routes/poll'));
app.use('/votes', connection, require('./routes/votes'));

app.use(handler);

module.exports = app;

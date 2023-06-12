const express = require('express');
const morgan = require('morgan');
const guitarRouter = require('./routes/guitarRoutes');

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/guitars', guitarRouter);
module.exports = app;

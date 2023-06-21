const express = require('express');
const morgan = require('morgan');

const guitarRouter = require('./routes/guitarRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`You're the ${process.env.NODE_ENV} build`);
}

app.use('/api/v1/guitars', guitarRouter);
app.use('/api/v1/users', userRouter);

app.use('*', (req, res, next) => {
  // const error = new Error(`Invald URL ${req.originalUrl} on this server.`);
  next(new AppError(`Invald URL ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

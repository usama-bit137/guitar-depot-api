const path = require('path');
const express = require('express');
const morgan = require('morgan');

const guitarRouter = require('./routes/guitarRoutes');
const userRouter = require('./routes/userRoutes');
const viewsRouter = require('./routes/viewsRouter');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`You're the ${process.env.NODE_ENV} build`);
}

// TEMPLATE ROUTES:
app.use('/', viewsRouter);

//API ROUTES:
app.use('/api/v1/guitars', guitarRouter);
app.use('/api/v1/users', userRouter);

// UNHANDLED ROUTES:
app.use('*', (req, res, next) => {
  // const error = new Error(`Invald URL ${req.originalUrl} on this server.`);
  next(new AppError(`Invald URL ${req.originalUrl} on this server.`, 404));
});

// ERROR HANDLER MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;

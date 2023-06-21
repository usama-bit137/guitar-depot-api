const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION... Shutting down...');
  console.log(err.name, err.message);
});

dotenv.config({ path: './config.env' });

const { DATABASE, DATABASE_PASSWORD, PORT } = process.env; // destructure the process.env object
const DB = DATABASE.replace('<PASSWORD>', DATABASE_PASSWORD);

const app = require('./app');

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful 👌'));

const port = PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// These are worst case scenario:
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION... Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    // more graceful solution. allows for the server to
    // finish processes and then shut down server.
    process.exit(1); // uncaught exception
  });
});

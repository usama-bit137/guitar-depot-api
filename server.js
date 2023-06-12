const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const { DATABASE, DATABASE_PASSWORD } = process.env; // destructure the process.env object
const DB = DATABASE.replace(
  '<PASSWORD>',
  DATABASE_PASSWORD
);

const app = require('./app');

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful 👌'));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

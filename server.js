const mongoose = require('mongoose');
const dotenv = require('dotenv');
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
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
